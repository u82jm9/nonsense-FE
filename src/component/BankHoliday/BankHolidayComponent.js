import axios from "axios";
import React, { useEffect, useState } from "react";
import Logger from "../Logger";

const BANK_HOLIDAY_API = "https://www.gov.uk/bank-holidays.json";
const today = new Date();
const BankHolidayComponent = () => {
  const [showHoliday, setShowHoliday] = useState(false);
  const [bankDays, setBankDays] = useState([]);
  const [nextBankDay, setNextBankDay] = useState();
  const [findNextDate, setFindNextDate] = useState(true);
  useEffect(() => {
    getBankHolidays();
  }, []);

  async function getBankHolidays() {
    Logger.infoLog("Getting Bank Holidays from ONLINE!!");
    try {
      let b = await axios.get(BANK_HOLIDAY_API);
      const tempDays = b.data.scotland.events.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      setBankDays(tempDays);
      getNextDay(tempDays);
    } catch (err) {
      Logger.errorLog(err);
    }
  }

  function getNextDay(days) {
    for (let i = 0; i < days.length; i++) {
      const eventDate = new Date(days[i].date);
      if (eventDate >= today && findNextDate) {
        Logger.infoLog("Next Bank Holiday event set!!");
        setNextBankDay(days[i]);
        setFindNextDate(false);
        break;
      }
    }
    setShowHoliday(true);
  }

  return (
    <>
      <div className="right-sticker">
        {showHoliday && (
          <div className="right-banner">
            <h1>Bank Holiday</h1>
            <h2>{nextBankDay.title}</h2>
            <h2>{nextBankDay.date.split("-").reverse().join("/")}</h2>
          </div>
        )}
      </div>
      {nextBankDay.bunting && (
        <div className="left-sticker">
          <div className="left-banner">
            <h1>GET OUT THE BUNTING!!</h1>
          </div>
        </div>
      )}
    </>
  );
};
export default BankHolidayComponent;
