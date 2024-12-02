import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

import './filme.css';


function Filme() {
  const urlImgFilme = "http://image.tmdb.org/t/p/original";
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [filme, setFilme] = useState({});

  useEffect(()=>{
    async function loadFilme() {
      await api.get(`movie/${id}`,
        {
          params: {
            api_key: "48999a3dd4a94c47853f792c6a36d8d8",
            language: "pt-BR",
          },
        }
      ).then(response => {
        setFilme(response.data);
        setLoading(false);
      })
       .catch(error => {
          console.error("Erro ao carregar filme: ", error);
          navigate("/", {replace: true});
          return;
        });
    }
    loadFilme();

    return() =>{
      console.log("componente desmontado");
    }
  },[id, navigate]);


  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilmes = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

    if (hasFilmes) {
      toast.warning("Este filme já está salvo!");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
  }

  if (loading) {
    return (<div className="filme-info">
      <p>Carregando</p>
      <div className="spinner">
      </div>
      </div>);
  }
  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={urlImgFilme + filme.backdrop_path} alt={filme.title} />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} /10</strong>

      <div className="area-buttons">
        <button onClick={()=> salvarFilme()}>Salvar</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;