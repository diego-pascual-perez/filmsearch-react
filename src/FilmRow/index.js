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
      	{this.props.film.Poster === 'N/A' ? (
      			<div className="noimage" />
      		):(
      			<img src={this.props.film.Poster} />
      		)
      	}
      	<div className="resultsrow-right">
      		<div className="resultsrow-title">{this.props.film.Title}</div>
      		<div className="resultsrow-year">Year: {this.props.film.Year}</div>
      		<div className="resultsrow-imdbID">imdbID: {this.props.film.imdbID}</div>
      	</div>
      </div>
    );
  }


}

export default FilmRow;
