import React, { Component } from 'react';
import FilmRow from './FilmRow';
import Loading from './Loading';
import './App.css';

const apiKey = 'f12ba140';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showfilm: false,
			searchvalue: '',
			films:[],
			loading: false,
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
	
	updateSearchValue = (event) => {
		this.setState({searchvalue:event.target.value});
	}

  render() {
	  const content = this.state.films.map((item, index) => (
	  	<FilmRow film={item}  key={index} />
	  ));
    return (
      <div className="App">
      	<div className="searchform">
      		<input className="searchinput" type="text" placeholder="Insert film" onChange={event=>this.updateSearchValue(event)} onKeyPress={event=>this.inputChange(event)} />
      	</div>
      	<div className="searchresults">
      		{content}
      	</div>
      	{this.state.loading ? (
      		<Loading />
      		) : null
      	}
      </div>
    );
  }
}

export default App;
