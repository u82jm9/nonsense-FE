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
    const log = { level: "WARN", message: m };
    try {
      await axios.put(LOGGER_API, log);
    } catch (err) {
      console.error(err);
    }
  },

  errorLog: async (m) => {
    console.error(m);
    const log = { level: "ERROR", message: m };
    try {
      await axios.put(LOGGER_API, log);
    } catch (err) {
      console.error(err);
    }
  },
};

export default Logger;
