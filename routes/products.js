var express = require('express');
var router = express.Router();
let productModel = require('../schemas/product');
let categoryModel = require('../schemas/category');

// GET all products
router.get('/', async function(req, res) {
    try {
        let products = await productModel.find();
        res.status(200).send({ success: true, data: products });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// CREATE a new product
router.post('/', async function(req, res) {
    try {
        let newProduct = new productModel({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            isDeleted: false
        });
        await newProduct.save();
        res.status(201).send({ success: true, data: newProduct });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

// UPDATE product
router.put('/:id', async function(req, res) {
    try {
        let updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }
        res.status(200).send({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

// SOFT DELETE product
router.delete('/:id', async function(req, res) {
    try {
        let deletedProduct = await productModel.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
        if (!deletedProduct) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }
        res.status(200).send({ success: true, message: 'Product deleted (soft)' });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

module.exports = router;