import React, { useContext, useEffect, useState } from "react";
import { GridContext } from "../Contexts";

function GridContent(props) {

	return (
		<div className="grid-content">
			{props.content.map((row) => {
				return (
					<div className="row" key={row.vin}>
						{props.headers.map((prop) => {
							return <div className="cell">{row[prop.name]}</div>;
						})}
					</div>
				);
			})}
		</div>
	);
}

export default GridContent;
