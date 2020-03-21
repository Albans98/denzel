/* Cross-origin resource sharing (CORS) allows AJAX (Asynchronous JavaScript And XML)
requests to skip the Same-origin policy and access resources from remote hosts.
Cross-origin resource sharing (CORS) is a mechanism that allows 
restricted resources on a web page to be requested from another 
domain outside the domain from which the first resource was served.
CORS defines a way in which a browser and server can interact to determine 
whether it is safe to allow the cross-origin request.
*/
const cors = require('cors');

// Express.js basically helps you manage everything, from routes, to handling requests and views.
// Express is a light-weight web application framework to help organize your web application.
const express = require('express');

// Helmet.js is a useful module that helps you secure HTTP headers returned by your Express apps.
const helmet = require('helmet');

const {PORT} = require('./constants');

const app = express();

module.exports = app;

/* body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
We can then use the data inside like : request.body.username, for a username
bodyparser.json parses incoming requests with JSON payloads (get useful data)
*/
app.use(require('body-parser').json());

// Bind application-level middleware to an instance of the app object by using the app.use()
app.use(cors());
app.use(helmet());

// the * wildcard allows access from any origin
app.options('*', cors());

const getRoute = require('./routes/posts');


app.use('/movies', getRoute);

// Say that the app is working on main page "/"
app.get('/', (request, response) => {
  response.send({'ack': true});
});

/* Pseudo code
app.get('/movies/populate/:actor', (request, response) => {
	const movies = await imdb(request.params.actor);

	db.insert(movies);
	response.send({'total': movies.length});
})
*/

// Start web app on PORT
app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);

// Connect to MongoDB Atlas
require('dotenv/config');
const mongo = require('mongoose');
mongo.connect(
	process.env.MONGO_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true }, () =>
	console.log('connected to DB !')
);

