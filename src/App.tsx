import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";

const App = () => {
  return (
    <div className="h-screen flex relative">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Navbar />
        <main className="flex flex-col flex-1 p-3 overflow-y-auto">
          <Outlet />
        </main>
        <Player />
      </div>
    </div>
  );
};

export default App;
