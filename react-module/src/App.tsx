import { Provider } from "react-redux"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { store } from "store"
import { HomePage, LoginPage, RegistrationPage } from "pages"
import { LOGIN_ROUTE, MUSIC_LIST_ROUTE, REGISTRATION_ROUTE } from "consts"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path={MUSIC_LIST_ROUTE} exact={true}>
            <HomePage />
          </Route>
          <Route path={LOGIN_ROUTE} exact={true}>
            <LoginPage />
          </Route>
          <Route path={REGISTRATION_ROUTE} exact={true}>
            <RegistrationPage />
          </Route>
          <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
