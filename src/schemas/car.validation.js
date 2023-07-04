import * as yup from 'yup';
export const validationSchema = yup.object({
  car: yup
    .string()
    .max(50, 'Car company name must be at most 50 characters')
    .matches(
      /^[A-Za-z]+$/,
      'Invalid car company name format, must contain only letters'
    )
    .required('Car company name is required'),
  car_model: yup
    .string()
    .max(25, 'Car model must be at most 25 characters')
    .required('Car model is required'),
  car_vin: yup
    .string()
    .matches(/^[A-HJ-NPR-Z0-9]{17}$/, 'Invalid VIN format')
    .required('Car VIN code is required'),
  car_color: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Invalid color format')
    .required('Car color is required'),
  car_model_year: yup
    .number()
    .integer()
    .min(1900, 'Invalid car year')
    .max(new Date().getFullYear(), 'Invalid car year')
    .required('Car year is required'),
  price: yup
    .string()
    .matches(
      /^\$\d+(,\d{3})*(\.\d{2})?$/,
      'Invalid price format, must be $3000.45'
    )
    .required('Car price is required'),
  availability: yup.boolean().required('Availability is required'),
});
