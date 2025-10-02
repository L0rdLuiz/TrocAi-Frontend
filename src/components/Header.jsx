import React from "react";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="left">
        <div className="logo">Logo</div>
        <div className="title">TrocAí</div>
      </div>
      <input type="text" className="search" placeholder="Pesquisar" />
      <div className="profile-icon">👤</div>
    </header>
  );
}

export default Header;
