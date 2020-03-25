import React from 'react';

const Movie = ({title, image}) => {
	return(
		<div>
		  <h1>{title}</h1>
		  <p> Description </p>
		  <img src={image} alt="movie poster"/>
		</div>
	);
}

export default Movie;