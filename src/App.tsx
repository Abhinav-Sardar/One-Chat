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

const App: FC = () => {
  return (
    <Fragment>
      <Router forceRefresh>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/create">
            <CreateRoom />
          </Route>
          <Route path="/join">
            <JoinRoom isAuth={false} />
          </Route>
          <Route path="/customize">
            <Customize />
          </Route>
          <Route path="/room/:roomId">
            <Chat />
          </Route>
          <Route path="/*">
            <NotFoundPage isRoomError={false} />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
};
export default App;
