import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Timer } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useAudio } from "@/contexts/audioContext";
const TimerControl = () => {
  const [minutes, setMinutes] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  const { toast } = useToast();
  const { sound } = useAudio();

  useEffect(() => {
    timerStarted
      ? minutes > 0
        ? setTimeout(() => setMinutes(minutes - 1), 1000)
        : (setTimerStarted(false),
          sound?.stop(),
          toast({ title: "Timer Ended" }))
      : "";
  }, [minutes, timerStarted]);

  const handleTimer = () => {
    if (isNaN(minutes) || minutes <= 0) {
      toast({
        title: "Invalid Time",
        description: "Please enter a valid time",
        variant: "destructive",
      });
      return;
    }
    setTimerStarted(true);
    toast({
      title: "Timer Started",
      description: `Playback will stop in ${minutes / 60} minutes`,
    });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={"unstyled"}
          className="p-2 text-foreground hover:text-accent"
        >
          <Timer />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[250px]">
        <DialogHeader>
          <DialogTitle>Select Time</DialogTitle>
          <DialogDescription>
            Select time in minutes to stop playback
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-1">
            {timerStarted ? (
              <>
                <Label htmlFor="minutes" className="text-right">
                  Seconds Remaining
                </Label>
                <Input
                  id="minutes"
                  defaultValue="0"
                  type="number"
                  value={minutes}
                  disabled
                  min={0}
                  className="col-span-3"
                />
              </>
            ) : (
              <>
                <Label htmlFor="minutes" className="text-right">
                  Minutes
                </Label>
                <Input
                  id="minutes"
                  defaultValue="0"
                  type="number"
                  onChange={(e) => setMinutes(parseInt(e.target.value) * 60)}
                  min={0}
                  className="col-span-3"
                />
              </>
            )}
          </div>
        </div>
        <DialogFooter>
          {timerStarted ? (
            <Button
              variant={"destructive"}
              onClick={() => {
                setTimerStarted(false);
                setMinutes(0);
              }}
            >
              End Timer
            </Button>
          ) : (
            <Button onClick={handleTimer}>Start Timer</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimerControl;
