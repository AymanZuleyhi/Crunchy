import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import AllIngredientsContext from "../src/Context/IngredientsContext.jsx";
import RecipeContextFunction from "../src/Context/RecipeContext.jsx";
import AppContextProvider from './Context/AppContext.jsx';
import HelpersProvider from "./Context/Helpers.jsx";
import AppDataContextProvider from './Context/AppDataContext.jsx';
import { HashRouter } from 'react-router-dom';
import SecurityFlowContextProvider from './Context/SecurityFlowContext.jsx';

const basePath = import.meta.env.VITE_BASE_PATH || "/";

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <SecurityFlowContextProvider>
      <AppDataContextProvider>
        <AppContextProvider>
          <HelpersProvider>
            <RecipeContextFunction>
              <AllIngredientsContext>
                <App /> 
              </AllIngredientsContext>
            </RecipeContextFunction>
          </HelpersProvider>
        </AppContextProvider>
      </AppDataContextProvider>
    </SecurityFlowContextProvider>
  </HashRouter>
)
