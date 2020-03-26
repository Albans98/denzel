const express = require('express');
const router = express.Router()
const movie_item = require('../db_model/mongo');
const imdb = require('../imdb');


// Fetch a random must-watch movie
router.get('/', async (req, res) => {
	try {
		const random_movie = await movie_item.aggregate([{$match: { metascore: { $gt: 70 } } }, { $sample: { size: 1 }}]);
		res.json(random_movie);
	}
	catch(err) {
		res.json({message: err});
	}
});

// Populate the database
router.get('/populate/:id', async (req, res) => {
	let movies = await imdb(req.params.id);
	for (m of movies) {
		const obj = new movie_item({
			actor: req.params.id,
			id: m.id,
			link: m.link,
			metascore: m.metascore,
			poster: m.poster,
			rating: m.rating,
			synopsis: m.synopsis,
			title: m.title,
			votes: m.votes,
			year: m.year
		});
		try {
			await obj.save();
		}
		catch (err) {
			res.json({message: err});
		}
	}
	movie_item.countDocuments({ actor: "nm0000243" }, function (err, count) {
  		if (err) {
  			res.json({message: err});
  		}
  		else {
  			res.send({'total': count});
  		}
	});
});

// Search for Denzel's movies
router.get('/search', async (req, res) => {
	let metascore = 0;
	let limit = 5;
	if(req.query.metascore) metascore = Number(req.query.metascore);
	if(req.query.limit) limit = Number(req.query.limit);
	try {
		let movies = await movie_item.aggregate([{$match: {metascore: {$gt: metascore}}}, {$sample: {size: limit}}, {$sort: {metascore: -1}}]);
		res.json(movies);
	}
	catch(err) {
		res.json({message: err});
	}
});

// Fetch a specific movie
router.get('/:id', async (req, res) => {
	try {
		const movie = await movie_item.findOne({"id": req.params.id});
		res.json(movie);
	}
	catch(err) {
		res.json({message: err});
	}
});


// Save a watched date and a review
router.post('/:id', async (req, res) => {
	let movie;
	try {
		movie = await movie_item.findOne({"id": req.params.id});
		await movie_item.updateOne({ _id: movie._id }, {watch_date: req.body.date, review: req.body.review});
		res.send({ _id: movie._id });
	}
	catch(err) {
		res.json({message: err});
	}
});

module.exports = router;