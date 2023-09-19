import { createBrowserRouter } from 'react-router-dom'

import { ErrorPage } from '../pages/ErrorPage/ErrorPage'
import { Root } from '../pages/Root/Root'
import { RoutePath } from '../constants/routes'
import { Login } from '../pages/Login/Login'
import { Registration } from '../pages/Registration/Registration'
import { Settings } from '../pages/Settings/Settings'
import { Game } from '../pages/Game/Game'
import { Profile } from '../pages/Profile/Profile'
import { Leaderboards } from '../pages/Leaderboards/Leaderboards'
import { Forum } from '../pages/Forum/Forum'
import { ForumTopic } from '../pages/Forum/ForumTopic/ForumTopic'
import { RootLayout } from '../Layouts/RootLayout/RootLayout'

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: Root,
      },
      {
        path: RoutePath.Login,
        Component: Login,
      },
      {
        path: RoutePath.Registration,
        Component: Registration,
      },
      {
        path: RoutePath.Settings,
        Component: Settings,
      },
      {
        path: RoutePath.Game,
        Component: Game,
      },
      {
        path: RoutePath.Leaderboards,
        Component: Leaderboards,
      },
      {
        path: RoutePath.Forum,
        Component: Forum,
      },
      {
        path: `${RoutePath.Forum}/:topicId`,
        Component: ForumTopic,
      },
      {
        path: RoutePath.Profile,
        Component: Profile,
      },
    ],
  },
])
