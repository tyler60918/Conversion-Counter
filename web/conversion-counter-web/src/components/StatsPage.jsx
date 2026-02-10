import { HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { Provider } from "./ui/provider";
import { supabase } from "./ui/supabase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css';

function getPostgresDate(jsDate) {
  const year = jsDate.getFullYear();
  // getUTCMonth() returns 0-indexed month, so add 1
  const month = (jsDate.getMonth() + 1).toString().padStart(2, '0');
  const day = jsDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function StatsPage() {
  const today = new Date();

  const [searchDate, setSearchDate] = useState(getPostgresDate(today))
  const [rows, setRows] = useState([])

  console.log(searchDate)

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('Conversions').select('*').eq('date', searchDate);

      if (data) {
        setRows(data)
      }

      if (error) {
        console.error("Supabase error:", error);
      }
    }

    getData()
  }, [searchDate])


  return (
    <Provider>
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
        <p>Appointments: </p>
        <p>Conversion %: </p>
        <HStack>
          <DatePicker selected={searchDate} onChange={(date) => setSearchDate(getPostgresDate(date))} />
          {/* Stepper for date */}
        </HStack>
      </VStack>
    </Provider>
  )
}

export default StatsPage