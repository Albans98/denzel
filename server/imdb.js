/* Axios is a promise based HTTP client for the browser and Node.js.
Axios makes it easy to send asynchronous HTTP requests to REST endpoints and perform CRUD operations.
When we send a request to a server, it returns a response.
*/
const axios = require('axios');

// With Cheerio, we use selectors to select tags of an HTML document.
// Cheerio is used to get information from a HTML file.
const cheerio = require('cheerio');

// Run multiple promise-returning & async functions with limited concurrency
const pLimit = require('p-limit');

// Settle promises concurrently and get their fulfillment value or rejection reason
const pSettle = require('p-settle');


// Get values of constants.js
const {IMDB_NAME_URL, IMDB_URL, P_LIMIT} = require('./constants');

/**
 * Get filmography for a given actor
 * @param  {String}  actor - imdb id
 * @return {Array}
 */
const getFilmography = async actor => {
  try {
    const response = await axios(`${IMDB_NAME_URL}/${actor}`); // await for URL
    const {data} = response; // Get data from axios response
    const $ = cheerio.load(data); // Load data

    return $('#filmo-head-actor + .filmo-category-section .filmo-row b a') // Selector of filmography
      .map((i, element) => { // map create a new tab with the results of the function called on each item of the tab
        return {
          'link': `${IMDB_URL}${$(element).attr('href')}`,
          'title': $(element).text()
        };
      })
      .get();
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Get movie from an imdb link
 * @param  {String} link
 * @return {Object}
 */
const getMovie = async link => {
  try {
    const response = await axios(link);
    const {data} = response;
    const $ = cheerio.load(data);

    return {
      link,
      'id': $('meta[property="pageId"]').attr('content'),
      'metascore': Number($('.metacriticScore span').text()),
      'poster': $('.poster img').attr('src'),
      'rating': Number($('span[itemprop="ratingValue"]').text()),
      'synopsis': $('.summary_text')
        .text()
        .trim(), // remove white spaces from the string
      'title': $('.title_wrapper h1')
        .text()
        .trim(),
      'votes': Number(
        $('span[itemprop="ratingCount"]')
          .text()
          .replace(',', '.')
      ),
      'year': Number($('#titleYear a').text()) // Number convert data type to number
    };
  } catch (error) {
    console.error(error);
    return {};
  }
};

/**
 * Get all filmography for a given actor
 * @param  {String} actor
 * @return {Array}
 */
module.exports = async actor => {
  const limit = pLimit(P_LIMIT);
  const filmography = await getFilmography(actor);

  const promises = filmography.map(filmo => {
    return limit(async () => {
      return await getMovie(filmo.link); // "limit" returns the promises returned by the function await getMovie
    });
  });

  const results = await pSettle(promises);
  const isFulfilled = results
    .filter(result => result.isFulfilled) // get only fulfilled promises
    .map(result => result.value); // return values

  return [].concat.apply([], isFulfilled);
};
