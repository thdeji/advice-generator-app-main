import { useState, useEffect } from "react";

function App() {
  const [advice, setAdvice] = useState("");
  const [title, setTitle] = useState("");
  const [generate, setGenerate] = useState(false);

  const getAdvice = async () => {
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();

      setAdvice(data.slip.advice);
      setTitle(data.slip.id);
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  };

  useEffect(() => {
    getAdvice();
  }, [{ generate }]);

  const isNotMobile = window.innerWidth > 475;

  return (
    <div className="bg-blue950 font-manrope h-screen flex flex-col justify-center items-center">
      <div className="bg-blue900 p-10 flex flex-col gap-5 text-center mx-10">
        <h1 className="text-green-300 text-sm">ADVICE #{title}</h1>
        <p className="text-blue200 text-2xl font-bold">"{advice}"</p>
        {isNotMobile ? <img
          src="/images/pattern-divider-desktop.svg"
          alt="pattern divider"
        />: <img
          src="/images/pattern-divider-mobile.svg"
          alt="pattern divider"
        />}
      </div>
      <div
        className="-mt-4 bg-green-300 p-4 rounded-full cursor-pointer hover:shadow-[0_0_20px_5px_var(--color-green-300)] transition-all duration-300"
        onClick={() => setGenerate((prev) => !prev)}
      >
        <img
          className=""
          src="/images/icon-dice.svg"
          alt="icon-dice.svg"
        />
      </div>
    </div>
  );
}

export default App;
