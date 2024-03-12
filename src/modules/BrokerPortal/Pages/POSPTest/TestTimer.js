import React from "react";

const padTime = (time) => (String(time).length === 1 ? `0${time}` : `${time}`);

const format = (time) => {
  const hours = Math.floor(time / (60 * 60));
  // Convert seconds into minutes and take the whole part
  const minutesDivisor = time % (60 * 60);
  const minutes = Math.floor(minutesDivisor / 60);

  // Get the seconds left after converting minutes
  const secondsDivisor = minutesDivisor % 60;
  const seconds = Math.ceil(secondsDivisor);

  // Return combined values as string in format mm:ss
  return `${padTime(hours)} : ${padTime(minutes)}:${padTime(seconds)}`;
};

function TestTimer({ counter }) {
  return (
    <div className="App">
      <div>
        {counter === 0 ? "Time over" : "Time left"} - {format(counter)}
      </div>
    </div>
  );
}

export default TestTimer;
