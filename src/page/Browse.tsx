import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CountrySelection, LanguageSelection, Station } from "@/lib/types";
import FilteredStations from "@/components/Shared/FilteredStations";
import { SelectCountry } from "@/components/Browse/SelectCountry";
import { SelectLanguage } from "@/components/Browse/SelectLanguage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu, SearchIcon } from "lucide-react";
import { useAudio } from "@/contexts/audioContext";
import { useNav } from "@/contexts/navContext";

const Browse = () => {
  const { setOpen } = useNav();

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
    <div className="flex flex-col gap-3 relative">
      <div className="py-6 text-center">
        <h1 className="text-5xl font-bold">Browse</h1>
        <h1 className="text-2xl leading-8  font-thin">Our Top 100 Stations</h1>
      </div>
      <Button
        variant={"unstyled"}
        onClick={() => setOpen(true)}
        className="absolute left-4 top-4 h-16 w-16 lg:hidden "
      >
        <Menu className="w-full h-full" />
      </Button>
      <div className="flex justify-center gap-3 flex-wrap">
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
        <div className="flex  min-w-[200px]">
          <Input
            className="border-2 rounded-lg focus-visible:ring-0 border-primary rounded-r-none font-bold dark:placeholder-primary placeholder-primary"
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
