import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import bcrypt from "bcryptjs"
import createToken from '../utils/token.js';

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new Error("Please fill the details!");
    }

    const userExists = await User.findOne({ email });
    if (userExists) res.status(400).send("User alreday exists");

    const passSalt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, passSalt)

    const newUSer = new User({ username, email, password: hashPass });

    try {
        await newUSer.save();
        createToken(res, newUSer._id);

        res.status(201).json({
            _id: newUSer._id,
            username: newUSer.username,
            email: newUSer.email,
            isAdmin: newUSer.isAdmin,
        })
    } catch (error) {
        res.status(400)
        throw new Error("Invalid user");
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (isPasswordValid) {
            createToken(res, existingUser._id)

            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
            })
            return;
        }
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: "Logged out🙂" })
})

const getAllUSers = asyncHandler(async (req, res) => {
    // const users = await User.find({})
    // res.json(users);
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
})

const getCurrUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(401);
        throw new Error("User is not found");
    }
})

const updateCurUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {
            const passSalt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(req.body.password, passSalt)
            user.password = hashPass;
        }

        const saveData = await user.save();
        res.json({
            _id: saveData._id,
            username: saveData.username,
            email: saveData.email,
            isAdmin: saveData.isAdmin
        });
    }
    else {
        res.status(404)
        throw new Error("User not found");
    }
})

const deleteUserById = asyncHandler(async (req, res) =>{
    const user = await User.findById(req.params.id)

    if (user) {
        if(user.isAdmin){
            res.status(400)
            throw new Error("Can't delete admin user");
        }
        await user.deleteOne({_id: user._id})
        res.json({message: "user removed👍"})
    } else {
        res.status(404)
        throw new Error("User not found🙂");
    }
})

const getUSerById  = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password")

    if(user){
        res.json(user)
    }
    else{
        res.status(404)
        throw new Error("User not found🙂");
    }
})

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)

        const updatedUser = await user.save()
        res.json({
            _id : updatedUser._id,
            username : updatedUser.username,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin
        })
    }
    else{
        res.status(404)
        throw new Error("User not found🙂");
    }
})

export { createUser, loginUser, logoutUser, getAllUSers, getCurrUserProfile, updateCurUserProfile, deleteUserById, getUSerById, updateUserById };