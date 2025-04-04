"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RecipeSearchForm() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [prepTime, setPrepTime] = useState("");

  const isFormEmpty = !query || !cuisine || !prepTime;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ query, cuisine, prepTime });

    const params = new URLSearchParams();

    if (query) params.append("query", query);
    if (cuisine) params.append("cuisine", cuisine);
    if (prepTime) params.append("prepTime", prepTime);

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-xl space-y-2 p-6 border rounded-md shadow-md"
    >
      <div>
        <label htmlFor="query" className="block font-medium">
          Search Recipes:
        </label>
        <input
          type="text"
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. pasta"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="cuisine" className="block font-medium">
          Cuisine:
        </label>
        <select
          id="cuisine"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select cuisine...</option>
          <option value="Italian">Italian</option>
          <option value="Greek">Greek</option>
          <option value="Eastern European">Eastern European</option>
        </select>
      </div>

      <div>
        <label htmlFor="prepTime" className="block font-medium">
          Preparation time:
        </label>
        <input
          type="number"
          id="prepTime"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          min="1"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        className={`mt-2 px-4 py-2 rounded text-white transition ${
          isFormEmpty
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={isFormEmpty}
      >
        Next
      </button>
    </form>
  );
}
