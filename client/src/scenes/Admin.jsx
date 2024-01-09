import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DataGridCustomColumnMenu from 'components/DataGridCustomColumnMenu';
import Header from 'components/Header';
import React from 'react';
import { useGetAdminsQuery } from 'state/api';

const Admin = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetAdminsQuery();

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.5,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)$2-$3');
      },
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 0.4,
    },
    {
      field: 'occupation',
      headerName: 'Occupation',
      flex: 1,
    },

    {
      field: 'role',
      headerName: 'Role',
      flex: 0.5,
    },
  ];

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='ADMINS' subTitle='Managing admins and list of admins' />
      <Box
        mt='40px'
        height='70vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            borderBottom: 'none',
            color: theme.palette.secondary[100],
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            borderBottom: 'none',
            color: theme.palette.secondary[100],
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            backgroundColor: theme.palette.background.alt,
            borderBottom: 'none',
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data || []}
          columns={columns}
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          slots={{
            columnMenu: DataGridCustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Admin;
