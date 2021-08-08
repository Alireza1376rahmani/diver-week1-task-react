import React, { useEffect, useState } from "react";
// import GridHeader from "./GridHeader";
import axios from "axios";
// import GridContent from "./GridContent";
// import {GridContext} from "./../Contexts"

function Grid() {
	const [header, setHeader] = useState([
		{ id: 4, text: "Brand", name: "brand" },
		{ id: 2, text: "Year", name: "year" },
		{ id: 3, text: "Color", name: "color" },
		{ id: 1, text: "Price", name: "price" },
	]);
	const [content, setContent] = useState();
	const [isLoaded, setIsLoaded] = useState(false);
	const [dragged, setDragged] = useState();
    const [page,setPage] = useState()

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
			const targetIndex = header.indexOf(
				header.find((x) => x.id == e.target.dataset.key)
			);
			//find dragged element index in header array
			const draggedIndex = header.indexOf(
				header.find((x) => x.id == dragged)
			);

			//swap elements
			let a = header;
			let temp = a[targetIndex];
			a[targetIndex] = a[draggedIndex];
			a[draggedIndex] = temp;
			// update page
			setHeader(a);
			// setIsLoaded(false);
			// setIsLoaded(true);
			// console.log(header);
			// setContent(content);
		}
	}

	useEffect(function () {
		axios
			.get("/get-data")
			.then((res) => {
				setContent(res.data);
				setIsLoaded(true);
                setPage(1)
				console.log(res.data);
			})
			.catch((e) => {
				console.error(e);
			});
	}, []);

	return isLoaded ? (
		<>
			<div className="grid-header">
				{header.map((element) => {
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
			<div className="grid-content">
				{content.slice((page-1)*10,page*10).map((row) => {
					return (
						<div className="row" key={row.vin}>
							{header.map((prop) => {
								return (
									<div className="cell">{row[prop.name]}</div>
								);
							})}
						</div>
					);
				})}
			</div>
            <div className="pagination">
                <button onClick={e=>(setPage(prev=>prev-1))}>previous</button>
                <span>{page}</span>
                <button  onClick={e=>(setPage(prev=>prev+1))}>next</button>
            </div>
		</>
	) : (
		<>Loading Data ...</>
	);
}
export default Grid;
