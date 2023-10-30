import { RouteObject } from 'react-router-dom'

import { Layout } from '../Layouts/Base/Layout'
import { ErrorPage } from '../pages/ErrorPage/ErrorPage'
import { Root } from '../pages/Root/Root'
import { RoutePath } from '../constants/routes'
import { Login } from '../pages/Login/Login'
import { Registration } from '../pages/Registration/Registration'
import { Settings } from '../pages/Settings/Settings'
import { Game } from '../pages/Game/Game'
import { Leaderboards } from '../pages/Leaderboards/Leaderboards'
import { Forum } from '../pages/Forum/Forum'
import { ForumTopic } from '../pages/Forum/ForumTopic/ForumTopic'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Root />,
      },
      {
        path: RoutePath.Forum,
        element: <Forum />,
      },
      {
        path: `${RoutePath.Forum}/:topicId`,
        element: <ForumTopic />,
      },
      {
        path: RoutePath.Settings,
        element: <Settings />,
      },
      {
        path: RoutePath.Leaderboards,
        element: <Leaderboards />,
      },
      {
        path: RoutePath.Login,
        element: <Login />,
      },
      {
        path: RoutePath.Registration,
        element: <Registration />,
      },
      {
        path: RoutePath.Game,
        element: <Game />,
      },
    ],
  },
]

// export const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
//       <Route index element={<Root />} />
//       <Route path={RoutePath.Forum} element={<Forum />} />
//       <Route path={`${RoutePath.Forum}/:topicId`} element={<ForumTopic />} />
//       <Route path={RoutePath.Settings} element={<Settings />} />
//       <Route path={RoutePath.Leaderboards} element={<Leaderboards />} />
//       <Route path={RoutePath.Login} element={<Login />} />
//       <Route path={RoutePath.Registration} element={<Registration />} />
//       <Route path={RoutePath.Game} element={<Game />} />
//     </Route>
//   )
// )
