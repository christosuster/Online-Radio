import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";

const App = () => {
  return (
    <div className="h-screen flex flex-col relative">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 h-full">
          <Navbar />
          <main className="flex flex-col flex-1 p-3 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <Player />
    </div>
  );
};

export default App;
