const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please provide post title'],
	  },
	  
	content: {
		type: String,
		required: [true, 'Please provide post content to the post'],
	  },
	
	category: {
		type: String,
		required: [true, 'Please provide post category'],
	  },

	  userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	  }
	},
	{ timestamps: true}
)

module.exports = mongoose.model('Post', postSchema)