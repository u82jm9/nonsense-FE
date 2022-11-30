import React from "react";
import moment from "moment/moment";
import { Button } from "react-bootstrap";

const SmallWeatherDisplayTable = ({ data, changeTableSize }) => {
  return (
    <div className="small-table">
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>
              Maximum
              <br />
              Temperature (°C)
            </th>
            <th>
              Minimum
              <br />
              Temperature (°C)
            </th>
            <th>
              Average
              <br />
              Temperature (°C)
            </th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, i) => (
            <tr key={i}>
              <td>{moment(data.date).format("dddd")}</td>
              <td>{data.day.maxtemp_c}</td>
              <td>{data.day.mintemp_c}</td>
              <td>{data.day.avgtemp_c}</td>
              <td>
                <img
                  src={require(`../../gifs/${data.day.condition.text}.gif`)}
                  alt={data.day.condition.text}
                />
                <br />
                {data.day.condition.text}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        onClick={() => {
          changeTableSize("2");
        }}
      >
        More
      </Button>
      <Button
        onClick={() => {
          changeTableSize("3");
        }}
      >
        Most
      </Button>
    </div>
  );
};

export default SmallWeatherDisplayTable;
