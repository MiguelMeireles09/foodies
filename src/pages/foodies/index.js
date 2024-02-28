import React, { useEffect, useState } from "react";
import Link from 'next/link';

export default function Home() {
  const DropdownButton = ({ options, defaultOption }) => {
    const [selectedOption, setSelectedOption] = useState(defaultOption);

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
      // Aqui você pode colocar a lógica para lidar com a mudança de seleção
      console.log("Opção selecionada:", event.target.value);
    };

    return (
      <div className="dropdown">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          Dropdown radio
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>
        <div className="dropdown-menu">
          <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioBgHoverButton">
            {options.map(option => (
              <li key={option.value}>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input id={`option-radio-${option.value}`} type="radio" value={option.value} name="filter-option" checked={selectedOption === option.value} onChange={handleOptionChange} />
                  <label htmlFor={`option-radio-${option.value}`} className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{option.label}</label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  const [receitas, setReceitas] = useState([]);

  const [alimentoQueQuer, setAlimentoQueQuer] = useState("");
  const [alimentoQueNaoQuer, setAlimentoQueNaoQuer] = useState("");
  const [alimentosQueQuer, setAlimentosQueQuer] = useState(new Set());
  const [alimentosQueNaoQuer, setAlimentosQueNaoQuer] = useState(new Set());
  
  const [erroIncluir, setErroIncluir] = useState("");
  const [erroExcluir, setErroExcluir] = useState("");

  // Fetch para obter as receitas
  const fetchReceitas = async () => {
    try {
      const response = await fetch('/api/receitas/todasReceitas');
      if (!response.ok) {
        throw new Error('Falha ao buscar receitas');
      }
      const data = await response.json();
      setReceitas(data);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    }
  };

  useEffect(() => {
    fetchReceitas();
  }, []);


  // 'alimentosUnicosArray' = array com todos os alimentos das receitas sem repetidos
  const alimentosArray = receitas.reduce((accumulator, current) => {
    accumulator.push(...current.ingredientes);
    return accumulator;
  }, []);
  
  const alimentosUnicosArray = Array.from(new Set(alimentosArray));


  // 'receitasPretendidas' = array com receitas com alimentos que quer e sem os alimentos que não quer
  const receitasPretendidas = receitas.filter(receita =>
    Array.from(alimentosQueQuer).every(alimento => receita.ingredientes.includes(alimento)) &&
    !Array.from(alimentosQueNaoQuer).some(alimento => receita.ingredientes.includes(alimento))
  );



  // Função que é executada quando o form 'INCLUIR' é submetido (carregando no enter)
  const handleIncluir = (e) => {
    e.preventDefault();                                                         // Evita o comportamento padrão de recarregar a página ao enviar o formulário
    const novoAlimento = alimentoQueQuer.charAt(0).toUpperCase() + alimentoQueQuer.slice(1);  // Passa a primeira letra do nome submetido para maiúscula caso não seja

    if (!alimentosUnicosArray.includes(novoAlimento)) {
        setErroIncluir("Alimento não encontrado");
        setTimeout(() => { setErroIncluir(""); }, 1000);
        return;
    }

    if (alimentosQueQuer.has(novoAlimento)) {
      setErroIncluir("Alimento já está na lista");
      setTimeout(() => { setErroIncluir(""); }, 1000);
      return;
    }

    
    if (alimentosQueNaoQuer.has(novoAlimento)) {
      alimentosQueNaoQuer.delete(novoAlimento);
    }

    setAlimentosQueQuer(prevAlimentos => new Set([...prevAlimentos, novoAlimento]));  // Adiciona o novo alimento ao conjunto de alimentos que quer
    setAlimentoQueQuer("");                                                                  // Limpa o campo de entrada
  };

  // Função que é executada quando o form 'EXCLUIR' é submetido (carregando no enter)
  const handleExcluir = (e) => {
    e.preventDefault();                                                         // Evita o comportamento padrão de recarregar a página ao enviar o formulário
    const novoAlimento = alimentoQueNaoQuer.charAt(0).toUpperCase() + alimentoQueNaoQuer.slice(1);  // Passa a primeira letra do nome submetido para maiúscula caso não seja

    if (!alimentosUnicosArray.includes(novoAlimento)) {
        setErroExcluir("Alimento não encontrado");
        setTimeout(() => { setErroExcluir(""); }, 1000);
        return;
    }

    if (alimentosQueNaoQuer.has(novoAlimento)) {
      setErroExcluir("Alimento já está na lista");
      setTimeout(() => { setErroExcluir(""); }, 1000);
      return;
    }

    if (alimentosQueQuer.has(novoAlimento)) {
      alimentosQueQuer.delete(novoAlimento);
    }

    setAlimentosQueNaoQuer(prevAlimentos => new Set([...prevAlimentos, novoAlimento]));  // Adiciona o novo alimento ao conjunto de alimentos que quer
    setAlimentoQueNaoQuer("");                                                                     // Limpa o campo de entrada
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

  // Opções para cada botão de filtragem
  const difficultyOptions = [
    { label: "Fácil", value: "easy" },
    { label: "Média", value: "medium" },
    { label: "Difícil", value: "hard" },
  ];

  const categoryOptions = [
    { label: "Entrada", value: "appetizer" },
    { label: "Sobremesa", value: "dessert" },
    { label: "Prato Principal", value: "mainCourse" },
    { label: "Lanches", value: "snacks" },
  ];

  const caloriesOptions = [
    { label: "Mais calorias primeiro", value: "highToLow" },
    { label: "Menos calorias primeiro", value: "lowToHigh" },
  ];

  const priceOptions = [
    { label: "Mais baratas primeiro", value: "lowToHigh" },
    { label: "Mais caras primeiro", value: "highToLow" },
  ];



  return (
    <main className="flex flex-col items-center justify-center text-center min-h-screen w-full p-10" >
      {/* Botão de filtragem por dificuldade */}
      <div className="text-3xl text-center py-5">
        <DropdownButton options={difficultyOptions} defaultOption="easy" />
      </div>
      
      {/* Botão de filtragem por categoria */}
      <div className="text-3xl text-center py-5">
        <DropdownButton options={categoryOptions} defaultOption="appetizer" />
      </div>
      
      {/* Botão de filtragem por calorias */}
      <div className="text-3xl text-center py-5">
        <DropdownButton options={caloriesOptions} defaultOption="highToLow" />
      </div>
      
      {/* Botão de filtragem por preço */}
      <div className="text-3xl text-center py-5">
        <DropdownButton options={priceOptions} defaultOption="lowToHigh" />
      </div>


      {/* Mostra a mensagem de erro do incluir alimento, se houver */}
      {erroIncluir && <p className="text-red-500">{erroIncluir}</p>}

      {/* Barra de pesquisa para incluir alimento */}
      <form onSubmit={handleIncluir}>
          <input list="alimentoQueQuer" type="text" placeholder="INCLUIR" value={alimentoQueQuer} onChange={(e) => setAlimentoQueQuer(e.target.value)} className="border border-gray-400 rounded-xl p-2 w-full"/>
          <datalist id="alimentoQueQuer">
              {alimentosUnicosArray.map((e, index) => (
                  <option key={index} value={e} />
              ))}
          </datalist>
      </form>

      {/* Lista de alimentos a incluir */}
      <p className='text-xl pt-5'>Lista de Alimentos a INCLUIR:</p>
      <ul className="flex flex-wrap gap-4">
        {Array.from(alimentosQueQuer).map((alimento, index) => (
          <li key={index} className="flex items-center">
            <input type="checkbox" checked={true} onChange={() => handleRemoverAlimentoQueQuer(alimento)} />
            <span className="ml-2">{alimento}</span>
          </li>
        ))}
      </ul>


      {/* Mostra a mensagem de erro do excluir alimento, se houver */}
      {erroExcluir && <p className="text-red-500">{erroExcluir}</p>}

      {/* Barra de pesquisa para excluir alimento*/}
      <form onSubmit={handleExcluir}>
          <input list="alimentoQueNaoQuer" type="text" placeholder="EXCLUIR" value={alimentoQueNaoQuer} onChange={(e) => setAlimentoQueNaoQuer(e.target.value)} className="border border-gray-400 rounded-xl p-2 w-full"/>
          <datalist id="alimentoQueNaoQuer">
              {alimentosUnicosArray.map((e, index) => (
                  <option key={index} value={e} />
              ))}
          </datalist>
      </form>

      {/* Lista de alimentos a excluir */}
      <p className='text-xl pt-5'>Lista de Alimentos a EXCLUIR:</p>
      <ul className="flex flex-wrap gap-4">
        {Array.from(alimentosQueNaoQuer).map((alimento, index) => (
          <li key={index} className="flex items-center">
            <input type="checkbox" checked={true} onChange={() => handleRemoverAlimentoQueNaoQuer(alimento)} />
            <span className="ml-2">{alimento}</span>
          </li>
        ))}
      </ul>


      {/* Cards de receitas pretendidas */}
      <p className='text-3xl text-center py-5'>Receitas:</p>

      {receitasPretendidas.map(e => 
      <div>
        <img src={e.fotoReceita}></img>
        <p className='text-2xl py-2'>{e.titulo}</p>
        <p>{e.ingredientes}</p>
      </div>
      )}
      
    </main>
  );
}
