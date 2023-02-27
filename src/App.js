import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, PickersDay } from '@mui/x-date-pickers';
import logo from './logo.svg';
import './App.css';
import { Box, TextField } from '@mui/material';
import dayjs from 'dayjs';

function App() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [startCalendarDate, setStartCalendarDate] = useState(dayjs(Date.now()));
  const [secondCalendarDate, setSecondCalendarDate] = useState(dayjs(Date.now()));

  const renderDay = (day, pickersDayProps) => {
    const date = day.date();
    return (
      <PickersDay
        {...pickersDayProps}
        day={day}
        disabled={day.isBefore(dayjs(Date.now()).add(1, 'month'))}
        onDaySelect={newValue => {
          setPickerOpen(false);
          setStartCalendarDate(newValue);
        }}
      >
        {date}
      </ PickersDay >
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          MUI customized 2 month date picer.
        </p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            orientation="portrait"
            open={pickerOpen}
            disablePast
            showDaysOutsideCurrentMonth
            value={startCalendarDate}
            onChange={newValue => {
              setStartCalendarDate(newValue);
              setPickerOpen(false);
            }}
            onMonthChange={newMonth => {
              setSecondCalendarDate(newMonth.add(1, 'month'));
            }}
            renderInput={params => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  {...params}
                  sx={{
                    '.MuiInputBase-input': {
                      padding: '1px 0 2px 14px',
                      color: '#103548',
                    },
                  }}
                  onClick={() => {
                    setPickerOpen(true);
                  }}
                />
              </Box>
            )}
          />
          <DatePicker
            orientation="Landscape"
            open={pickerOpen}
            renderDay={renderDay}
            disableHighlightToday
            disablePast
            value={secondCalendarDate}
            onMonthChange={newMonth => {
              const newStartMonth = newMonth.subtract(1, 'month');
              if (pickerOpen && newStartMonth.isAfter(dayjs(Date.now()))) {
                setStartCalendarDate(newStartMonth);
              }
            }}
            renderInput={params => (
              <Box sx={{ position: 'absolute', opacity: 0, right: '5%' }}>
                <TextField
                  {...params}
                  sx={{
                    '.MuiInputBase-input': { padding: '3px 3px 14px' },
                  }}
                />
              </Box>
            )}
          />
        </LocalizationProvider>
      </header>
    </div>
  );
}

export default App;
