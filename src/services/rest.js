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
  return Http.get(`${ENV.API_URL}/user/me`, { userId });
};



const uploadImage = (file) => {
  const formData = new FormData();

  formData.append("file", file);

  return Http.postFormData(`${ENV.API_URL}/services/file-upload`, formData, "admin");
};

// Cats
const getCats = (limit, skip, lang) => {
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
  return Http.get(`${ENV.API_URL}/cat`, { ...data });
};
const addCat = (data) => {
  return Http.post(`${ENV.API_URL}/cat`, data);
};

const updateCat = (catId, data) => {
  return Http.put(`${ENV.API_URL}/cat/${catId}`, {
    cat: data,
  });
};

const getCat = (catId) => {
  return Http.get(`${ENV.API_URL}/cat/${catId}`);
};

const deleteCat = (catId) => {
  return Http.delete(`${ENV.API_URL}/cat/${catId}`);
};



// Brands
const getBrands = (limit, skip, lang) => {
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
  return Http.get(`${ENV.API_URL}/brand`, { ...data });
};
const addBrand = (data) => {
  return Http.post(`${ENV.API_URL}/brand`, data);
};

const updateBrand = (brandId, data) => {
  return Http.put(`${ENV.API_URL}/brand/${brandId}`, {
    brand: data,
  });
};

const getBrand = (brandId) => {
  return Http.get(`${ENV.API_URL}/brand/${brandId}`);
};

const deleteBrand = (brandId) => {
  return Http.delete(`${ENV.API_URL}/brand/${brandId}`);
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
  return Http.post(`${ENV.API_URL}/unit`, data);
};

const updateUnit = (unitId, data) => {
  return Http.put(`${ENV.API_URL}/unit/${unitId}`, {
    unit: data,
  });
};

const getUnit = (unitId) => {
  return Http.get(`${ENV.API_URL}/unit/${unitId}`);
};

const deleteUnit = (unitId) => {
  return Http.delete(`${ENV.API_URL}/unit/${unitId}`);
};


// Products
const getProducts = (limit, skip, isActive, cat, brand) => {
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

const getProduct = (productId) => {
  return Http.get(`${ENV.API_URL}/product/${productId}`, {}, "admin");
};

const deleteProduct = (productId) => {
  return Http.delete(`${ENV.API_URL}/product/${productId}`, {}, "admin");
};

// Customers
const getCustomers = (limit, skip, isActive) => {
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


  return Http.get(`${ENV.API_URL}/customer`, { ...data }, "admin");
};

const getCustomersByUserId = () => {
  return Http.get(`${ENV.API_URL}/customer/byUserId`, {}, "user");
};
const addCustomer = (data) => {
  return Http.post(`${ENV.API_URL}/customer`, data);
};

const updateCustomer = (customerId, data) => {
  return Http.put(`${ENV.API_URL}/customer/${customerId}`, {
    customer: data,
  });
};

const getCustomer = (customerId) => {
  return Http.get(`${ENV.API_URL}/customer/${customerId}`);
};

const deleteCustomer = (customerId) => {
  return Http.delete(`${ENV.API_URL}/customer/${customerId}`);
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
const getUsers = (limit, skip) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }

  return Http.get(`${ENV.API_URL}/user`, { ...data },"admin");
};
const addUser = (data) => {
  return Http.post(`${ENV.API_URL}/user`, data,"admin");
};

const updateUser = (userId, data) => {
  return Http.patch(`${ENV.API_URL}/user/${userId}`, {
    user: data,
  },"admin");
};

const getUser = (userId) => {
  return Http.get(`${ENV.API_URL}/user/${userId}`,{},"admin");
};

const deleteUser = (userId) => {
  return Http.delete(`${ENV.API_URL}/user/${userId}`,{},"admin");
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
  return Http.post(`${ENV.API_URL}/slider`, data);
};

const updateSlider = (sliderId, data) => {
  return Http.put(`${ENV.API_URL}/slider/${sliderId}`, {
    slider: data,
  });
};

const getSlider = (sliderId) => {
  return Http.get(`${ENV.API_URL}/slider/${sliderId}`);
};

const deleteSlider = (sliderId) => {
  return Http.delete(`${ENV.API_URL}/slider/${sliderId}`);
};

// Langs
const getLangs = (limit, skip) => {
  let data = {};
  if (limit) {
    data.limit = limit;
  }
  if (skip) {
    data.skip = skip;
  }
  return Http.get(`${ENV.API_URL}/lang`, { ...data });
};
const addLang = (data) => {
  return Http.post(`${ENV.API_URL}/lang`, data);
};

const updateLang = (langId, data) => {
  return Http.put(`${ENV.API_URL}/lang/${langId}`, {
    lang: data,
  });
};

const getLang = (langId) => {
  return Http.get(`${ENV.API_URL}/lang/${langId}`);
};

const deleteLang = (langId) => {
  return Http.delete(`${ENV.API_URL}/lang/${langId}`);
};

// Homes
const getHomes = (limit, skip, lang) => {
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
  return Http.get(`${ENV.API_URL}/home`, { ...data });
};
const addHome = (data) => {
  return Http.post(`${ENV.API_URL}/home`, data);
};

const updateHome = (homeId, data) => {
  return Http.put(`${ENV.API_URL}/home/${homeId}`, {
    home: data,
  });
};

const getHome = (homeId) => {
  return Http.get(`${ENV.API_URL}/home/${homeId}`);
};

const deleteHome = (homeId) => {
  return Http.delete(`${ENV.API_URL}/home/${homeId}`);
};

// Abouts
const getAbouts = (limit, skip, lang) => {
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
  return Http.get(`${ENV.API_URL}/about`, { ...data });
};
const addAbout = (data) => {
  return Http.post(`${ENV.API_URL}/about`, data);
};

const updateAbout = (aboutId, data) => {
  return Http.put(`${ENV.API_URL}/about/${aboutId}`, {
    about: data,
  });
};

const getAbout = (aboutId) => {
  return Http.get(`${ENV.API_URL}/about/${aboutId}`);
};

const deleteAbout = (aboutId) => {
  return Http.delete(`${ENV.API_URL}/about/${aboutId}`);
};

// Treatments
const getTreatments = (limit, skip, lang, isActive, hp) => {
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
  if (isActive) {
    data.isActive = isActive;
  }
  if (hp) {
    data.hp = hp;
  }
  return Http.get(`${ENV.API_URL}/treatment`, { ...data });
};
const addTreatment = (data) => {
  return Http.post(`${ENV.API_URL}/treatment`, data);
};

const updateTreatment = (treatmentId, data) => {
  return Http.put(`${ENV.API_URL}/treatment/${treatmentId}`, {
    treatment: data,
  });
};

const getTreatment = (treatmentId) => {
  return Http.get(`${ENV.API_URL}/treatment/${treatmentId}`);
};
const getTreatmentViaPerma = (perma) => {
  return Http.get(`${ENV.API_URL}/treatment/perma/${perma}`);
};

const deleteTreatment = (treatmentId) => {
  return Http.delete(`${ENV.API_URL}/treatment/${treatmentId}`);
};
// TreatmentPages
const getTreatmentPages = (limit, skip, lang) => {
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
  return Http.get(`${ENV.API_URL}/treatmentpage`, { ...data });
};
const addTreatmentPage = (data) => {
  return Http.post(`${ENV.API_URL}/treatmentpage`, data);
};

const updateTreatmentPage = (treatmentPageId, data) => {
  return Http.put(`${ENV.API_URL}/treatmentpage/${treatmentPageId}`, {
    treatmentPage: data,
  });
};

const getTreatmentPage = (treatmentPageId) => {
  return Http.get(`${ENV.API_URL}/treatmentPage/${treatmentPageId}`);
};

const deleteTreatmentPage = (treatmentPageId) => {
  return Http.delete(`${ENV.API_URL}/treatmentPage/${treatmentPageId}`);
};
// Contacts
const getContacts = (limit, skip, lang) => {
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
  return Http.get(`${ENV.API_URL}/contact`, { ...data });
};
const addContact = (data) => {
  return Http.post(`${ENV.API_URL}/contact`, data);
};

const updateContact = (contactId, data) => {
  return Http.put(`${ENV.API_URL}/contact/${contactId}`, {
    contact: data,
  });
};

const getContact = (contactId) => {
  return Http.get(`${ENV.API_URL}/contact/${contactId}`);
};

const deleteContact = (contactId) => {
  return Http.delete(`${ENV.API_URL}/contact/${contactId}`);
};
const getGenerals = (limit, skip, lang) => {
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
  return Http.get(`${ENV.API_URL}/general`, { ...data });
};
const addGeneral = (data) => {
  return Http.post(`${ENV.API_URL}/general`, data);
};

const updateGeneral = (generalId, data) => {
  return Http.put(`${ENV.API_URL}/general/${generalId}`, {
    general: data,
  });
};

const getGeneral = (generalId) => {
  return Http.get(`${ENV.API_URL}/general/${generalId}`);
};

const deleteGeneral = (generalId) => {
  return Http.delete(`${ENV.API_URL}/general/${generalId}`);
};

// Translates
const getTranslates = (limit, skip, lang) => {
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
  return Http.get(`${ENV.API_URL}/translate`, { ...data });
};
const addTranslate = (data) => {
  return Http.post(`${ENV.API_URL}/translate`, data);
};

const updateTranslate = (translateId, data) => {
  return Http.put(`${ENV.API_URL}/translate/${translateId}`, {
    translate: data,
  });
};

const getTranslate = (translateId) => {
  return Http.get(`${ENV.API_URL}/translate/${translateId}`);
};

const deleteTranslate = (translateId) => {
  return Http.delete(`${ENV.API_URL}/translate/${translateId}`);
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

const getOrganizers = () => {
  return Http.get(`${ENV.API_URL}/admin/organizers`);
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
  getOrganizers,
  getAdmin,
  deleteAdmin,

  //slider
  getSliders,
  getSlider,
  addSlider,
  updateSlider,
  deleteSlider,


};
