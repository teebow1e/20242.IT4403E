import React from 'react';
import useIdleLogout from "../useIdleLogout";

function MenuScreen() {
  useIdleLogout();
  return (
    <div>
      <h1>Menu Screen</h1>
      <p>This is the main menu for logged-in users.</p>
    </div>
  );
}

export default MenuScreen;
