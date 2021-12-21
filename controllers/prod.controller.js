const ProductModel = require('../models/Product')

const productCtrl = {
    getProducts : async(req, res, next) =>{
        try {
            const products = await ProductModel.find()
            console.log(products)
            res.json(products)
        } catch(err){
            return res.status(500).json({msg : err.message})
        }
    },
    getProduct : async(req, res, next) =>{
        try {
            const product = await ProductModel.findById(req.params.id)
            res.json(product)
        } catch(err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct : async(req, res,next) =>{
        try {
            const {name, description, brand, stock, price, image} = req.body;
            if(!image) return res.status(400).json({msg : "No image uploaded"})

            const newProduct = new ProductModel({
                name, description: description.toLowerCase(), brand, stock, price, image
            })
            await newProduct.save()
            res.json({msg: "Created a product"})
            
        } catch(err) {
            return res.status(500).json({msg : err.message})
        }
    },
    deleteProduct : async(req,res,next) =>{
        try {
            await ProductModel.findByIdAndDelete({_id: req.params.id})
            res.json({msg : "Deleted a Product"})
        } catch(err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct : async(req,res, next) =>{
        try {
            const {brand, name, description, stock, price,image} = req.body;
            if(!image) return res.status(400).json({msg : "No image uploaded"})

            await ProductModel.findOneAndUpdate({_id : req.params.id}, {
                brand, name, description: description.toLowerCase(), stock, price,image
            })

            res.json({msg: "Updated a Product"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = productCtrl
  