import axios from "axios";
import { toast } from "react-toastify";
import { createContext } from "react";

export const AppDataContext = createContext(null);

function AppDataContextProvider({ children }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchUserById = async (userId, setUser) => {
    const url = `${backendUrl}/user/get-user-by-id/${userId}`;

    try {
      const { data } = await axios.get(url);
      
      if(data.success) {
        setUser(data.user);
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  const fetchUsersById = async (userIds, setUsers) => {
    const url = `${backendUrl}/user/get-users-by-id`;

    try {
      const { data } = await axios.post(url, { userIds });

      if(data.success) {
        setUsers(data.users);
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  const fetchPostsById = async (postIds, setPosts) => {
    const url = `${backendUrl}/news-feed/get-posts-by-id`;
    
    try {
      const { data } = await axios.post(url, { postIds });

      if(data.success) {
        setPosts(data.posts);
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  const handleAddToFavorites = async (e, handleCheckAuth, recipeId) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${backendUrl}/recipe/add-to-favourites/${recipeId}`;

    try{
      const { data } = await axios.post(url, 
        {}, 
        { withCredentials: true }
      );

      if(data.success) {
        handleCheckAuth();
        toast(data.message);
      };
    } catch(error) {
      console.error(error.message);
    }
  };

  const value = {
    fetchUserById,
    fetchUsersById,
    fetchPostsById,
    handleAddToFavorites
  };

  return (
    <AppDataContext.Provider value={value}>
      { children }
    </AppDataContext.Provider>
  )
};

export default AppDataContextProvider;