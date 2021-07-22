import { FC, Fragment, useEffect, useState, createContext } from "react";
import MainPage from "./Components/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "./Components/NotFound";

import CreateRoom from "./Components/CreateRoom";
import { accentColorChecker, user } from "./Constants";
import Customize from "./Components/Customize";
import "react-responsive-modal/styles.css";
import Chat from "./Components/Chat";
import JoinRoom from "./Components/JoinRoom";

export const UserContext = createContext<[user, any]>([
  { avatarSvg: "", name: "", currentRoomName: "" },
  "",
]);
const App: FC = () => {
  useEffect(() => {
    accentColorChecker();
  }, []);

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
              <MainPage />
            </Route>
            <Route path="/create">
              <CreateRoom />
            </Route>
            <Route path="/join">
              <JoinRoom />
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
    </UserContext.Provider>
  );
};
export default App;
