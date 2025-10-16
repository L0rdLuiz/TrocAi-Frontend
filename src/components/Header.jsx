import React, { useState } from "react";
import "../styles/Header.css";

function Header({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm); // Chama a função que foi passada pelo Menu
    };

    return (
        <header className="header">
            <div className="left">
                <div className="logo">Logo</div>
                <div className="title">TrocAí</div>
            </div>
            <input 
                type="text" 
                className="search" 
                placeholder="Pesquisar" 
                value={searchTerm}
                onChange={handleSearchChange} // Chama a função a cada digitação
            />
            <div className="profile-icon">👤</div>
        </header>
    );
}

export default Header;