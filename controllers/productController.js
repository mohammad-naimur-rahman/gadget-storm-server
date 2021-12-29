const Product = require('../models/productModel')
const {
  handleGetAll,
  handleCreateOne,
  handleGetOne,
  handleUpdateOne,
  handleDeleteOne
} = require('../utils/APIFactory')

exports.addProduct = handleCreateOne(Product)
exports.getAllProducts = handleGetAll(Product)
exports.getProductById = handleGetOne(Product)
exports.updateProduct = handleUpdateOne(Product)
exports.deleteProduct = handleDeleteOne(Product)
