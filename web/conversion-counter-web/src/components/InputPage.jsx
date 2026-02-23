import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import '../App.css';
import { useAuth } from "./ui/AuthContext";
import { supabase } from "./ui/supabase";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { VStack, HStack, Button } from '@chakra-ui/react';

function InputPage() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [inputType, setInputType] = useState('');
  const [conversionType, setConversionType] = useState('Accessory');
  const [itemName, setItemName] = useState('');
  const [numAppointments, setNumAppointments] = useState("");
  const { user } = useAuth();

  const handleConversionSubmit = async () => {
    // Do AWS database addition to conversions
    const { data, error } = await supabase.from("Conversions").insert([
      {
        user_id: user.id,
        date: selectedDate,
        conversion_type: conversionType,
        item_name: itemName
      }
    ]).select('*')
    if (error) {
      console.error("Supabase: " + error.message)
    } else if (data) {
      console.log("Data added!")
      setItemName("")
    }
  }

  const handleApptsSubmit = async () => {
    // Do AWS database addition to appointments
    const { data, error } = await supabase.from("Appointment_Counts").insert([
      {
        user_id: user.id,
        date: selectedDate,
        num_appts: numAppointments
      }
    ]).select('*')
    if (error) {
      console.error("Supabase: " + error.message)
    } else if (data) {
      console.log("Data added!")
      setNumAppointments("")
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <VStack spacing={5}>
        <h1>
          Input Page
        </h1>
        <DatePicker
          label="Input Date"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          slotProps={{
            textField: { fullWidth: true }
          }}
        />
        <p>Selected Date: {selectedDate?.format("DD MMMM, YYYY")}</p>
        <select
          value={inputType}
          onChange={(event) => setInputType(event.target.value)}
        >
          <option value="" disabled>Select an input type</option>
          <option value={'Conversion'}>Conversion</option>
          <option value={'Appointments'}>Number of Appointments</option>
        </select>

        {inputType == 'Conversion' &&
          <>
            <HStack spacing={4}>
              <Button onClick={() => setConversionType('Accessory')}>
                Accessory
              </Button>
              <Button onClick={() => setConversionType('AppleCare')}>
                AppleCare
              </Button>
              <Button onClick={() => setConversionType('Trade-In')}>
                Trade-In
              </Button>
              <Button onClick={() => setConversionType('Upgrade')}>
                Upgrade
              </Button>
            </HStack>

            {conversionType == 'Accessory' &&
              <input placeholder=" Enter accessory that was purchased " value={itemName} onChange={(event) => setItemName(event.target.value)} />
            }
            {conversionType == 'AppleCare' &&
              <input placeholder=" Enter device AppleCare was added to " value={itemName} onChange={(event) => setItemName(event.target.value)} />
            }
            {conversionType == 'Trade-In' &&
              <input placeholder=" Enter device that was traded-in " value={itemName} onChange={(event) => setItemName(event.target.value)} />
            }
            {conversionType == 'Upgrade' &&
              <input placeholder=" Enter device that was purchased " value={itemName} onChange={(event) => setItemName(event.target.value)} />
            }

            <Button onClick={(inputType == 'Conversion') ? handleConversionSubmit : handleApptsSubmit}>
              Add item
            </Button>
          </>
        }

        {inputType == 'Appointments' &&
          <VStack>
            <input placeholder="Enter number of appointments" value={numAppointments} onChange={(event) => setNumAppointments(event.target.value)} />
            <Button onClick={(inputType == 'Conversion') ? handleConversionSubmit : handleApptsSubmit}>
              Submit
            </Button>
          </VStack>
        }
      </VStack>
    </LocalizationProvider>
  )
}

export default InputPage