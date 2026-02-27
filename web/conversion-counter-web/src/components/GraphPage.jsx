import { BarChart } from '@mui/x-charts/BarChart';
import { HStack, VStack, Skeleton, Button } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { supabase } from "./ui/supabase";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../App.css';
import { useAuth } from "./ui/AuthContext"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

function GraphPage() {
  const [startDate, setStartDate] = useState(dayjs)
  const [endDate, setEndDate] = useState(dayjs)
  const today = dayjs()
  const startOfYear = dayjs().startOf('year')

  useEffect(() => {
    setStartDate(startDate.subtract(1, 'week'))
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <VStack>
        <h1>
          Graph Page
        </h1>
        <HStack>
          <Button onClick={() => {
            setStartDate(today.subtract(1, 'week'))
          }}>
            Week
          </Button>
          <Button onClick={() => {
            setStartDate(today.subtract(1, 'month'))
          }}>
            Month
          </Button>
          <Button onClick={() => {
            setStartDate(startOfYear)
          }}>
            YTD
          </Button>
          <Button onClick={() => {
            setStartDate(today.subtract(1, 'year'))
          }}>
            Year
          </Button>
        </HStack>

        <HStack>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            slotProps={{
              textField: { fullWidth: true }
            }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            slotProps={{
              textField: { fullWidth: true }
            }}
          />
        </HStack>
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: ['23 Feb', '24 Feb', '25 Feb'],
              height: 28,
            },
          ]}
          series={[
            {
              data: [14, 20, 15],
            },
          ]}
          height={300}
        />
      </VStack>
    </LocalizationProvider>
  )
}

export default GraphPage