import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useCars } from './hooks/useCars';
import { CarsTable } from './components/CarsTable';
import { Filter } from './components/Filter';

function App() {
  const { fetchCars } = useCars();

  useEffect(() => {
    fetchCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Filter />
      <CarsTable />
      <ToastContainer />
    </>
  );
}

export default App;
