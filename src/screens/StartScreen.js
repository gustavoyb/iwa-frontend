import React from "react";
import { Link } from "react-router-dom";

const StartScreen = () => {
  return (
    <div>
      <Link to="/home">
        <button id="myBtn">ENTER</button>
      </Link>
    </div>
  );
};

export default StartScreen;
