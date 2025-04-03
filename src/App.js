import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import SongList from "./components/Songs";
import MusicPlayer from "./components/Player";

const App = () => {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <div className="app">
      <Sidebar />
      <div className="content">
      <SongList setCurrentSong={setCurrentSong} />
      {currentSong && <MusicPlayer song={currentSong} />}
    </div>
    </div>
  );
};

export default App;
