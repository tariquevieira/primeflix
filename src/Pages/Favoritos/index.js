import { useEffect, useState } from "react";

import './favoritos.css';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";



function Favoritos(){
  const [filmes, setFilmes] = useState([]);


  useEffect(() =>{
    const minhaLista = localStorage.getItem("@primeflix");
    const filmesSalvos = JSON.parse(minhaLista) || [];
    setFilmes(filmesSalvos);

    return () => {
      console.log("Componente desmontado");
    }
  }, [])

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter( item => item.id !== id);

    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix",JSON.stringify(filtroFilmes));
    toast.success("Filme excluído com sucesso!");
  }

  return(<div className="meus-filmes">
    <h1>Meus filmes</h1>

    {filmes.length === 0 && <p>Você ainda não salvou nenhum filme :(</p>}
    <ul>
      {filmes.map( filme => {
        return <li key={filme.id}>
          <span>{filme.title}</span>
          <div>
            <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
            <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
          </div>
        </li>
      })}
    </ul>
  </div>)
}

export default Favoritos;