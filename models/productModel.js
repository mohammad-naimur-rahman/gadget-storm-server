const mongoose = require('mongoose')
const slugify = require('slugify')

const variantSchema = new mongoose.Schema(
  {
    ram: Number,
    rom: Number,
    storage: Number,
    storageUnit: String,
    size: Number,
    sizeUnit: String,
    basePrice: Number,
    discount: mongoose.Schema.Types.Mixed,
    price: Number
  },
  { _id: false }
)

const dimensionSchema = new mongoose.Schema(
  {
    length: Number,
    width: Number,
    thickness: Number
  },
  { _id: false }
)

const displaySchema = new mongoose.Schema(
  {
    displayType: String,
    displaySize: Number,
    displayResolution: String,
    displayScreenToBodyRatio: Number
  },
  { _id: false }
)

const cameraSchema = new mongoose.Schema(
  {
    sensor: [
      {
        megaPixels: Number,
        sensorType: String,
        zoom: Number,
        fieldOfView: Number
      }
    ],
    videoCapability: [String]
  },
  { _id: false }
)

const couponSchema = new mongoose.Schema(
  {
    code: String,
    discount: Number,
    startDate: Date,
    endDate: Date,
    totalCoupon: Number
  },
  { _id: false }
)

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required']
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: [
        'smartPhone',
        'tablet',
        'earphone',
        'laptop',
        'gimbal',
        'drone',
        'dslr',
        'actionCam',
        'powerBank',
        'blutoothSpeaker',
        'chargerAndCable',
        'other'
      ]
    },
    brand: {
      type: String,
      required: [true, 'Product brand is required']
    },
    os: String,
    variants: [variantSchema],
    basePrice: {
      type: Number,
      required: [true, 'Product base price is required']
    },
    discount: mongoose.Schema.Types.Mixed,
    price: {
      type: Number,
      required: [true, 'Product price is required']
    },
    images: [String],
    descriptionImages: [String],
    description: Object,
    baseRam: Number,
    baseRom: Number,
    baseSize: Number,
    baseSizeUnit: String,
    baseStorage: Number,
    baseStorageUnit: String,
    processor: String,
    frontCamera: cameraSchema,
    backCamera: cameraSchema,
    battery: Number,
    batteryType: String,
    dimensions: dimensionSchema,
    display: displaySchema,
    weight: String,
    driver: Number,
    features: [String],
    axis: Number,
    boxContent: [String],
    flyingTime: Number,
    ports: [String],
    capacity: Number,
    length: Number,
    sound: String,
    colors: [String],
    camera: Number,
    imageSensor: String,
    stockValue: Number,
    coupon: couponSchema,
    featured: {
      type: Boolean,
      default: false
    },
    supply: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

productSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id'
})

productSchema.pre('save', function (next) {
  if (this.variants.length > 0) {
    this.basePrice = this.variants.reduce((lowest, variant) => {
      return variant.basePrice < lowest ? variant.basePrice : lowest
    }, this.variants[0].basePrice)
    this.price = this.variants.reduce((lowest, variant) => {
      return variant.price < lowest ? variant.price : lowest
    }, this.variants[0].price)
    this.baseRam = this.variants.reduce((lowest, variant) => {
      return variant.ram < lowest ? variant.ram : lowest
    }, this.variants[0].ram)
    this.baseRom = this.variants.reduce((lowest, variant) => {
      return variant.rom < lowest ? variant.rom : lowest
    }, this.variants[0].rom)
    this.baseSize = this.variants.reduce((lowest, variant) => {
      return variant.size < lowest ? variant.size : lowest
    }, this.variants[0].size)
    this.baseSizeUnit = this.variants[0].sizeUnit
    this.baseStorage = this.variants.reduce((lowest, variant) => {
      return variant.storage < lowest ? variant.storage : lowest
    }, this.variants[0].storage)
    this.baseStorageUnit = this.variants[0].storageUnit
  }
  next()
})

module.exports = mongoose.model('Product', productSchema)
