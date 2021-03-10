import { useCountries } from "../hooks/useHttp";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import classesCss from "./styles/MainPage.module.scss";

export const MainPage = (props) => {
  const { getCountryFromBase, countryResponse } = useCountries();

  useEffect(() => {
    getCountryFromBase({ key: "short" });
  }, []);

  useEffect(() => {
    props.setSearchbarExists(true);
  }, []);

  let countries;

  const language = "RU";

  if (countryResponse) {
    let indexOfLang = countryResponse.langs.indexOf(language);
    countries = countryResponse.countries.map(
      (country) => country.langData[indexOfLang]
    );
  }

  const filterCountries = (countries) => {
    let filteredCountries = countries;
    if (props.searchbarState) {
      filteredCountries = countries.filter(
        (country) =>
          country.countryName.toLowerCase().includes(props.searchbarState) ||
          country.capitalName.toLowerCase().includes(props.searchbarState)
      );
    }

    return filteredCountries.map((country, index) => {
      return (
        <div key={`countryCard${index}`}>
          <NavLink
            className={classesCss.CountryCard}
            to={`/country/${country.countryName.toLowerCase()}`}
          >
            <div>
              <img
                className={classesCss.CountryCardPhoto}
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"
                alt="flag"
              />
            </div>
            <div>
              {country.countryName}, {country.capitalName}
            </div>
          </NavLink>
        </div>
      );
    });
  };

  return (
    <div className={classesCss.MainPage}>
      {countries && filterCountries([...countries])}
    </div>
  );
};
