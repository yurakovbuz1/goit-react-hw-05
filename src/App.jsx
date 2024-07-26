import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import { Suspense, lazy } from 'react'

function App() {

  const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
  const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
  const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
  const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
  const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));
  const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

  return (
    <>
        <Navigation />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage/>}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      
    </>
  )
}

export default App
