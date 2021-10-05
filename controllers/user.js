const Shift = require('../models/shifts')
const User = require('../models/user')



const getAllUsers = async (req, res) => {
    console.log("enter to get users");
    try {

        let s = await User.find()
        console.log("users:", s);
        res.send(  s )
        console.log("get function!!!!")
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = { getAllUsers }
