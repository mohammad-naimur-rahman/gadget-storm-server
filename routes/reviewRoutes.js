const express = require('express')
const {
  getAllReviews,
  addReview,
  getReviewById,
  getReviewByProductId,
  getReviewByUserId,
  updateReview,
  deleteReview
} = require('../controllers/reviewController')

const router = express.Router()

router.route('/').get(getAllReviews).post(addReview)

router.route('/:id').get(getReviewById).patch(updateReview).delete(deleteReview)

router.route('/products/:id').get(getReviewByProductId)
router.route('/users/:id').get(getReviewByUserId)

module.exports = router
