import React, { useEffect, useState } from "react";
import Node from "./Node";
import Axios from "axios";

function TreeMenu(props) {
	const [isLoading, setIsLoading] = useState(true);
	const [treeNodes, setTreeNodes] = useState();

	useEffect(() => {
		Axios.get(props.api)
			.then(function (res) {
				setTreeNodes(res.data);
				setIsLoading(false);
				// console.log(treeNodes);
                console.log("isAdmin from TreeMenu",localStorage.getItem("isAdmin"))
			})
			.catch((err) => {
				console.error(err);
			});
	},[props.api]);

	function loadingDisplay() {
		return <div>Loading ...</div>;
	}

	return isLoading ? (
		loadingDisplay()
	) : (
		<>
			{treeNodes.map((item) => {
				return (
					<div className="node">
						<Node data={item} />
					</div>
				);
			})}
		</>
	)
}

export default TreeMenu;
