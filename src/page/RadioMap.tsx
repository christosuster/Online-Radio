import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { StationLocation } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Menu, Pause, Play } from "lucide-react";
import { useAudio } from "@/contexts/audioContext";
import { useNav } from "@/contexts/navContext";

const RadioMap = () => {
  const { track, setTrack, sound, playing, setLoadingAudio } = useAudio();
  const { setOpen } = useNav();

  const [data, setData] = useState<StationLocation[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePlay = () => {
    setLoadingAudio(true);
    sound?.play();
  };

  const handleSetTrack = (prop: StationLocation) => {
    setLoadingAudio(true);

    setTrack(prop as any);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://de1.api.radio-browser.info/json/stations/search?has_geo_info=true&limit=500&hidebroken=true"
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div className="py-6 text-center">
        <h1 className="text-5xl font-bold">Radio Map</h1>
        <h1 className="text-2xl leading-8  font-thin">
          Stations All Over The World
        </h1>
      </div>
      <Button
        variant={"unstyled"}
        onClick={() => setOpen(true)}
        className="absolute left-4 top-4 h-16 w-16 lg:hidden  text-foreground"
      >
        <Menu className="w-full h-full" />
      </Button>
      {loading ? (
        <Loader2 className="mx-auto my-10 animate-spin w-16 h-16 " />
      ) : (
        <MapContainer
          style={{ height: 400 }}
          className="full-height-map"
          center={[50, 50]}
          zoom={2}
          minZoom={2}
          maxZoom={19}
          maxBounds={[
            [-85.06, -180],
            [85.06, 180],
          ]}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup>
            {data?.map((item, index) => (
              <Marker key={index} position={[item.geo_lat, item.geo_long]}>
                <Popup>
                  <div className="flex flex-col justify-center items-center w-40 gap-1 text-center">
                    <img src={item.favicon} className="w-full " alt="" />
                    <h1 className="font-semibold">{item.name}</h1>
                    <h1>{item.country}</h1>

                    {track?.url === item.url ? (
                      playing ? (
                        <Button
                          onClick={() => sound?.pause()}
                          className="shadow-lg p-3 h-auto w-auto rounded-full"
                        >
                          <Pause className=" " />
                        </Button>
                      ) : (
                        <Button
                          onClick={handlePlay}
                          className="shadow-lg p-3 h-auto w-auto rounded-full"
                        >
                          <Play className=" " />
                        </Button>
                      )
                    ) : (
                      <Button
                        onClick={() => handleSetTrack(item)}
                        className="shadow-lg p-3 h-auto w-auto rounded-full"
                      >
                        <Play className=" " />
                      </Button>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      )}
    </div>
  );
};

export default RadioMap;
