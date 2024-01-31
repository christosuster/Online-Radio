import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Browse from "./page/Browse.tsx";
import { ThemeProvider } from "./contexts/theme-provider.tsx";
import Favorites from "./page/Favorites.tsx";
import RadioMap from "./page/RadioMap.tsx";
import { NavProvider } from "./contexts/navContext.tsx";
import { AudioProvider } from "./contexts/audioContext.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Browse />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="radio-map" element={<RadioMap />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavProvider>
        <AudioProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AudioProvider>
      </NavProvider>
    </ThemeProvider>
  </React.StrictMode>
);
