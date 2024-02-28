export default function Custom404() {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <img src="/images/FOODIES.svg" className="pb-20"/>
        <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzBtOHBvcnNwOG5vemt2ZXh1aDNzZnZieHRpdmNseWxlbmN2Y3E3aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rbMDQym45okqt3ZQg0/giphy.gif" className="rounded-xl"/>
        <h1 className="mb-4 text-6xl font-semibold text-black">404</h1>
        <p className="mb-4 text-lg text-gray-600">Oops! Pareces perdido!</p>
        <div className="animate-bounce">
          <svg className="mx-auto h-16 w-16 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
        <p className="mt-4 text-gray-600">Ir para a <a href="/" className="text-blue-500">Página Inicial.</a>.</p>
      </div>
    );
  }
  