const Cart = require('../models/cartModel')

const {
  handleGetAll,
  handleCreateOne,
  handleGetOne,
  handleUpdateOne,
  handleDeleteOne,
  handleGetByAnotherId
} = require('../utils/APIFactory')

exports.getAllCarts = handleGetAll(Cart)
exports.addToCart = handleCreateOne(Cart)
exports.getCartById = handleGetOne(Cart, 'product')
exports.updateCart = handleUpdateOne(Cart)
exports.deleteCart = handleDeleteOne(Cart)
exports.getCartByUser = handleGetByAnotherId(Cart, 'user', 'product')
