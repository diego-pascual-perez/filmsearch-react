import React, { Component } from 'react';
import './styles.css';

class FilmRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

  render() {
    return (
      <div className="resultsrow">
      	<div className="resultsrow-in" onClick={()=>this.props.showDetails(this.props.film.imdbID)}>
	      	{this.props.film.Poster === 'N/A' ? (
	      			<div className="noimage" />
	      		):(
	      			<img src={this.props.film.Poster} alt={this.props.film.Title} />
	      		)
	      	}
	      	<div className="resultsrow-right">
	      		<div className="resultsrow-title">{this.props.film.Title}</div>
	      		<div className="resultsrow-year">Year: {this.props.film.Year}</div>
	      		<div className="resultsrow-imdbID">imdbID: {this.props.film.imdbID}</div>
	      	</div>
	     	</div>
     		{this.props.likes.includes(this.props.film.imdbID) ? (
     			<div className="liked" onClick={() => this.props.deleteFavorite(this.props.film.imdbID)}>Liked!</div>
     			) : ( 
     			<div className="like" onClick={() => this.props.addFavorite(this.props.film.imdbID)}>Like</div>
     		)}
      </div>
    );
  }


}

export default FilmRow;
