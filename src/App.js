import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// layout&route
import DefaultLayout from './components/DefaultLayout.js';
import { publicRoutes } from './routes';
import { Fragment, useContext, useEffect } from 'react';

// auth
import {Context} from "./index.js"
import axios from 'axios';

function App() {

  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/user/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
      <div className='app'>
        <Routes>
          {publicRoutes.map((route, id) => {
            const Layout = route.layout === null ? Fragment : DefaultLayout;
            const Page = route.component;
            return (
              <Route 
                key={id} 
                path={route.path}  
                element=
                  {
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })} 
        </Routes>
      </div>
      <ToastContainer position="top-center" />
    </Router>
    </>
  );
}

export default App;
