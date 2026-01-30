import DatePicker from "react-datepicker"
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

function InputPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputType, setInputType] = useState('')

  return (
    <>
      <h1>
        Input Page
      </h1>
      <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
      <p>Selected Date: {selectedDate.toDateString()}</p>
      <select value={inputType} onChange={(event) => setInputType(event.target.value)}>
        <option value="" disabled>Select an option</option>
        <option value={'Conversion'}>Conversion</option>
        <option value={'Appointments'}>Number of Appointments</option>
      </select>

      {inputType == 'Conversion' && <p>Conversion Selected</p>}
      {inputType == 'Appointments' && <p>Appointments Selected</p>}
    </>
  )
}

export default InputPage