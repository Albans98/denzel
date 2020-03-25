import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import Movie from './components/Movie';

const App = () => {
  const exampleReq = 'https://denzel-movies.herokuapp.com/movies';
  
  const [counter, setCounter] = useState(0);

  const[movies, setMovies] = useState([]);

  useEffect(() => {
  	async function getData() {
  	const response = await axios.get(exampleReq);
  	const {data} = response;
  	setMovies(data);
  	console.log(data.id);
    }
    getData();
  }, [counter]);





  return (
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type="text"/>
        <button className="search-button" type="submit"> Search </button>
      </form>
      <h1 onClick={() => setCounter(counter+1)}> {counter} </h1>
      {movies.map(movie => (
      	<Movie title={movie.title} image={movie.poster}/>
      ))}
    </div>
  );
};

export default App;
