import axios from "axios";

const LOGGER_API = "http://localhost:8088/demo/Test/LogThis";

const Logger = {
  infoLog: async (m) => {
    const log = { level: "INFO", message: m };
    try {
      await axios.put(LOGGER_API, log);
    } catch (err) {
      console.error(err);
    }
  },

  warnLog: async (m) => {
    const log = {
      level: "WARN",
      message: m,
      timeStamp: new Date().toISOString(),
    };
    try {
      logToLocalStorage(log);
    } catch (err) {
      console.error(err);
    }
  },

  errorLog: async (m) => {
    console.error(m);
    let log = { level: "ERROR", message: m };
    try {
      await axios.put(LOGGER_API, log);
      log.timeStamp = new Date().toISOString();
      logToLocalStorage(log);
    } catch (err) {
      console.error(err);
    }
  },
};

function logToLocalStorage(l) {
  const existingLogs = JSON.parse(localStorage.getItem("logs") || []);
  const updatedLogs = [...existingLogs, l];
  localStorage.setItem("logs", JSON.stringify(updatedLogs));
}

export default Logger;
