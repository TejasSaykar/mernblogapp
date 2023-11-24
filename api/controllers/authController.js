const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")

exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(401).json({
                success: false,
                message: "All fields are required"
            });
        }

        const exists = await userModel.findOne({ email });
        if (exists) {
            res.status(400).json({
                success: false,
                message: "User already exists please login"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await new userModel({ username, email, password: hashedPassword }).save();
        res.status(201).json({
            success: true,
            message: "Register successful",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while register",
            error
        })
    }
}


exports.loginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not exists"
            })
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const { password: pass, ...others } = user._doc

        res.status(201).json({
            success: true,
            message: "Login succssful",
            others
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while login",
            error
        })
    }
}