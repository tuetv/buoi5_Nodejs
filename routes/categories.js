var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/category');

router.get('/', async function(req, res, next) {
  let categories = await categoryModel.find({ isDeleted: false });
  res.status(200).send({ success: true, data: categories });
});

router.get('/:id', async function(req, res, next) {
  try {
    let category = await categoryModel.findOne({ _id: req.params.id, isDeleted: false });
    if (!category) throw new Error("khong co id phu hop");
    res.status(200).send({ success: true, data: category });
  } catch (error) {
    res.status(404).send({ success: false, message: error.message });
  }
});

router.post('/', async function(req, res, next) {
  try {
    let newCategory = new categoryModel({
      name: req.body.name,
      description: req.body.description
    });
    await newCategory.save();
    res.status(200).send({ success: true, data: newCategory });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    let updatedCategory = await categoryModel.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { $set: req.body },
      { new: true }
    );
    if (!updatedCategory) throw new Error("khong co id phu hop");
    res.status(200).send({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    let deletedCategory = await categoryModel.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!deletedCategory) throw new Error("khong co id phu hop");
    res.status(200).send({ success: true, message: "Category hidden" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

// // GET all categories
// router.get('/categories', async function(req, res) {
//     try {
//         let categories = await categoryModel.find({});
//         res.status(200).send({ success: true, data: categories });
//     } catch (error) {
//         res.status(500).send({ success: false, message: error.message });
//     }
// });

// // CREATE a new category
// router.post('/categories', async function(req, res) {
//     try {
//         let newCategory = new categoryModel({
//             name: req.body.name,
//             description: req.body.description
//         });
//         await newCategory.save();
//         res.status(201).send({ success: true, data: newCategory });
//     } catch (error) {
//         res.status(400).send({ success: false, message: error.message });
//     }
// });

// // UPDATE category
// router.put('/categories/:id', async function(req, res) {
//     try {
//         let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedCategory) {
//             return res.status(404).send({ success: false, message: 'Category not found' });
//         }
//         res.status(200).send({ success: true, data: updatedCategory });
//     } catch (error) {
//         res.status(400).send({ success: false, message: error.message });
//     }
// });

// // DELETE category
// router.delete('/categories/:id', async function(req, res) {
//     try {
//         let deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
//         if (!deletedCategory) {
//             return res.status(404).send({ success: false, message: 'Category not found' });
//         }
//         res.status(200).send({ success: true, message: 'Category deleted' });
//     } catch (error) {
//         res.status(400).send({ success: false, message: error.message });
//     }
// });

module.exports = router;