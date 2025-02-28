const mongoose = require('mongoose')

const kycSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'Please provide firstname'],
	  },
	  
	LastName: {
		type: String,
		required: [true, 'Please provide lastname'],
	  },
	
	sex: {
		type: String,
		required: [true, 'Please provide sex'],
	  },
	  address: {
		country: String,
		state: String,
		City: String,
		street: String
	  },
	  userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	  }
	},
	{ timestamps: true}
)

module.exports = mongoose.model('KYC', kycSchema)