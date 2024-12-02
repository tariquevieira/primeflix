import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import "./home.css";

function Home() {
  const urlImgFilme = "http://image.tmdb.org/t/p/original/";
  
  const [filmes, setFilmes] = useState([]);
  const [spinner,setSpinner] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing",
        {
          params: {
            api_key: "48999a3dd4a94c47853f792c6a36d8d8",
            language: "pt-BR",
            page: 1,
          },
        }
      );

      setFilmes(response.data.results.slice(0, 10));
      setSpinner(false);
    }

    loadFilmes();
  },[]);

  if (spinner) {
    return(<div className="loading">
      <h2>Carregando...</h2>
      <div class="spinner-line"></div>
      </div>)
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => (
          <article key={filme.id} className="card">
            <strong>{filme.title}</strong>
            <img src={`${urlImgFilme}${filme.poster_path}`} alt={filme.title} />
            <Link to={`/filme/${filme.id}`}>Acessar</Link>
          </article>
        ))}
      </div>
    </div>

  );
}

export default Home;