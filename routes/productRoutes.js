const express = require('express')
const {
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct
  //getAllProducts
} = require('../controllers/productController')
const Product = require('../models/productModel')

const router = express.Router()

const getAllProducts = async (req, res) => {
  // API example - /api/v1/products?product=variants.ram,variants.rom,ports,type,display.displaySize,supply,backCamera.sensor.megaPixels&values=min1,max1024,lightning%20port,android,7.5,false,min10
  let products
  // if (req.query.product === undefined || req.query.values === undefined) {
  //   products = await Product.find({})
  // } else {
  //   const keys = req.query.product.split(',')
  //   const val = req.query.values.split(',')

  //   const values = val.map(i => {
  //     if (i.includes('min')) return { $gte: Number(i.split('min')[1]) }
  //     if (i.includes('max')) return { $lte: Number(i.split('max')[1]) }
  //     if (i.includes('lt')) return { $lte: Number(i.split('lt')[1]) }
  //     if (i.includes('gt')) return { $lte: Number(i.split('gt')[1]) }
  //     if (i.includes('true')) return true
  //     if (i.includes('false')) return false
  //     return i
  //   })
  //   const obj = Object.assign.apply(
  //     {},
  //     keys.map((v, i) => ({ [v]: values[i] }))
  //   )

  if (req.query.product === undefined) {
    products = await Product.find({})
  } else {
    const query = req.query.product

    const splitted = query.split(',')

    const keys = splitted.map(i => i.split('-')[0])
    let values = splitted.map(i => i.split('-')[1])
    values = values.map(i => {
      if (i.includes('min')) return { $gte: Number(i.split('min')[1]) }
      if (i.includes('max')) return { $lte: Number(i.split('max')[1]) }
      if (i.includes('lt')) return { $lte: Number(i.split('lt')[1]) }
      if (i.includes('gt')) return { $lte: Number(i.split('gt')[1]) }
      if (i.includes('true')) return true
      if (i.includes('false')) return false
      return i
    })

    const obj = Object.assign.apply(
      {},
      keys.map((v, i) => ({ [v]: values[i] }))
    )
  }

  res.json({
    success: true,
    count: products.length,
    data: products
  })
}

router.route('/').get(getAllProducts).post(addProduct)
router
  .route('/:id')
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct)

module.exports = router

// product=variants.ram-min1,variants.rom-max1024,ports-lightning%20port,type-android,display.displaySize-7.5,supply-false,backCamera.sensor.megaPixels-min10
