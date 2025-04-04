import React from "react";

const fetchRecipes = async (query, cuisine, maxReadyTime) => {
  const cacheKey = `${query}-${cuisine}-${maxReadyTime}`;
  const cache = globalThis.cache || {};

  let data = [];
  let error = null;

  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < 60000) {
    return cache[cacheKey].data;
  }

  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&cuisine=${cuisine}&maxReadyTime=${maxReadyTime}&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );
  
  data = await res.json();

  cache[cacheKey] = {
    data: data.results,
    timestamp: Date.now(),
  };

  globalThis.cache = cache;

  return data.results;
};

export default async function RecipesPage({ searchParams }) {
  const { query = "", cuisine = "", prepTime = "" } = await searchParams;

  const recipes = await fetchRecipes(query, cuisine, prepTime);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{recipe.title}</h3>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded mt-2"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
