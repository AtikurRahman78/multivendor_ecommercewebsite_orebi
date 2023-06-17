const User = require('../../models/userModels.js');
const Store = require('../../models/merchantModels.js');

let merchantController = async (req, res) => {

    const { storename, officialemail, officialphone, address, owner, products } = req.body;

    if (!storename) {
        return res.send({ error: 'Store Name is required!' });
    } else if (!officialemail) {
        return res.send({ error: 'Email is required!' });
    } else if (!officialphone) {
        return res.send({ error: 'Phone number is required!' });
    } else if (!address) {
        return res.send({ error: 'Address is required!' });
    } else if (!owner) {
        return res.send({ error: 'Owner is required!' });
    } else {

        const existEmail = await Store.find({ officialemail });

        if (existEmail.length > 0) {
            return res.send({ error: 'Email already exist! Enter new email.' });
        } else {

            const store = new Store({

                storename,
                officialemail,
                officialphone,
                address,
                owner,
                products

            });

            store.save();

            await User.findOneAndUpdate({ _id: store.owner }, { $set: { merchant: true, role: "merchant" } }, { new: true });

            res.send({ success: 'Store created. You become a merchant!' });

        }
    }
}

let merchantStatusController = async (req, res) => {

    const { owner, status } = req.body;

    if (status == 'pending' || status == 'rejected') {
        await User.findOneAndUpdate({ _id: owner }, { $set: { merchant: false, role: "member" } }, { new: true });
        await Store.findOneAndUpdate({ owner }, { status }); 
    } else if (status == 'approved') {
        await User.findOneAndUpdate({ _id: owner }, { $set: { merchant: true, role: "merchant" } }, { new: true });
        await Store.findOneAndUpdate({ owner }, { status });
    }

    res.send({ success: 'Merchant status changed successfully!' });
}



module.exports = { merchantController, merchantStatusController };