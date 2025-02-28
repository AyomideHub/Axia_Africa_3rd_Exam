const jwt = require('jsonwebtoken')

const authenticateUser = async (req, res, next) => {
	const token = req.cookies.token
	if(!token){
		return res.status(401).json({success: false, msg: "Unauthorized, you not logged in"})
	}
	const verifyToken = jwt.verify(token, process.env.JWT_SECRET)

	if(!verifyToken){
		return res.status(401).json({success: false, msg: "Unauthorized, invalid token"})
	}

	req.user = verifyToken

	next()
}


module.exports = {authenticateUser}