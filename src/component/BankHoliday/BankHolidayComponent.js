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
    <div className="sticker">
      {showHoliday && (
        <div className="banner">
        <h1>Next Bank Holiday</h1>
          <h3>{nextBankDay.title}</h3>
          <h3>{nextBankDay.date}</h3>
          {nextBankDay.bunting && (
            <h2>Get out the Bunting!!</h2>
          )}
        </div>
      )}
    </div>
  );
};
export default BankHolidayComponent;
