import { createContext, useContext, useEffect, useState } from "react";
import { Howl } from "howler";
import { Station } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

type AudioContextType = {
  track: Station | undefined;
  setTrack: React.Dispatch<React.SetStateAction<Station | undefined>>;
  sound: Howl | null | undefined;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
  likedStations: Station[];
  setLikedStations: React.Dispatch<React.SetStateAction<Station[]>>;
  handleLike: (station: Station) => void;
};

const AudioContext = createContext<AudioContextType>({
  track: {
    country: "",
    favicon: "",
    language: "",
    name: "",
    tags: "",
    url: "",
    votes: 0,
    serveruuid: "",
    stationuuid: "",
  },
  setTrack: () => null,
  sound: null,
  playing: false,
  setPlaying: () => null,
  volume: 0.5,
  setVolume: () => null,
  muted: false,
  setMuted: () => null,
  likedStations: [],
  setLikedStations: () => null,
  handleLike: () => null,
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  const [track, setTrack] = useState<Station>();
  const [sound, setSound] = useState<Howl | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [likedStations, setLikedStations] = useState<Station[]>([]);

  const handleLike = (station: Station) => {
    const liked = localStorage.getItem("liked");

    if (liked) {
      const likedStations = JSON.parse(liked);
      const stationExists = likedStations.find(
        (likedStation: Station) =>
          likedStation.stationuuid === station.stationuuid
      );

      if (stationExists) {
        const newLikedStations = likedStations.filter(
          (likedStation: Station) => likedStation.url !== station.url
        );
        localStorage.setItem("liked", JSON.stringify(newLikedStations));
        setLikedStations(newLikedStations);
        toast({
          description: "Station removed from favorites",
        });
      } else {
        const newLikedStations = [...likedStations, station];
        localStorage.setItem("liked", JSON.stringify(newLikedStations));
        setLikedStations(newLikedStations);
        toast({
          description: "Station added to favorites",
        });
      }
    } else {
      localStorage.setItem("liked", JSON.stringify([station]));
      setLikedStations([station]);
      toast({
        description: "Station added to favorites",
      });
    }
  };

  useEffect(() => {
    const liked = localStorage.getItem("liked");
    setLikedStations(liked ? JSON.parse(liked) : []);

    if (!track) return;
    var newSound = new Howl({
      src: [track.url],
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
      onvolume: () => {
        // console.log(newSound?.volume());
        // if (newSound?.volume() === 0) {
        //   setMuted(true);
        // } else {
        //   setMuted(false);
        // }
      },
      onmute: () => {},
    });

    sound?.stop();
    setSound(newSound);
    newSound?.play();

    newSound.volume(volume);
  }, [track]);

  return (
    <AudioContext.Provider
      value={{
        likedStations,
        setLikedStations,
        track,
        setTrack,
        sound,
        playing,
        setPlaying,
        volume,
        setVolume,
        muted,
        setMuted,
        handleLike,
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
