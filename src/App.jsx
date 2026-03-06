 import { createBrowserRouter, RouterProvider } from "react-router-dom";
   import {HeroUIProvider,Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, ToastProvider} from "@heroui/react";
import MainLayout from "./layout/MainLayout";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import PostDetails from "./pages/PostDetails";
import NotFound from "./pages/NotFound";
import Authentcation from "./layout/Authentcation";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import Authprotected from "./protectedRoute/authprotected";
import Authcontext from './context/Authcontext';
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
 import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/index';


function App() {
  const router=createBrowserRouter([
  {path: '', element: <MainLayout/> ,children:[
    {index:true ,element: <ProtectedRoute><Feed/></ProtectedRoute> },
    {path:'profile' ,element: <ProtectedRoute><Profile/></ProtectedRoute> },
    {path:'postDetails/:id' ,element: <ProtectedRoute><PostDetails/></ProtectedRoute> },
     {path:'*' ,element:<NotFound/> },


  ]},

   {path:'', element: <Authentcation/> ,children:[
 
    {path:'signup' ,element:  <Authprotected><Signup/> </Authprotected>},
     {path:'signin' ,element: <Authprotected><Signin/></Authprotected> },
  

  ]}
 ])
 const queryClient= new QueryClient()
  return (
    <>
 <QueryClientProvider client={queryClient}>
  <ReactQueryDevtools/>
 <Authcontext>


         <HeroUIProvider>
                <ToastProvider />


          <RouterProvider router={router}/>
          </HeroUIProvider>
    </Authcontext>

 </QueryClientProvider>
    

    
     </>
  )
}

export default App
