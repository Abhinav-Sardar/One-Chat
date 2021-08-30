import { FC, Fragment, useEffect, useState, createContext } from "react";
import MainPage from "./Components/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "./Components/NotFound";

import CreateRoom from "./Components/CreateRoom";
import { accentColorChecker, ToastContainerConfig, user } from "./Constants";
import Customize from "./Components/Customize";
import "react-responsive-modal/styles.css";
import Chat from "./Components/Chat";
import JoinRoom from "./Components/JoinRoom";
import { useSpring, animated } from "react-spring";
import { ToastContainer } from "react-toastify";
import Banned from "./Components/Banned";
export const SelfClientContext = createContext<[user, any]>([
  {
    avatarSvg: "",
    currentRoomName: "",
    name: "",
  },
  "",
]);

const App: FC = () => {
  const users = useState<user>({
    avatarSvg: "",
    currentRoomName: "",
    name: "",
  });

  useEffect(() => {
    accentColorChecker();
  }, []);
  const fade = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });
  return (
    <Fragment>
      <SelfClientContext.Provider value={users}>
        <Router>
          <Switch>
            <Route path='/' exact>
              <animated.div style={fade}>
                <MainPage />
              </animated.div>
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

            <Route path='/*'>
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
