import { useEffect } from 'react';
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useFormik } from 'formik';
import { TABLE_COLUMNS } from '../consts';
import { validationSchema } from '../schemas/car.validation';

export const ModalWindow = ({
  type,
  open,
  setOpen,
  handleClose,
  car,
  handleSubmit,
}) => {
  const initialValues = TABLE_COLUMNS.reduce((acc, c) => {
    if (c.id === 'availability') {
      acc[c.id] = true;
      return acc;
    }

    acc[c.id] = '';
    return acc;
  }, {});

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      handleSubmit(values);
      actions.resetForm();
    },
  });
  useEffect(() => {
    if (car) {
      formik.setValues(
        TABLE_COLUMNS.reduce((acc, c) => {
          acc[c.id] = car[c.id];
          return acc;
        }, {})
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [car]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
            width: 400,
          }}
        >
          <Typography
            component="h2"
            variant="h3"
            sx={{ mb: 3, textAlign: 'center' }}
          >
            {type} your cars
            <form onSubmit={formik.handleSubmit}>
              {TABLE_COLUMNS.map(c => {
                return c.id === 'availability' ? (
                  <FormControlLabel
                    key={c.id}
                    label={c.label}
                    name={c.id}
                    labelPlacement="start"
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                    control={
                      <Switch
                        label={c.label}
                        checked={formik.values[c.id] ?? false}
                        onChange={e =>
                          formik.setFieldValue(c.id, e.target.checked)
                        }
                      />
                    }
                  />
                ) : (
                  <TextField
                    key={c.id}
                    label={c.label}
                    name={c.id}
                    variant="outlined"
                    disabled={type === 'Edit' ? !c.canEdit : false}
                    value={formik.values[c.id] || ''}
                    type={c.id === 'car_model_year' ? 'number' : 'text'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched[c.id] && !!formik.errors[c.id]}
                    helperText={formik.touched[c.id] && formik.errors[c.id]}
                    fullWidth
                    inputProps={{ maxLength: 20 }}
                    sx={{ mb: 2 }}
                  />
                );
              })}
              <Button
                type="submit"
                size="large"
                variant="contained"
                disabled={
                  (formik.errors && Object.keys(formik.errors).length > 0) ||
                  Object.values(formik.values)
                    .filter(value => typeof value !== 'boolean')
                    .some(value => !value)
                }
              >
                {type}
              </Button>
              <Button
                type="button"
                size="large"
                variant="contained"
                color="error"
                onClick={() => setOpen(false)}
                sx={{ ml: 1 }}
              >
                Cancel
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
