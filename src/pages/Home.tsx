import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { end_day } from "../dateStore";

export default function Home() {
  // One day Time in ms (milliseconds)
  var one_day = 1000 * 60 * 60 * 24;

  const [current_date, setCurrent_date] = useState(
    new Date(2023, 8, new Date().getDate())
  );

  var start_date = new Date(
    current_date.getFullYear(),
    current_date.getMonth(),
    0
  );

  const $end_day = useStore(end_day);
  if ($end_day === null) return <></>;
  const end_date = new Date($end_day);

  // 0-11 is Month in JavaScript

  // To Calculate the result in milliseconds and then converting into days
  var startToCurrent = (
    Math.round(current_date.getTime() - start_date.getTime()) / one_day
  ).toFixed(0);

  var currentToEnd = (
    Math.round(end_date.getTime() - current_date.getTime()) / one_day
  ).toFixed(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent_date(new Date(2023, 8, new Date().getDate()));
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  });
  console.log(startToCurrent);

  return (
    <>
      {
        // if current day is end day
        currentToEnd === "0" && (
          <>
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={100}
            />
          </>
        )
      }
      <div className="flex gap-2 flex-wrap mx-4">
        {
          // Display a div for each day
          [...Array(parseInt(currentToEnd)).keys()].map((i) => (
            <div key={"c" + i} className="w-2 h-8 bg-blue-400"></div>
          ))
        }
        {[...Array(parseInt(startToCurrent)).keys()].map((i) => (
          <div key={"s" + i} className="w-2 h-8 bg-blue-300/20"></div>
        ))}
      </div>
      <div className="flex items-center my-8 flex-col w-full gap-3">
        <p className="text-blue-300/70">
          Es sind noch{" "}
          <span className="animate-pulse text-blue-300 font-bold">
            {currentToEnd} Tage
          </span>{" "}
          bis zum {end_date.toLocaleDateString("de-DE")}
        </p>
        <button
          role="button"
          tabIndex={0}
          onClick={() => {
            var input = window.prompt("Datum eingeben (YYYY-MM-DD)");
            if (input === null) return;
            // check for valid date
            if (isNaN(new Date(input!.toString() + "T00:00:00").getTime())) {
              alert("Ungültiges Datum");
              return;
            }
            // check if date is in the future
            if (
              new Date(input!.toString() + "T23:59:59").getTime() <
              new Date().getTime()
            ) {
              alert("Datum ist in der Vergangenheit");
              return;
            }

            end_day.set(
              (
                new Date(input!.toString() + "T00:00:00") || new Date()
              ).toDateString()
            );
            console.log(current_date);
          }}
          className=" px-4 py-2 bg-blue-300/20 text-white rounded-md"
        >
          Datum ändern
        </button>
      </div>
    </>
  );
}
