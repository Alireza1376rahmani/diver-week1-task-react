import React from "react";
import { Redirect } from "react-router-dom";

function AdminGuard(props) {
	return props.isAdmin ? <>{props.children}</> : <Redirect />;
}

export default AdminGuard;
