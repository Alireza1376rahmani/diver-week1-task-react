import React, { useState } from "react";

function Node(props) {
	let hasChild = props.data.nodes.length !== 0;
	const [expand, setExpand] = useState(props.data.isOpen);
	// console.log(`${props.data.text} : has child  : ${hasChild}`);

	function renderChilds() {
		return (
			<>
				{props.data.nodes.map((item) => {
					return <Node data={item} />;
				})}
			</>
		);
	}

	function expandChildren() {
		if (hasChild) {
			setExpand((prev) => {
				return !prev;
			});
		}
	}

	return (
		<>
			<div onClick={expandChildren}>
				{hasChild ? <span>*</span> : <span>-</span>} {props.data.text}
			</div>
			<div className="child">
                {expand ? renderChilds() : <></>}
            </div>
		</>
	);
}

export default Node;
