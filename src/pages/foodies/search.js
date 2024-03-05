import React, { useEffect, useState } from "react";
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
  const [showMenuFiltros, setShowMenuFiltros] = useState(false); // Alteração aqui
  const [showMenuOrdenar, setShowMenuOrdenar] = useState(false); // Alteração aqui
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erroIncluir, setErroIncluir] = useState("");
  const [erroExcluir, setErroExcluir] = useState("");

  const router = useRouter();

  // Arrays
  const alimentosArray = receitas.reduce((accumulator, current) => { accumulator.push(...current.ingredientes); return accumulator; }, []);
  const alimentosUnicosArray = Array.from(new Set(alimentosArray));
  const dificuldades = ["Fácil", "Médio", "Difícil"];
  const categorias = ["Entrada", "Prato principal", "Sobremesa", "Lanche"];
  const ordens = ["Mais caloricas primeiro", "Menos caloricas primeiro", "Mais baratas primeiro", "Mais caras primeiro"];

  useEffect(() => {
    fetchReceitas();
  }, []);

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
          });
          const data = await response.json();
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
  }, [filtroDificuldade, filtroCategoria,  filtroOrdem, alimentosQueQuer, alimentosQueNaoQuer, receitasOriginais]);



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
      setTimeout(() => {
        setErroIncluir("");
      }, 1000);
      return;
    }

    if (alimentosQueQuer.includes(novoAlimento)) {
      setErroIncluir("Alimento já está na lista");
      setTimeout(() => {
        setErroIncluir("");
      }, 1000);
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
      setTimeout(() => {
        setErroExcluir("");
      }, 1000);
      return;
    }

    if (alimentosQueNaoQuer.includes(novoAlimento)) {
      setErroExcluir("Alimento já está na lista");
      setTimeout(() => {
        setErroExcluir("");
      }, 1000);
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

  const handleReceitaInfo = (receita) => {
    const receitaSelecionada = receita.titulo;
    router.push({
      pathname: "/foodies/receita",
      query: { query: receitaSelecionada },
    });
  };

  return (
    <main className="justify-center items-start text-center w-full overflow-hidden min-h-screen px-4 md:px-14 lg:px-20 xl:px-28 pt-5">
{/* Dropdown e barra de pesquisa */}
<div className="relative flex justify-between">
  <div>
    <button className="py-2 px-4 inline-flex items-center bg-verdeClaro text-white font-semibold rounded-xl hover:bg-verde focus:outline-none focus:bg-verde" onClick={() => setShowMenuFiltros(!showMenuFiltros)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
      Filtros
    </button>

    {showMenuFiltros && (
      <div className="absolute left-0 top-10 mt-2 w-56 bg-white rounded-lg shadow-lg">
        <ul>
          {/* Opções de filtro */}
          <li className="relative group hover:bg-gray-100">
            <button className="w-full py-2 px-4 text-left focus:outline-none">
              Dificuldade
            </button>
            <ul className="overflow-hidden transition-all duration-300 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-screen">
              {dificuldades.map((dificuldade) => (
                <li key={dificuldade} className="bg-gray-50 py-2 px-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      onChange={(e) =>
                        e.target.checked
                          ? setFiltroDificuldade([...filtroDificuldade, dificuldade])
                          : setFiltroDificuldade(filtroDificuldade.filter((item) => item !== dificuldade))
                      }
                    />
                    <span className="ml-2 text-gray-700">{dificuldade}</span>
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
                <li key={categoria} className="bg-gray-50 py-2 px-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      onChange={(e) =>
                        e.target.checked
                          ? setFiltroCategoria([...filtroCategoria, categoria])
                          : setFiltroCategoria(filtroCategoria.filter((item) => item !== categoria))
                      }
                    />
                    <span className="ml-2 text-gray-700">{categoria}</span>
                  </label>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    )}
  </div>

  {/* Menu de Ordenação */}
  {showMenuOrdenar && (
    <div className="absolute right-0 top-10 mt-2 w-56 bg-white rounded-lg shadow-lg">
      <ul>
        {ordens.map((ordem) => (
          <li key={ordem} className="bg-gray-50 py-2 px-4">
            <button
              className="w-full text-left focus:outline-none"
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

  <div>
    <button
      className="py-2 px-4 bg-verdeClaro text-white font-semibold rounded-xl hover:bg-verde focus:outline-none focus:bg-verde"
      onClick={() => setShowMenuOrdenar(!showMenuOrdenar)}
    >
      Ordenar por:
    </button>
  </div>
</div>



      {/* Barra de pesquisa */}
      <div className="flex items-center justify-center mt-4">
        <form className="flex w-full" onSubmit={handleIncluir}>
          <input
            list="alimentoQueQuer"
            type="text"
            value={alimentoQueQuer}
            onChange={(e) => setAlimentoQueQuer(e.target.value)}
            placeholder="Qual o alimento que tem para hoje?"
            className="w-full p-2 border border-gray-300 rounded-l focus:outline-none focus:border-verde"
          />
          <datalist id="alimentoQueQuer">
            {alimentosUnicosArray.map((e, index) => (
              <option key={index} value={e} />
            ))}
          </datalist>
          <button
            type="submit"
            className="py-2 px-4 bg-verdeClaro text-white font-semibold rounded-r hover:bg-verde focus:outline-none focus:bg-verde"
          >
            Incluir
          </button>
        </form>
        <p className="ml-2 text-red-500">{erroIncluir}</p>
      </div>


      {/* Barra de pesquisa */}
      <div className="flex items-center justify-center mt-4">
        <form className="flex w-full" onSubmit={handleExcluir}>
          <input
            list="alimentoQueNaoQuer"
            type="text"
            value={alimentoQueNaoQuer}
            onChange={(e) => setAlimentoQueNaoQuer(e.target.value)}
            placeholder="Não quero cozinhar com..."
            className="w-full p-2 border border-gray-300 rounded-l focus:outline-none focus:border-red-500"
          />
          <datalist id="alimentoQueNaoQuer">
            {alimentosUnicosArray.map((e, index) => (
              <option key={index} value={e} />
            ))}
          </datalist>
          <button
            type="submit"
            className="py-2 px-4 bg-red-500 text-white font-semibold rounded-r hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Excluir
          </button>
        </form>
        <p className="ml-2 text-red-500">{erroExcluir}</p>
      </div>

{/* Alimentos e filtros selecionados */}
<div className="flex mt-2 flex-wrap bg-gray-100 p-2 rounded-lg">
  {/* Alimentos e filtros selecionados */}
  {alimentosQueQuer.map((alimento, index) => (
    <div key={index} className="flex items-center text-gray-700 py-1 px-2 rounded-lg m-1">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-green-500 mr-2"
        checked={true} // Adicionei o checked={true} para que a checkbox esteja marcada
        onChange={() => handleRemoverAlimentoQueQuer(alimento)}
      />
      {alimento}
    </div>
  ))}

  {alimentosQueNaoQuer.map((alimento, index) => (
    <div key={index} className="flex items-center text-gray-700 py-1 px-2 rounded-lg m-1">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-red-500 mr-2"
        checked={true} // Adicionei o checked={true} para que a checkbox esteja marcada
        onChange={() => handleRemoverAlimentoQueNaoQuer(alimento)}
      />
      Sem {alimento}
    </div>
  ))}

  {/* Filtros selecionados */}
  {/* Filtros de dificuldade selecionados */}
  {filtroDificuldade.map((filtro, index) => (
    <div key={index} className="flex items-center text-gray-700 py-1 px-2 rounded-lg m-1">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-500 mr-2"
        checked={true} // Adicionei o checked={true} para que a checkbox esteja marcada
        onChange={(e) =>
          e.target.checked
            ? setFiltroDificuldade([...filtroDificuldade, filtro])
            : setFiltroDificuldade(filtroDificuldade.filter((item) => item !== filtro))
        }
      />
      {filtro}
    </div>
  ))}
  {/* Filtros de categoria selecionados */}
  {filtroCategoria.map((filtro, index) => (
    <div key={index} className="flex items-center text-gray-700 py-1 px-2 rounded-lg m-1">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-yellow-500 mr-2"
        checked={true} // Adicionei o checked={true} para que a checkbox esteja marcada
        onChange={(e) =>
          e.target.checked
            ? setFiltroCategoria([...filtroCategoria, filtro])
            : setFiltroCategoria(filtroCategoria.filter((item) => item !== filtro))
        }
      />
      {filtro}
    </div>
  ))}
  {/* Filtro de ordem selecionado */}
  {filtroOrdem && (
    <div className="flex items-center text-gray-700 py-1 px-2 rounded-lg m-1">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-purple-500 mr-2"
        checked={true} // Adicionei o checked={true} para que a checkbox esteja marcada
        onChange={() => setFiltroOrdem(null)} // Removendo o filtro de ordem
      />
      {filtroOrdem}
    </div>
  )}
</div>



      {/* Cards de receitas pretendidas */}
      <p className="text-center py-5 text-2xl 2xl:text-4xl">Receitas:</p>
      <div className="flex flex-wrap mb-10 pb-10">
        {receitas.map((e) => (
          <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4" key={e.id}>
            <div onClick={() => handleReceitaInfo(e)} className="bg-cinzaClaro rounded-2xl h-full flex flex-col justify-between min-w-[160px]">
              <img src={e.fotoReceita} alt={e.titulo} className="rounded-t-2xl w-full h-40 object-cover" />
              <div className="flex-grow flex flex-col justify-center border-t-2 border-cinza">
                <p className="font-sans font-normal text-center p-3 text-sm md:text-base lg:text-lg xl:text-xl text-black">{e.titulo}</p>
                <p className="font-sans font-normal text-center p-3 text-sm md:text-base lg:text-lg xl:text-xl text-black">{e.dificuldade}</p>
                <p className="font-sans font-normal text-center p-3 text-sm md:text-base lg:text-lg xl:text-xl text-black">{e.categoria}</p>
                {userData ? (
                  <button className="mt-2 text-center">{e.likes.includes(userData._id) ? <img src="/footer/Heartfull.svg" /> : <img src="/footer/heart.png" />}</button>
                ) : (
                  null )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
