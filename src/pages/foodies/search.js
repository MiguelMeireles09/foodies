import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

export default function SearchPage() {
  const [receitas, setReceitas] = useState([]);
  const [receitasOriginais, setReceitasOriginais] = useState([]);
  const [filtroDificuldade, setFiltroDificuldade] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState([]);
  const [filtroOrdem, setFiltroOrdem] = useState(null);
  const [alimentoQueQuer, setAlimentoQueQuer] = useState("");
  const [alimentoQueNaoQuer, setAlimentoQueNaoQuer] = useState("");
  const [alimentosQueQuer, setAlimentosQueQuer] = useState([]);
  const [alimentosQueNaoQuer, setAlimentosQueNaoQuer] = useState([]);
  const [showMenuFiltros, setShowMenuFiltros] = useState(false);
  const [showMenuOrdenar, setShowMenuOrdenar] = useState(false);
  const [erroIncluir, setErroIncluir] = useState("");
  const [erroExcluir, setErroExcluir] = useState("");
  const [imagensAtuais, setImagensAtuais] = useState({});
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const refFiltros = useRef();
  const refOrdenar = useRef();

  // Arrays
  const alimentosArray = receitas.reduce((accumulator, current) => { accumulator.push(...current.ingredientes); return accumulator; }, []);
  const alimentosUnicosArray = Array.from(new Set(alimentosArray));
  const dificuldades = ["Fácil", "Médio", "Difícil"];
  const categorias = ["Entrada", "Prato principal", "Sobremesa", "Lanche"];
  const ordens = ["Mais caloricas primeiro", "Menos caloricas primeiro", "Mais baratas primeiro", "Mais caras primeiro"];

  const handleTrocarImagem = (receitaId) => {
    setImagensAtuais((prevImagens) => {
      const novaImagem = prevImagens[receitaId] === '/receitainfo/Favoriteborder.svg' ? '/receitainfo/Favorite.svg' : '/receitainfo/Favoriteborder.svg';
      return { ...prevImagens, [receitaId]: novaImagem }
    })
  }


  useEffect(() => {
    fetchReceitas();
  }, []);

  useEffect(() => {
    const imagensInicial = receitasOriginais.reduce((acc, receita) => {
      acc[receita.id] = '/receitainfo/Favoriteborder.svg';
      return acc;
    }, {});
    setImagensAtuais(imagensInicial);
  }, [receitasOriginais]);

  useEffect(() => {
    if (router.isReady) {
      const foodName = router.query.query;
      if (foodName) {
        setAlimentosQueQuer([foodName]);
        aplicarFiltros();
      }
    }
  }, [router.isReady, router.query.query]);

  useEffect(() => {
    aplicarFiltros();
  }, [filtroDificuldade, filtroCategoria, filtroOrdem, alimentosQueQuer, alimentosQueNaoQuer, receitasOriginais]);

  useEffect(() => {
    async function fetchData() {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch("/api/user/verificaToken", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          const data = await response.json();
          console.log(data)
          if (response.ok) {
            setUserData(data); // Define os dados do usuário em caso de sucesso
            setLoading(false);
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
          router.push("/foodies/login");
        }
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (refFiltros.current && !refFiltros.current.contains(event.target)) {
        setShowMenuFiltros(false);
      }
      if (refOrdenar.current && !refOrdenar.current.contains(event.target)) {
        setShowMenuOrdenar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchReceitas = async () => {
    try {
      const response = await fetch("/api/receitas/todasReceitas");
      if (!response.ok) {
        throw new Error("Falha ao buscar receitas");
      }
      const data = await response.json();
      setReceitasOriginais(data);
      setReceitas(data);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    }
  };

  const aplicarFiltros = () => {
    let receitasFiltradas = [...receitasOriginais];

    if (filtroDificuldade.length > 0) {
      receitasFiltradas = receitasFiltradas.filter((receita) => filtroDificuldade.includes(receita.dificuldade));
    }

    if (filtroCategoria.length > 0) {
      receitasFiltradas = receitasFiltradas.filter((receita) => filtroCategoria.includes(receita.categoria));
    }

    if (filtroOrdem === "Mais caloricas primeiro") {
      receitasFiltradas.sort((a, b) => b.calorias - a.calorias);
    } else if (filtroOrdem === "Menos caloricas primeiro") {
      receitasFiltradas.sort((a, b) => a.calorias - b.calorias);
    } else if (filtroOrdem === "Mais caras primeiro") {
      receitasFiltradas.sort((a, b) => b.preco - a.preco);
    } else if (filtroOrdem === "Mais baratas primeiro") {
      receitasFiltradas.sort((a, b) => a.preco - b.preco);
    }

    receitasFiltradas = receitasFiltradas.filter(
      (receita) =>
        alimentosQueQuer.every((alimento) =>
          receita.ingredientes.map((ingrediente) => ingrediente.toLowerCase()).includes(alimento.toLowerCase())
        ) &&
        !alimentosQueNaoQuer.some((alimento) =>
          receita.ingredientes.map((ingrediente) => ingrediente.toLowerCase()).includes(alimento.toLowerCase())
        )
    );

    setReceitas(receitasFiltradas);
  };

  useEffect(() => {
    aplicarFiltros();
  }, [filtroDificuldade, filtroCategoria, filtroOrdem, alimentosQueQuer, alimentosQueNaoQuer, receitasOriginais]);



  const handleReceitaInfo = (e) => {
    const receitaSelecionada = e.titulo;
    router.push({
      pathname: '/foodies/receita',
      query: { query: receitaSelecionada }
    });
  };


  // Função que é executada quando o form 'INCLUIR' é submetido (carregando no enter)
  const handleIncluir = (e) => {
    e.preventDefault();
    const novoAlimento = alimentoQueQuer.charAt(0).toUpperCase() + alimentoQueQuer.slice(1);
    if (!receitasOriginais.flatMap((receita) => receita.ingredientes).includes(novoAlimento)) {
      setErroIncluir("Alimento não encontrado");
      setTimeout(() => { setErroIncluir("") }, 1000);
      return;
    }

    if (alimentosQueQuer.includes(novoAlimento)) {
      setErroIncluir("Alimento já está na lista");
      setTimeout(() => { setErroIncluir("") }, 1000);
      return;
    }

    if (alimentosQueNaoQuer.includes(novoAlimento)) {
      const newAlimentosQueNaoQuer = alimentosQueNaoQuer.filter((alimento) => alimento !== novoAlimento);
      setAlimentosQueNaoQuer(newAlimentosQueNaoQuer);
    }

    setAlimentosQueQuer([...alimentosQueQuer, novoAlimento]);
    setAlimentoQueQuer("");
  };

  const handleExcluir = (e) => {
    e.preventDefault();
    const novoAlimento = alimentoQueNaoQuer.charAt(0).toUpperCase() + alimentoQueNaoQuer.slice(1);
    if (!receitasOriginais.flatMap((receita) => receita.ingredientes).includes(novoAlimento)) {
      setErroExcluir("Alimento não encontrado");
      setTimeout(() => { setErroExcluir("") }, 1000);
      return;
    }

    if (alimentosQueNaoQuer.includes(novoAlimento)) {
      setErroExcluir("Alimento já está na lista");
      setTimeout(() => { setErroExcluir("") }, 1000);
      return;
    }

    if (alimentosQueQuer.includes(novoAlimento)) {
      const newAlimentosQueQuer = alimentosQueQuer.filter((alimento) => alimento !== novoAlimento);
      setAlimentosQueQuer(newAlimentosQueQuer);
    }

    setAlimentosQueNaoQuer([...alimentosQueNaoQuer, novoAlimento]);
    setAlimentoQueNaoQuer("");
  };

  const handleRemoverAlimentoQueQuer = (alimento) => {
    const newAlimentosQueQuer = alimentosQueQuer.filter((item) => item !== alimento);
    setAlimentosQueQuer(newAlimentosQueQuer);
  };

  const handleRemoverAlimentoQueNaoQuer = (alimento) => {
    const newAlimentosQueNaoQuer = alimentosQueNaoQuer.filter((item) => item !== alimento);
    setAlimentosQueNaoQuer(newAlimentosQueNaoQuer);
  };


  return (
    <main className="justify-center items-start text-center w-full overflow-hidden min-h-screen px-4 md:px-14 lg:px-20 xl:px-28 pt-5">
      {/* Botões de Filtros e de Ordenação*/}
      <div className="relative flex justify-between">

        {/* Botão de Filtros */}
        <div>
          <button className="py-2 px-4 inline-flex items-center bg-verdeClaro text-white font-semibold rounded-xl hover:bg-verde focus:outline-none focus:bg-verde" onClick={() => setShowMenuFiltros(!showMenuFiltros)}>
            <img width={20} height={20} src="/images/filter.svg" className="me-2"></img>
            Filtros
          </button>

          {/* Menu de Filtros */}
          <div ref={refFiltros}>
            {showMenuFiltros && (
              <div className="absolute left-0 top-10 mt-2 w-56 bg-white rounded-lg shadow-lg z-40">
                <ul>
                  <li className="relative group hover:bg-gray-100">
                    <button className="w-full py-2 px-4 text-left focus:outline-none">
                      Dificuldade
                    </button>
                    <ul className="overflow-hidden transition-all duration-300 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-screen">
                      {dificuldades.map((dificuldade) => (
                        <li key={dificuldade} className="bg-gray-50 py-2 px-4 text-left">
                          <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox h-5 w-5"
                              onChange={(e) =>
                                e.target.checked
                                  ? setFiltroDificuldade([...filtroDificuldade, dificuldade])
                                  : setFiltroDificuldade(filtroDificuldade.filter((item) => item !== dificuldade))
                              }
                            />
                            <span className="ml-2">{dificuldade}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="relative group hover:bg-gray-100">
                    <button className="w-full py-2 px-4 text-left focus:outline-none">
                      Categoria
                    </button>
                    <ul className="overflow-hidden transition-all duration-300 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-screen">
                      {categorias.map((categoria) => (
                        <li key={categoria} className="bg-gray-50 py-2 px-4 text-left">
                          <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox h-5 w-5"
                              onChange={(e) =>
                                e.target.checked
                                  ? setFiltroCategoria([...filtroCategoria, categoria])
                                  : setFiltroCategoria(filtroCategoria.filter((item) => item !== categoria))
                              }
                            />
                            <span className="ml-2">{categoria}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* Menu de Ordenação */}
        <div ref={refOrdenar}>
          {showMenuOrdenar && (
            <div className="absolute right-0 top-10 mt-2 w-56 bg-white rounded-lg shadow-lg z-40">
              <ul>
                {ordens.map((ordem) => (
                  <li key={ordem} className="bg-gray-50 py-2 px-4">
                    <button className="w-full text-left focus:outline-none"
                      onClick={() => {
                        setFiltroOrdem(ordem);
                        setShowMenuOrdenar(false);
                      }}
                    >
                      {ordem}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Botão de Ordenação */}
        <div>
          <button className="py-2 px-4 bg-verdeClaro text-white font-semibold rounded-xl hover:bg-verde focus:outline-none focus:bg-verde" onClick={() => setShowMenuOrdenar(!showMenuOrdenar)}>
            Ordenar por:
          </button>
        </div>

      </div>



      {/* Barra de pesquisa para incluir alimentos */}
      <div className="flex items-center justify-center mt-4">
        <form className="flex w-full" onSubmit={handleIncluir}>
          <input list="alimentoQueQuer" type="text" value={alimentoQueQuer} onChange={(e) => setAlimentoQueQuer(e.target.value)} placeholder="Qual o alimento que tem para hoje?" className="w-full p-2 me-2 border border-gray-300 rounded-xl focus:outline-none focus:border-verde" />
          <datalist id="alimentoQueQuer">
            {alimentosUnicosArray.map((e, index) => (
              <option key={index} value={e} />
            ))}
          </datalist>
          <button type="submit" className="py-2 px-4 bg-verdeClaro text-white font-semibold rounded-xl hover:bg-verde focus:outline-none focus:bg-verde">Incluir</button>
        </form>
        <p className="text-red-500">{erroIncluir}</p>
      </div>


      {/* Barra de pesquisa para excluir alimentos */}
      <div className="flex items-center justify-center mt-4">
        <form className="flex w-full" onSubmit={handleExcluir}>
          <input list="alimentoQueNaoQuer" type="text" value={alimentoQueNaoQuer} onChange={(e) => setAlimentoQueNaoQuer(e.target.value)} placeholder="Não quero cozinhar com..." className="w-full p-2 me-2 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500" />
          <datalist id="alimentoQueNaoQuer">
            {alimentosUnicosArray.map((e, index) => (
              <option key={index} value={e} />
            ))}
          </datalist>
          <button type="submit" className="py-2 px-4 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 focus:outline-none focus:bg-red-600">Excluir</button>
        </form>
        <p className="text-red-500">{erroExcluir}</p>
      </div>

      {/* Lista de alimentos e filtros selecionados */}
        <div className="flex mt-2 flex-wrap p-2 rounded-lg">
          {alimentosQueQuer.map((alimento, index) => (
            <div key={index} className="flex items-center py-1 px-2 rounded-xl m-1 bg-gray-100">
              <input type="checkbox" className="form-checkbox h-5 w-5 mr-2" checked={true} onChange={() => handleRemoverAlimentoQueQuer(alimento)} />
              {alimento}
            </div>
          ))}
          {alimentosQueNaoQuer.map((alimento, index) => (
            <div key={index} className="flex items-center py-1 px-2 rounded-xl m-1 bg-gray-100">
              <input type="checkbox" className="form-checkbox h-5 w-5 mr-2" checked={true} onChange={() => handleRemoverAlimentoQueNaoQuer(alimento)} />
              Sem {alimento}
            </div>
          ))}
          {filtroDificuldade.map((filtro, index) => (
            <div key={index} className="flex items-center py-1 px-2 rounded-xl m-1 bg-gray-100">
              <input type="checkbox" className="form-checkbox h-5 w-5 mr-2" checked={true}
                onChange={(e) =>
                  e.target.checked
                    ? setFiltroDificuldade([...filtroDificuldade, filtro])
                    : setFiltroDificuldade(filtroDificuldade.filter((item) => item !== filtro))
                }
              />
              {filtro}
            </div>
          ))}
          {filtroCategoria.map((filtro, index) => (
            <div key={index} className="flex items-center py-1 px-2 rounded-xl m-1 bg-gray-100">
              <input type="checkbox" className="form-checkbox h-5 w-5 mr-2" checked={true}
                onChange={(e) =>
                  e.target.checked
                    ? setFiltroCategoria([...filtroCategoria, filtro])
                    : setFiltroCategoria(filtroCategoria.filter((item) => item !== filtro))
                }
              />
              {filtro}
            </div>
          ))}
          {filtroOrdem && (
            <div className="flex items-center py-1 px-2 rounded-xl m-1 bg-gray-100">
              <input type="checkbox" className="form-checkbox h-5 w-5 mr-2" checked={true} onChange={() => setFiltroOrdem(null)} />
              {filtroOrdem}
            </div>
          )}
        </div>

      {/* Cards de receitas pretendidas */}
      <p className="text-center py-5 text-2xl 2xl:text-4xl">Receitas:</p>
      <div className="flex flex-wrap mb-10 pb-10">
        {receitas.map((e) => (
          <div onClick={() => handleReceitaInfo(e)} className="w-1/2 md:w-1/3 lg:w-1/4 p-4 relative" key={e._id}>
            <div className="bg-cinzaClaro rounded-2xl h-full flex flex-col justify-between min-w-[160px] relative">
              <img src={e.fotoReceita} className="rounded-t-2xl w-full h-40 object-cover" />
              <div className="flex-grow flex flex-col justify-center border-t-2 border-cinza">
                <p className="font-sans font-normal text-center p-2 text-sm md:text-base lg:text-lg xl:text-xl text-black">{e.titulo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
