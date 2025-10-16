import React from "react";
import "../styles/UserProfile.css";

function UserProfile({ usuario }) {
  return (
    <div className="user-profile">
      <div className="avatar">👤</div>
      <p>{usuario?.name || "Usuário Padrão"}</p>
    </div>
  );
}

export default UserProfile;
