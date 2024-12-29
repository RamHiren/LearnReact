import { useEffect, useCallback, useState, useRef } from 'react';
import './App.css';

function App() {
  const [pass, setPass] = useState("");
  const [len, setlen] = useState(8);
  const [schar, setSchar] = useState(false);
  const [number, setNumber] = useState(false);

  const passwordRef = useRef(null);

  const PassGene = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "1234567890";
    }
    if (schar) {
      str += "!@#$%^&*";
    }
    for (let i = 0; i < len; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }
    setPass(pass);
  }, [len, number, schar, setPass]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  useEffect(() => {
    PassGene();
  }, [len, number, schar, PassGene]);

  return (
    <>
      <div className="w-screen h-screen bg-black mt-0 overflow-hidden flex items-center justify-center">
        <div className="w-full max-w-md mx-4 sm:mx-auto shadow-md rounded-lg px-4 py-5 bg-gray-800 text-orange-500">
          <h1 className="text-orange-600 text-center text-2xl sm:text-3xl lg:text-[3.2rem] font-bold">
            Password Generator
          </h1>

          <div className="flex shadow rounded-lg overflow-hidden mb-4 mt-4">
            <input
              type="text"
              value={pass}
              className="outline-none w-full py-2 px-3 text-sm sm:text-base bg-gray-700 text-white rounded-l-lg"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="outline-none bg-orange-600 text-white px-3 py-2 text-sm sm:text-base rounded-r-lg"
            >
              Copy
            </button>
          </div>

          <div className="flex flex-wrap text-sm sm:text-base gap-3 items-center">
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={6}
                max={50}
                value={len}
                className="cursor-pointer"
                onChange={(e) => {
                  setlen(e.target.value);
                }}
              />
              <label>Length: {len}</label>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="numberInput">Number</label>
              <input
                type="checkbox"
                id="numberInput"
                defaultChecked={number}
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="SpecialChar">Special Char</label>
              <input
                type="checkbox"
                id="SpecialChar"
                defaultChecked={schar}
                onChange={() => {
                  setSchar((prev) => !prev);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
