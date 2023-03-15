import { useState, lazy, Suspense } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Routes, Route, Outlet, Router, BrowserRouter, Link } from 'react-router-dom'
// import Home from './components/Home'

// loading for 1 sec before doing the import and once it downloads it doesnt need to re-download it.
const Home = lazy(() => wait(2000).then(() => import('./components/Home')));
const Store = lazy(() => wait(2000).then(() => import('./components/Store')));
const About = lazy(() => import("./components/About").then(module =>{
  return { default: module.About }
}))

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<NavWrapper />}>
        <Route path="/store" element={<Store />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

function NavWrapper() {
  return (
    <>
    <nav style={{ display: "flex", gap: "1rem" }}>
      <Link to="/">Home</Link>
      <Link to="/store">Store</Link>
      <Link to="/about">About</Link>
    </nav>
    <Suspense fallback={<h1>Loading...</h1>}>
    <Outlet/>
    </Suspense>
    </>
  )
}

function wait(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

export default App
