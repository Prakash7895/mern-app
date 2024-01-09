import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';
import React, { useState } from 'react';
import FlexBetween from './FlexBetween';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

const DataGridCustomToolbar = ({ setSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <GridToolbarContainer>
      <FlexBetween width='100%' className='Prakash'>
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label='Search...'
          sx={{ mb: '0.5rem', width: '15rem' }}
          value={searchInput}
          variant='standard'
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput('');
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
