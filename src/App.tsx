import './App.css';
import // createBrowserRouter,
// RouterProvider,
// createRoutesFromElements,
// Outlet,
// Route,
'react-router-dom';
import { AuthWrapper } from './auth/AuthWrapper';
import { BrowserRouter } from 'react-router-dom';

// import Menu from './components/Menu';
// import Home from './components/Home';

function App() {
  // const AppLayout = () => (
  //   <>
  //     <Menu />
  //     <Outlet />
  //   </>
  // );

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path='/' element={<AppLayout />}>
  //       <Route index element={<Home />} />
  //       <Route path='/login' element={<h1>Home</h1>} />
  //       <Route path='/signup' element={<h1>Home</h1>} />
  //       <Route path='/account' element={<h1>Account</h1>} />
  //       <Route path='/defaultpreferences' element={<h1>Default Pref</h1>} />
  //       <Route path='/review' element={<h1>Home</h1>} />
  //       <Route path='/reviews' element={<h1>Reviews</h1>} />
  //     </Route>
  //   )
  // );

  return (
    // <RouterProvider router={router}/>
    <BrowserRouter>
      <AuthWrapper />
    </BrowserRouter>
  );
}

export default App;
