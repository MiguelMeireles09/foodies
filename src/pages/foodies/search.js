import protectPage from "@/utils/hooks/protectPagesHook";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SearchPage() {
  const [receitas, setReceitas] = useState([]);
  const [receitasOriginais, setReceitasOriginais] = useState([]);
  const [alimentoQueQuer, setAlimentoQueQuer] = useState("");
  const [alimentoQueNaoQuer, setAlimentoQueNaoQuer] = useState("");
  const [alimentosQueQuer, setAlimentosQueQuer] = useState(new Set());
  const [alimentosQueNaoQuer, setAlimentosQueNaoQuer] = useState(new Set());
  const [erroIncluir, setErroIncluir] = useState("");
  const [erroExcluir, setErroExcluir] = useState("");
  const [filtroDificuldade, setFiltroDificuldade] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const router = useRouter()

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


  useEffect(() => {
    if (router.isReady) {
      // Access the correct query parameter 'query', not 'food'
      const foodName = router.query.query; // 'Ovo' in this case
      console.log("Query parameter foodName:", foodName); // This should log 'Ovo'
      if (foodName) {
        setAlimentosQueQuer(new Set([foodName]));
        aplicarFiltros();
      }
    }
  }, [router.isReady, router.query.query]);

  // Funções para aplicar filtros
  const aplicarFiltros = () => {
    let receitasFiltradas = [...receitasOriginais]

    if (filtroDificuldade == "Média") {
      receitasFiltradas = receitasFiltradas.filter(receita => receita.dificuldade === filtroDificuldade || receita.dificuldade === "Médio");
    }

    if (filtroCategoria == "Entradas") {
      receitasFiltradas = receitasFiltradas.filter(receita => receita.categoria === "Entrada");
    }

    if (filtroCategoria == "Pratos Principais") {
      receitasFiltradas = receitasFiltradas.filter(receita => receita.categoria === "Prato Principal");
    }

    if (filtroCategoria == "Sobremesas") {
      receitasFiltradas = receitasFiltradas.filter(receita => receita.categoria === "Sobremesa");
    }

    if (filtroCategoria == "Lanches") {
      receitasFiltradas = receitasFiltradas.filter(receita => receita.categoria === "Lanche");
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
  }, [filtroDificuldade, filtroCategoria, alimentosQueQuer, alimentosQueNaoQuer, receitasOriginais]);


  // Handlers dos botões de filtro
  const handleDificuldadeChange = (event) => {
    const dificuldadeSelecionada = event.target.value;
    setFiltroDificuldade(dificuldadeSelecionada);
  };

  const handleCategoriaChange = (event) => {
    const categoriaSelecionada = event.target.value;
    setFiltroCategoria(categoriaSelecionada);
  };

  const handleCaloriasChange = (event) => {
    const caloriasSelecionadas = event.target.value;
    if (caloriasSelecionadas == "Mais caloricas primeiro") {
      const calorias = [...receitas].sort((a, b) => b.calorias - a.calorias);
      setReceitas(calorias);
    }
    if (caloriasSelecionadas == "Menos caloricas primeiro") {
      const calorias = [...receitas].sort((a, b) => a.calorias - b.calorias);
      setReceitas(calorias);
    }
  };

  const handlePrecoChange = (event) => {
    const precoSelecionado = event.target.value;
    if (precoSelecionado == "Mais caras primeiro") {
      const preco = [...receitas].sort((a, b) => b.preco - a.preco);
      setReceitas(preco);
    }
    if (precoSelecionado == "Mais baratas primeiro") {
      const preco = [...receitas].sort((a, b) => a.preco - b.preco);
      setReceitas(preco);
    }
  };


  // 'alimentosUnicosArray' = array com todos os alimentos das receitas sem repetidos
  const alimentosArray = receitas.reduce((accumulator, current) => {
    accumulator.push(...current.ingredientes);
    return accumulator;
  }, []);

  const alimentosUnicosArray = Array.from(new Set(alimentosArray));


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

    setAlimentosQueQuer(
      (prevAlimentos) => new Set([...prevAlimentos, novoAlimento])
    ); // Adiciona o novo alimento ao conjunto de alimentos que quer
    setAlimentoQueQuer(""); // Limpa o campo de entrada
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

    setAlimentosQueNaoQuer(
      (prevAlimentos) => new Set([...prevAlimentos, novoAlimento])
    ); // Adiciona o novo alimento ao conjunto de alimentos que quer
    setAlimentoQueNaoQuer(""); // Limpa o campo de entrada
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


  return (
    <main className="flex flex-wrap justify-center items-start text-center w-full overflow-hidden min-h-screen px-4 md:px-14 lg:px-20 xl:px-28 pt-5" >
    {/* Botões de filtragem */}
    <div className="flex space-x-2">
      <select onChange={handleDificuldadeChange} className="w-1/4 flex-1 px-2.5 text-black bg-verdeClaro border rounded-xl text-center shadow-sm outline-none appearance-none focus:border-verde">
          <option disabled selected>Dificuldade ▿</option>
          <option>Fácil</option>
          <option>Média</option>
          <option>Difícil</option>
        </select>

        <select onChange={handleCategoriaChange} className="w-1/4 flex-1 px-2.5 text-black bg-verdeClaro border rounded-xl text-center shadow-sm outline-none appearance-none focus:border-verde">
          <option disabled selected>Categoria ▿</option>
          <option>Entradas</option>
          <option>Pratos Principais</option>
          <option>Sobremesas</option>
          <option>Lanches</option>
        </select>

        <select onChange={handleCaloriasChange} className="w-1/4 flex-1 px-2.5 text-black bg-verdeClaro  border rounded-xl text-center shadow-sm outline-none appearance-none focus:border-verde">
          <option disabled selected>Calorias ▿</option>
          <option>Mais caloricas primeiro</option>
          <option>Menos caloricas primeiro</option>
        </select>

        <select onChange={handlePrecoChange} className="w-1/4 flex-1 px-2.5 text-black bg-verdeClaro border rounded-xl text-center shadow-sm outline-none appearance-none focus:border-verde">
          <option disabled selected>Preço ▿</option>
          <option>Mais baratas primeiro</option>
          <option>Mais caras primeiro</option>
        </select>
      </div>


      {/* Mostra a mensagem de erro do incluir alimento, se houver */}
      {erroIncluir && <p className="text-red-500">{erroIncluir}</p>}

      {/* Barra de pesquisa para incluir alimento */}
      <form onSubmit={handleIncluir} className="flex w-full pt-9">
        <input list="alimentoQueQuer" type="text" placeholder="Qual o alimento que tem para hoje?" value={alimentoQueQuer} onChange={(e) => setAlimentoQueQuer(e.target.value)} className="border border-gray-400 rounded-xl p-2 w-full"/>
        <datalist id="alimentoQueQuer">
          {alimentosUnicosArray.map((e, index) => (
            <option key={index} value={e} />
          ))}
        </datalist>
      </form>

      {/* Lista de alimentos a incluir */}
      <div className="bg-cinzaClaro rounded-xl w-full m-3 p-4">
        <p className="text-md text-left">Lista de Alimentos a INCLUIR:</p>
        <ul className="flex flex-wrap gap-4">
          {Array.from(alimentosQueQuer).map((alimento, index) => (
            <li key={index} className="flex items-center">
              <input type="checkbox" checked={true} onChange={() => handleRemoverAlimentoQueQuer(alimento)}/>
              <span className="ml-2">{alimento}</span><span className="ps-2"> | </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mostra a mensagem de erro do excluir alimento, se houver */}
      {erroExcluir && <p className="text-red-500">{erroExcluir}</p>}

      {/* Barra de pesquisa para excluir alimento*/}
      <form onSubmit={handleExcluir} className="flex w-full pt-3">
        <input list="alimentoQueNaoQuer" type="text" placeholder="Não quero cozinhar com..." value={alimentoQueNaoQuer} onChange={(e) => setAlimentoQueNaoQuer(e.target.value)} className="border border-gray-400 rounded-xl p-2 w-full"/>
        <datalist id="alimentoQueNaoQuer">
          {alimentosUnicosArray.map((e, index) => (
            <option key={index} value={e} />
          ))}
        </datalist>
      </form>

      {/* Lista de alimentos a excluir */}
      <div className="bg-cinzaClaro rounded-xl w-full m-3 p-4">
        <p className="text-md text-left">Lista de Alimentos a EXCLUIR:</p>
        <ul className="flex flex-wrap gap-4">
          {Array.from(alimentosQueNaoQuer).map((alimento, index) => (
            <li key={index} className="flex items-center">
              <input type="checkbox" checked={true} onChange={() => handleRemoverAlimentoQueNaoQuer(alimento)}/>
              <span className="ml-2">{alimento}</span><span className="ps-2"> | </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cards de receitas pretendidas */}
      <p className="text-3xl text-center py-5">Receitas:</p>
      <div className="flex flex-wrap">
        {receitas.map((e) => (
          <div key={e.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div className="bg-cinzaClaro rounded-2xl h-full flex flex-col justify-between">
              <img src={e.fotoReceita} className="rounded-t-2xl w-full h-40 object-cover" />
              <div className="flex-grow flex flex-col justify-center border-t-2 border-cinza">
                <p className="font-sans font-normal text-center p-3 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-black">{e.titulo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}
