import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { QUERY_KEYS } from '../consts';
import { extractNumericValue } from '../helpers/extractNumericValue';
import { toastError } from '../helpers/toast-notifications';

axios.defaults.baseURL = QUERY_KEYS.BACKEND_URL;
const CarsContext = createContext();

export const useCars = () => useContext(CarsContext);

export const CarsProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedCars, setSearchedCars] = useState([]);
  const [filter, setFilter] = useState('All');
  const [filteredCars, setFilteredCars] = useState([]);

  const fetchCars = async () => {
    try {
      const res = await axios.get(QUERY_KEYS.CARS);
      setCars(res.data.cars);
      return res.data;
    } catch (e) {
      setError(e);
    }
  };

  const searchCars = () => {
    if (!searchText.trim()) {
      return;
    }
    const regex = new RegExp(searchText, 'i');

    const filterResult = cars.filter(
      ({ car, car_color, car_model, car_model_year, car_vin }) =>
        regex.test(car) ||
        regex.test(car_color) ||
        regex.test(car_model) ||
        regex.test(car_model_year) ||
        regex.test(car_vin)
    );

    if (!filterResult.length) {
      return toastError('No results to show');
    }
    setFilter('All');
    setFilteredCars([]);
    setSearchedCars(filterResult);
  };

  const filterCars = value => {
    let filterResult = searchedCars.length ? [...searchedCars] : [...cars];

    const filterOptions = {
      'Price: lowest first': (a, b) =>
        parseFloat(extractNumericValue(a.price)) -
        parseFloat(extractNumericValue(b.price)),
      'Price: highest first': (a, b) =>
        parseFloat(extractNumericValue(b.price)) -
        parseFloat(extractNumericValue(a.price)),
      'Year: newest first': (a, b) => b.car_model_year - a.car_model_year,
      'Year: oldest first': (a, b) => a.car_model_year - b.car_model_year,
      'Only available': (a, b) =>
        a.availability === b.availability ? 0 : a.availability ? -1 : 1,
    };

    filterResult.sort(filterOptions[value]);
    setFilteredCars(filterResult);
  };

  const handleBackToMain = () => {
    setFilteredCars([]);
    setSearchedCars([]);
    setSearchText('');
    setFilter('All');
  };

  const addCar = car => {
    setCars(prev => [...prev, { ...car, id: cars[cars.length - 1].id + 1 }]);
  };

  const deleteCar = id => {
    setCars(prevCars => prevCars.filter(car => car.id !== id));
    setSearchedCars(prevSearchedCars =>
      prevSearchedCars.filter(car => car.id !== id)
    );
    setFilteredCars(prevFilteredCars =>
      prevFilteredCars.filter(car => car.id !== id)
    );
  };

  const editCar = car => {
    setCars(prevCars => prevCars.map(c => (c.id === car.id ? car : c)));
    setSearchedCars(prevSearchedCars =>
      prevSearchedCars.map(c => (c.id === car.id ? car : c))
    );
    setFilteredCars(prevFilteredCars =>
      prevFilteredCars.map(c => (c.id === car.id ? car : c))
    );
  };

  return (
    <CarsContext.Provider
      value={{
        addCar,
        deleteCar,
        editCar,
        fetchCars,
        cars,
        error,
        filter,
        setFilter,
        searchCars,
        filterCars,
        searchedCars,
        filteredCars,
        searchText,
        setSearchText,
        handleBackToMain,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};
