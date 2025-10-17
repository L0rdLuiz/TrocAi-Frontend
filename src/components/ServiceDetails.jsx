import React from "react";
import "../styles/ServiceDetails.css";

function ServiceDetails({ servico }) {
  return (
    <div className="service-details">
      <h2 class="h2ServiceDetails">{servico.servico}</h2>
      <h3 class="h3ServiceDetails">{servico.usuario?.name || "Usuário Padrão"}</h3>
      <div className="info-box">{servico.descricao}</div>
    </div>
  );
}

export default ServiceDetails;
