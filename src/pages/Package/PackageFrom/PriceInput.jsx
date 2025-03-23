// src/components/PackageForm/PriceInput.js
import React from "react";

const PriceInput = ({ price, handlePriceChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
        ราคา (Coin)
      </label>
      <input
        id="price"
        type="number"
        placeholder="99"
        value={price || ""}
        onChange={handlePriceChange}
        className="w-full px-4 py-3 border rounded-md focus:ring focus:ring-purple-200 focus:outline-none"
      />
    </div>
  );
};

export default PriceInput;
