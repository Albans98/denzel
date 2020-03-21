const express = require('express');

const router = express.Router()

const model = require('../db_model/mongo');

router.get('/', async (request, response) => {
  try{
  	const posts = await model.find();
  	res.json(posts);
  }
  catch(err) {
  	res.json({message: err});
  }
});

router.get('/user', (request, response) => {
  response.send({'user': true});
});

router.post('/', async (req, res) => {
	//console.log(req.body);
	const post = new model({
		link: req.body.link,
		id: req.body.id,
		metascore: req.body.metascore,
		poster: req.body.poster,
		rating: req.body.rating,
		synopsis: req.body.synopsis,
		title: req.body.title,
		votes: req.body.votes,
		year: req.body.year
	});
	try{
		const saved = await post.save()
		res.json(saved);
	}
	catch(err){
		res.json({message: err});
	}
});


router.get('/:id', async (req, res) => {
	//console.log(req.params.id);
	try{
		const post = await model.findById(req.params.postId);
		console.log(res.json(post));
	}
	catch(err) {
		console.log(res.json({message: err}));
	}
});

module.exports = router;