import React, { useState } from "react";
import Switch from "react-switch";

const SwitchPages = ({ text1, text2, comp1, comp2 }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="component">
      <div className="switch">
        <h1>{text1}</h1>
        <Switch
          offColor="#9BCA31"
          onColor="#E3E545"
          uncheckedIcon={false}
          checkedIcon={false}
          className="switch-toggle"
          checked={checked}
          onChange={() => {
            setChecked(!checked);
          }}
        />
        <h1>{text2}</h1>
      </div>
      {checked === false ? comp1 : comp2}
    </div>
  );
};

export default SwitchPages;
