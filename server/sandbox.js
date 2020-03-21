const imdb = require('./imdb'); // Get movies (see imdb.js)
const DENZEL_IMDB_ID = 'nm0000243'; // Denzel ID on the IMdb website
const METASCORE = 70; // Set a good movie to metascore 70
var emoji = require('node-emoji') // For an emojified world


// We use async function in order to set a context for the "await" keyword
// "await" is useful when we need to get data from a website, since we have delay
// It means we are waiting for the specific action after the "await" to finish before going on

async function start (actor = DENZEL_IMDB_ID, metascore = METASCORE) {
  try { // Try these actions

  	console.log(emoji.get(':izakaya_lantern:'))
    console.log(`📽️  fetching filmography of ${actor}...`); // `` to display the variable with $

    // await for the data before going on
    const movies = await imdb(actor); // use imdb exported function to find movies from specified actor
    const awesome = movies.filter(movie => movie.metascore >= metascore); // Filter all values of the movies array with metascore > 70

    console.log(`🍿 ${movies.length} movies found.`);

    // Parameters
    // 1. Value to convert to JSON		2. Replacement (null for no replacement)		3. Whitespaces for indentation
    console.log(JSON.stringify(movies, null, 2));

    console.log(`🥇 ${awesome.length} awesome movies found.`);
    console.log(JSON.stringify(awesome, null, 2));

    process.exit(0); // exit uses the 'success' code 0 or 'failure' code 1

  } catch (e) { // Or catch error
    console.error(e);
    process.exit(1); // exit uses the 'success' code 0 or 'failure' code 1
  }
}

// process.argv is an array containing the command line arguments.
// The first element will be 'node', the second element will be the name of the JavaScript file.
// The next elements will be any additional command line arguments.
const [, , id, metascore] = process.argv;

start(id, metascore); // Call the start function above
