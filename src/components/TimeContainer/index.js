import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'

const TimeContainer = ({ date, onChange }) => (
  <div className="dateTimeContainer">
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker
        InputProps={{ classes: { root: 'custom' } }}
        className='fontSize'
        value={date}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  </div>
);

export default TimeContainer;