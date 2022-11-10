import React from "react";
import SwitchPages from "../component/SwitchPages/SwitchPages";
import StickyNoteComponent from "../component/StickyNote/StickyNoteComponent";

const HomePage = () => {
  return (
    <div className="page">
      <SwitchPages />
      <StickyNoteComponent />
    </div>
  );
};

export default HomePage;
