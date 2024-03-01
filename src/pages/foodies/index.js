import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter

export default function Home() {
  const [inputValue, setInputValue] = useState(""); // State to hold textarea value
  const router = useRouter(); // Initialize useRouter hook

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Navigate to /foodies/search with inputValue as a query parameter
    router.push({
      pathname: '/foodies/search',
      query: { query: inputValue }, // Use a query parameter to pass inputValue
    });
  };

  return (
    <div className="bg-image min-h-screen ">
      <main className="relative flex flex-col items-center justify-center min-h-screen p-24">
        <img src="/images/LogoInicial.png" className="pb-2" />
        <form onSubmit={handleSubmit}> {/* Add onSubmit handler to form */}
          <textarea
            value={inputValue} // Controlled component
            onChange={(e) => setInputValue(e.target.value)} // Update state on change
            placeholder="Qual o alimento que tem para hoje?"
            className="bg-botaoInicial p-5 mb-2 rounded-3xl h-20 w-50 text-center text-white"
          />
          {/* Change Link to button or input of type submit */}
          <button type="submit" className="bg-botaoInicial p-2 rounded-xl text-white">
            Procurar Receitas com o alimento
          </button>
        </form>
      </main> 
    </div>
  );
}
