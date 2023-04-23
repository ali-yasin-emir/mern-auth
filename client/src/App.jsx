import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.scss';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
function App() {
  const Layout = () => {
    return (
      <div className='app'>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [{ path: '/', element: <Home /> }],
    },
    { path: '/login', element: <Login /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
