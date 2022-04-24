import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { Toast } from "../components";

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toastList, setToastList] = useState([]);

  const displayToast = (newToast) => {
    setToastList((prev) => [...prev, { _id: uuid(), ...newToast }]);
  };
  const removeToast = (currentToastID) => {
    setToastList((prev) =>
      prev.filter((toast) => toast._id !== currentToastID)
    );
  };

  const value = { toastList, displayToast, removeToast };
  return (
    <ToastContext.Provider value={value}>
      {children}
      {toastList.map(({ _id, toastType, toastMessage }) => (
        <Toast
          key={_id}
          toastType={toastType}
          toastMessage={toastMessage}
          removeToast={() => {
            removeToast(_id);
          }}
        />
      ))}
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export { useToast, ToastProvider };
