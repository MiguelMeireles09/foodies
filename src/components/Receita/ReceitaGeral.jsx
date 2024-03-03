import Image from "next/image";

export default function ReceitaGeral({ geral }) {
  const likesLength = geral.likes?.length || 0;
  return (
    <div className="px-6 pt-8 gap-6 flex flex-col">
      <div className="flex gap-2">
        <Image src="/receitainfo/fire.svg" width="20" height="20" />
        Calorias:<div>{geral.calorias}</div>
      </div>
      <div className="flex gap-2">
        <Image src="/receitainfo/doses.svg" width="20" height="20" />
        Doses:<div>{geral.doses === undefined ? 4 : geral.doses}</div>
      </div>
      <div className="flex gap-2">
        <Image src="/receitainfo/peso.svg" width="20" height="20" />
        Dificuldade:<div>{geral.dificuldade}</div>
      </div>
      <div className="flex gap-2">
        <Image src="/receitainfo/relogio.svg" width="20" height="20" />
        Tempo:<div>{geral.tempoPreparo}</div>
      </div>
      <div className="flex gap-2">
        <Image src="/receitainfo/coracaoreceita.svg" width="20" height="20" />
        Gostos: <div>{likesLength}</div>
      </div>
    </div>
  );
}
