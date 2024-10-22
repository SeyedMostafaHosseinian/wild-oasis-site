"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

const ReservationContext = createContext<{
  range: DateRange;
  updateRange: (v: undefined | DateRange) => void;
  resetRange: () => void;
}>({
  range: { from: undefined, to: undefined },
  updateRange: () => {},
  resetRange: () => {},
});

export default function ReservationProvider({ children }: { children: any }) {
  const [range, setRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const resetRange = () => setRange({ from: undefined, to: undefined });
  const updateRange = (v: undefined | DateRange) => {
    console.log(v);
    if (!v) return setRange({ from: undefined, to: undefined });
    setRange(v as DateRange);
  };
  return (
    <ReservationContext.Provider value={{ range, updateRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) throw new Error("out of range use of context ");
  return context;
}
