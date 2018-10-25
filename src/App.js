import React, { Component } from 'react';
import FilmRow from './FilmRow';
import Loading from './Loading';
import FilmDetails from './FilmDetails';
import Login from  './Login';
import './App.css';

const apiKey = 'f12ba140';

class App extends Component {
	constructor(props) {
		super(props);
		const user = sessionStorage.getItem('user');
		let likes = [];
		if (localStorage.getItem(user) !== null) {
			likes = localStorage.getItem(user).split(",")
		}
		this.state = {
			searchvalue: '',
			films:[],
			loading: false,
			showfilm: null,
			user: user,
			likes: likes,
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
	
	Login = (user) => {
		sessionStorage.setItem('user', user);
		if (user === '') {
			this.setState({likes:[]});
		} else {
			console.log("localstorage: "+user+" - "+localStorage.getItem(user));
			if (localStorage.getItem(user) !== null) {
				this.setState({likes:localStorage.getItem(user).split(",")});
			} else {
				this.setState({likes:[]});
			}
		}
		this.setState({user: user});
	}
	
	addFavoriteFilm = (filmid) => {
		if (this.state.user === '') {
			alert('Please, log in first');
		} else {
			let filmslikes = this.state.likes;
			filmslikes.push(filmid);
			localStorage.setItem(this.state.user,filmslikes);
			console.log("localstorage2: "+this.state.user+" - "+localStorage.getItem(this.state.user));
			this.setState({likes:filmslikes});
		}
	}

	deleteFavoriteFilm = (filmid) => {
		if (this.state.user === '') {
			alert('Please, log in first');
		} else {
			let filmslikes = this.state.likes;
			filmslikes = filmslikes.filter(item => item !== filmid)
			localStorage.setItem(this.state.user,filmslikes);
			this.setState({likes:filmslikes});
		}
	}

  render() {
	  const content = this.state.films.map((item, index) => (
	  	<FilmRow film={item}  key={index} likes={this.state.likes} showDetails={(imdbID)=>this.showFilmDetails(imdbID)} addFavorite={(imdbID) => this.addFavoriteFilm(imdbID)} deleteFavorite={(imdbID) => this.deleteFavoriteFilm(imdbID)}/>
	  ));
    return (
      <div className="App">
      	<Login user={this.state.user} login={(user) => this.Login(user)} />
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
