import React, { Component } from 'react';
import './styles.css';

class FilmDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

  render() {
    return (
      <div className="filmdetails">
      	<div className="filmdetailsclose" onClick={() => this.props.closeDetails()}>x</div>
      	<div className="filmdetailscontainer">
      		<div className="filmdetailsheader">
		      	{this.props.film.Poster === 'N/A' ? (
		      			<div className="filmdetailsposternoimage" />
		      		):(
		      			<img src={this.props.film.Poster} alt={this.props.film.Title} />
		      		)
		      	}
	      		<div className="filmdetailsheaderright">
		      		<div className="filmdetails-title">{this.props.film.Title}</div>
		      		<div className="filmdetails-year">Year: {this.props.film.Year}</div>
		      		<div className="filmdetails-data">imdbID: {this.props.film.imdbID}</div>
		      		<div className="filmdetails-data">Director: {this.props.film.Director}</div>
		      		<div className="filmdetails-data">Actors: {this.props.film.Actors}</div>
		      		<div className="filmdetails-data">Genre: {this.props.film.Genre}</div>
		      		<div className="filmdetails-data">Language: {this.props.film.Language}</div>
		      		<div className="filmdetails-data">Runtime: {this.props.film.Runtime}</div>
		      		<div className="filmdetails-data">Plot: {this.props.film.Plot}</div>
	      		</div>
      		</div>
      	</div>
      </div>
    );
  }


}

export default FilmDetails;
