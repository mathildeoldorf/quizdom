import React, { useState } from "react";
const useMessageHandler = (initialState) => {
  const [message, setError] = useState(initialState);
  const showMessage = (resMessage) => {
    console.log(resMessage);
    setError(resMessage);
    window.setTimeout(() => {
      setError(null);
    }, 3000);
  };
  return { message, showMessage };
};
export default useMessageHandler;
