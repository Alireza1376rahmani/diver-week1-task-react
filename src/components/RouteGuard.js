import React from "react";
import Login from "./Login";


function RouteGuard(props) {
	if (localStorage.getItem("token")) {
		return <>{props.children}</>;
	} else {
		return <Login setIsLoggedIn={props.setIsLoggedIn} />;
	}
}

export default RouteGuard;
