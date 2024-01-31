import { useNav } from "@/contexts/navContext";
import { BoomBox, FolderHeart, Globe2, Moon, Sun, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Switch } from "../ui/switch";
import { useTheme } from "../../contexts/theme-provider";
import { Button } from "../ui/button";

const links = [
  { name: "Browse", path: "/", icon: <BoomBox /> },
  { name: "Radio Map", path: "/radio-map", icon: <Globe2 /> },
  { name: "Favorites", path: "/favorites", icon: <FolderHeart /> },
];

const Sidebar = () => {
  const { open, setOpen } = useNav();
  const { setTheme, theme } = useTheme();
  return (
    <div
      className={`h-full p-6 absolute z-50 bg-background/60 backdrop-blur-lg flex flex-col justify-between  border-r overflow-hidden  transition-all transition-800 w-64 lg:static ${
        open ? "left-0" : "-left-64"
      }`}
    >
      <Button
        variant={"unstyled"}
        onClick={() => setOpen(false)}
        className="absolute right-3 text-foreground lg:hidden "
      >
        <X />
      </Button>
      <h1 className="font-serif text-5xl ">Radio Station 23</h1>

      <ul className="flex flex-col gap-5">
        {links.map((link) => (
          <li className="w-full" key={link.name}>
            <NavLink
              onClick={() => setOpen(false)}
              to={link.path}
              className=" flex gap-2 text-lg items-center text-foreground/60 transition-all transition-500 border-r-4 border-transparent hover:border-primary hover:text-foreground"
            >
              {link.icon} {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex gap-1 pt-10 mx-auto">
        <Sun className="w-6 h-6" />
        <Switch
          checked={theme === "dark"}
          onCheckedChange={(state) =>
            state ? setTheme("dark") : setTheme("light")
          }
        />
        <Moon className="w-6 h-6" />
      </div>
      <p className="text-center">
        Developed by{" "}
        <a
          target="_blank"
          className="underline underline-offset-2"
          href="https://www.christosuster.me/"
        >
          Christos
        </a>
      </p>
    </div>
  );
};

export default Sidebar;
