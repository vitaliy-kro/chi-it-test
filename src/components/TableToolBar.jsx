import { useState } from 'react';
import {
  IconButton,
  Typography,
  Toolbar,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { FILTER_BUTTONS } from '../consts';
import { useCars } from '../hooks/useCars';

export const TableToolBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { filter, setFilter, filterCars } = useCars();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Toolbar>
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="h1">
        Cars
      </Typography>
      <Tooltip title="Filter cars">
        <>
          <IconButton onClick={handleClick}>
            <FilterListIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {FILTER_BUTTONS.map(b => (
              <MenuItem
                key={b}
                selected={filter === b}
                onClick={e => {
                  setFilter(e.target.textContent);
                  filterCars(e.target.textContent);
                }}
              >
                {b}
              </MenuItem>
            ))}
          </Menu>
        </>
      </Tooltip>
    </Toolbar>
  );
};
