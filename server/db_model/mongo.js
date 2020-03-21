const mongo = require('mongoose')

const schema = mongo.Schema({
	link: String,
	id: String,
	metascore: {
		type: Number,
		required: true
	},
	poster: String,
	rating: Number,
	synopsis: String,
	title: String,
	votes: Number,
	year: Number,
});

module.exports = mongo.model('denzel_db', schema);