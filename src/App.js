import React, { Component } from 'react';
import FilmRow from './FilmRow';
import Loading from './Loading';
import FilmDetails from './FilmDetails';
import './App.css';

const apiKey = 'f12ba140';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchvalue: '',
			films:[],
			loading: false,
			showfilm: null,
		}
	}
	
	inputChange = (event) => {
		if (event.key === 'Enter') {
			this.SearchFilm(this.state.searchvalue);
		}
	}
	
	SearchFilm = (searchtext) => {
		console.log(searchtext);
		let urlomdb = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchtext)}`;
		console.log(urlomdb);

		this.setState({loading : true});
		fetch(urlomdb)
				.then(res => res.json())
				.then(res => {
					console.log(res);
					const films = []; //this.state.films;
					res.Search.forEach(item => {
						films.push(item);
					})
					this.setState({
						films:films,
						loading : false
					});
				})
				.catch(error => {
					console.error(error);
					this.setState({loading : false});
				})
	}
	
	showFilmDetails = (filmid) => {
		console.log(filmid);
		let urlomdb = `http://www.omdbapi.com/?apikey=${apiKey}&i=${filmid}`;
		console.log(urlomdb);

		this.setState({loading : true});
		fetch(urlomdb)
				.then(res => res.json())
				.then(res => {
					console.log(res);
					this.setState({
						showfilm:res,
						loading : false
					});
				})
				.catch(error => {
					console.error(error);
					this.setState({loading : false});
				})
	}
		
	updateSearchValue = (event) => {
		this.setState({searchvalue:event.target.value});
	}

  render() {
	  const content = this.state.films.map((item, index) => (
	  	<FilmRow film={item}  key={index} showDetails={(imdbID)=>this.showFilmDetails(imdbID)} />
	  ));
    return (
      <div className="App">
      	<div className="searchform">Search a film:
      		<input className="searchinput" type="text" placeholder="Insert film" onChange={event=>this.updateSearchValue(event)} onKeyPress={event=>this.inputChange(event)} />
      	</div>
      	<div className="searchresults">
      		{content}
      	</div>
      	{this.state.loading ? (
      		<Loading />
      		) : null
      	}
      	{this.state.showfilm !== null ? (
      		<FilmDetails film={this.state.showfilm} closeDetails={()=>this.setState({showfilm:null})} />
      		) : null
      	}
      </div>
    );
  }
}

export default App;
