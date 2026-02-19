import { HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { supabase } from "./ui/supabase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';
import { useAuth } from "./ui/AuthContext"

function getPostgresDate(jsDate) {
  const year = jsDate.getFullYear();
  // getMonth() returns 0-indexed month, so add 1
  const month = (jsDate.getMonth() + 1).toString().padStart(2, '0');
  const day = jsDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function StatsPage() {
  const today = new Date();

  const [searchDate, setSearchDate] = useState(getPostgresDate(today))
  const [rows, setRows] = useState([])
  const [numAppts, setNumAppts] = useState(0)

  const { user } = useAuth()

  useEffect(() => {
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
        setNumAppts(data[0].num_appts)
      }

      if (error) {
        console.error("Supabase error:", error);
      }
    }

    getConversionData()
    getAppointmentData()
  }, [searchDate])

  return (
    <VStack>
      <h1>
        Stats Page
      </h1>
      <HStack>
        <button>
          Filter
        </button>
        <button>
          Edit
        </button>
      </HStack>
      <h2>
        {searchDate}
      </h2>
      <div>
        {rows.map((row) => (
          <li key={row.id}>
            {row.conversion_type} - {row.item_name}
          </li>
        ))}
      </div>
      <p>Appointments: {numAppts}</p>
      <p>Conversion %: {(rows.length / numAppts) * 100}%</p>
      <HStack>
        <DatePicker selected={searchDate} onChange={(date) => setSearchDate(getPostgresDate(date))} />
        {/* Stepper for date */}
      </HStack>
    </VStack>
  )
}

export default StatsPage