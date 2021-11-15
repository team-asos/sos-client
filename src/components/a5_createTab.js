import React, { useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CreateSeat from './a5_createSeat';
import CreateRoom from './a5_createRoom';
import CreateFacility from './a5_createFacility';

import '../assets/styles/a5_seatBoard.css';

const CreateTab = ({ clickedColumn, clickedRow, floorInfo }) => {
  console.log(floorInfo);
  const [value, setValue] = useState('seat');

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      secondary: { main: red[900] },
    },
  });

  return (
    <div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <ThemeProvider theme={theme}>
              <TabList
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
              >
                <Tab label="좌석" value="seat" />
                <Tab label="회의실" value="room" />
                <Tab label="시설" value="facility" />
              </TabList>
            </ThemeProvider>
          </Box>
          <TabPanel value="seat">
            <CreateSeat clickedColumn={clickedColumn} clickedRow={clickedRow} />
          </TabPanel>
          <TabPanel value="room">
            <CreateRoom clickedColumn={clickedColumn} clickedRow={clickedRow} />
          </TabPanel>
          <TabPanel value="facility">
            <CreateFacility
              clickedColumn={clickedColumn}
              clickedRow={clickedRow}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default CreateTab;
