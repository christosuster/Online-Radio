import { useNav } from "@/contexts/navContext";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Browse", path: "/" },
  { name: "Radio Map", path: "/radio-map" },
  { name: "Favorites", path: "/favorites" },
];

const Sidebar = () => {
  const { open } = useNav();

  return (
    <div
      className={`h-full  border-r overflow-hidden ${
        open ? "w-40" : "w-0"
      } transition-all transition-300`}
    >
      <ul>
        {links.map((link) => (
          <li key={link.name}>
            <NavLink to={link.path} className="block p-2 hover:bg-primary/60">
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
