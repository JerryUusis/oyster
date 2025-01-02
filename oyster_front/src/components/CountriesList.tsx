import { useAppSelector } from "../store/hooks";
import CountryBlock from "./CountryBlock";

const CountriesList = () => {
  const countries = useAppSelector((state) => state.countries);

  return (
    <>
      {countries?.map((country) => (
        <CountryBlock country={country} key={country.name.common} />
      ))}
    </>
  );
};

export default CountriesList;
