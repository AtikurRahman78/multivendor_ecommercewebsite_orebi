const Product = require('../../models/productModels.js');
const User = require('../../models/userModels.js');
const Variant = require('../../models/variantModels.js');



async function secureUpload(req, res, next) {


    const userid = req.headers.authorization.split('@')[1];
    const password = req.headers.authorization.split('@')[2];

    if (!req.headers.authorization) {
        return res.send({ error: 'Unauthorized!' });
    }

    let user = await User.find({ _id: userid });
    console.log(user.length)

    if (user.length > 0) {
        if (password == process.env.MERCHANT_SECRET_KEY) {
            if (user[0].role == 'merchant') {
                next();
            }
        } else {
            res.send({ error: 'You lenghtbaimkdsk dskfdlfjfl are not able to create product!' });
        }

    } else {
        return res.send({ error: 'You are not able to create product!' });
    }


}

async function createProduct(req, res) {

    const { name, description, store } = req.body;

    if (!name) {
        return res.send({ error: 'Name is required!' });
    } else if (!description) {
        return res.send({ error: 'Description is required!' });
    } else if (!store) {
        return res.send({ error: 'Store is required!' });
    } else {

        const product = new Product({

            name,
            description,
            store

        });

        product.save();

        res.send({ success: 'Product is created successfully!' })

    }

}


async function createVariant(req, res) {

    const { color, image, product, storage, ram, size, price, quantity } = req.body;


    const variant = new Variant({

        color,
        image : `${process.env.IMAGE_PATH}/uploads/${req.file.filename}`,
        product,
        storage,
        ram,
        size,
        price,
        quantity

    });

    variant.save();

    await Product.findOneAndUpdate({ _id: variant.product }, { $push: { variants: variant._id } }, { new: true });

    res.send({ success: 'Variant is created successfully!' })

}

module.exports = { secureUpload, createProduct, createVariant };