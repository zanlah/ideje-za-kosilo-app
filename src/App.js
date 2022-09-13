import "./App.css";
import { React, useEffect, useState } from "react";
import options from "./components/options";
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [ideje, setIdeje] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    setIdeje(options());
  }

  useEffect(() => {
    setIdeje(options());
    //make content height exact dimensions on usable screen
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="App">
      <div
        style={{ height: windowSize.innerHeight }}
        className="flex text-center justify-center items-center p-2"
      >
        <div>
          <h1 className="text-3xl font-semibold"> {ideje}</h1>
          <div className="absolute bottom-0 right-0 w-full pb-4">
            <button
              onClick={handleSubmit}
              type="button"
              className="mt-5 w-2/3 rounded-md border border-transparent bg-indigo-100 px-6 py-5 text-base font-medium text-blue-700 hover:bg-indigo-200 focus:outline-none"
            >
              Nova ideja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
export default App;
