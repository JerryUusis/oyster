import { AlertColor } from "@mui/material";

interface NewUserObject {
  username: string;
  email: string;
  password: string;
}

// Used with Redux state
interface UserObject {
  uid: string;
  username: string;
  email: string;
  location: string;
  customToken: string;
  languages: string[];
  theme: string;
}

type UserState = UserObject | null;

interface AlertHandlerState {
  severity: AlertColor;
  message: string;
  isVisible: boolean;
}


// https://gitlab.com/restcountries/restcountries/-/blob/master/FIELDS.md
interface CountryObject {
  name: {
    common: string; // The commonly used name
    official: string; // The official name
    nativeName?: {
      [key: string]: {
        official: string; // Official name in native language
        common: string; // Common name in native language
      };
    };
  };
  tld?: string[]; // Top-level domain(s)
  cca2: string; // ISO 3166-1 alpha-2 code
  ccn3?: string; // Numeric code
  cca3: string; // ISO 3166-1 alpha-3 code
  cioc?: string; // International Olympic Committee code
  independent?: boolean; // Independence status
  status: string; // "official" or other status
  unMember: boolean; // United Nations membership
  currencies?: {
    [code: string]: {
      name: string; // Name of the currency
      symbol: string; // Currency symbol
    };
  };
  idd: {
    root: string; // Root of the international dialing code
    suffixes: string[]; // Suffixes for the dialing code
  };
  capital?: string[]; // Capital cities
  altSpellings: string[]; // Alternative spellings
  region: string; // Region, e.g., "Europe"
  subregion?: string; // Subregion, e.g., "Northern Europe"
  languages?: { [key: string]: string }; // Languages spoken
  translations: {
    [key: string]: {
      official: string; // Official translation
      common: string; // Common translation
    };
  };
  latlng: [number, number]; // Latitude and longitude
  landlocked: boolean; // Landlocked status
  borders?: string[]; // Neighboring countries
  area: number; // Area in square kilometers
  demonyms?: {
    [key: string]: {
      f: string; // Female demonym
      m: string; // Male demonym
    };
  };
  flag: string; // Unicode emoji flag
  maps: {
    googleMaps: string; // Google Maps link
    openStreetMaps: string; // OpenStreetMap link
  };
  population: number; // Population size
  gini?: { [year: string]: number }; // Gini index
  fifa?: string; // FIFA code
  car: {
    signs: string[]; // Vehicle signs
    side: string; // Driving side ("right" or "left")
  };
  timezones: string[]; // Time zones
  continents: string[]; // Continents
  flags: {
    svg: string; // Flag in SVG format
    png: string; // Flag in PNG format
  };
  coatOfArms?: {
    svg?: string; // Coat of arms in SVG format
    png?: string; // Coat of arms in PNG format
  };
  startOfWeek: string; // Start day of the week
  capitalInfo?: {
    latlng: [number, number]; // Latitude and longitude of the capital
  };
  postalCode?: {
    format: string; // Postal code format
    regex: string; // Postal code regex
  };
}

type CountriesState = CountryObject[] | null;

export {
  NewUserObject,
  UserObject,
  AlertHandlerState,
  UserState,
  CountriesState,
  CountryObject,
};
