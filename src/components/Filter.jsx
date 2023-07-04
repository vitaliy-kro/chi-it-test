import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Formik, Form, Field } from 'formik';
import { useCars } from '../hooks/useCars';
import { TABLE_COLUMNS } from '../consts';
import { ModalWindow } from './Modal';
import { toastSuccess } from '../helpers/toast-notifications';

export const Filter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carDefaultState = TABLE_COLUMNS.reduce((acc, c) => {
    if (c.id === 'availability') {
      acc[c.id] = true;
      return acc;
    }

    acc[c.id] = '';
    return acc;
  }, {});
  const [car, setCar] = useState(carDefaultState);

  const {
    searchCars,
    searchText,
    setSearchText,
    addCar,
    searchedCars,
    handleBackToMain,
  } = useCars();

  const handleSearchCars = () => {
    searchCars();
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAddCar = c => {
    addCar(c);
    setIsModalOpen(false);
    toastSuccess('Car added successfully');
    setCar(carDefaultState);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: searchedCars.length ? 'space-between' : 'flex-end',
        }}
      >
        {!!searchedCars.length && (
          <Button startIcon={<ArrowBackIcon />} onClick={handleBackToMain}>
            Back to main
          </Button>
        )}
        <div style={{ display: 'flex' }}>
          <Formik initialValues={{ searchText }} onSubmit={handleSearchCars}>
            <Form style={{ display: 'flex' }}>
              <Field
                as={TextField}
                name="searchText"
                placeholder="Search by company, model, etc."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </Form>
          </Formik>
          <Button type="button" onClick={handleOpenModal}>
            Add car
          </Button>
        </div>
      </div>
      <ModalWindow
        open={isModalOpen}
        setOpen={setIsModalOpen}
        type={'Add'}
        car={car}
        setCar={setCar}
        handleSubmit={handleAddCar}
      />
    </>
  );
};
