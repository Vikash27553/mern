import './App.css'
import User from './getuser/User'
import{ RouterProvider, createBrowserRouter } from 'react-router-dom';
import Userform from './component/Userform'
import Updateuser from './component/Updateuser';
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />
    },
    {
      path: "/adduser",
      element: <Userform />
    },
    {
      path: "/update/:id",
      element: <Updateuser/>
    }
  ]);
  return (
    <>
   <RouterProvider router={route} />
    
    </>
      
  )
}

export default App
