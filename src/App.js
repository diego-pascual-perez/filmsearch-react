import React, { Component } from 'react';
import FilmRow from './FilmRow';
import Loading from './Loading';
import FilmDetails from './FilmDetails';
import Login from  './Login';
import api from './Api/api';
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
			this.searchFilm();
		}
	}
	
	searchFilm = () => {
		if (this.state.searchvalue.trim() !== '') {
			this.setState({loading : true});
			api.get({s:this.state.searchvalue})
				.then(res => {
						const films = []; //this.state.films;
						res.Search.forEach(item => {
							films.push(item);
						})
						this.setState({films:films,loading : false});
					})
					.catch(error => {
						alert(error);
						this.setState({films:[],loading : false});
					});
		} else {
			alert("Please, introduce a film to search");
		}
	}
	
	showFilmDetails = (filmid) => {
		this.setState({loading : true});
		api.get({i:filmid})
				.then(res => {
						this.setState({
							showfilm:res,
							loading : false
						});
					})
					.catch(error => {
						alert(error);
						this.setState({loading : false});
					});
	}
		
	updateSearchValue = (event) => {
		this.setState({searchvalue:event.target.value});
	}
	
	login = (user) => {
		sessionStorage.setItem('user', user);
		if (user === '') {
			this.setState({likes:[]});
		} else {
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

  handleScroll = (scrollHeight, scrollTop, ROWHEIGHT) => {
    /*if (!this.state.loading && this.state.hasMore) {*/
      if ((this.state.films.length - 1) * ROWHEIGHT < scrollHeight + scrollTop) {
	  		console.log("next page");
      }
    /*}*/
  };

  render() {
	  const content = this.state.films.map((item, index) => (
	  	<FilmRow key={index} film={item} likes={this.state.likes} showDetails={(imdbID)=>this.showFilmDetails(imdbID)} addFavorite={(imdbID) => this.addFavoriteFilm(imdbID)} deleteFavorite={(imdbID) => this.deleteFavoriteFilm(imdbID)}/>
	  ));
    return (
      <div className="App">
      	<Login user={this.state.user} login={(user) => this.login(user)} />
      	<div className="searchform">Search a film:
      		<input className="searchinput" type="text" placeholder="Insert film" onChange={event=>this.updateSearchValue(event)} onKeyPress={event=>this.inputChange(event)} />
      		<div className="searchbutton" onClick={() => this.searchFilm()}>Search</div>
      	</div>
      	<div className="searchresults" onScroll={e =>this.handleScroll(e.target.clientHeight, e.target.scrollTop, 150)}>
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
