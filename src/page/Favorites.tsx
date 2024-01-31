import FilteredStations from "@/components/FilteredStations";
import { useAudio } from "@/contexts/audioContext";

const Favorites = () => {
  const { likedStations } = useAudio();
  return (
    <div>
      <h1 className="text-2xl text-center">Your Favorite Stations</h1>
      <FilteredStations stations={likedStations} loading={false} />
    </div>
  );
};

export default Favorites;
