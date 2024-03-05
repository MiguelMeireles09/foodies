import Link from "next/link";

export default function Custom404() {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <img src="/images/FOODIES.svg" className="pb-16 w-[38rem]"/>
        <img src="https://media2.giphy.com/media/AoA3knwBhBp9c6SUHE/giphy.gif?cid=ecf05e474c1bst1jj1bj90xysob0av9s0g76lhgs09wo9eog&ep=v1_gifs_related&rid=giphy.gif&ct=g" className="rounded-xl"/>
        <h1 className="mb-4 text-6xl font-semibold text-black">404</h1>
        <p className="mb-4 text-lg text-gray-600">Oops! Pareces perdido!</p>
        <div className="animate-bounce">
          <svg className="mx-auto h-16 w-16 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
        <p className="mt-4 text-gray-600">Ir para a <Link href="/" className="text-blue-500">Página Inicial.</Link></p>
      </div>
    );
  }
  