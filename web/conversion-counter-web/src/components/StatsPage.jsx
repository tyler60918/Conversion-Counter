import { HStack, VStack, Skeleton, Button } from "@chakra-ui/react";
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
  const [filter, setFilter] = useState("")

  const { user } = useAuth()

  useEffect(() => {
    setLoading(true)
    if (!user) {
      return
    }
    const getConversionData = async () => {
      let query = supabase
        .from('Conversions')
        .select('*')
        .eq('date', searchDate)
        .eq('user_id', user.id)
        .order('conversion_type', { ascending: true })

      if (filter != 'All' && filter != "") {
        query.eq('conversion_type', filter);
      }

      const { data, error } = await query

      if (data) {
        setRows(data)
      }

      if (error) {
        console.error("Supabase error:", error);
      }
    }

    const getAppointmentData = async () => {
      let query = supabase
        .from('Appointment_Counts')
        .select('*')
        .eq('date', searchDate)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      const { data, error } = await query

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
  }, [searchDate, editMode, filter])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <VStack>
        <h1>
          Stats Page
        </h1>
        <HStack>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="" disabled>Filter</option>
            <option value={'All'}>All</option>
            <option value={'Accessory'}>Accessories</option>
            <option value={'AppleCare'}>AppleCare</option>
            <option value={'Trade-In'}>Trade-Ins</option>
            <option value={'Upgrade'}>Upgrades</option>
          </select>
          <button onClick={() => { setEditMode(!editMode) }}>
            {editMode ? "Done" : "Edit"}
          </button>
        </HStack>
        <h2>
          {searchDate?.format("DD MMMM, YYYY")}
        </h2>
        <div className="conv-list">
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
        <VStack className="stats-bottom">
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
            <Button onClick={() => { setSearchDate(searchDate.subtract(1, 'day')) }}>
              -
            </Button>
            <Button onClick={() => { setSearchDate(searchDate.add(1, 'day')) }}>
              +
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </LocalizationProvider>
  )
}

export default StatsPage