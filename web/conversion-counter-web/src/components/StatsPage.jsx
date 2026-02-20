import { HStack, VStack, Spinner, Skeleton, Stack } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { supabase } from "./ui/supabase";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../App.css';
import { useAuth } from "./ui/AuthContext"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

const deleteData = async (rowID) => {
  console.log("Row ID: " + rowID)
  const { data, error } = await supabase.from('Conversions').delete().eq('id', rowID).select()

  if (data) {
    console.log("Data removed. Data: " + data)
  } else if (error) {
    console.error("Supabase:", error.message)
  }
}

function StatsPage() {
  const today = new Date();

  const [searchDate, setSearchDate] = useState(dayjs)
  const [rows, setRows] = useState([])
  const [numAppts, setNumAppts] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)

  const { user } = useAuth()

  useEffect(() => {
    setLoading(true)
    if (!user) {
      return
    }
    const getConversionData = async () => {
      const { data, error } = await supabase.from('Conversions').select('*').eq('date', searchDate).eq('user_id', user.id);

      if (data) {
        setRows(data)
      }

      if (error) {
        console.error("Supabase error:", error);
      }
    }

    const getAppointmentData = async () => {
      const { data, error } = await supabase.from('Appointment_Counts').select('*').eq('date', searchDate).eq('user_id', user.id);

      if (data) {
        setNumAppts(data[0] ? (data[0].num_appts) : 0)
      }

      if (error) {
        console.error("Supabase error:", error);
      }
    }

    Promise.all([getConversionData(), getAppointmentData()]).then(() => {
      setLoading(false)
    })
  }, [searchDate, editMode])

  // if (loading) {
  //   return (
  //     <Stack spacing={3}>
  //       <Skeleton height="20px" />
  //       <Skeleton height="20px" />
  //       <Skeleton height="20px" />
  //     </Stack>
  //   )
  // }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <VStack>
        <h1>
          Stats Page
        </h1>
        <HStack>
          <button>
            Filter
          </button>
          <button onClick={() => { setEditMode(!editMode) }}>
            {editMode ? "Done" : "Edit"}
          </button>
        </HStack>
        <h2>
          {searchDate?.format("DD MMMM, YYYY")}
        </h2>
        <div>
          <Skeleton isLoaded={!loading}>
            {rows.map((row) => (
              <li key={row.id}>
                {row.conversion_type} - {row.item_name} {
                  editMode ? <button onClick={() => deleteData(row.id)}>-</button> : <></>
                }
              </li>
            ))}
          </Skeleton>
        </div>
        <p>Appointments: {numAppts}</p>
        <p>Conversion %: {numAppts ? ((rows.length / numAppts) * 100) : 0}%</p>
        <HStack>
          <DatePicker
            label="Stats Date"
            value={searchDate}
            onChange={(date) => setSearchDate(date)}
            slotProps={{
              textField: { fullWidth: true }
            }}
          />
          {/* Stepper for date */}
        </HStack>
      </VStack>
    </LocalizationProvider>
  )
}

export default StatsPage