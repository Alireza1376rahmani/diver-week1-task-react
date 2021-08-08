import React from "react";
import Grid from "./Grid";
import TreeMenu from "./TreeMenu";

function AdminDashboard() {
	return (
		<div className="rest">
			<div className="grid">
                <Grid/>
            </div>
			<div className="sidebar">
				<TreeMenu api="/admin-menu" />
			</div>
		</div>
	);
}

export default AdminDashboard;
