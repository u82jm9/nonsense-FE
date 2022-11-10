import React from "react";
import moment from "moment/moment";

const LargeWeatherDisplayTable = ({ city, data, hotHour, coldHour }) => {
  return (
    <div className="weather-table">
      <h1>{city}</h1>
      <div className="large-table">
        <table>
          <thead>
            <tr>
              <th rowSpan={2}>Day</th>
              <th rowSpan={2}>Sunrise</th>
              <th rowSpan={2}>Sunset</th>
              <th rowSpan={2}>
                Max
                <br />
                Temp (°C)
              </th>
              <th rowSpan={2}>
                Min
                <br />
                Temp (°C)
              </th>
              <th colSpan={7}>Conditions</th>
              <th colSpan={2}>Hottest!</th>
              <th colSpan={2}>Coldest!</th>
            </tr>
            <tr>
              <th>8am</th>
              <th>10am</th>
              <th>Noon</th>
              <th>2pm</th>
              <th>4pm</th>
              <th>6pm</th>
              <th>8pm</th>
              <th>Hour</th>
              <th>Temp (°C)</th>
              <th>Hour</th>
              <th>Temp (°C)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, i) => (
              <tr key={i}>
                <td>{moment(data.date).format("dddd")}</td>
                <td>{data.astro.sunrise}</td>
                <td>{data.astro.sunset}</td>
                <td>{data.day.maxtemp_c}</td>
                <td>{data.day.mintemp_c}</td>
                <td>
                  <img
                    src={require(`../../gifs/${data.hour[7].condition.text}.gif`)}
                    alt={data.hour[7].condition.text}
                  />
                  <br />
                  {data.hour[7].condition.text}
                </td>
                <td>
                  <img
                    src={require(`../../gifs/${data.hour[9].condition.text}.gif`)}
                    alt={data.hour[9].condition.text}
                  />
                  <br />
                  {data.hour[9].condition.text}
                </td>
                <td>
                  <img
                    src={require(`../../gifs/${data.hour[11].condition.text}.gif`)}
                    alt={data.hour[11].condition.text}
                  />
                  <br />
                  {data.hour[11].condition.text}
                </td>
                <td>
                  <img
                    src={require(`../../gifs/${data.hour[13].condition.text}.gif`)}
                    alt={data.hour[13].condition.text}
                  />
                  <br />
                  {data.hour[13].condition.text}
                </td>
                <td>
                  <img
                    src={require(`../../gifs/${data.hour[15].condition.text}.gif`)}
                    alt={data.hour[15].condition.text}
                  />
                  <br />
                  {data.hour[15].condition.text}
                </td>
                <td>
                  <img
                    src={require(`../../gifs/${data.hour[17].condition.text}.gif`)}
                    alt={data.hour[17].condition.text}
                  />
                  <br />
                  {data.hour[17].condition.text}
                </td>
                <td>
                  <img
                    src={require(`../../gifs/${data.hour[19].condition.text}.gif`)}
                    alt={data.hour[19].condition.text}
                  />
                  <br />
                  {data.hour[19].condition.text}
                </td>
                <td>{hotHour.time}</td>
                <td>{hotHour.temp}</td>
                <td>{coldHour.time}</td>
                <td>{coldHour.temp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LargeWeatherDisplayTable;
