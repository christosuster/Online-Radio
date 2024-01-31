import { Station } from "@/lib/types";
import { Play, Heart, Pause } from "lucide-react";
import { Button } from "./ui/button";
import { useAudio } from "@/contexts/audioContext";

const Card = ({ station }: { station: Station }) => {
  const { track, setTrack, sound, playing } = useAudio();
  let stationImage = station.favicon;
  if (station.favicon === "") {
    stationImage =
      "https://img.freepik.com/premium-vector/radio-music-neon-sign-brick-wall-background-vector_118419-3950.jpg";
  }

  const tags = station.tags.split(",");

  return (
    <div className="border overflow-hidden aspect-[3/4] grid grid-rows-5 rounded-lg shadow-md">
      <img
        className="h-full w-full object-cover object-center opacity-90 dark:opacity-80 bg-black row-span-2"
        src={stationImage}
        alt={station.name}
      />
      <div className="p-2 row-span-3 flex flex-col justify-between">
        <div className="overflow-y-auto overflow-x-hidden">
          <h1 className="text-xl font-semibold">{station.name}</h1>
          <h1 className="">
            {station.country} - {station.language}
          </h1>
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-300 text-gray-700 rounded-full px-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center  gap-10 p-2">
          {track?.url === station.url ? (
            playing ? (
              <Button
                onClick={() => sound?.pause()}
                className="shadow-lg p-4 h-auto w-auto rounded-full"
              >
                <Pause className=" " />
              </Button>
            ) : (
              <Button
                onClick={() => sound?.play()}
                className="shadow-lg p-4 h-auto w-auto rounded-full"
              >
                <Play className=" " />
              </Button>
            )
          ) : (
            <Button
              onClick={() => setTrack(station)}
              className="shadow-lg p-4 h-auto w-auto rounded-full"
            >
              <Play className=" " />
            </Button>
          )}

          <Button className="shadow-lg p-4 h-auto w-auto rounded-full">
            <Heart className=" " />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
