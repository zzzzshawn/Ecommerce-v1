const host = "http://localhost:5000"

export const createAdminUser = async (params) => {
  const { username, email, password, role } = params;
  const response = await fetch(`${host}/admin/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password, role }),
  });
  const data = await response.json();
  return data;
};

export const confirmAdmin = async (token) => {
  try {
    if (!token) {
      return false;
    }
    const data = await fetch(`${host}/admin/userinfo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
    });

    const response = await data.json();
    if (!response.role === "admin") {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
  }
};

export const loginAdmin = async (params) => {
  const { email, password } = params;

  const response = await fetch(`${host}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data;
};

export const getAdmins = async () => {
  const adminCount = await fetch(`${host}/admin/getadmins`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await adminCount.json();
  return data;
};

export const addProduct = async (params) => {
  const { name, description, price, category, stock, imageUrl } = params;

  try {
    const token = localStorage.getItem("Cookie");
    if (!token) {
      console.log("Token not found")
      return false;
    }
    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);

    // Construct the body object
    const body = {
      name,
      description,
      price: parsedPrice,
      category,
      stock: parsedStock,
    };

    // Include imageUrl if it is provided
    if (imageUrl) {
      body.imageUrl = imageUrl;
    }

    const response = await fetch(`${host}/admin/addproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (currentPage) => {
  try {
    
    const response = await fetch(`${host}/admin/productslist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Page": currentPage
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { products: [] }; // Return an empty list if there is an error
  }
};

export const getProductsFrontend = async () => {
  try {
    const response = await fetch(`${host}/admin/productslist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { products: [] }; // Return an empty list if there is an error
  }
};

export const getProductById = async (productId) => {
  try {
    const token = localStorage.getItem("Cookie");
    if (!token) {
      console.log("Token not found");
      return false;
    }

    const body = {
      id: productId
    }

    const response = await fetch(`${host}/admin/getproductbyid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Token": token,
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data;

    

  } catch (error) {
    console.log(error)
  }
}

export const updateProduct = async (id, product) => {
  try {
    const token = localStorage.getItem("Cookie");
    if (!token) {
      console.log("Token not found");
      return false;
    }

    console.log(product)
    const parsedPrice = parseFloat(product.price);
    const parsedStock = parseInt(product.stock, 10);

    const body = {
      name: product.name,
      description: product.description,
      price: parsedPrice,
      category: product.category,
      stock: parsedStock,
    }

    const response = await fetch(`${host}/admin/updateproduct/${id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Token": token,
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()

    return data

  } catch (error) {
    console.log(error)
  }
}


export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem("Cookie");
    if (!token) {
      console.log("Token not found")
      return false;
    }

    const response = await fetch(`${host}/admin/deleteproduct/${id}`,{
      method: "DELETE",
      headers: {
        "Token": token
      }
    })

    const data = await response.json();

    return data


  } catch (error) {
    console.log(error)
  }
}