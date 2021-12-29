const express = require('express')
const {
  getAllCarts,
  addToCart,
  getCartById,
  updateCart,
  deleteCart,
  getCartByUser
} = require('../controllers/cartController')

const router = express.Router()

router.route('/').get(getAllCarts).post(addToCart)
router.route('/:id').get(getCartById).patch(updateCart).delete(deleteCart)
router.route('/users/:id').get(getCartByUser)

module.exports = router
