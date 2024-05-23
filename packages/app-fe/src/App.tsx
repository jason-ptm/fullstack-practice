import { CssBaseline } from '@mui/material'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ViewApiResponseTools from './components/ViewApiResponseTools'
import { routes } from './constants/routes'
import AuthContainer from './containers/auth'
import PrivateContainer from './containers/private'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home/Home'
import MyPosts from './pages/Home/MyPosts'
import Profile from './pages/Profile'
import { store } from './redux/store'

function App() {

  return (
    <>
      <ReduxProvider store={store}>
        <CssBaseline />
        <BrowserRouter>

          <ViewApiResponseTools />

          <Routes>
            <Route path='/' element={<Navigate to={routes.social.slug} />} />

            <Route path={routes.auth.slug} element={<AuthContainer />}>
              <Route path='' element={<Navigate to={routes.login.slug} />} />
              <Route path={routes.login.slug} element={<Login />} />
              <Route path={routes.register.slug} element={<Register />} />
            </Route>

            <Route path={routes.social.slug} element={<PrivateContainer />}>
              <Route path='' element={<Navigate to={routes.home.slug} />} />
              <Route path={routes.home.slug} element={<Home />} />
              <Route path={routes.profile.slug} element={<Profile />} />
              <Route path={routes.myPosts.slug} element={<MyPosts />} />
            </Route>

            <Route path='*' element={<h1>NOT FOUND</h1>}></Route>
          </Routes>
        </BrowserRouter>
      </ReduxProvider>
    </>
  )
}

export default App
