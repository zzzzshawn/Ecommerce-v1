const { Schema, model, models } = require("mongoose");

const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      products: { type: Schema.Types.ObjectId, ref: "Products", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = models.Cart || model("Cart", CartSchema);
