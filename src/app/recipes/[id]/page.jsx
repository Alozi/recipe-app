import React from "react";

export default async function RecipeDetail({ params }) {
  const { id } = await params;

  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );

  if (!res.ok) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-xl mx-auto">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">Failed to fetch recipe</span>
        </div>
      </div>
    );
  }

  const recipe = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-80 object-cover rounded mt-2"
      />

      <div className="mt-4">
        <h3 className="font-semibold">Ingredients:</h3>
        <ul>
          {recipe.extendedIngredients?.map((ingredient, index) => (
            <li key={index}>{ingredient.original}</li>
          ))}
        </ul>

        <div className="mt-4">
          <p>
            <strong>Preparation Time:</strong> {recipe.readyInMinutes} minutes
          </p>
          <p>
            <strong>Servings:</strong> {recipe.servings}
          </p>
          <p>
            <strong>Summary:</strong>{" "}
            {recipe.summary.replace(/(<([^>]+)>)/gi, "")}
          </p>{" "}
        </div>
      </div>
    </div>
  );
}
