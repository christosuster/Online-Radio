import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { StationLocation } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play, PlayIcon } from "lucide-react";
import { useAudio } from "@/contexts/audioContext";

const RadioMap = () => {
  const { track, setTrack, sound, playing } = useAudio();

  const [data, setData] = useState<StationLocation[]>([]);
  const [loading, setLoading] = useState(false);
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
    <div className="overflow-hidden ">
      <MapContainer
        style={{ height: 536 }}
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
                <div className="flex flex-col justify-center items-center gap-1">
                  <img src={item.favicon} className="w-full " alt="" />
                  <h1 className="font-semibold">{item.name}</h1>
                  <h1>{item.country}</h1>

                  {track?.url === item.url ? (
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
                      onClick={() => setTrack(item)}
                      className="shadow-lg p-4 h-auto w-auto rounded-full"
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
    </div>
  );
};

export default RadioMap;
