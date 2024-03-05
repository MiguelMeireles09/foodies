import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProtectPage from "@/utils/hooks/protectPagesHook";

export default function SignUp() {
  const { loading: userLoading, userData } = ProtectPage(); //userData is equal to somthing like this  and i want the user id to post in idUsuario
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: "",
    calorias: "",
    modoPreparo: "",
    tempoPreparo: "",
    fotoReceita: "",
    doses: "",
    categoria: "",
    dificuldade: "",
    ingredientes: [""],
    quantidades: [""],
    modoPreparo: [""],
    idUsuario: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        idUsuario: userData._id,
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name.startsWith("ingredientes") ||
      name.startsWith("quantidades") ||
      name.startsWith("modoPreparo")
    ) {
      const prefix = name.split("-")[0];
      const index = parseInt(name.split("-")[1], 10);
      const newArray = [...formData[prefix]];
      newArray[index] = value;
      if (index === formData[prefix].length - 1 && value !== "") {
        newArray.push("");
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [prefix]: newArray,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredIngredientes = formData.ingredientes.filter(
      (ingrediente) => ingrediente.trim() !== ""
    );
    const filteredQuantidades = formData.quantidades.filter(
      (quantidade, index) => formData.ingredientes[index].trim() !== ""
    );
    const filteredModoPreparo = formData.modoPreparo.filter(
      (step) => step.trim() !== ""
    );

    const submissionData = {
      ...formData,
      ingredientes: filteredIngredientes,
      quantidades: filteredQuantidades,
      modoPreparo: filteredModoPreparo,
    };
    try {
      const response = await fetch("/api/receitas/postarReceita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        console.log("Receita Criada com Sucesso");
        router.push("/foodies/homepage");
      } else {
        console.error("Erro ao criar receita");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center pb-12">
      <main className="container max-w-4xl mx-auto p-8 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Postar Receita
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap -mx-2 mb-4">
            {/* Título with Doses and Preço */}
            <div className="w-full md:w-2/3 px-2 mb-4 md:mb-0">
              <input
                placeholder="Título da Receita"
                id="titulo"
                name="titulo"
                type="text"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg text-gray-700 px-4 py-3"
                required
              />
            </div>
            <div className="w-full md:w-1/6 px-2 pb-4">
              <input
                placeholder="Doses"
                type="number"
                id="doses"
                name="doses"
                value={formData.doses}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg text-gray-700 px-4 py-3"
                required
              />
            </div>
            <div className="w-full md:w-1/6 px-2">
              <input
                placeholder="Preço"
                type="number"
                id="preco"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg text-gray-700 px-4 py-3"
                required
              />
            </div>
          </div>

          {/* Categoria and Dificuldade side by side */}
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg text-gray-700 px-4 py-3 bg-white"
                required
              >
                <option value="">Selecione uma Categoria</option>
                <option value="Sopa">Sopa</option>
                <option value="Entrada">Entrada</option>
                <option value="Prato Principal">Prato Principal</option>
                <option value="Lanche">Lanche</option>
              </select>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <select
                id="dificuldade"
                name="dificuldade"
                value={formData.dificuldade}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg text-gray-700 px-4 py-3 bg-white"
                required
              >
                <option value="">Selecione uma Dificuldade</option>
                <option value="Fácil">Fácil</option>
                <option value="Média">Média</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <input
                placeholder="Calorias"
                id="calorias"
                name="calorias"
                type="number"
                value={formData.calorias}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg text-gray-700 px-4 py-3"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <input
                placeholder="Tempo Preparo (min)"
                type="number"
                id="tempoPreparo"
                name="tempoPreparo"
                value={formData.tempoPreparo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg text-gray-700 px-4 py-3"
                required
              />
            </div>
          </div>

          {/* Foto Receita */}
          <div className="mb-4 w-full">
            <input
              placeholder="Foto Receita (link...)"
              type="text"
              id="fotoReceita"
              name="fotoReceita"
              value={formData.fotoReceita}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg text-gray-700 px-4 py-3"
              required
            />
          </div>

          {/* Dynamic fields for Ingredientes and Quantidades */}
          {formData.ingredientes.map((ingrediente, index) => (
            <div
              key={`ingrediente-${index}`}
              className="flex flex-wrap -mx-2 mb-4"
            >
              <div className="w-1/2 px-2">
                <input
                  type="text"
                  name={`ingredientes-${index}`}
                  placeholder={`Ingrediente #${index + 1}`}
                  value={ingrediente}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg text-gray-700 px-4 py-3"
                  required={index === 0}
                />
              </div>
              <div className="w-1/2 px-2">
                <input
                  type="text"
                  name={`quantidades-${index}`}
                  placeholder={`Quantidade #${index + 1}`}
                  value={formData.quantidades[index]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg text-gray-700 px-4 py-3"
                  required={index === 0}
                />
              </div>
            </div>
          ))}

          {/* Dynamic fields for ModoPreparo */}
          {formData.modoPreparo.map((step, index) => (
            <div key={`modoPreparo-${index}`} className="mb-4 w-full">
              <input
                type="text"
                name={`modoPreparo-${index}`}
                placeholder={`Passo ${index + 1}`}
                value={step}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg text-gray-700 px-4 py-3"
                required={index === 0} // Only the first step is required
              />
            </div>
          ))}

          <button
            type="submit"
            className="mt-6 w-full bg-verde hover:bg-verde text-white font-bold py-3 px-4 rounded-lg"
          >
            Postar Receita
          </button>
        </form>
      </main>
    </div>
  );
}
