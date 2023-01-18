import Http from "./http";
import ENV from "../env";
const login = (email, password) => {
  return Http.post(`${ENV.API_URL}/admin/login`, { email, password });
};
const userLogin = (email, password) => {
  return Http.post(`${ENV.API_URL}/user/login`, { email, password });
};
const userVerifyToken = () => {
  return Http.post(`${ENV.API_URL}/user/verifyToken`, {}, "user");
};
const getMe = (userId) => {
  console.log(userId,"fffff")
  return Http.get(`${ENV.API_URL}/user/me/me`, { userId }, "user");
};



const uploadImage = (file) => {
  const formData = new FormData();

  formData.append("file", file);

  return Http.postFormData(`${ENV.API_URL}/services/file-upload`, formData, "admin");
};

// Cats
const getCats = (limit, skip, isActive) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  if (isActive) {
    data.isActive = isActive;
  }
  return Http.get(`${ENV.API_URL}/cat`, { ...data });
};
const addCat = (data) => {
  return Http.post(`${ENV.API_URL}/cat`, data, "admin");
};

const updateCat = (catId, data) => {
  return Http.put(`${ENV.API_URL}/cat/${catId}`, {
    cat: data,
  }, "admin");
};

const getCat = (catId) => {
  return Http.get(`${ENV.API_URL}/cat/${catId}`, {}, "admin");
};

const deleteCat = (catId) => {
  return Http.delete(`${ENV.API_URL}/cat/${catId}`, {}, "admin");
};



// Brands
const getBrands = (limit, skip, isActive) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  if (isActive) {
    data.isActive = isActive;
  }
  return Http.get(`${ENV.API_URL}/brand`, { ...data });
};
const addBrand = (data) => {
  return Http.post(`${ENV.API_URL}/brand`, data, "admin");
};

const updateBrand = (brandId, data) => {
  return Http.put(`${ENV.API_URL}/brand/${brandId}`, {
    brand: data,
  }, "admin");
};

const getBrand = (brandId) => {
  return Http.get(`${ENV.API_URL}/brand/${brandId}`, {}, "admin");
};

const deleteBrand = (brandId) => {
  return Http.delete(`${ENV.API_URL}/brand/${brandId}`, {}, "admin");
};

// Memberships
const getMemberships = (limit, skip) => {

  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }

  return Http.get(`${ENV.API_URL}/membership`, { ...data });
};
const addMembership = (data) => {
  return Http.post(`${ENV.API_URL}/membership`, data);
};

const updateMembership = (membershipId, data) => {
  return Http.put(`${ENV.API_URL}/membership/${membershipId}`, {
    membership: data,
  });
};

const getMembership = (membershipId) => {
  return Http.get(`${ENV.API_URL}/membership/${membershipId}`);
};

const deleteMembership = (membershipId) => {
  return Http.delete(`${ENV.API_URL}/membership/${membershipId}`);
};

// Units
const getUnits = (limit, skip) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }

  return Http.get(`${ENV.API_URL}/unit`, { ...data });
};
const addUnit = (data) => {
  return Http.post(`${ENV.API_URL}/unit`, data, "admin");
};

const updateUnit = (unitId, data) => {
  return Http.put(`${ENV.API_URL}/unit/${unitId}`, {
    unit: data,
  }, "admin");
};

const getUnit = (unitId) => {
  return Http.get(`${ENV.API_URL}/unit/${unitId}`, {}, "admin");
};

const deleteUnit = (unitId) => {
  return Http.delete(`${ENV.API_URL}/unit/${unitId}`, {}, "admin");
};


// Products
const getProducts = (limit, skip, isActive, cat, brand, search) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  if (isActive) {
    data.isActive = isActive;
  }
  if (cat) {
    data.cat = cat;
  }
  if (brand) {
    data.brand = brand;
  }

  if (search) {
    data.search = search;
  }

  return Http.get(`${ENV.API_URL}/product`, { ...data });
};
const addProduct = (data) => {
  return Http.post(`${ENV.API_URL}/product`, data, "admin");
};

const updateProduct = (productId, data) => {
  return Http.put(`${ENV.API_URL}/product/${productId}`, {
    product: data,
  }, "admin");
};

const getProductById = (productId) => {
  return Http.get(`${ENV.API_URL}/product/user/${productId}`, {}, "user");
};

const getProduct = (productId) => {
  return Http.get(`${ENV.API_URL}/product/${productId}`, {}, "admin");
};
const deleteProduct = (productId) => {
  return Http.delete(`${ENV.API_URL}/product/${productId}`, {}, "admin");
};

// Customers
const getCustomers = (limit, skip, isActive,search) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  if (isActive) {
    data.isActive = isActive;
  }

  if (search) {
    data.search = search;
  }
  return Http.get(`${ENV.API_URL}/customer`, { ...data }, "admin");
};

const getCustomersByUserId = () => {
  return Http.get(`${ENV.API_URL}/customer/byUserId`, {}, "user");
};
const addCustomer = (data) => {
  return Http.post(`${ENV.API_URL}/customer`, data, "admin");
};

const updateCustomer = (customerId, data) => {
  return Http.put(`${ENV.API_URL}/customer/${customerId}`, {
    customer: data,
  }, "admin");
};

const getCustomer = (customerId) => {
  return Http.get(`${ENV.API_URL}/customer/${customerId}`, {}, "admin");
};

const deleteCustomer = (customerId) => {
  return Http.delete(`${ENV.API_URL}/customer/${customerId}`, {}, "admin");
};

// Transactions
const getTransactions = (limit, skip) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }

  return Http.get(`${ENV.API_URL}/transaction`, { ...data }, "admin");
};
const addTransaction = (data) => {
  return Http.post(`${ENV.API_URL}/transaction`, data, "admin");
};

const addTransactionByUser = (data) => {
  return Http.post(`${ENV.API_URL}/transaction/byUserId`, data, "user");
};

const updateTransaction = (transactionId, data) => {
  return Http.put(`${ENV.API_URL}/transaction/${transactionId}`, {
    transaction: data,
  }, "admin");
};

const getTransaction = (transactionId) => {
  return Http.get(`${ENV.API_URL}/transaction/${transactionId}`, {}, "admin");
};

const deleteTransaction = (transactionId) => {
  return Http.delete(`${ENV.API_URL}/transaction/${transactionId}`, {}, "admin");
};

//USER
const signup = (customer, name, surname, email, phone, password,) => {
  let fullName = name + " " + surname;
  return Http.post(`${ENV.API_URL}/user/signup`, {
    customer,
    fullName,
    email,
    phone,
    password,
  });
};


const changePassword = (oldPassword, newPassword) => {
  return Http.post(`${ENV.API_URL}/user/change-password`, {
    oldPassword,
    newPassword,
  });
};
const resetPasswordRequestWithEmail = (email) => {
  return Http.post(`${ENV.API_URL}/user/resetPasswordRequestWithEmail`, {
    email,
  });
};

// Users
const getUsers = (limit, skip, isActive) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  if (isActive) {
    data.isActive = isActive;
  }

  return Http.get(`${ENV.API_URL}/user`, { ...data }, "admin");
};
const addUser = (data) => {
  return Http.post(`${ENV.API_URL}/user`, data, "admin");
};

const updateUser = (userId, data) => {
  return Http.patch(`${ENV.API_URL}/user/${userId}`, {
    user: data,
  }, "admin");
};

const getUser = (userId) => {
  return Http.get(`${ENV.API_URL}/user/${userId}`, {}, "admin");
};

const deleteUser = (userId) => {
  return Http.delete(`${ENV.API_URL}/user/${userId}`, {}, "admin");
};










// Sliders
const getSliders = (limit, skip, lang) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  if (lang) {
    data.lang = lang;
  }
  return Http.get(`${ENV.API_URL}/slider`, { ...data });
};
const addSlider = (data) => {
  return Http.post(`${ENV.API_URL}/slider`, data, "admin");
};

const updateSlider = (sliderId, data) => {
  return Http.put(`${ENV.API_URL}/slider/${sliderId}`, {
    slider: data,
  }, "admin");
};

const getSlider = (sliderId) => {
  return Http.get(`${ENV.API_URL}/slider/${sliderId}`, {}, "admin");
};

const deleteSlider = (sliderId) => {
  return Http.delete(`${ENV.API_URL}/slider/${sliderId}`, {}, "admin");
};


// Admins
const getPermissions = () => {
  return Http.get(`${ENV.API_URL}/admin/permissions`);
};

const getAdmins = (limit, skip, customQuery = {}) => {
  let data = { customQuery: JSON.stringify(customQuery) };
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  return Http.get(`${ENV.API_URL}/admin`, { ...data });
};


const getAdmin = (adminId) => {
  return Http.get(`${ENV.API_URL}/admin/${adminId}`);
};

const updateAdminStatusById = (adminId, isActive) => {
  return Http.patch(`${ENV.API_URL}/admin/${adminId}/status/${isActive}`);
};

const deleteAdmin = (adminId) => {
  return Http.delete(`${ENV.API_URL}/admin/${adminId}`);
};

const addAdmin = (data) => {
  return Http.post(`${ENV.API_URL}/admin`, data);
};
const updateAdmin = (adminId, data) => {
  return Http.put(`${ENV.API_URL}/admin/${adminId}`, {
    admin: data,
  });
};

const setAdminPermissionGroup = (adminId, permissionGroup) => {
  return Http.patch(`${ENV.API_URL}/admin/${adminId}/permissionGroup`, {
    permissionGroup,
  });
};

const renewPassword = (adminId, newPassword) => {
  return Http.patch(`${ENV.API_URL}/admin/${adminId}/renewPassword`, {
    newPassword,
  });
};

const verifyToken = () => {
  return Http.post(`${ENV.API_URL}/admin/verifyToken`, {}, "admin");
};

export default {

  uploadImage,
  //User
  login,
  userLogin,
  signup,
  changePassword,
  resetPasswordRequestWithEmail,
  userVerifyToken,
  getMe,

  //Cats
  getCats,
  getCat,
  addCat,
  updateCat,
  deleteCat,

  //Brands
  getBrands,
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand,

  //Memberships
  getMemberships,
  getMembership,
  addMembership,
  updateMembership,
  deleteMembership,
  //Units
  getUnits,
  getUnit,
  addUnit,
  updateUnit,
  deleteUnit,

  //Users
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  //Products
  getProducts,
  getProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  //Customers
  getCustomers,
  getCustomersByUserId,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  //Transactions
  getTransactions,
  getTransaction,
  addTransaction,
  addTransactionByUser,
  updateTransaction,
  deleteTransaction,





  //admin
  verifyToken,
  getPermissions,
  renewPassword,
  setAdminPermissionGroup,
  addAdmin,
  updateAdmin,
  updateAdminStatusById,
  getAdmins,
  getAdmin,
  deleteAdmin,

  //slider
  getSliders,
  getSlider,
  addSlider,
  updateSlider,
  deleteSlider,


};
