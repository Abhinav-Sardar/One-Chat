import { FC, Fragment, useEffect } from "react";
import MainPage from "./Components/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "./Components/NotFound";
import "./globals.css";
import CreateRoom from "./Components/CreateRoom";

const App: FC = () => {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/create">
            <CreateRoom />
          </Route>
          <Route path="/*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
};
export default App;
