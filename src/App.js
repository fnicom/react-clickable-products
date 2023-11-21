import React, { useEffect, useState } from "react";
import Produtos from "./components/Produtos";
import "./App.css";

function App() {
  // Variáveis de estado
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    const produtoLocal = window.localStorage.getItem("produto");
    if (produtoLocal !== null)
      handleClick({ target: { innerText: produtoLocal } });
  }, []);

  useEffect(() => {
    if (produto !== null) {
      window.localStorage.setItem("produto", produto);
    }
  }, [produto]);

  function handleClickStorage({ target }) {
    setProduto(target.innerText);
  }

  // Função assíncrona para lidar com cliques nos itens
  async function handleClick(event) {
    setLoading(true);

    try {
      // Use o valor do elemento clicado para fazer a requisição
      const res = await fetch(
        `https://ranekapi.origamid.dev/json/api/produto/${event.target.innerText}`
      );

      // Verifique se a resposta foi bem-sucedida
      if (!res.ok) {
        throw new Error(`Erro HTTP! Status: ${res.status}`);
      }

      // Parseie a resposta como JSON
      const json = await res.json();

      // Atualize os estados com os data e marque o carregamento como concluído
      setData(json);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar data:", error);
      // Trate o erro adequadamente, por exemplo, defina um estado de erro ou exiba uma mensagem ao usuário.
      setLoading(false); // Certifique-se de marcar o carregamento como concluído em caso de erro.
    }
  }

  const handleButtonClick = (event) => {
    handleClick(event);
    handleClickStorage(event);
  };

  return (
    <>
      <>
        <button onClick={handleButtonClick}>smartphone</button>
        <button onClick={handleButtonClick}>tablet</button>
        <button onClick={handleButtonClick}>notebook</button>
        {loading && <p>loading...</p>}
        {!loading && data && <Produtos data={data} />}
      </>
    </>
  );
}

export default App;
