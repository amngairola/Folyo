import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Set the base URL for all Axios requests using an environment variable
axios.defaults.baseURL = import.meta.env.VITE_BASE_LOCAL_URL;

// 1. Create the context to hold the global state
const AppContext = createContext();

// 2. Create the Provider component that will wrap the application
export const AppProvider = ({ children }) => {
  // --- State and Functions to be shared globally ---
  const navigate = useNavigate();
  const [token, setToken] = useState(null); // Manages user authentication token
  const [blogs, setBlogs] = useState([]); // Holds the list of blogs
  const [input, setInput] = useState(""); // A general-purpose input state

  //logout function

  //fetch blogs on the initial render
  const fetchBlog = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlog();
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `${token}`;
    }
  }, []);

  // Bundle all the shared values into a single object
  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
  };

  // Provide the 'value' object to all child components
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// 3. Create a custom hook for easy access to the context
export const useAppContext = () => {
  return useContext(AppContext);
};
