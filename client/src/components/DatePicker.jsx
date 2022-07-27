import { useState } from 'react';
import DatePicker from "react-datepicker";
import StyledDatePicker from "../assets/StyledDatePicker";
import { formatISO } from 'date-fns';

export default function DatePickerComponent({ onChange }) {
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (date) => {
        setStartDate(date);
        onChange(formatISO(date));
    }

    return (
        <StyledDatePicker>
            <DatePicker
                showTimeSelect
                selected={startDate}
                onChange={handleDateChange}
                minDate={new Date()}
                minTime={
                    new Date().getDate() ===
                        new Date(startDate ?? new Date().getTime()).getDate()
                        ? new Date()
                        : new Date().setHours(0, 0, 0)
                }
                maxTime={new Date().setHours(23, 59, 59)}
            />
        </StyledDatePicker>
    );
}
