import React, { useState } from "react";
import "./App.css";
import Chat from "./chat";
//import Online from "./online";
import io from "socket.io-client";


const socket = io.connect("http://localhost:3001");

const App = () => {
	const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
  		if(username !== "" && room !== ""){
  			socket.emit("join_room", room);
        setShowChat(true);
  		}
  };

  

	return(
		<div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Secrete Chat</h3>
          
          <input
            type="text"
            placeholder="Your Name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Create or Enter Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
	);
};



export default App;