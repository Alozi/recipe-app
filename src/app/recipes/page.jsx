import React from "react";
import Link from "next/link";

import { Suspense } from "react";

const fetchRecipes = async (query, cuisine, maxReadyTime) => {
  const cacheKey = `${query}-${cuisine}-${maxReadyTime}`;
  const cache = globalThis.cache || {};

  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < 60000) {
    return cache[cacheKey].data;
  }

  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&cuisine=${cuisine}&maxReadyTime=${maxReadyTime}&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );

  if (!res.ok) {
    return "Failed to fetch recipes";
  }

  const data = await res.json();

  cache[cacheKey] = {
    data: data.results,
    timestamp: Date.now(),
  };

  globalThis.cache = cache;

  return data.results;
};

const RecipeList = async ({ query, cuisine, prepTime }) => {
  const recipes = await fetchRecipes(query, cuisine, prepTime);

  if (!recipes || recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {recipes.map((recipe) => (
        <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold">{recipe.title}</h3>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded mt-2"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default async function RecipesPage({ searchParams }) {
  const { query = "", cuisine = "", prepTime = "" } = await searchParams;

  const recipes = await fetchRecipes(query, cuisine, prepTime);

  if (typeof recipes === "string") {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-xl mx-auto">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">
            {recipes}. Please try again later or use correct info.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recipe Results</h1>

      <div className="space-y-2">
        <p>
          <strong>Query:</strong> {query || "–"}
        </p>
        <p>
          <strong>Cuisine:</strong> {cuisine || "–"}
        </p>
        <p>
          <strong>Max Prep Time:</strong> {prepTime || "–"}
        </p>
      </div>

      <Suspense fallback={<p>Loading recipes...</p>}>
        <RecipeList query={query} cuisine={cuisine} prepTime={prepTime} />
      </Suspense>
    </div>
  );
}
