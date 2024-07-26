import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import HomePage from "./pages/HomePage";
import  {Hero}  from "./components/index";
import UserPage from "./pages/UserPage";
import CreateBot from "./pages/CreateBot";
import ManageBots from "./pages/ManageBots";
import EditBotData from "./pages/EditBotData";
import Chatpage from "./pages/Chatpage";
const App = () => (
  <BrowserRouter>
      <div className="bg-primary w-full h-screen">
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<Hero/>} />
            <Route path="userpage" element={<UserPage/>} >
              <Route index element={<CreateBot/>}/>
              <Route path="managebot" element={<ManageBots/>}/>
              <Route path="editbot" element={<EditBotData/>}/>
              <Route path="chatbot" element={<Chatpage/>}/>
            </Route>
          </Route>
        </Routes>
      </div>
</BrowserRouter>
);

export default App;



