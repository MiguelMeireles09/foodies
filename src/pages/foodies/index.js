import React, { useEffect, useState } from "react";

export default function Home() {
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
      const response = await fetch("/api/receitas/todasReceitas");
      if (!response.ok) {
        throw new Error("Falha ao buscar receitas");
      }
      const data = await response.json();
      setReceitas(data);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
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
  let receitasPretendidas = receitas.filter(
    (receita) =>
      Array.from(alimentosQueQuer).every((alimento) =>
        receita.ingredientes.includes(alimento)
      ) &&
      !Array.from(alimentosQueNaoQuer).some((alimento) =>
        receita.ingredientes.includes(alimento)
      )
  );

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

  // Funções para filtrar consoante opções nos botões
  const handleDificuldadeChange = (event) => {
    const dificuldadeSelecionada = event.target.value;
    if (dificuldadeSelecionada == "Médio") {
      const dificuldade = receitas.filter(
        (e) =>
          e.dificuldade === dificuldadeSelecionada || e.dificuldade === "Média"
      );
      setReceitas(dificuldade);
    } else {
      const dificuldade = receitas.filter(
        (e) => e.dificuldade === dificuldadeSelecionada
      );
      setReceitas(dificuldade);
    }
  };

  const handleCategoriaChange = (event) => {
    const categoriaSelecionada = event.target.value;
    if (categoriaSelecionada == "Entradas") {
      const categoria = receitas.filter((e) => e.categoria === "Entrada");
      setReceitas(categoria);
    }
    if (categoriaSelecionada == "Pratos Principais") {
      const categoria = receitas.filter(
        (e) => e.categoria === "Prato Principal"
      );
      setReceitas(categoria);
    }
    if (categoriaSelecionada == "Sobremesas") {
      const categoria = receitas.filter((e) => e.categoria === "Sobremesa");
      setReceitas(categoria);
    }
    if (categoriaSelecionada == "Lanches") {
      const categoria = receitas.filter((e) => e.categoria === "Lanche");
      setReceitas(categoria);
    }
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

  return (
    
    <main className="bg-image min-h-screen">
      fwedsifsdsdfs
    </main>
  );
}
