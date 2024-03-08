import Image from "next/image";

export default function ReceitaGeral({ geral }) {
  const likesLength = geral.likes?.length || 0;
  return (
    <div className="px-6 pt-8 gap-6  pb-16 flex flex-col">
      <div className="flex gap-2">
        <Image src="/receitainfo/fire.svg" width="20" height="20" />
        Calorias:<div>{geral.calorias} kcal</div>
      </div>
      <div className="flex gap-2">
        <Image src="/receitainfo/doses.svg" width="20" height="20" />
        Doses:<div>{geral.doses === undefined ? 4  : geral.doses} doses</div>
      </div>
      <div className="flex gap-2">
        <Image src="/receitainfo/peso.svg" width="20" height="20" />
        Dificuldade:<div>{geral.dificuldade}</div>
      </div>
      <div className="flex gap-2">
        <Image src="/receitainfo/Tag.svg" width="20" height="20" />
        Categoria: <div>{geral.categoria}</div>
      </div>
      <div className="flex gap-2">
        <Image src="/receitainfo/relogio.svg" width="20" height="20" />
        Tempo:<div>{geral.tempoPreparo} mins</div>
      </div>
      <div className="flex gap-2">
        <Image src="/receitainfo/coracaoreceita.svg" width="20" height="20" />
        Gostos: <div>{likesLength}</div>
      </div>
    </div>
  );
}
