const asyncHandler = require("express-async-handler") // we will not need to write different try cath block if we use it
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
// const { use } = require("../routes/contactRoutes");

//@desc Register user
//@route GET /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("Email already exist");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    if (user) {
        console.log(`User Created ${user}`);
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User not registered");
    }
    res.json({ messege: "Registered the user" });
});

//@desc Login user
//@route post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    //compare password and hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: "10m" },
        );
        res.status(200).json({accessToken});

    } else {
        res.status(401);
        throw new Error("Password or email is invalid");
    }
})

//@desc current user
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    res.json(req.user);
})
module.exports = { registerUser, loginUser, currentUser };