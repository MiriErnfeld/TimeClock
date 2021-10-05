
const Shift = require('../models/shifts');
const User = require('../models/user')

const createShift = async (req, res) => {
    let correctId = null;
    const Cuser = await User.findOne({ userId: req.params.userId });
    if (!Cuser) {
        const newUser = await new User({
            userId: req.params.userId,
            name: req.body.name,
        })
        await newUser.save()
        correctId = newUser._id
    }
    else {
        correctId = Cuser._id;
    }
    try {
        const newShift = new Shift({
            enterTime: req.body.enterTime,
            leavingTime: "",
            userId: correctId,
            name: req.body.name
        })
        await newShift.save()
        res.send(newShift)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const getAllShifts = async (req, res) => {
    try {
        let shift1 = await Shift.find().populate({ path: 'userId' });
        console.log("get function!!!!", shift1)
        res.send(shift1)
    } catch (error) {
        res.status(400).send(error)
    }
}
const deleteShift = async (req, res) => {
    console.log("deleteFunction");
    try {
        await Shift.findByIdAndDelete(req.params._id)
        console.log("shift deleted successfully!");
        const user = await User.findOne({ _id: req.body._id }) //in case that the user has only one shift the user need deleted!
        if (!user) {
            console.log(req.body.userId);
            await User.findByIdAndDelete(req.body.userId)
            console.log("user also delete!!!");
        }
        res.json({ status: res.status })
    } catch (error) {
        res.status(400).send(error)
    }
}
const updateShift = async (req, res) => {
    console.log("updateShift!");
    let user = await User.findOne({ userId: req.params.userId })
    let correctId = user._id
    Shift.findOneAndUpdate({ userId: correctId, leavingTime: "" }, { $set: { leavingTime: req.body.leavingTime } }, { new: true })
        .then((shift1) => {
            res.status(200).json({ shift1 })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
}
module.exports = { createShift, getAllShifts, deleteShift, updateShift }