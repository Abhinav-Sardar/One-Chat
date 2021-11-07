import { FC, Fragment, useEffect, useState, createContext } from "react";
import MainPage from "./Components/MainPage";
import NotFoundPage from "./Components/NotFound";
import CreateRoom from "./Components/CreateRoom";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";

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
import Faqs from "./Components/FaqsComponent";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { CustomModal } from "./Components/Chat.SubComponents";
const queryClient = new QueryClient();
const App: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    accentColorChecker();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <SelfClientContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/create' element={<CreateRoom />} />

            <Route path='/join' element={<JoinRoom isAuth={false} />} />

            <Route path='/customize' element={<Customize />} />
            <Route path='/room/:roomId' element={<Chat />} />
            <Route path='/report' element={<Report />} />

            <Route path='/rooms/public' element={<PublicRooms />} />

            <Route path='/faqs' element={<Faqs />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </SelfClientContextProvider>
      {/* @ts-ignore */}
      <ToastContainer {...ToastContainerConfig} />
      <ReactQueryDevtools position='top-left' />
    </QueryClientProvider>
  );
};
export default App;
