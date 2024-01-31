import { Station } from "@/lib/types";
import { Play, Heart, Pause } from "lucide-react";
import { Button } from "../ui/button";
import { useAudio } from "@/contexts/audioContext";
import { useEffect, useState } from "react";

const HorizontalCard = ({ station }: { station: Station }) => {
  const {
    track,
    setTrack,
    sound,
    playing,
    likedStations,
    handleLike,
    setLoadingAudio,
  } = useAudio();
  const [isLiked, setIsLiked] = useState(false);

  const handlePlay = () => {
    setLoadingAudio(true);
    sound?.play();
  };

  const handleSetTrack = () => {
    setLoadingAudio(true);

    setTrack(station);
  };

  useEffect(() => {
    if (
      likedStations.find((liked) => liked.stationuuid === station.stationuuid)
    ) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedStations, station]);

  let stationImage = station.favicon;
  if (station.favicon === "") {
    stationImage =
      "https://img.freepik.com/premium-vector/radio-music-neon-sign-brick-wall-background-vector_118419-3950.jpg";
  }

  const tags = station.tags.split(",");

  return (
    <div className="border-2 border-primary overflow-hidden grid grid-cols-5 rounded-lg shadow-md ">
      <div className="col-span-2  flex justify-center py-5">
        <img
          className=" rounded-full h-20 w-20 object-cover object-center opacity-90 dark:opacity-80 bg-black "
          src={stationImage}
          alt={station.name}
        />
      </div>
      <div className="p-2 col-span-3 flex flex-col justify-between overflow-hidden h-40">
        <div className="overflow-y-auto overflow-x-hidden no-scrollbar">
          <h1 className="text-xl font-semibold">{station.name}</h1>
          <h1 className="">
            {station.country} - {station.language}
          </h1>
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-primary/50 text-foreground rounded-full px-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center h-14  justify-center col-span-5 gap-10 p-2">
        {track?.url === station.url ? (
          playing ? (
            <Button
              variant={"unstyled"}
              onClick={() => sound?.pause()}
              className={`text-foreground hover:text-accent p-3 h-14 w-14 rounded-full bg-none`}
            >
              <Pause className=" h-full w-full" />
            </Button>
          ) : (
            <Button
              variant={"unstyled"}
              onClick={handlePlay}
              className={`text-foreground hover:text-accent p-3 h-14 w-14 rounded-full bg-none`}
            >
              <Play className="h-full w-full " />
            </Button>
          )
        ) : (
          <Button
            variant={"unstyled"}
            onClick={handleSetTrack}
            className={`hover:text-accent text-foreground p-3 h-14 w-14 rounded-full bg-none`}
          >
            <Play className="  h-full w-full" />
          </Button>
        )}

        <Button
          variant={"unstyled"}
          onClick={() => handleLike(station)}
          className={`text-foreground p-3 h-14 w-14 rounded-full bg-none hover:text-red-500 transition-all`}
        >
          <Heart
            className={`h-full w-full  ${
              isLiked ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
      </div>
    </div>
  );
};

export default HorizontalCard;
