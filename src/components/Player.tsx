import { useAudio } from "@/contexts/audioContext";
import { Button } from "./ui/button";
import { Heart, Pause, Play } from "lucide-react";
import VolumeControl from "./VolumeControl";
import TimerControl from "./Player/TimerControl";
import { useToast } from "./ui/use-toast";
import { useEffect, useState } from "react";

const Player = () => {
  const { sound, playing, track, handleLike, likedStations } = useAudio();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (
      likedStations.find((liked) => liked.stationuuid === track?.stationuuid)
    ) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedStations, track]);

  return (
    <div className="h-24 m-0 p-0">
      {sound ? (
        <div className="flex-1 grid grid-cols-3 border-t p-3 gap-3">
          <div className="flex items-center overflow-hidden">
            <img
              className="h-12 w-12 rounded-full object-cover object-center animate-spin-slow"
              src={
                track?.favicon
                  ? track.favicon
                  : "https://img.freepik.com/premium-vector/radio-music-neon-sign-brick-wall-background-vector_118419-3950.jpg"
              }
              alt="Radio"
            />
            <h1 className="">{track?.name}</h1>
          </div>
          <div className="flex justify-center items-center">
            {playing ? (
              <Button
                className="shadow-lg h-14 w-14 rounded-full"
                onClick={() => sound?.pause()}
                disabled={sound ? false : true}
                variant={"outline"}
              >
                <Pause className=" " />
              </Button>
            ) : (
              <Button
                className="shadow-lg h-14 w-14 rounded-full"
                onClick={() => sound?.play()}
                disabled={sound ? false : true}
                variant={"default"}
              >
                <Play className=" " />
              </Button>
            )}
          </div>

          <div className="flex justify-end gap-2 items-center">
            <VolumeControl />
            <TimerControl />
            <Button onClick={() => track && handleLike(track!)} className="p-2">
              <Heart className={`${isLiked && "fill-red-500"}`} />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center border-t py-6 gap-3">
          <h1 className="text-xl">Select a station</h1>
        </div>
      )}
    </div>
  );
};

export default Player;
