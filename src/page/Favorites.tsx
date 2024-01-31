import FilteredStations from "@/components/Shared/FilteredStations";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/contexts/audioContext";
import { useNav } from "@/contexts/navContext";
import { Menu } from "lucide-react";

const Favorites = () => {
  const { likedStations } = useAudio();
  const { setOpen } = useNav();

  return (
    <div className="relative">
      <div className="py-6 text-center">
        <h1 className="text-5xl font-bold">Favorites</h1>
        <h1 className="text-2xl leading-8  font-thin">
          All Your Favorite Stations
        </h1>
      </div>
      <Button
        variant={"unstyled"}
        onClick={() => setOpen(true)}
        className="absolute left-4 top-4 h-16 w-16 lg:hidden "
      >
        <Menu className="w-full h-full" />
      </Button>

      <FilteredStations stations={likedStations} loading={false} />
    </div>
  );
};

export default Favorites;
