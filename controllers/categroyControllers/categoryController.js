const Category = require("../../models/categoryModels.js");
const SubCategory = require("../../models/subCategoryModels.js");

// ================== Category Start ======================

let categoryController = async (req, res) => {

    const { name, description } = req.body;

    let isCategoryExist = await Category.find({ name });

    if (isCategoryExist.length > 0) {
        return res.send({ error: 'Category Already Exist!' });
    }

    let category = new Category({
        name,
        description,
    });

    category.save();

    res.send({ success: 'Category Created Succefully!' });


}


let categoryStatus = async (req, res) => {

    const { name, status } = req.body;

    if (status == 'rejected' || status == 'pending') {

        let updateStatus = await Category.findOneAndUpdate({ name }, { $set: { isActive: false, status } }, { new: true });

        // We can also update this way.
        // let updateStatus = await Category.findOneAndUpdate(
        //     { name },
        //     { $set: { status } },
        //     { new: true }
        // )

        return res.send({ success: 'Status Updated Successfully!' });

    } else if (status == 'approved') {

        let updateStatus = await Category.findOneAndUpdate({ name }, { $set: { isActive: true, status } }, { new: true });

        return res.send({ success: 'Status Updated Successfully!' });

    }


}

// ================== Category End ======================

// ================== Sub Category Start ======================

let subCategoryController = async (req, res) => {

    const { name, description, categoryId } = req.body;

    let isSubCategoryExist = await SubCategory.find({ name });

    if (isSubCategoryExist.length > 0) {
        return res.send({ error: 'SubCategory Already Exist!' });
    }

    let subcategory = new SubCategory({
        name,
        description,
        categoryId,
    });

    subcategory.save();

    console.log(subcategory._id);

    await Category.findOneAndUpdate({ _id: subcategory.categoryId }, { $push: { subCategory: subcategory._id } }, { new: true });

    res.send({ success: 'SubCategory Created Succefully!' });


}


let subCategoryStatus = async (req, res) => {

    const { name, status } = req.body;

    if (status == 'rejected' || status == 'pending') {

        let updateStatus = await SubCategory.findOneAndUpdate({ name }, { $set: { isActive: false, status } }, { new: true });

        // We can also update this way.
        // let updateStatus = await Category.findOneAndUpdate(
        //     { name },
        //     { $set: { status } },
        //     { new: true }
        // )

        return res.send({ success: 'Status Updated Successfully!' });

    } else if (status == 'approved') {

        let updateStatus = await SubCategory.findOneAndUpdate({ name }, { $set: { isActive: true, status } }, { new: true });

        return res.send({ success: 'Status Updated Successfully!' });

    }


}

// ================== Sub Category End ======================

// ================= Fetch Data From Database Start =================

// Get All Category Data
let getAllCategory = async (req, res) => {

    let data = await Category.find({}).populate('subCategory');

    res.send(data);

}

// Get ALL Sub Category Data 
let getAllSubCategory = async (req, res)=>{

    let data = await SubCategory.find({}).populate('categoryId');

    res.send(data);

}

// ================= Fetch Data From Database End =================


module.exports = { categoryController, categoryStatus, subCategoryController, subCategoryStatus, getAllCategory, getAllSubCategory };