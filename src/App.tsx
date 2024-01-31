import { Outlet } from "react-router-dom";
import Sidebar from "./components/Shared/Sidebar";
import Player from "./components/Player/Player";

const App = () => {
  return (
    <div className="h-screen flex flex-col ">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <main className="flex flex-col flex-1 p-3 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <Player />
    </div>
  );
};

export default App;
