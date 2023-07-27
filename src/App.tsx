import {lazy} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'

const Home = lazy(() => import('../src/pages/home'))

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
            path='error/*'
            element={<ErrorsPage />}
          /> */}
        <Route
          path='/'
          element={<Home />}
        />

        <Route
          path='*'
          element={<Navigate to='/' />}
        />
      </Routes>
    </BrowserRouter>
  )
}
