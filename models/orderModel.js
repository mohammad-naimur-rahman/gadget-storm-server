const mongoose = require('mongoose')

const variantSchema = new mongoose.Schema(
  {
    ram: Number,
    rom: Number,
    size: Number,
    sizeUnit: String,
    withoutDiscount: Number
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      min: 1,
      max: 5,
      default: 1
    },
    variant: variantSchema,
    unitPrice: {
      type: Number,
      required: [true, 'Unit price is required']
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required']
    },
    couponDiscount: Number,
    discount: Number,
    shippingCharge: Number,
    finalPrice: {
      type: Number,
      required: [true, 'Final price is required']
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Success', 'Failed'],
      default: 'Pending'
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Order', orderSchema)
