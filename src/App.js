//bloco de importações do código 
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css';
import api from "./services/api"

//Função cria duas variáveis com diferentes comportamentos
function App() {

  const [input, setInput] = useState('');
  const [cep, setCEP] = useState({});

  async function handleSearch(){
    
    //funcionam juntos
    if(input === ''){
      alert("Preencha algum CEP!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`)
      setCEP(response.data)
      setInput("")
    }catch{
      alert("Erro ao buscar CEP!")
      setInput("")
    }
  }
  
  //retorna a requisição, voltando a página em react
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

      <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="#FFF"/>
       </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento:{cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
        
      </div>
  );
}

//Exporta a aplicação, torna a aplicação app pública
export default App;