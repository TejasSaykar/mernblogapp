const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const bcrypt = require("bcryptjs");

// Update the User
exports.updateUserController = async (req, res) => {
    const { username, email, password, profilePic } = req.body;
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        try {
            const updatedUser = await userModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
            res.status(200).json(updatedUser)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    } else {
        res.status(401).json("You can update only your account")
    }
}

exports.deleteUserController = async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await userModel.findById(req.params.id);
            try {
                await postModel.deleteMany({ username: user.username });
                await userModel.findByIdAndDelete(req.params.id);
                res.status(201).json("User has been deleted!")
            } catch (error) {
                res.status(500).json(error);
            }
        } catch (error) {
            res.status(404).json("User not found")
        }
    } else {
        res.status(401).json("You can delete only user account");
    }
}

exports.getUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json("User not found")
        }
        const { password, ...others } = user._doc;
        res.status(201).json(others)
    } catch (error) {
        res.status(500).json(error);
    }
}