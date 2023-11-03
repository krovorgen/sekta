import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppWithoutRedux } from './src/AppWithoutRedux'

export const render = (url: string) => {
  console.log(url)
  return renderToString(
    <StaticRouter location={url}>
      <AppWithoutRedux />
    </StaticRouter>
  )
}
