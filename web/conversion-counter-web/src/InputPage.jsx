import DatePicker from "react-datepicker"
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

function InputPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputType, setInputType] = useState('');
  const [conversionType, setConversionType] = useState('Accessory');
  const [itemName, setItemName] = useState('');
  const [numAppointments, setNumAppointments] = useState();

  function handleSubmit() {
    // Do AWS database addition
  }

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

      {inputType == 'Conversion' &&
        <>
          <div>
            <button onClick={() => setConversionType('Accessory')}>
              Accessory
            </button>
            <button onClick={() => setConversionType('AppleCare')}>
              AppleCare
            </button>
            <button onClick={() => setConversionType('Trade-In')}>
              Trade-In
            </button>
            <button onClick={() => setConversionType('Upgrade')}>
              Upgrade
            </button>
          </div>

          {conversionType == 'Accessory' &&
            <input placeholder="Enter accessory that was purchased" value={itemName} onChange={(event) => setItemName(event.target.value)} />
          }
          {conversionType == 'AppleCare' &&
            <input placeholder="Enter device AppleCare was added to" value={itemName} onChange={(event) => setItemName(event.target.value)} />
          }
          {conversionType == 'Trade-In' &&
            <input placeholder="Enter device that was traded-in" value={itemName} onChange={(event) => setItemName(event.target.value)} />
          }
          {conversionType == 'Upgrade' &&
            <input placeholder="Enter device that was purchased" value={itemName} onChange={(event) => setItemName(event.target.value)} />
          }

          <button onClick={handleSubmit}>
            Add item
          </button>
        </>
      }

      {inputType == 'Appointments' &&
        <div>
          <input placeholder="Enter number of appointments" value={numAppointments} onChange={(event) => setNumAppointments(event.target.value)} />
          <button onClick={handleSubmit}>
            Submit
          </button>
        </div>
      }
    </>
  )
}

export default InputPage