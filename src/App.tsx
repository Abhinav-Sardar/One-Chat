import { FC, Fragment, useEffect, useState, createContext } from "react";
import MainPage from "./Components/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "./Components/NotFound";

import CreateRoom from "./Components/CreateRoom";
import {
  accentColorChecker,
  constants,
  ToastContainerConfig,
  user,
} from "./Constants";
import Customize from "./Components/Customize";
import "react-responsive-modal/styles.css";
import Chat from "./Components/Chat";
import JoinRoom from "./Components/JoinRoom";
import { ToastContainer } from "react-toastify";

import Report from "./Components/Report";
import Docs from "./docs/Docs";
import axios from "axios";
import PublicRooms from "./Components/PublicRooms";

export const SelfClientContext = createContext<[user, any]>([
  {
    avatarSvg: "",
    currentRoomName: "",
    name: "",
    hasCreatedPrivateRoom: false,
  },
  "",
]);

const App: FC = () => {
  const users = useState<user>({
    avatarSvg: "",
    currentRoomName: "",
    name: "",
    hasCreatedPrivateRoom: false,
  });
  useEffect(() => {
    accentColorChecker();
  }, []);

  return (
    <Fragment>
      <SelfClientContext.Provider value={users}>
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
            <Route path='/docs'>
              <Docs />
            </Route>
            <Route path='/rooms/public'>
              <PublicRooms />
            </Route>
            <Route path='*'>
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </SelfClientContext.Provider>
      <ToastContainer {...ToastContainerConfig} />
    </Fragment>
  );
};
export default App;
