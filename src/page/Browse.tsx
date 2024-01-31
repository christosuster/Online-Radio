import { useEffect, useState } from "react";
import axios from "axios";
import { CountrySelection, LanguageSelection, Station } from "@/lib/types";
import FilteredStations from "@/components/FilteredStations";
import { SelectCountry } from "@/components/SelectCountry";
import { SelectLanguage } from "@/components/SelectLanguage";

const Browse = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<String | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<String | null>(null);
  const [countries, setCountries] = useState<CountrySelection[]>([]);
  const [languages, setLanguages] = useState<LanguageSelection[]>([]);
  const [loading, setLoading] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setOptionsLoading(true);

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
    } else {
      axios
        .get("https://de1.api.radio-browser.info/json/stations/topvote/100")
        .then((res) => {
          setStations(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
    // axios
    //   .get("https://de1.api.radio-browser.info/json/stations/topvote/100")
    //   .then((res) => {
    //     setStations(res.data);
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => setLoading(false));

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
      .catch((err) => console.log(err))
      .finally(() => setOptionsLoading(false));
  }, [selectedCountry, selectedLanguage]);

  console.log(selectedCountry);

  return (
    <div className="">
      <div>
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
      </div>
      <FilteredStations stations={stations} loading={loading} />
    </div>
  );
};

export default Browse;
