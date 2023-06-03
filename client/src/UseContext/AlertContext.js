import { createContext, useState } from "react";

//create a context, with createContext api
export const alertContext = createContext();

const AlertDetailsProvider = (props) => {
  // this state will be shared with all components
  const [OpenAlert, setOpenAlert] = useState(false);
  const [Message, setMessage] = useState("");
  const [AlertType, setAlertType] = useState("info");
  const [openBackDrop, setOpenBackDrop] = useState(false);

  return (
    // this is the provider providing state
    <alertContext.Provider
      value={{
        OpenAlert,
        setOpenAlert,
        Message,
        setMessage,
        AlertType,
        setAlertType,
        openBackDrop,
        setOpenBackDrop,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertDetailsProvider;
