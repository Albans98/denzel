# DENZEL

Workshop finished ! Here are my results :
> API created : [API backed with MongoDB Atlas](https://denzel-movies.herokuapp.com/movies)  
> Minimalist frontend : [React frontend](https://denzel-react.herokuapp.com/)


> The must-watch Denzel's movies

![denzel](https://m.media-amazon.com/images/M/MV5BMjE5NDU2Mzc3MV5BMl5BanBnXkFtZTcwNjAwNTE5OQ@@._V1_SY1000_SX750_AL_.jpg)


- [🐣 Introduction](#-introduction)
- [🎯 Objectives](#-objectives)
- [Definition and Configuration](#definition-and-configuration)
  - [Definition](#definition)
  - [Bootstrap the server](#bootstrap-the-server)
- [🏃‍♀️ Steps to do](#%E2%80%8D-steps-to-do)
  - [REST endpoints to implement](#rest-endpoints-to-implement)
    - [`GET /movies/populate`](#get-moviespopulate)
    - [`GET /movies`](#get-movies)
    - [`GET /movies/:id`](#get-moviesid)
    - [`GET /movies/search`](#get-moviessearch)
    - [POST /movies/:id](#post-moviesid)
  - [Bonus - The Client side](#-the-client-side)


## 🐣 Introduction

Denzel Washington is a famous actor.

He won 2 Oscars. [Another 83 wins & 169 nominations](https://www.imdb.com/name/nm0000243/awards?ref_=nm_awd)

## 🎯 Objectives

**Build a REST API to get the must-watch Denzel's movies**.

## Definition and Configuration

### Definition

- A **must-watch** movie is a movie with a `metascore` higher than `70`.
- API should listen locally the port `9292`.
- Data is stored in MongoDB. Backed with a DaaS: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  
- To test and check your API, you should use a client like [Insomnia](https://insomnia.rest) or [Postman](https://www.getpostman.com/products)
- Deployed API with a serverless cloud service: [Netlify](https://www.netlify.com)

### Bootstrap the [server](./server/index.js)

```sh
❯ cd server
❯ npm i
❯ node_modules/.bin/nodemon index.js
```

## 🏃‍♀️ Steps to do

### REST endpoints

#### `GET /movies/populate/:id`

Populate the database with all the [Denzel's movies from IMDb](https://www.imdb.com/name/nm0000243).

You could use the [server/imdb.js](./server/imdb.js) ready-to-use exported function.

```sh
❯ curl -H "Accept: application/json" http://localhost:9292/movies/populate/nm0000243
{
  "total": 58
}
```

![populate](./img/populate.png)

Start [node server/sandbox.js](./server/sandbox.js) for an usage example.

```sh
❯ node server/sandbox.js
📽️  fetching filmography of nm0000243...
🍿 58 movies found.
[
  {
    "link": "https://www.imdb.com/title/tt3766354/?ref_=nm_flmg_act_3",
    "id": "tt3766354",
    "metascore": 50,
    "poster": "https://m.media-amazon.com/images/M/MV5BMTU2OTYzODQyMF5BMl5BanBnXkFtZTgwNjU3Njk5NTM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "rating": 6.7,
    "synopsis": "Robert McCall serves an unflinching justice for the exploited and oppressed, but how far will he go when that is someone he loves?",
    "title": "Equalizer 2 (2018)",
    "votes": 114.311,
    "year": 2018
  },
  {
    "link": "https://www.imdb.com/title/tt6000478/?ref_=nm_flmg_act_4",
    "id": "tt6000478",
    "metascore": 58,
    "poster": "https://m.media-amazon.com/images/M/MV5BMjMyNjkxMTg2NV5BMl5BanBnXkFtZTgwNjkyNTk0MzI@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "rating": 6.4,
    "synopsis": "Roman J. Israel, Esq., a driven, idealistic defense attorney, finds himself in a tumultuous series of events that lead to a crisis and the necessity for extreme action.",
    "title": "L'Affaire Roman J. (2017)",
    "votes": 27.668,
    "year": 2017
  },
  ...
]
```

#### `GET /movies`

Fetch a random **must-watch** movie.

```sh
❯ curl -H "Accept: application/json" http://localhost:9292/movies
{
  "link": "https://www.imdb.com/title/tt0765429/?ref_=nm_flmg_act_15",
  "id": "tt0765429",
  "metascore": 76,
  "poster": "https://m.media-amazon.com/images/M/MV5BMjFmZGI2YTEtYmJhMS00YTE5LWJjNjAtNDI5OGY5ZDhmNTRlXkEyXkFqcGdeQXVyODAwMTU1MTE@._V1_UX182_CR0,0,182,268_AL_.jpg",
  "rating": 7.8,
  "synopsis": "An outcast New York City cop is charged with bringing down Harlem drug lord Frank Lucas, whose real life inspired this partly biographical film.",
  "title": "American Gangster (2007)",
  "votes": 376.889,
  "year": 2007
}
```

![movies](./img/movies.png)


#### `GET /movies/:id`

Fetch a specific movie.

```sh
❯ curl -H "Accept: application/json" http://localhost:9292/movies/tt0477080
{
  "link": "https://www.imdb.com/title/tt0477080/?ref_=nm_flmg_act_11",
  "id": "tt0477080",
  "metascore": 69,
  "poster": "https://m.media-amazon.com/images/M/MV5BMjI4NDQwMDM0N15BMl5BanBnXkFtZTcwMzY1ODMwNA@@._V1_UX182_CR0,0,182,268_AL_.jpg",
  "rating": 6.8,
  "synopsis": "With an unmanned, half-mile-long freight train barreling toward a city, a veteran engineer and a young conductor race against the clock to prevent a catastrophe.",
  "title": "Unstoppable (2010)",
  "votes": 177.986,
  "year": 2010
}
```

#### `GET /movies/search`

Search for Denzel's movies.

This endpoint accepts the following optional query string parameters:

- `limit` - number of movies to return (default: 5)
- `metascore` - filter by metascore (default: 0)

The results array is sorted by metascore in descending way.

```sh
❯ curl -H "Accept: application/json" http://localhost:9292/movies/search?limit=5&metascore=77
{
  "limit": 5,
  "total": 3,
  "results": [
  {
    "id": "tt2671706",
    "link": "https://www.imdb.com/title/tt2671706/?ref_=nm_flmg_act_3",
    "metascore": 79,
    "poster": "https://m.media-amazon.com/images/M/MV5BOTg0Nzc1NjA0MV5BMl5BanBnXkFtZTgwNTcyNDQ0MDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "rating": 7.2,
    "synopsis": "A working-class African-American father tries to raise his family in the 1950s, while coming to terms with the events of his life.",
    "title": "Fences (2016)",
    "votes": 84.291,
    "year": 2016
  },
  {
    "id": "tt0115956",
    "link": "https://www.imdb.com/title/tt0115956/?ref_=nm_flmg_act_31",
    "metascore": 77,
    "poster": "https://m.media-amazon.com/images/M/MV5BODJlOTlkNzUtN2U2OC00NWUxLTg3MjgtNGVmZGU5ZTk0ZjM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "rating": 6.6,
    "synopsis": "A U.S. Army officer, despondent about a deadly mistake he made, investigates a female chopper commander's worthiness for the Medal of Honor.",
    "title": "À l'épreuve du feu (1996)",
    "votes": 46.271,
    "year": 1996
  },
  {
    "id": "tt0112857",
    "link": "https://www.imdb.com/title/tt0112857/?ref_=nm_flmg_act_32",
    "metascore": 78,
    "poster": "https://m.media-amazon.com/images/M/MV5BNjI3NjFiNmMtMmQ1ZC00OTUwLWJlMWMtM2UxY2M2NDQ0OWJhXkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "rating": 6.7,
    "synopsis": "An African-American man is hired to find a woman, and gets mixed up in a murderous political scandal.",
    "title": "Le diable en robe bleue (1995)",
    "votes": 15.686,
    "year": 1995
  }]
}
```

#### POST /movies/:id

Save a watched date and a review.

This endpoint accepts the following post parameters:

- `date` - the watched date
- `review` - the personal review

```sh
❯ curl -X POST -d '{"date": "2019-03-04", "review": "😍 🔥"}' -H "Content-Type: application/json" http://localhost:9292/movies/tt0328107
{
  "_id": "507f191e810c19729de860ea"
}
```

### The Client side

React client side, web application.

The MVP definiton could be:

Each time, we open the web application or refresh the page, fetch a random **must-watch** movie and

- display the title
- display the synopsis
- display the cover
- display the metascore
- display the review
- allow to open the IMDb record
