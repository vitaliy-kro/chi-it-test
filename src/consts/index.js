export const QUERY_KEYS = {
  BACKEND_URL: 'https://myfakeapi.com/api',
  CARS: '/cars',
};

export const TABLE_COLUMNS = [
  { id: 'car', label: 'Company', minWidth: 100, align: 'left', canEdit: false },
  {
    id: 'car_model',
    label: 'Model',
    minWidth: 100,
    align: 'left',
    canEdit: false,
  },
  {
    id: 'car_vin',
    label: 'VIN',
    minWidth: 150,
    align: 'center',
    canEdit: false,
  },
  {
    id: 'car_color',
    label: 'Color',
    minWidth: 50,
    align: 'center',
    canEdit: true,
  },
  {
    id: 'car_model_year',
    label: 'Year',
    minWidth: 50,
    align: 'center',
    canEdit: false,
  },
  { id: 'price', label: 'Price', minWidth: 50, align: 'center', canEdit: true },
  {
    id: 'availability',
    label: 'Availability',
    minWidth: 30,
    align: 'center',
    canEdit: true,
    format: value => (value ? '✅' : '❌'),
  },
];

export const FILTER_BUTTONS = [
  'All',
  'Price: lowest first',
  'Price: highest first',
  'Year: newest first',
  'Year: oldest first',
  'Only available',
];
