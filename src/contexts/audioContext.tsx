import { createContext, useContext, useEffect, useState } from "react";
import { Howl } from "howler";

type AudioContextType = {
  track: string;
  setTrack: React.Dispatch<React.SetStateAction<string>>;
  sound: Howl | null | undefined;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
};

const AudioContext = createContext<AudioContextType>({
  track: "",
  setTrack: () => null,
  sound: null,
  playing: false,
  setPlaying: () => null,
  volume: 0.5,
  setVolume: () => null,
  muted: false,
  setMuted: () => null,
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [track, setTrack] = useState<string>("");
  const [sound, setSound] = useState<Howl | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!track) return;
    var newSound = new Howl({
      src: [track],
      html5: true,
      onplay: () => {
        setPlaying(true);
      },
      onpause: () => {
        setPlaying(false);
      },
      onstop: () => {
        setPlaying(false);
      },
      onvolume: (vol) => {
        console.log(vol);
      },

      mute: muted,
    });

    sound?.stop();
    setSound(newSound);
    newSound?.play();

    newSound.volume(volume);
  }, [track]);

  return (
    <AudioContext.Provider
      value={{
        track,
        setTrack,
        sound,
        playing,
        setPlaying,
        volume,
        setVolume,
        muted,
        setMuted,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);

  if (context === undefined) {
    throw new Error("useAudio must be used within a AudioProvider");
  }

  return context;
}
