import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import PlayerPage from './containers/PlayerPage'
import PlayListPage from './containers/PlayListPage'
import OfflinePage from './containers/OfflinePage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PlayerPage} />
    <Route path="/playlist" component={PlayListPage} />
    <Route path="/offline" component={OfflinePage} />
  </Route>
)
