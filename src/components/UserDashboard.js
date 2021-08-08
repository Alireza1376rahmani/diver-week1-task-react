import React from "react";
import Grid from "./Grid";
import TreeMenu from "./TreeMenu";

function UserDashboard() {
	return (
		<>
			<div className="rest">
				<div className="grid">
					<Grid />
				</div>
				<div className="sidebar">
					<TreeMenu api="/user-menu" />
				</div>
			</div>
		</>
	);
}

export default UserDashboard;
