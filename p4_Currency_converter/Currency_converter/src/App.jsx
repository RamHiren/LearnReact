import { useEffect, useState } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [Amount, setAmount] = useState("1");
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState("USD");
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Fetch currency data
  const fetchcurrency = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      const currencyArray = Object.entries(data).map(([code, name]) => ({
        code,
        name,
      }));
      setCurrencies(currencyArray);
    } catch (err) {
      console.error("Fetching Error", err);
    }
  };

  useEffect(() => {
    fetchcurrency();
  }, []);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = async () => {
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${Amount}&from=${selectedCurrencyFrom}&to=${selectedCurrencyTo}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[selectedCurrencyTo]);
    } catch (err) {
      console.error("Fetching Error", err);
    }
  };

  const swapMoney = () => {
    setSelectedCurrencyFrom(selectedCurrencyTo);
    setSelectedCurrencyTo(selectedCurrencyFrom);
  };

  useEffect(() => {
    if (selectedCurrencyFrom === selectedCurrencyTo) {
      alert("You can't convert the same currency");
      setSelectedCurrencyFrom("USD");
      setSelectedCurrencyTo("INR");
      setConvertedAmount(null);
      return;
    }
    handleCurrencyChange();
  }, [Amount, selectedCurrencyTo, selectedCurrencyFrom]);

  return (
    <>
      <div className="min-w-full h-screen bg-gradient-to-r from-blue-700 to-gray-800 flex justify-center items-center p-4">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-6 backdrop-blur-sm bg-white/30">
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-7">
            Currency Converter
          </h2>
          <div className="flex justify-between items-center gap-4 md:gap-10 mt-4">
            <Dropdown
              currencies={currencies}
              title="From"
              selectedCurrency={selectedCurrencyFrom}
              setSelectedCurrency={setSelectedCurrencyFrom}
            />

            <button
              onClick={swapMoney}
              className="bg-white p-4 flex justify-center items-center h-12 rounded-xl mt-4 hover:bg-gray-200 transition duration-200"
            >
              <i className="fa-solid fa-arrow-right-arrow-left text-gray-800"></i>
            </button>

            <Dropdown
              currencies={currencies}
              title="To"
              selectedCurrency={selectedCurrencyTo}
              setSelectedCurrency={setSelectedCurrencyTo}
            />
          </div>

          <div className="flex justify-center mt-6 items-center">
            <div>
              <label htmlFor="Amount" className="font-medium text-white">Amount</label>
              <input
                onChange={handleAmountChange}
                value={Amount}
                type="number"
                className="ml-4 p-3 border border-gray-60 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <h2 className="mt-4 text-2xl text-center font-medium text-green-400">
            {Amount} {selectedCurrencyFrom} = {convertedAmount} {selectedCurrencyTo}
          </h2>
        </div>
      </div>
    </>
  );
}

export default App;
