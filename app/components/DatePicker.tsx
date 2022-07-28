import React from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker: React.FC<{}> = ({}) => {
  const [date, setDate] = React.useState<Date | null>(new Date());

  return (
    <label>
      <span>Date</span>
      <ReactDatePicker
        name="date"
        selected={date}
        onChange={(date) => setDate(date)}
        className="mb-2 w-full flex-1 rounded-md border-2 border-primary px-3 text-lg leading-loose"
      />
    </label>
  );
};

export default DatePicker;
