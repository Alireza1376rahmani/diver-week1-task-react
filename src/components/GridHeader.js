import React, { useState } from "react";
// import { GridContext } from "../Contexts";

function GridHeader(props) {
	const [dragged, setDragged] = useState();

	function dragStartHandler(e) {
		console.log("from dragStartHandler : ", e.target.dataset.key);
		setDragged(e.target.dataset.key);
		e.target.style.opacity = 0.4;
	}
	function dragEndHandler(e) {
		e.target.style.opacity = 1;
		setDragged(null);
		e.target.classList.remove("over");
	}
	function dragOverHandler(e) {
		e.stopPropagation();
		e.preventDefault();
	}
	function dragEnterHandler(e) {
		e.target.classList.add("over");
	}
	function dragLeaveHandler(e) {
		e.target.classList.remove("over");
	}

	function dropHandler(e) {
		e.target.classList.remove("over");
		e.stopPropagation();
		// e.target.innerHTML = "salam"
		console.log("from dropHandler : ", e.target.dataset.key);
		if (dragged && dragged !== e.target.dataset.key) {
			//find target index in header array
			const targetIndex = props.header.indexOf(
				props.header.find((x) => x.id == e.target.dataset.key)
			);
			//find dragged element index in props.header array
			const draggedIndex = props.header.indexOf(
				props.header.find((x) => x.id == dragged)
			);

			//swap elements
			let a = props.header;
			let temp = a[targetIndex];
			a[targetIndex] = a[draggedIndex];
			a[draggedIndex] = temp;
			// update page
			props.setHeader(a);
            props.setIsLoaded(false)
            props.setIsLoaded(true)
			// console.log(props.header);
			// props.setContent(props.content);
		}
	}

	return (
		<>
			<div className="grid-header">
				{props.header.map((element) => {
					return (
						<div
							key={element.id}
							draggable="true"
							className="box"
							onDragStart={dragStartHandler}
							onDragEnd={dragEndHandler}
							onDragOver={dragOverHandler}
							onDragEnter={dragEnterHandler}
							onDragLeave={dragLeaveHandler}
							onDrop={dropHandler}
							data-key={element.id}
						>
							{element.text}
						</div>
					);
				})}
			</div>
		</>
	);
}

export default GridHeader;
