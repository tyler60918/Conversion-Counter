import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import '../stylesheets/InputPage.css';
import { useAuth } from "./ui/AuthContext";
import { supabase } from "./ui/supabase";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { VStack, HStack, Button, Box } from '@chakra-ui/react';

function InputPage() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedButton, setSelectedButton] = useState("")
  const [conversionType, setConversionType] = useState('Accessory');
  const [itemName, setItemName] = useState('');
  const [numAppointments, setNumAppointments] = useState("");
  const { user } = useAuth();
  const convOptions = ['Accessory', 'AppleCare', 'Trade-In', 'Upgrade']

  const handleConversionSubmit = async () => {
    // Do Supabase database addition to conversions
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
    // Do Supabase database addition to appointments
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
        <h2>
          Log Conversion
        </h2>
        <p>Record a sale from your Genius Bar Appointment</p>
        <Box className="appointment-box">
          <DatePicker
            label="Input Date"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            slotProps={{
              textField: { fullWidth: true }
            }}
          />
          <label htmlFor='apptField'>Appointments Taken</label>
          <input type='number' placeholder='0' min={0} id='apptField' value={numAppointments} onChange={(event) => setNumAppointments(event.target.value)} />
          <Button onClick={handleApptsSubmit} >
            Save
          </Button>
          <p>Current: {numAppointments}</p>
        </Box>
        <Box className="conversion-box">
          <h2>Sale Type</h2>
          <VStack>
            <HStack>
              {convOptions.slice(0, 2).map((option) => (
                <Button
                  key={option}
                  onClick={() => {
                    setSelectedButton(option)
                    setConversionType(option)
                  }}
                  bg={selectedButton === option ? '#2F6DDE' : '#fafafa'}
                  color={selectedButton === option ? 'white' : 'black'}
                >
                  {option}
                </Button>
              ))}
            </HStack>
            <HStack>
              {convOptions.slice(2, 4).map((option) => (
                <Button
                  key={option}
                  onClick={() => {
                    setSelectedButton(option)
                    setConversionType(option)
                  }}
                  bg={selectedButton === option ? '#2F6DDE' : '#fafafa'}
                  color={selectedButton === option ? 'white' : 'black'}
                >
                  {option}
                </Button>
              ))}
            </HStack>
          </VStack>

          <h2>Item Description</h2>
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
          <Button onClick={handleConversionSubmit}>
            Add Conversion
          </Button>
        </Box>
      </VStack>
    </LocalizationProvider >
  )
}

export default InputPage