import React, { Component } from 'react';
import './styles.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usertext:this.props.user
		}
	}

	updateLoginValue = (event) => {
		this.setState({usertext:event.target.value});
	}

	inputLoginChange = (event) => {
		if (event.key === 'Enter') {
			this.login();
		}
	}
	
	login = () => {
		if (this.state.usertext.trim() !== '') {
			this.props.login(this.state.usertext);
		} else {
			alert('Please, introduce a username');
		}
	}

	logout = () => {
		this.setState({usertext:''});
		this.props.login('');
	}

  render() {
    return (
     	<div className="loginform">
     		{this.props.user === '' ? (
     			<div>
		     		<input className="logininput" type="text" placeholder="Username" onChange={event=>this.updateLoginValue(event)} onKeyPress={event=>this.inputLoginChange(event)} />
		     		<div className="loginbutton" onClick={() => this.login()}>Login</div>
		     	</div>
     		) : (
     			<div>
		     		<div className="loginhello">Hello, {this.props.user}</div>
		     		<div className="loginbutton" onClick={() => this.logout()}>Logout</div>
		     	</div>
     		)}
     	</div>
    );
  }


}

export default Login;
