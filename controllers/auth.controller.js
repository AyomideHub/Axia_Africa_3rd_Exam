const User = require('../models/user.model')
const Post = require('../models/post.model')
const KYC = require('../models/KYC.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
	const {email, username, password} = req.body

	if (!email || !username || !password ){
		return res.status(422).json({success: false, msg: "Input Filed Cannot be empty"})
	}

	try {
		let user = await User.findOne({email})

	if(user){	
		return res.status(409).json({success: false, msg: "email already in use"})
	}

	const hashpassword = await bcrypt.hash(password, 10)

	const newUser = await User.create({email, username, password : hashpassword})

	res.status(201).json({success: true, msg: "registration sucessfull", data: {...newUser._doc, password: undefined}})
		
	} catch (error) {
		return res.status(500).json({ success: false, msg: error.message});
	}
	
}

const login = async (req, res) => {
	const {email, password} = req.body
	if (!email || !password){
		return res.status(422).json({success: false, msg: "invalid credentials"})
	}

	try {

		const user = await User.findOne({email})
	if (!user){
		return res.status(401).json({success: false, msg: "invalid credentials"})
	}

	const verifyPassword = await bcrypt.compare(password, user.password)

	if(verifyPassword){
		const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
			expiresIn: "7d"
		})

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_MODE === 'production', // for dev mode
			sameSite:"strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})
	} else {
		return res.status(400).json({success: false, msg: "invalid credentials"})
	}

	res.status(200).json({success: true, msg: "login sucessfully", data: {...user._doc, password: undefined}})
		
	} catch (error) {
		return res.status(500).json({ success: false, msg: error.message});
	}
}

const DeletingAUser = async (req, res) => {
	try {
	const user = await User.findByIdAndDelete({_id: req.user.userId})
	if(user){
		await Post.findOneAndDelete({userId: req.user.userId })
		await KYC.findOneAndDelete({userId: req.user.userId })
		return res.status(200).json({success: true, msg: "user deleted sucessfully"})
	} else{
		return res.status(400).json({success: true, msg: "No user Found"})
	}
	} catch (error) {
		return res.status(500).json({ success: false, msg: error.message});
	}
	
}

const createPost = async (req, res) => {
	const {title, content, category} = req.body

	if (!title || !content || !category ){
		return res.status(422).json({success: false, msg: "Input Filed Cannot be empty"})
	}

	try {
		const post = await Post.create({title, content, category, userId: req.user.userId})
		res.status(201).json({success: true, ...post._doc})
	
	} catch (error) {
		return res.status(500).json({ success: false, msg: error.message});
	}
}

const createKyc = async (req, res) => {
	const {firstName, lastName, sex} = req.body

	if (!firstName || !lastName || !sex ){
		return res.status(422).json({success: false, msg: "Input Filed Cannot be empty"})
	}

	try {
		const userkyc = await KYC.create({...req.body, userId: req.user.userId})
		return res.status(201).json({success: true, ...userkyc._doc})
	
	} catch (error) {
		return res.status(500).json({ success: false, msg: error.message});
	}
}


module.exports = {register, login, DeletingAUser, createPost, createKyc}