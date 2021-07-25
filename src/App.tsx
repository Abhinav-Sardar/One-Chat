import { FC, Fragment, useEffect, useState } from "react";
import MainPage from "./Components/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "./Components/NotFound";

import CreateRoom from "./Components/CreateRoom";
import { accentColorChecker, user } from "./Constants";
import Customize from "./Components/Customize";
import "react-responsive-modal/styles.css";
import Chat from "./Components/Chat";
import JoinRoom from "./Components/JoinRoom";
import { useSpring, animated } from "react-spring";

const App: FC = () => {
  const fade = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });
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
          <Route path="/join">
            <animated.div style={fade}>
              <JoinRoom isAuth={false} />
            </animated.div>
          </Route>
          <Route path="/customize">
            <animated.div style={fade}>
              <Customize />
            </animated.div>
          </Route>
          <Route path="/room/:roomId">
            <animated.div style={fade}>
              <Chat />
            </animated.div>
          </Route>
          <Route path="/*">
            <animated.div style={fade}>
              <NotFoundPage isRoomError={false} />
            </animated.div>
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
};
export default App;
