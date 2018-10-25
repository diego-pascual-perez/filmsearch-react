import React, { Component } from 'react';
import './styles.css';

const FilmDetails = ({ film, closeDetails }) => {

    return (
      <div className="filmdetails">
      	<div className="filmdetailsclose" onClick={() => closeDetails()}>x</div>
      	<div className="filmdetailscontainer">
      		<div className="filmdetailsheader">
		      	{film.Poster === 'N/A' ? (
		      			<div className="filmdetailsposternoimage" />
		      		):(
		      			<img src={film.Poster} alt={film.Title} />
		      		)
		      	}
	      		<div className="filmdetailsheaderright">
		      		<div className="filmdetails-title">{film.Title}</div>
		      		<div className="filmdetails-year">Year: {film.Year}</div>
		      		<div className="filmdetails-data">imdbID: {film.imdbID}</div>
		      		<div className="filmdetails-data">Director: {film.Director}</div>
		      		<div className="filmdetails-data">Actors: {film.Actors}</div>
		      		<div className="filmdetails-data">Genre: {film.Genre}</div>
		      		<div className="filmdetails-data">Language: {film.Language}</div>
		      		<div className="filmdetails-data">Runtime: {film.Runtime}</div>
		      		<div className="filmdetails-data">Plot: {film.Plot}</div>
	      		</div>
      		</div>
      	</div>
      </div>
    );

}

export default FilmDetails;
