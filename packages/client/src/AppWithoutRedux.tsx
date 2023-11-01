import { Routes, Route } from 'react-router-dom'
import { RoutePath } from './constants/routes'

const MainPage = () => <div>MainPage</div>
const LoginPage = () => <div>LoginPage</div>

export const AppWithoutRedux = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path={RoutePath.Login} element={<LoginPage />} />
  </Routes>
)
