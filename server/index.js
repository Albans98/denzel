const cors = require('cors'); // Cross-origin resource sharing (CORS)
const express = require('express'); // Express is a web application framework
const helmet = require('helmet'); // Helmet.js secure HTTP headers returned by apps.
require('dotenv').config(); // Access .env variables
const mongo = require('mongoose');
const PORT = process.env.PORT || 9292;


// Connect to MongoDB Atlas
//process.env.MONGO_CONNECT

const url = 'mongodb+srv://alban:steff@denzel-8zwfu.mongodb.net/movies?retryWrites=true&w=majority';

mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
		console.log("Connected to DB.");
	})
	.catch((err) => {
		console.log("Error while DB connecting.");
		console.log(err);
	});

// Create app
const app = express();
app.use(require('body-parser').json()); // body-parser extracts the body portion of request
app.use(cors());
app.use(helmet());
app.options('*', cors()); // the * allows access from any origin


const getRoute = require('./routes/requests');
app.use('/movies', getRoute);

app.get('/', (request, response) => {
  response.send({'ack': true});
});

// Start web app on PORT
app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);

module.exports = app;