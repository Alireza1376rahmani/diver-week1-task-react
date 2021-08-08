import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import axios from "axios";
import RouteGuard from "./components/RouteGuard";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import AdminGuard from "./components/AdminGuard";

// function App() {
// 	axios.defaults.baseURL = "http://localhost:8080";

// 	const [isLoggedIn, setIsLoggedIn] = useState(
// 		!!localStorage.getItem("token")
// 	);

// 	function logout() {
// 		localStorage.removeItem("token");
// 		localStorage.removeItem("isAdmin");
// 		setIsLoggedIn(false);
// 	}

//     let isAdmin = localStorage.getItem("isAdmin") == "true" ? true : false
//     console.log(localStorage.getItem("isAdmin"));
//     console.log(isAdmin)

// 	return (
// 		<div className="app" id="app">
// 			<Header />
// 			<RouteGuard setIsLoggedIn={setIsLoggedIn}>
// 				{isAdmin ? (
// 					<AdminDashboard />
// 				) : (
// 					<UserDashboard />
// 				)}
// 			</RouteGuard>
// 			<button onClick={logout}>Log Out</button>
// 		</div>
// 	);
// }

function App() {
	axios.defaults.baseURL = "http://localhost:8080";
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!localStorage.getItem("token")
	);

	 function logout() {
		localStorage.removeItem("token");
		localStorage.removeItem("isAdmin");
		setIsLoggedIn(false);
	}

	let isAdmin = localStorage.getItem("isAdmin") === "true" ? true : false;
	console.log(localStorage.getItem("isAdmin"));
	console.log(isAdmin);

	return (
		<BrowserRouter>
			<div className="app" id="app">
				<Header />
				<RouteGuard setIsLoggedIn={setIsLoggedIn}>
					<Switch>
                        <Route path="/" exact>
                            <h1>Home Page</h1>
                        </Route>
						<Route path="/admin" >
							<AdminGuard isAdmin={isAdmin}>
								<AdminDashboard />
							</AdminGuard>
						</Route>
						<Route path="/user" >
							<UserDashboard />
						</Route>
					</Switch>
				</RouteGuard>
				<Link to="/" onClick={logout}>Log out</Link>
			</div>
		</BrowserRouter>
	);
}

export default App;
