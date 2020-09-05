import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const DateContainer = ({ date, onChange }) => (
  <div className="dateTimeContainer">
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        InputProps={{ classes: { root: 'custom' } }}
        value={date}
        onChange={onChange}
        disableFuture
        format="dd/MM/yyyy"
      />
    </MuiPickersUtilsProvider>
  </div>
);

export default DateContainer;
