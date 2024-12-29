import React from 'react';

const Dropdown = ({ currencies, title = "", selectedCurrency, setSelectedCurrency }) => {
  return (
    <>
      <div className="flex flex-col w-full max-w-xs mx-auto">
        <label
          htmlFor={title}
          className="text-sm font-medium text-gray-700 mb-2"
        >
          {title}
        </label>

        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-50 transition duration-200"
        >
          {currencies.map((currency, index) => (
            <option key={index} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Dropdown;
