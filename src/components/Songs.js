import React, { useEffect, useState } from "react";
import "../styles/Songs.scss";

const SongList = ({ setCurrentSong }) => {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch data.json dynamically
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error("Error loading songs:", error));
  }, []);

  // Filter songs based on search input
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="songlist">
      <h2>For You</h2>
      <input
        type="text"
        placeholder="Search Song, Artist"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredSongs.map((song, index) => (
        <div key={index} className="song" onClick={() => setCurrentSong(song)}>
          <img src={song.thumbnail} alt={song.title} className="song-image" />
          <div className="song-info">
            <h4>{song.title}</h4>
            <p>{song.artistName}</p>
          </div>
          <span className="song-duration">{song.duration}</span>
        </div>
      ))}
    </div>
  );
};

export default SongList;
