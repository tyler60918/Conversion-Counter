import { HStack, VStack } from "@chakra-ui/react";
import { useState } from 'react';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

function StatsPage() {
  const [searchDate, setSearchDate] = useState(/* Today's date */)

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
        Date
      </h2>
      <ul>
        {/* List of items for date */}
      </ul>
      <p>Appointments: </p>
      <p>Conversion %: </p>
      <HStack>
        <DatePicker selected={searchDate} onChange={(date) => setSearchDate(date)} />
        {/* Stepper for date */}
      </HStack>
    </VStack>
  )
}

export default StatsPage