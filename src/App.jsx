// import { useEffect, useState } from 'react'
// import './App.css'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Layout from './components/layout/Layout'
// import ThemeContextProvider from './context/ThemeContextProvider'
// import DetailPage from './pages/DetailPage'
// import authService from './appwrite/auth'
// import { useDispatch } from 'react-redux'
// import Dashboard from './pages/Dashboard'

// function App() {
//   const [loading, setLoading] = useState(true)

//   // fetch current user or any other service from backend, import useDispath() from store
//   const dispatch = useDispatch()

//   useEffect(()=>{
//     // ask from authservice for current user info
//     authService.getCurrentUser().then((userData)=>{
//       if (userData){
//         dispatch(login(userData))
//       }else{
//         dispatch(logout())
//       }
//     }).catch(()=>{
//       console.log( "no user data found");
//     }).finally(()=>{
//       setLoading(false)
//     })
//   },[])
  

//   return (
//     <>
//     <ThemeContextProvider>
//      <BrowserRouter>
//       <Routes>
//         <Route to='/' element={<Layout/>}>
//           <Route index element={<Dashboard/>}/>
//           <Route path="/detail/:id" element={<DetailPage/>}/>
//         </Route>
//       </Routes>
//      </BrowserRouter>
//     </ThemeContextProvider>
//     </>
//   )
// }

// export default App
