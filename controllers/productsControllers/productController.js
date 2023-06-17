const User = require('../../models/userModels.js');

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

async function createProduct(req, res){
    console.log("Let's create product");
}

module.exports = { secureUpload, createProduct };