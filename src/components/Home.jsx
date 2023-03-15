import React, { Suspense, useState, lazy, useTransition } from 'react'
import { lazyLoad } from '../lazyLoad.js';

// useTransition hook allows us to do non-urgent updates which wont change out UI until they are finished updating.

// const AdminData = lazy(() => 
// wait(2000).then(() => import("./AdminData").then(module => {
//     return { default: module.AdminData }
// })
// ))

const AdminData = lazyLoad('./components/AdminData', 'AdminData')

const Home = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isPending, startTransition] = useTransition();
  return (
    <>
    <h1>Home</h1>
    <button onClick={() => {
        import("../sum.js").then(module => {
            module.sum
        })
        alert(sum(2, 2))}
    }>Add 2 + 2</button>
    <br />
    <br />
    <button onClick={() => {
        startTransition(() => {
            setIsAdmin(prev =>!prev)
        })
        }}>Toggle Admin</button>
        {isPending && "Loading"}
    <Suspense fallback={<h2>Loading...</h2>}>
    {isAdmin ? <AdminData /> : <h2>Not Admin</h2>}
    </Suspense>
    </>
  )
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

export default Home