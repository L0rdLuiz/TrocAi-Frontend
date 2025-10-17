import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

function Header({ onSearch }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm);
    };

    return (
        <header className="header">
            <div className="left">
                <div className="title" onClick={() => navigate('/menu')} style={{ cursor: 'pointer' }}>
                    TrocAí
                </div>
            </div>
            <input 
                type="text" 
                className="search" 
                placeholder="Pesquisar" 
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div className="profile-icon" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                👤
            </div>
        </header>
    );
}

export default Header;