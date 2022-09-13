import "./App.css";
import { React, useEffect, useState } from "react";
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://zanlah.si/kosilo_api")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  useEffect(() => {
    fetch("https://zanlah.si/kosilo_api")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

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
          {!isLoaded && (
            <div className="flex items-center justify-center space-x-2 animate-bounce h-8">
              <div className="w-4 h-4 bg-indigo-300 rounded-full"></div>
              <div className="w-4 h-4 bg-indigo-300 rounded-full"></div>
              <div className="w-4 h-4 bg-indigo-300 rounded-full"></div>
            </div>
          )}
          {isLoaded && (
            <h1 className="text-2xl font-semibold"> {items.ideja}</h1>
          )}
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
