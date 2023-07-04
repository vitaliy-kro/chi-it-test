import { useState } from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useCars } from '../hooks/useCars';
import { ModalWindow } from './Modal';
import { TableToolBar } from './TableToolBar';
import { TABLE_COLUMNS } from '../consts';
import { toastSuccess } from '../helpers/toast-notifications';

export const CarsTable = () => {
  const { cars, searchedCars, filteredCars, editCar, deleteCar } = useCars();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCar, setEditedCar] = useState(null);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = id => {
    const confirmation = window.confirm('Are you sure you want to delete?');
    if (confirmation) {
      deleteCar(id);
      toastSuccess('Successfully deleted!');
    }
  };
  const handleSubmit = values => {
    editCar({ ...values, id: editedCar.id });
    setIsModalOpen(false);
    toastSuccess('Successfully edited!');
    setEditedCar(null);
  };

  const renderTableCell = (row, column) => {
    const value = row[column.id];
    return (
      <TableCell key={column.id} align={column.align}>
        {column.format && typeof value === 'boolean'
          ? column.format(value)
          : value}
      </TableCell>
    );
  };

  const carsToRender =
    searchedCars.length || filteredCars.length
      ? filteredCars.length
        ? filteredCars
        : searchedCars
      : cars;

  const renderedRows = carsToRender
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(row => (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        {TABLE_COLUMNS.map(column => renderTableCell(row, column))}
        <TableCell align="center">
          <IconButton
            onClick={() => {
              setIsModalOpen(true);
              setEditedCar(row);
            }}
            color="primary"
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(row.id)}
            color="secondary"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ));

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableToolBar />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {TABLE_COLUMNS.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center" style={{ minWidth: 70 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderedRows}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={
          filteredCars.length || searchedCars.length
            ? filteredCars.length
              ? filteredCars.length
              : searchedCars.length
            : cars.length
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ModalWindow
        open={isModalOpen}
        setOpen={setIsModalOpen}
        type={'Edit'}
        car={editedCar}
        handleSubmit={handleSubmit}
      />
    </Paper>
  );
};

export default CarsTable;
