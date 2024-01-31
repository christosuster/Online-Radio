import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Volume, Volume2 } from "lucide-react";
import { Slider } from "./ui/slider";
import { useAudio } from "@/contexts/audioContext";

const VolumeControl = () => {
  const { sound, playing, setPlaying } = useAudio();

  return (
    <Popover>
      <PopoverTrigger>
        <Button className="p-2 ">
          <Volume2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex gap-3">
        <Slider
          onValueChange={(value) => sound?.volume(value[0])}
          orientation="horizontal"
          defaultValue={[0.5]}
          max={1}
          step={0.05}
          className=""
        />
      </PopoverContent>
    </Popover>
  );
};

export default VolumeControl;
