import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SearchPage() {
  const [receitas, setReceitas] = useState([]);
  const [receitasOriginais, setReceitasOriginais] = useState([]);
  const [alimentoQueQuer, setAlimentoQueQuer] = useState("");
  const [alimentoQueNaoQuer, setAlimentoQueNaoQuer] = useState("");
  const [alimentosQueQuer, setAlimentosQueQuer] = useState(new Set());
  const [alimentosQueNaoQuer, setAlimentosQueNaoQuer] = useState(new Set());
  const [dificuldadesQueQuer, setDificuldadesQueQuer] = useState(new Set());
  const [categoriasQueQuer, setCategoriasQueQuer] = useState(new Set());
  const [erroIncluir, setErroIncluir] = useState("");
  const [erroExcluir, setErroExcluir] = useState("");
  const [filtroDificuldade, setFiltroDificuldade] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [filtroOrdem, setFiltroOrdem] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  
  const router = useRouter()

  // Arrays
  const alimentosArray = receitas.reduce((accumulator, current) => { accumulator.push(...current.ingredientes); return accumulator;}, []);
  const alimentosUnicosArray = Array.from(new Set(alimentosArray));
  const dificuldades = ["Fácil", "Médio", "Difícil"];
  const categorias = ["Entrada", "Prato principal", "Sobremesa", "Lanche"];
  const ordens = ["Mais caloricas primeiro", "Menos caloricas primeiro", "Mais baratas primeiro", "Mais caras primeiro"];

  
  const toggleDropdown = () => {
    setShowMenu(!showMenu);
  };
  

  const Dropdown = () => {
    // Função para remover uma dificuldade da lista de dificuldades que quer
    const handleRemoverDificuldadeQueQuer = (dificuldade) => {
      const newDificuldadesQueQuer = new Set(dificuldadesQueQuer);
      newDificuldadesQueQuer.delete(dificuldade);
      setDificuldadesQueQuer(newDificuldadesQueQuer);
    };

    // Função para remover uma categoria da lista de categorias que quer
    const handleRemoverCategoriaQueQuer = (categoria) => {
      const newCategoriasQueQuer = new Set(categoriasQueQuer);
      newCategoriasQueQuer.delete(categoria);
      setCategoriasQueQuer(newCategoriasQueQuer);
    };

    return (
      <div className="relative">
        <button className="py-2 px-4 rounded inline-flex items-center" onClick={toggleDropdown}>
          Filtros
          <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd"/></svg>
        </button>
    
        {showMenu && (
          <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg">
            <ul>
              <li className="relative group hover:bg-gray-100">
                <button className="w-full py-2 px-4 text-left focus:outline-none" onClick={() => setFiltroDificuldade(null)}>
                  Dificuldade
                  <svg className="w-4 h-4 absolute right-4 top-1/2 transform -translate-y-1/2 group-hover:-rotate-90 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd"/></svg>
                </button>
                {/* Lista de dificuldades que quer */}
                <ul className="flex flex-wrap gap-4">
                  {Array.from(dificuldadesQueQuer).map((dificuldade, index) => (
                    <li key={index} className="flex items-center">
                      <input type="checkbox" checked={dificuldadesQueQuer.size > 0} onChange={() => handleRemoverDificuldadeQueQuer(dificuldade)}/>
                      <span className="ml-2">{dificuldade}</span><span className="ps-2"> | </span>
                    </li>
                  ))}
                </ul>
                {/* Lista de subitems */}
                <ul className="absolute left-full top-0 mt-0 w-56 bg-white rounded-lg shadow-lg hidden group-hover:block">
                  {dificuldades.map((dificuldade, index) => (
                    <li key={index} className="py-2 px-4 hover:bg-gray-100" onClick={() => setFiltroDificuldade(dificuldade)}>{dificuldade}</li>
                  ))}
                </ul>
              </li>
              <li className="relative group hover:bg-gray-100">
                <button className="w-full py-2 px-4 text-left focus:outline-none" onClick={() => setFiltroCategoria(null)}>
                  Categoria
                  <svg className="w-4 h-4 absolute right-4 top-1/2 transform -translate-y-1/2 group-hover:-rotate-90 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd"/></svg>
                </button>
                {/* Lista de categorias que quer */}
                <ul className="flex flex-wrap gap-4">
                  {Array.from(categoriasQueQuer).map((categoria, index) => (
                    <li key={index} className="flex items-center">
                      <input type="checkbox" checked={categoriasQueQuer.size > 0} onChange={() => handleRemoverCategoriaQueQuer(categoria)}/>
                      <span className="ml-2">{categoria}</span><span className="ps-2"> | </span>
                    </li>
                  ))}
                </ul>
                {/* Lista de subitems */}
                <ul className="absolute left-full top-0 mt-0 w-56 bg-white rounded-lg shadow-lg hidden group-hover:block">
                  {categorias.map((categoria, index) => (
                    <li key={index} className="py-2 px-4 hover:bg-gray-100" onClick={() => setFiltroCategoria(categoria)}>{categoria}</li>
                  ))}
                </ul>
              </li>
              <li className="relative group hover:bg-gray-100">
                <button className="w-full py-2 px-4 text-left focus:outline-none" onClick={() => setFiltroOrdem(null)}>
                  Ordem
                  <svg className="w-4 h-4 absolute right-4 top-1/2 transform -translate-y-1/2 group-hover:-rotate-90 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd"/></svg>
                </button>
                <ul className="absolute left-full top-0 mt-0 w-56 bg-white rounded-lg shadow-lg hidden group-hover:block">
                  {ordens.map((ordem, index) => (
                    <li key={index} className="py-2 px-4 hover:bg-gray-100" onClick={() => setFiltroOrdem(ordem)}>{ordem}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
    
    
  };
  


  // Fetch para obter as receitas
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

  useEffect(() => {
    fetchReceitas();
  }, []);


  // useEffect para obter query de alimento da página principal
  useEffect(() => {
    if (router.isReady) {
      const foodName = router.query.query;
      console.log("Query parameter foodName:", foodName);
      if (foodName) {
        setAlimentosQueQuer(new Set([foodName]));
        aplicarFiltros();
      }
    }
  }, [router.isReady, router.query.query]);


  // Funções para aplicar filtros
  const aplicarFiltros = () => {
    let receitasFiltradas = [...receitasOriginais]

    setDificuldadesQueQuer((prevDificuldades) => new Set([...prevDificuldades, filtroDificuldade]));
    receitasFiltradas = receitasFiltradas.filter(receita =>
      Array.from(dificuldadesQueQuer).every(dificuldade => 
          receita.dificuldade.includes(dificuldade))
    )

    setCategoriasQueQuer((prevCategorias) => new Set([...prevCategorias, filtroCategoria]));
    receitasFiltradas = receitasFiltradas.filter(receita =>
      Array.from(categoriasQueQuer).every(categoria => 
          receita.categoria.includes(categoria))
    )

    if (filtroOrdem == "Mais caloricas primeiro") {
      receitasFiltradas = [...receitasFiltradas].sort((a, b) => b.calorias - a.calorias);
    }

    if (filtroOrdem == "Menos caloricas primeiro") {
      receitasFiltradas = [...receitasFiltradas].sort((a, b) => a.calorias - b.calorias);
    }

    if (filtroOrdem == "Mais caras primeiro") {
      receitasFiltradas = [...receitasFiltradas].sort((a, b) => b.preco - a.preco);
    }

    if (filtroOrdem == "Mais baratas primeiro") {
      receitasFiltradas = [...receitasFiltradas].sort((a, b) => a.preco - b.preco);
    }

    receitasFiltradas = receitasFiltradas.filter(receita =>
      Array.from(alimentosQueQuer).every(alimento => 
          receita.ingredientes.map(ingrediente => ingrediente.toLowerCase()).includes(alimento.toLowerCase())) &&
      !Array.from(alimentosQueNaoQuer).some(alimento => 
          receita.ingredientes.map(ingrediente => ingrediente.toLowerCase()).includes(alimento.toLowerCase()))
      )

    setReceitas(receitasFiltradas);
  };

  useEffect(() => {
    aplicarFiltros();
  }, [filtroDificuldade, filtroCategoria,  filtroOrdem, alimentosQueQuer, alimentosQueNaoQuer, receitasOriginais]);



  const handleReceitaInfo = (e) => {
    const receitaSelecionada = e.titulo;
    console.log("Receita clicada:", receitaSelecionada);
    router.push({
      pathname: '/foodies/receita',
      query: { query: receitaSelecionada }
    });
  };


  // Função que é executada quando o form 'INCLUIR' é submetido (carregando no enter)
  const handleIncluir = (e) => {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página ao enviar o formulário
    const novoAlimento =
      alimentoQueQuer.charAt(0).toUpperCase() + alimentoQueQuer.slice(1); // Passa a primeira letra do nome submetido para maiúscula caso não seja

    if (!alimentosUnicosArray.includes(novoAlimento)) {
      setErroIncluir("Alimento não encontrado");
      setTimeout(() => {
        setErroIncluir("");
      }, 1000);
      return;
    }

    if (alimentosQueQuer.has(novoAlimento)) {
      setErroIncluir("Alimento já está na lista");
      setTimeout(() => {
        setErroIncluir("");
      }, 1000);
      return;
    }

    if (alimentosQueNaoQuer.has(novoAlimento)) {
      alimentosQueNaoQuer.delete(novoAlimento);
    }

    setAlimentosQueQuer((prevAlimentos) => new Set([...prevAlimentos, novoAlimento]));
    setAlimentoQueQuer("");
  };


  // Função que é executada quando o form 'EXCLUIR' é submetido (carregando no enter)
  const handleExcluir = (e) => {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página ao enviar o formulário
    const novoAlimento =
      alimentoQueNaoQuer.charAt(0).toUpperCase() + alimentoQueNaoQuer.slice(1); // Passa a primeira letra do nome submetido para maiúscula caso não seja

    if (!alimentosUnicosArray.includes(novoAlimento)) {
      setErroExcluir("Alimento não encontrado");
      setTimeout(() => {
        setErroExcluir("");
      }, 1000);
      return;
    }

    if (alimentosQueNaoQuer.has(novoAlimento)) {
      setErroExcluir("Alimento já está na lista");
      setTimeout(() => {
        setErroExcluir("");
      }, 1000);
      return;
    }

    if (alimentosQueQuer.has(novoAlimento)) {
      alimentosQueQuer.delete(novoAlimento);
    }

    setAlimentosQueNaoQuer((prevAlimentos) => new Set([...prevAlimentos, novoAlimento]));
    setAlimentoQueNaoQuer("");
  };


  // Função para remover um alimento da lista de alimentos que quer
  const handleRemoverAlimentoQueQuer = (alimento) => {
    const newAlimentosQueQuer = new Set(alimentosQueQuer);
    newAlimentosQueQuer.delete(alimento);
    setAlimentosQueQuer(newAlimentosQueQuer);
  };


  // Função para remover um alimento da lista de alimentos que não quer
  const handleRemoverAlimentoQueNaoQuer = (alimento) => {
    const newAlimentosQueNaoQuer = new Set(alimentosQueNaoQuer);
    newAlimentosQueNaoQuer.delete(alimento);
    setAlimentosQueNaoQuer(newAlimentosQueNaoQuer);
  };


  {/* verificar se user token é valido e se sim obter dados de user. Com os dados daqui -> fazer (colocar ou tirar like)*/ }
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
            setUserData(data); // Set user data on success
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          router.push("/foodies/login");
        }
      }
    }

    fetchData();
  }, []);


  return (
    <main className="justify-center items-start text-center w-full overflow-hidden min-h-screen px-4 md:px-14 lg:px-20 xl:px-28 pt-5" >

    <Dropdown />


      {/* Mostra a mensagem de erro do incluir alimento, se houver */}
      {erroIncluir && <p className="text-red-500 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">{erroIncluir}</p>}

      {/* Barra de pesquisa para incluir alimento */}
      <form onSubmit={handleIncluir} className="flex w-full text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
        <input list="alimentoQueQuer" type="text" placeholder="Qual o alimento que tem para hoje?" value={alimentoQueQuer} onChange={(e) => setAlimentoQueQuer(e.target.value)} className="border border-gray-400 rounded-xl p-2 w-full" />
        <datalist id="alimentoQueQuer">
          {alimentosUnicosArray.map((e, index) => (
            <option key={index} value={e} />
          ))}
        </datalist>
      </form>

      {/* Lista de alimentos a incluir */}
      <div className="bg-cinzaClaro rounded-xl w-full m-3 p-4 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
        <p className="text-md text-left">Lista de Alimentos a INCLUIR:</p>
        <ul className="flex flex-wrap gap-4">
          {Array.from(alimentosQueQuer).map((alimento, index) => (
            <li key={index} className="flex items-center">
              <input type="checkbox" checked={true} onChange={() => handleRemoverAlimentoQueQuer(alimento)} />
              <span className="ml-2">{alimento}</span><span className="ps-2"> | </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mostra a mensagem de erro do excluir alimento, se houver */}
      {erroExcluir && <p className="text-red-500 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">{erroExcluir}</p>}

      {/* Barra de pesquisa para excluir alimento*/}
      <form onSubmit={handleExcluir} className="flex w-full pt-3 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
        <input list="alimentoQueNaoQuer" type="text" placeholder="Não quero cozinhar com..." value={alimentoQueNaoQuer} onChange={(e) => setAlimentoQueNaoQuer(e.target.value)} className="border border-gray-400 rounded-xl p-2 w-full" />
        <datalist id="alimentoQueNaoQuer">
          {alimentosUnicosArray.map((e, index) => (
            <option key={index} value={e} />
          ))}
        </datalist>
      </form>

      {/* Lista de alimentos a excluir */}
      <div className="bg-cinzaClaro rounded-xl w-full m-3 p-4 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
        <p className="text-md text-left">Lista de Alimentos a EXCLUIR:</p>
        <ul className="flex flex-wrap gap-4">
          {Array.from(alimentosQueNaoQuer).map((alimento, index) => (
            <li key={index} className="flex items-center">
              <input type="checkbox" checked={true} onChange={() => handleRemoverAlimentoQueNaoQuer(alimento)} />
              <span className="ml-2">{alimento}</span><span className="ps-2"> | </span>
            </li>
          ))}
        </ul>
      </div>



            



      {/* Cards de receitas pretendidas */}

      <p className="text-center py-5 text-2xl 2xl:text-4xl">Receitas:</p>
      <div className="flex flex-wrap mb-10 pb-10">
        {receitas.map((e) => (
          <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div onClick={() => handleReceitaInfo(e)} key={e.id} className="bg-cinzaClaro rounded-2xl h-full flex flex-col justify-between min-w-[160px]">
              <img src={e.fotoReceita} className="rounded-t-2xl w-full h-40 object-cover" />
              <div className="flex-grow flex flex-col justify-center border-t-2 border-cinza">
                <p className="font-sans font-normal text-center p-3 text-sm md:text-base lg:text-lg xl:text-xl text-black">{e.titulo}</p>
                <p className="font-sans font-normal text-center p-3 text-sm md:text-base lg:text-lg xl:text-xl text-black">{e.dificuldade}</p>
                <p className="font-sans font-normal text-center p-3 text-sm md:text-base lg:text-lg xl:text-xl text-black">{e.categoria}</p>
                {/* se n tiver like  */}
                {userData ?
                    (<button className="mt-2 text-center">Like</button>) :
                    null}
              </div>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}
