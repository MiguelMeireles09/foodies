import Image from "next/image";

export default function ReceitaIngrediente( ingredientes ) {
  const ingredientesReceita = ingredientes.ingredientes.ingredientes;
  const quantidades = ingredientes.ingredientes.quantidades;

  return (
    <div className="px-6 pt-4 pb-16 gap-4 flex flex-col">
      <div className="flex">
        <div className="w-3/4">
          {ingredientesReceita.map((e, index) => (
            <ul key={index} className="">
              <li className={`flex gap-2 ${index !== ingredientesReceita.length - 1 ? 'border-b border-cinzaClaro' : ''} h-14 items-center`}>
                <Image src="/receitainfo/dot.svg" width="10" height="10" className="gap-1" /> {e}
              </li>
            </ul>
          ))}
        </div>
        <div className="w-1/4">
          {quantidades.map((e, index) => (
            <ul key={index} className="">
              <li className={`flex ${index !== quantidades.length - 1 ? 'border-b border-cinzaClaro' : ''} h-14 items-center`}>
                {e}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
