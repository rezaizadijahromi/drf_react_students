import React, { componentDidMount, Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";

import ClassRoom from "./components/ClassRoom";
import NavR from "./components/NavR";
import Footer from "./components/Footer";
import ClassDetail from "./components/ClassDetail";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	getCookie(name) {
		var cookieValue = null;
		if (document.cookie && document.cookie !== "") {
			var cookies = document.cookie.split(";");
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].trim();
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === name + "=") {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}

	render() {
		return (
			<Router>
				<NavR />
				<Route path="/" component={ClassRoom} exact />
				<Route path="/class/:code" component={ClassDetail} />
				<Footer />
			</Router>
		);
	}
}

export default App;
