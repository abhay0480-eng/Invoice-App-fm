import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Dashboard from './pages/Dashboard.jsx'
import DetailPage from './pages/DetailPage.jsx'
import ThemeContextProvider from './context/ThemeContextProvider.jsx'


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
  <Route path='' element={<AuthLayout authentication={false} ><Login /></AuthLayout>}/>
  <Route path='/signup' element={<AuthLayout authentication={false} ><SignUp /></AuthLayout>}/>
  <Route path='/dashboard' element={<AuthLayout authentication={true} ><Dashboard/></AuthLayout>}/>
  <Route path="/detail/:id" element={<AuthLayout authentication={true} ><DetailPage/></AuthLayout>} />
 </Route> 
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <ThemeContextProvider >
  <RouterProvider router={router}/>
  </ThemeContextProvider>
  </Provider>
)
