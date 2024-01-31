import { useAudio } from "@/contexts/audioContext";
import { Button } from "../ui/button";
import { Heart, Loader2, Pause, Play } from "lucide-react";
import VolumeControl from "./VolumeControl";
import TimerControl from "./TimerControl";
import { useEffect, useState } from "react";

const Player = () => {
  const {
    sound,
    playing,
    track,
    handleLike,
    likedStations,
    loadingAudio,
    setLoadingAudio,
  } = useAudio();

  const [isLiked, setIsLiked] = useState(false);

  const handlePlay = () => {
    setLoadingAudio(true);
    sound?.play();
  };

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
    <div className="h-20 flex justify-center">
      {sound ? (
        <div className="flex-1 grid grid-cols-3 border-t border-primary px-3 gap-3">
          <div className="flex items-center gap-1 overflow-hidden">
            <img
              className="h-12 w-12 rounded-full object-cover object-center animate-spin-slow"
              src={
                track?.favicon
                  ? track.favicon
                  : "https://img.freepik.com/premium-vector/radio-music-neon-sign-brick-wall-background-vector_118419-3950.jpg"
              }
              alt="Radio"
            />
            <div>
              <h1 className="font-bold">{track?.name}</h1>
              <h1 className="text-sm">{track?.country}</h1>
            </div>
          </div>
          <div className="flex justify-center items-center">
            {playing ? (
              <Button
                className="shadow-lg  transition-all p-2 h-12 w-12 rounded-full"
                onClick={() => sound?.pause()}
                disabled={sound ? false : true}
                variant={"outline"}
              >
                <Pause className=" h-full w-full" />
              </Button>
            ) : (
              <Button
                className="shadow-lg  transition-all p-2 h-12 w-12 rounded-full"
                onClick={handlePlay}
                disabled={sound ? false : true}
                variant={"default"}
              >
                {loadingAudio ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Play className=" " />
                )}
              </Button>
            )}
          </div>

          <div className="flex justify-end gap-2 items-center">
            <VolumeControl />
            <TimerControl />

            <Button
              variant={"unstyled"}
              onClick={() => track && handleLike(track!)}
              className={`p-2 text-foreground hover:text-red-500 transition-all`}
            >
              <Heart
                className={` ${isLiked ? "fill-red-500 text-red-500" : ""}`}
              />
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
