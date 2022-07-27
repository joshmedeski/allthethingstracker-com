import React, { useMemo } from "react";
import { format, getDaysInMonth, isSameDay } from "date-fns";
import { getFirstDayOfMonthGridOffsetClass } from "./date.utils";
import clsx from "clsx";

const Month: React.FC<{ selectedDate?: Date }> = ({
  selectedDate = new Date(),
}) => {
  const monthName = format(selectedDate, "MMMM");
  const firstDayOfMonthGridOffsetClass =
    getFirstDayOfMonthGridOffsetClass(selectedDate);
  const month = useMemo<{ day: number; date: Date }[]>(
    () =>
      [...Array(getDaysInMonth(selectedDate)).keys()]
        .map((d) => d + 1) // add 1 to make it 1-indexed
        .map((d) => ({
          day: d,
          date: new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            d
          ),
        })),
    [selectedDate]
  );

  return (
    <section>
      <h1 className="mb-2 text-2xl font-bold">{monthName}</h1>
      <header className="mb-2 grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div className="font-semibold" key={day}>
            {day}
          </div>
        ))}
      </header>

      <div className="grid grid-cols-7">
        {month.map(({ day }, i) => (
          <div
            key={day}
            className={clsx(
              "aspect-square w-full p-2",
              i === 0 && firstDayOfMonthGridOffsetClass,
              isSameDay(month[i].date, selectedDate) &&
                "rounded-2xl bg-neutral-subtle"
            )}
          >
            <strong>{day}</strong>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Month;
