import React from 'react';

const Movie = ({title, image, synopsis}) => {
	return(
		<div>
		  <h1 className="title">{title}</h1>
		  <img className="poster" src={image} alt="movie poster"/>
		  <h2 className="synopsis">{synopsis}</h2>
		</div>
	);
}

export default Movie;