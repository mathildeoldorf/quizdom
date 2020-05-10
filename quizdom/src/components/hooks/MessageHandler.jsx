import { useState } from "react";
const useMessageHandler = (initialState) => {
  const [message, setMessage] = useState(initialState);
  const showMessage = (resMessage) => {
    console.log(resMessage);
    setMessage(resMessage);

    document.querySelector(".message").classList.add("appear");
    setTimeout(() => {
      document.querySelector(".message").classList.remove("appear");
    }, 5000);
  };
  return { message, showMessage };
};
export default useMessageHandler;
