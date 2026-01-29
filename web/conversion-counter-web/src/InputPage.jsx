import DatePicker from "react-datepicker"
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

function InputPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <h1>
        Input Page
      </h1>
      <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
      <p>Selected Date: {selectedDate.toDateString()}</p>
    </>
  )
}

export default InputPage