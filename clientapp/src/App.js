import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import Movie from './components/Movie';
import Background from './background/road.jpg';


var bgStyle = {
  minHeight: "100%",
  minWidth: "1024px",
  width: "100%",
  height: "auto",
  position: "fixed",
  backgroundPosition: "center",
  backgroundImage: `url(${Background})`
};


const App = () => {
  const exampleReq = 'https://denzel-movies.herokuapp.com/movies';
  
  const[movies, setMovies] = useState([]);

  useEffect(() => {
  	async function getData() {
  	const response = await axios.get(exampleReq);
  	const {data} = response;
  	setMovies(data);
  	console.log(data.id);
    }
    getData();
  }, []);





  return (
    <div style={bgStyle} className="App">
    <p className="intro"> The must-watch movies of Denzel Washington </p>
      <form className="search-form">
        <button className="search-button" type="submit"> Search another movie </button>
      </form>
      {movies.map(movie => (
      	<Movie title={movie.title} image={movie.poster} synopsis={movie.synopsis}/>
      ))}
    </div>
  );
};

export default App;
