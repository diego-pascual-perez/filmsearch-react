import React, { Component } from 'react';
import './styles.css';

class Loading extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

  render() {
    return (
      <div className="loading">
      	<svg xmlns="https://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="uil-ring"><rect x="0" y="0" width="100" height="100" fill="none" className="bk"/><circle cx="50" cy="50" r="40" strokeDasharray="163.36281798666926 87.9645943005142" stroke="#ff0045" fill="none" strokeWidth="10" transform="rotate(5.08152 50 50)"><animateTransform attributeName="transform" type="rotate" values="0 50 50;180 50 50;360 50 50;" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" begin="0s"/></circle></svg>
      </div>
    );
  }


}

export default Loading;
