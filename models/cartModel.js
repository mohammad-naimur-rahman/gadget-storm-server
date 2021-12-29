const mongoose = require('mongoose')

const variantSchema = new mongoose.Schema(
  {
    ram: Number,
    rom: Number,
    size: Number,
    sizeUnit: String
  },
  { _id: false }
)

const cartSchema = new mongoose.Schema(
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
    couponDiscount: Number,
    discount: Number,
    finalUnitPrice: {
      type: Number,
      required: [true, 'Final unit price is required']
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required']
    }
  },
  {
    timestamps: true
  }
)

cartSchema.pre('validate', function () {
  if (this.discount > 0 && this.couponDiscount > 0) {
    this.finalUnitPrice = this.unitPrice - (this.couponDiscount + this.discount)
  } else if (this.discount > 0) {
    this.finalUnitPrice = this.unitPrice - this.discount
  } else if (this.couponDiscount > 0) {
    this.finalUnitPrice = this.unitPrice - this.couponDiscount
  } else {
    this.finalUnitPrice = this.unitPrice
  }
  this.totalPrice = this.unitPrice * this.quantity
})

module.exports = mongoose.model('Cart', cartSchema)
