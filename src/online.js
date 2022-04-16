import React, { useState } from "react";

const Online = ({room,socket,joinRoom}) => {

	const t = () =>{
		socket.on("room_send", (data) => {
		console.log(data);
			})
	}


	return(
		<div>
			{room}
			<p>{t()}</p>
		</div>
		);
};


export default Online;