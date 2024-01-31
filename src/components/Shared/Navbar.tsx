import { useTheme } from "../../contexts/theme-provider";
import { Switch } from "@/components/ui/switch";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "../ui/button";
import { useNav } from "@/contexts/navContext";

const Navbar = () => {
  const { setTheme, theme } = useTheme();

  const { setOpen, open } = useNav();
  return (
    <nav className="border-b font-semibold h-16 flex items-center justify-center relative p-3">
      <h1 className="text-2xl">Radio Station 23</h1>
      <Button onClick={() => setOpen(!open)} className="absolute left-3">
        {open ? <X /> : <Menu />}
      </Button>
      <div className="flex gap-1 absolute right-3">
        <Sun className="w-6 h-6" />
        <Switch
          checked={theme === "dark"}
          onCheckedChange={(state) =>
            state ? setTheme("dark") : setTheme("light")
          }
        />
        <Moon className="w-6 h-6" />
      </div>
    </nav>
  );
};

export default Navbar;
