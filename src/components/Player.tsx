import { useAudio } from "@/contexts/audioContext";
import { Howl, Howler } from "howler";
import { Button } from "./ui/button";
import { Pause, Play } from "lucide-react";
import VolumeControl from "./VolumeControl";

const Player = () => {
  const { sound, playing, setPlaying } = useAudio();
  console.log(sound);

  return (
    <div className="flex-1 flex justify-center items-center border-t p-3 gap-3">
      {playing ? (
        <Button
          onClick={() => sound?.pause()}
          disabled={sound ? false : true}
          variant={"outline"}
        >
          <Pause className=" " />
        </Button>
      ) : (
        <Button
          onClick={() => sound?.play()}
          disabled={sound ? false : true}
          variant={"default"}
        >
          <Play className=" " />
        </Button>
      )}
      <div>
        <VolumeControl />
      </div>
    </div>
  );
};

export default Player;
