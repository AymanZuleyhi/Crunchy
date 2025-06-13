import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const IngredientsContext = createContext(null);

function AllIngredientsContext({ children }) {
  const [originalIngredients, setOriginalIngredients] = useState();
  const [ingredients, setIngredients] = useState();
  const [filteredIngredients, setFilteredIngredients] = useState(ingredients);

  const fetchAllIngredients = async () => {
    const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

    try {
      const { data } = await axios.get(url);

      const mappedIngredients = data.meals.map((ingredient) => {
        return ingredient.strIngredient;
      });

      setOriginalIngredients(mappedIngredients);
      setIngredients(mappedIngredients);
    } catch(error) {
      console.error(error.message);
    };
    
    const data = await fetch(url);
    const json = await data.json();
  };

  useEffect(() => {
    fetchAllIngredients();
  }, []);

  useEffect(() => {
    setFilteredIngredients(ingredients);
  }, [ingredients])

  return(
    <IngredientsContext.Provider value = {{ originalIngredients, ingredients, setIngredients, filteredIngredients, setFilteredIngredients }}>
      {children}
    </IngredientsContext.Provider>
  )
};

export default AllIngredientsContext;