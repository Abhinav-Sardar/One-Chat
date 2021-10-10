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
import { useSpring, animated } from "react-spring";
import { ToastContainer } from "react-toastify";
import { CustomMainPage } from "./Styled-components/Mainpage.styled";
import Report from "./Components/Report";
import Docs from "./docs/Docs";
import axios from "axios";

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
    fetchRooms();
  }, []);
  const fetchRooms = async () => {
    const response = await axios.get(`${constants.serverName}rooms`);
    console.log(response);
  };

  const fade = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });
  return (
    <Fragment>
      <SelfClientContext.Provider value={users}>
        <Router>
          <Switch>
            <Route path='/' exact>
              <CustomMainPage style={fade}>
                <MainPage />
              </CustomMainPage>
            </Route>
            <Route path='/create'>
              <CreateRoom />
            </Route>
            <Route path='/join'>
              <JoinRoom isAuth={false} />
            </Route>
            <Route path='/customize'>
              <animated.div style={fade}>
                <Customize />
              </animated.div>
            </Route>
            <Route path='/room/:roomId'>
              <animated.div style={fade}>
                <Chat />
              </animated.div>
            </Route>
            <Route path='/report'>
              <animated.div style={fade}>
                <Report />
              </animated.div>
            </Route>
            <Route path='/docs'>
              <animated.div style={fade}>
                <Docs />
              </animated.div>
            </Route>
            <Route path='*'>
              <animated.div style={fade}>
                <NotFoundPage />
              </animated.div>
            </Route>
          </Switch>
        </Router>
      </SelfClientContext.Provider>
      <ToastContainer {...ToastContainerConfig} />
    </Fragment>
  );
};
export default App;
