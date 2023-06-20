import { Provider } from "react-redux"
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from "react-router-dom"
import { store } from "store"
import { HomePage, LoginPage, NotFoundPage, RegistrationPage } from "pages"
import { LOGIN_ROUTE, MUSIC_LIST_ROUTE, REGISTRATION_ROUTE, UPLOADING_ROUTE } from "consts"
import { IStore } from "store/types"

const userData: IStore = localStorage.getItem('persistantState')
  && JSON.parse(localStorage.getItem('persistantState') ?? '');

const ProtectedRoute = ({ children, ...rest }: RouteProps) => {
  return (
    <Route
      {...rest}
      render={({ history, location, match }) => {
        return userData.authUser?.user?.role.roleName === "Admin"
          ? <>{children}</>
          : <Redirect to="/" />;
      }}
    />
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path={MUSIC_LIST_ROUTE} exact={true}>
            <HomePage />
          </Route>
          <ProtectedRoute path={UPLOADING_ROUTE} exact={true}>
            <NotFoundPage />
          </ProtectedRoute>
          <Route path={LOGIN_ROUTE} exact={true}>
            <LoginPage />
          </Route>
          <Route path={REGISTRATION_ROUTE} exact={true}>
            <RegistrationPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
