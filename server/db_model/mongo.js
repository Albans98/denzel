const mongo = require('mongoose');

const schema = new mongo.Schema({
	actor: String,
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
	watch_date: { 
		type: String, 
		default: 'unwatched' 
	},
	review: { 
		type: String, 
		default: 'no review yet' 
	}
});

module.exports = mongo.model('movie_item', schema);