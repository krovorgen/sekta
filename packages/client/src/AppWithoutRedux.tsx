import { Routes, Route } from 'react-router-dom'
import { RoutePath } from './constants/routes'
import { Layout } from './Layouts/Base/Layout'
import { ErrorPage } from './pages/ErrorPage/ErrorPage'
import { Root } from './pages/Root/Root'
import { Forum } from './pages/Forum/Forum'
import { ForumTopic } from './pages/Forum/ForumTopic/ForumTopic'
import { Settings } from './pages/Settings/Settings'
import { Leaderboards } from './pages/Leaderboards/Leaderboards'
import { Login } from './pages/Login/Login'
import { Registration } from './pages/Registration/Registration'
import { Game } from './pages/Game/Game'

const MainPage = () => <div>MainPage</div>
const LoginPage = () => <div>LoginPage</div>

export const AppWithoutRedux = () => (
  <Routes>
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Root />} />
      <Route path={RoutePath.Forum} element={<Forum />} />
      <Route path={`${RoutePath.Forum}/:topicId`} element={<ForumTopic />} />
      <Route path={RoutePath.Settings} element={<Settings />} />
      <Route path={RoutePath.Leaderboards} element={<Leaderboards />} />
      <Route path={RoutePath.Login} element={<Login />} />
      <Route path={RoutePath.Registration} element={<Registration />} />
      <Route path={RoutePath.Game} element={<Game />} />
    </Route>
  </Routes>
)
