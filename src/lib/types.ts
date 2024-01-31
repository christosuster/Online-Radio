export type Station = {
  name: string;
  serveruuid: string;
  country: string;
  language: string;
  url: string;
  votes: number;
  favicon: string;
  tags: string;
};

export type CountrySelection = {
  name: string;
  stationcount: number;
  iso_3166_1: string;
};

export type LanguageSelection = {
  name: string;
  stationcount: number;
  iso_639: string;
};

export type StationLocation = {
  name: string;
  serveruuid: string;
  tags: string;
  url: string;
  language: string;
  votes: number;
  favicon: string;
  country: string;
  geo_lat: number;
  geo_long: number;
};
