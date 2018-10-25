import React, { Component } from 'react';
import './styles.css';

const FilmRow = ({ film, likes, showDetails, addFavorite, deleteFavorite }) => {
    return (
      <div className="resultsrow">
      	<div className="resultsrow-in" onClick={()=>showDetails(film.imdbID)}>
	      	{film.Poster === 'N/A' ? (
	      			<div className="noimage" />
	      		):(
	      			<img src={film.Poster} alt={film.Title} />
	      		)
	      	}
	      	<div className="resultsrow-right">
	      		<div className="resultsrow-title">{film.Title}</div>
	      		<div className="resultsrow-year">Year: {film.Year}</div>
	      		<div className="resultsrow-imdbID">imdbID: {film.imdbID}</div>
	      	</div>
	     	</div>
     		{likes.includes(film.imdbID) ? (
     			<div className="liked" onClick={() => deleteFavorite(film.imdbID)}>Liked!</div>
     			) : ( 
     			<div className="like" onClick={() => addFavorite(film.imdbID)}>Like</div>
     		)}
      </div>
    );

}

export default FilmRow;
