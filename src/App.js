import React, { useState } from "react";
import api from "./services/api.js";

import "./styles/App.css";
import { FiSearch } from "react-icons/fi";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Preencha o CEP corretamente!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
    } catch (error) {
      alert("Ops! Não foi possível encontrar o CEP pesquisado :(");
    }

    setInput("");
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="container_input">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />

        <button className="search_button" onClick={handleSearch}>
          <FiSearch size={25} color="#FFFFFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
