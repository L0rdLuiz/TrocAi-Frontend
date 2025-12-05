import React from "react";
import "../styles/InterestButton.css";

function InterestButton({ onClick, disabled, label = "Tenho Interesse" }) {
  return (
    <button className="interest-btn" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

export default InterestButton;
