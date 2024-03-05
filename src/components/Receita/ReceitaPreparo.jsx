import Image from "next/image";

export default function ReceitaPreparo(preparo) {
  const preparoReceita = preparo.preparo.modoPreparo;
  return (
    <div className="px-6 pt-7 pb-14">
      <div className="flex gap-2 flex-col">
        {preparoReceita.map((e, index) => {
          return (
            <ul className="pb-3" key={index}>
              <li className="flex gap-2 font-bold text-lg pb-1 text-verde">
                {<Image src="/receitainfo/dot.svg" width="10" height="10" className="gap-1" />}{
                `Passo ${index + 1}`}
              </li>
              <li className="text-left" style={{textIndent:"18px"}}>
                {e}
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
