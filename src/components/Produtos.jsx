import React from "react";

const Produtos = ({ data }) => {
  return (
    <div>
      <h1>{data.nome}</h1>
      <p>R$ {data.preco}</p>
      <img src={data.fotos[0].src} alt={data.fotos[0].titulo} />
    </div>
  );
};

export default Produtos;
