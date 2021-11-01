import { FC, Fragment, useEffect, useState, createContext } from "react";
import MainPage from "./Components/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "./Components/NotFound";

import CreateRoom from "./Components/CreateRoom";
import {
  accentColorChecker,
  constants,
  initContextValue,
  ToastContainerConfig,
  user,
} from "./Constants";
import Customize from "./Components/Customize";
import "react-responsive-modal/styles.css";
import Chat from "./Components/Chat";
import JoinRoom from "./Components/JoinRoom";
import { ToastContainer } from "react-toastify";

import Report from "./Components/Report";
import axios from "axios";
import PublicRooms from "./Components/PublicRooms";
import { SelfClientContextProvider } from "./Context";

const App: FC = () => {
  useEffect(() => {
    accentColorChecker();
  }, []);

  return (
    <Fragment>
      <SelfClientContextProvider>
        <Router>
          <Switch>
            <Route path='/' exact>
              <MainPage />
            </Route>
            <Route path='/create'>
              <CreateRoom />
            </Route>
            <Route path='/join'>
              <JoinRoom isAuth={false} />
            </Route>
            <Route path='/customize'>
              <Customize />
            </Route>
            <Route path='/room/:roomId'>
              <Chat />
            </Route>
            <Route path='/report'>
              <Report />
            </Route>

            <Route path='/rooms/public'>
              <PublicRooms />
            </Route>
            <Route path='*'>
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </SelfClientContextProvider>
      {/* @ts-ignore */}
      <ToastContainer {...ToastContainerConfig} />
    </Fragment>
  );
};
export default App;
