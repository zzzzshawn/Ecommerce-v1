const express = require("express");
const router = express.Router();
const AdminUser = require("../models/AdminUser.model");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchAdminUser = require("../middleware/fetchAdminUser");
const isAdmin = require("../middleware/AdminVerify");
const Product = require("../models/Product.model");

const secret = process.env.JWT_SECRET;

// ----------------------------------------
// Admin auth routes
// ----------------------------------------
router.post(
  "/signup",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("username must me atleast 3 characters"),
    body("email").isEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters"),
    body("role")
      .isString()
      .custom((roles) => {
        const validRoles = "admin";
        if (validRoles === roles) {
          return validRoles;
        }
      })
      .withMessage("Invalid role provided"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check if user with same username and email exists
      let user = await AdminUser.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      });

      if (user) {
        return res
          .status(400)
          .json({ error: "username or email already exists." });
      }

      // if passes checks, generate salt for password
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password, salt);

      // create new user
      user = await AdminUser.create({
        username: req.body.username,
        email: req.body.email,
        password: securedPassword,
        role: req.body.role,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, secret);

      res.json({ success: true, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await AdminUser.findOne({
        email: req.body.email,
        role: "admin",
      });
      if (!user) {
        return res.status(400).json({ error: "User does not exist." });
      }

      const passwordCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passwordCompare) {
        return res.status(400).json({ error: "invalid credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, secret);

      res.status(200).json({ success: "success", authToken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get("/userinfo", fetchAdminUser, isAdmin, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "internal server error" });
  }
});

router.post(
  "/register",
  fetchAdminUser,
  isAdmin,
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("username must me atleast 3 characters"),
    body("email").isEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters"),
    body("role")
      .isString()
      .custom((roles) => {
        const validRoles = "admin";
        if (validRoles === roles) {
          return validRoles;
        }
      })
      .withMessage("Invalid role provided"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check if user with same username and email exists
      let user = await AdminUser.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      });

      if (user) {
        return res
          .status(400)
          .json({ error: "username or email already exists." });
      }

      // if passes checks, generate salt for password
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password, salt);

      // create new user
      user = await AdminUser.create({
        username: req.body.username,
        email: req.body.email,
        password: securedPassword,
        role: req.body.role,
      });

      res.status(200).json({ success: "User create successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get("/getadmins", async (req, res) => {
  try {
    const adminCount = await AdminUser.countDocuments();
    return res.status(200).json({ adminCount });
  } catch (error) {
    console.error(error);
  }
});

// --------------------------------------------
// Product Routes
// --------------------------------------------

router.post(
  "/addproduct",
  fetchAdminUser,
  isAdmin,
  [
    body("name")
      .isString()
      .isLength({ min: 1 })
      .withMessage(
        "Product name is required and should be a non-empty string."
      ),
    body("description")
      .isString()
      .isLength({ min: 1 })
      .withMessage(
        "Product description is required and should be a non-empty string."
      ),
    body("price")
      .isFloat({ min: 0 })
      .withMessage(
        "Price is required and should be a number greater than or equal to 0."
      ),
    body("category")
      .isString()
      .isLength({ min: 1 })
      .withMessage("Category is required and should be a non-empty string."),
    body("stock")
      .isInt({ min: 0 })
      .withMessage(
        "Stock is required and should be an integer greater than or equal to 0."
      ),
    body("imageUrl")
      .optional()
      .isURL()
      .withMessage("Image URL should be a valid URL."),
  ],
  async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      let product = await Product.findOne({ name: req.body.name });
      if (product) {
        return res.status(400).json({ error: "Product name already exists" });
      }

      product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        imageUrl: req.body.imageUrl,
      });

      res.status(200).json({ success: true, product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  }
);

router.put(
  "/updateproduct/:id",
  fetchAdminUser,
  isAdmin,
  [
    body("name")
      .isString()
      .isLength({ min: 1 })
      .withMessage(
        "Product name is required and should be a non-empty string."
      ),
    body("description")
      .isString()
      .isLength({ min: 1 })
      .withMessage(
        "Product description is required and should be a non-empty string."
      ),
    body("price")
      .isFloat({ min: 0 })
      .withMessage(
        "Price is required and should be a number greater than or equal to 0."
      ),
    body("category")
      .isString()
      .isLength({ min: 1 })
      .withMessage("Category is required and should be a non-empty string."),
    body("stock")
      .isInt({ min: 0 })
      .withMessage(
        "Stock is required and should be an integer greater than or equal to 0."
      ),
    body("imageUrl")
      .optional()
      .isURL()
      .withMessage("Image URL should be a valid URL."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, description, price, category, stock, imageUrl } = req.body;

    try {
      let product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found." });
      }
      product = await Product.findByIdAndUpdate(
        id,
        {
          name,
          description,
          price,
          category,
          stock,
          imageUrl,
        },
        { new: true }
      );

      res.status(200).json({ success: true, product });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "server error" });
    }
  }
);

router.delete(
  "/deleteproduct/:id",
  fetchAdminUser,
  isAdmin,
  async (req, res) => {
    const { id } = req.params;

    try {
      // Check if the product exists
      let product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Delete the product
      await Product.findByIdAndDelete(id);

      res
        .status(200)
        .json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/productslist", fetchAdminUser, isAdmin, async (req, res) => {
  const page = req.header('Page');
  const pageSize = 5;

  try {
    const products = await Product.find().skip((page - 1) * pageSize).limit(pageSize);

    const totalCount = await Product.countDocuments({});

    res.status(200).json({ success: true, products, totalCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
