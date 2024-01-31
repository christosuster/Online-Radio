import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CountrySelection, LanguageSelection, Station } from "@/lib/types";
import FilteredStations from "@/components/FilteredStations";
import { SelectCountry } from "@/components/SelectCountry";
import { SelectLanguage } from "@/components/SelectLanguage";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useAudio } from "@/contexts/audioContext";

const Browse = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<String | null>(null);
  const [selectedName, setSelectedName] = useState<String | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<String | null>(null);
  const [countries, setCountries] = useState<CountrySelection[]>([]);
  const [languages, setLanguages] = useState<LanguageSelection[]>([]);
  const [loading, setLoading] = useState(false);

  const { setLikedStations } = useAudio();

  const ref = useRef("");

  const makeSearch = () => {
    setSelectedName(ref.current);
    setSelectedCountry(null);
    setSelectedLanguage(null);
  };

  useEffect(() => {
    setLoading(true);

    const liked = localStorage.getItem("liked");
    setLikedStations(liked ? JSON.parse(liked) : []);

    if (selectedCountry) {
      axios
        .get(
          `https://de1.api.radio-browser.info/json/stations/bycountrycodeexact/${selectedCountry}?limit=100`
        )
        .then((res) => {
          setStations(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else if (selectedLanguage) {
      axios
        .get(
          `https://de1.api.radio-browser.info/json/stations/bylanguage/${selectedLanguage}?limit=100`
        )
        .then((res) => {
          setStations(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else if (selectedName) {
      axios
        .get(
          `https://de1.api.radio-browser.info/json/stations/search?name=${selectedName}`
        )
        .then((res) => {
          setStations(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      axios
        .get("https://de1.api.radio-browser.info/json/stations/topvote/100")
        .then((res) => {
          setStations(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }

    axios
      .get("https://de1.api.radio-browser.info/json/countries")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        "https://de1.api.radio-browser.info/json/languages?hidebroken=true&limit=100&reverse=true&order=stationcount"
      )
      .then((res) => {
        setLanguages(res.data);
      })
      .catch((err) => console.log(err));
  }, [selectedCountry, selectedLanguage, selectedName]);

  console.log(selectedCountry);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-center gap-3">
        <SelectCountry
          data={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          setSelectedLanguage={setSelectedLanguage}
        />
        <SelectLanguage
          data={languages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          setSelectedCountry={setSelectedCountry}
        />
        <div className="flex">
          <Input
            className="border-2 rounded-lg focus-visible:ring-0 border-primary rounded-r-none "
            placeholder="Search by name"
            onChange={(e) => (ref.current = e.target.value)}
            type="text"
          />
          <Button className="rounded-l-none" onClick={makeSearch}>
            <SearchIcon />
          </Button>
        </div>
      </div>
      <FilteredStations stations={stations} loading={loading} />
    </div>
  );
};

export default Browse;
