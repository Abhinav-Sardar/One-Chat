import { FC, Fragment, useEffect } from "react";
import MainPage from "./Components/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "./Components/NotFound";
import "./globals.css";
import CreateRoom from "./Components/CreateRoom";
import { accentColorChecker, Animation } from "./Constants";
import Customize from "./Components/Customize";
import { animated } from "react-spring";
const App: FC = () => {
  useEffect(() => {
    accentColorChecker();
  });
  const { fade } = Animation();
  return (
    <Fragment>
      <Router forceRefresh>
        <Switch>
          <Route path="/" exact>
            <animated.div style={fade}>
              <MainPage />
            </animated.div>
          </Route>
          <Route path="/create">
            <animated.div style={fade}>
              <CreateRoom />
            </animated.div>
          </Route>
          <Route path="/customize">
            <animated.div style={fade}>
              <Customize />
            </animated.div>
          </Route>

          <Route path="/*">
            <animated.div style={fade}>
              <NotFoundPage />
            </animated.div>
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
};
export default App;
