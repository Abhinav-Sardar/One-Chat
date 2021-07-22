import { FC, Fragment, useEffect, useState, createContext } from "react";
import MainPage from "./Components/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "./Components/NotFound";

import CreateRoom from "./Components/CreateRoom";
import { accentColorChecker, Animation, user } from "./Constants";
import Customize from "./Components/Customize";
import { animated } from "react-spring";
import "react-responsive-modal/styles.css";

export const UserContext = createContext<[user, any]>([
  { avatarSvg: "", name: "", currentRoomName: "" },
  "",
]);
const App: FC = () => {
  useEffect(() => {
    accentColorChecker();
  }, []);
  const { fade } = Animation();
  const [client, setClient] = useState<user>({
    avatarSvg: "",
    name: "",
    currentRoomName: "",
  });
  return (
    <UserContext.Provider value={[client, setClient]}>
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
                <NotFoundPage isRoomError={false} />
              </animated.div>
            </Route>
          </Switch>
        </Router>
      </Fragment>
    </UserContext.Provider>
  );
};
export default App;
