const Review = require('../models/reviewModal')
const {
  handleCreateOne,
  handleGetAll,
  handleGetOne,
  handleGetByAnotherId,
  handleUpdateOne,
  handleDeleteOne
} = require('../utils/APIFactory')

exports.addReview = handleCreateOne(Review)
exports.getAllReviews = handleGetAll(Review)
exports.getReviewById = handleGetOne(Review)
exports.updateReview = handleUpdateOne(Review)
exports.deleteReview = handleDeleteOne(Review)
exports.getReviewByProductId = handleGetByAnotherId(Review, 'product')
exports.getReviewByUserId = handleGetByAnotherId(Review, 'user')
