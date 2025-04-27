import { useState } from "react";

const useApiErrorHandler = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleApiError = (error) => {
    if (!error) return;

    let message = "An unexpected error occurred.";

    if (error.response) {
      const { status, data } = error.response;
      if (status >= 400 && status < 500) {
        message = data.message || "Client error. Please check your request.";
      } else if (status >= 500) {
        message = "Server error. Please try again later.";
      }
    } else if (error.request) {
      message = "No response from server. Check your network connection.";
    } else {
      message = error.message || "Unknown error occurred.";
    }

    setErrorMessage(message);
  };

  return { errorMessage, handleApiError };
};

export default useApiErrorHandler;
