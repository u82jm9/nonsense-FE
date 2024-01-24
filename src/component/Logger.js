import axios from "axios";

const LOGGER_API = "http://localhost:8088/demo/Test/LogThis";

const Logger = {
  infoLog: async (message) => {
    message = "INFO!!" + message;
    try {
      await axios.put(LOGGER_API, {
        message: message,
      });
    } catch (err) {
      console.error(err);
    }
  },

  warnLog: async (message) => {
    message = "WARN!!" + message;
    try {
      await axios.put(LOGGER_API, {
        message: message,
      });
    } catch (err) {
      console.error(err);
    }
  },

  errorLog: async (message) => {
    console.error(message)
    message = "ERROR!!" + message;
    try {
      await axios.put(LOGGER_API, {
        message: message,
      });
    } catch (err) {
      console.error(err);
    }
  },
};

export default Logger;
