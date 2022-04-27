import React, { useEffect } from "react";
import {
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from "../../assets";
import "./toast.css";

const Toast = ({ toastType, toastMessage, removeToast }) => {
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      removeToast();
    }, 3000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  let color, icon;

  switch (toastType) {
    case "success":
      color = "#07c056";
      icon = <SuccessIcon color={color} className="mr-0p5" size={22} />;
      break;
    case "error":
      color = "#ff0000";
      icon = <ErrorIcon color={color} className="mr-0p5" size={22} />;
      break;
    case "info":
      color = "#03a7ff";
      icon = <InfoIcon color={color} className="mr-0p5" size={22} />;
      break;
    case "warning":
      color = "#ffcd03";
      icon = <WarningIcon color={color} className="mr-0p5" size={22} />;
      break;
    default:
      break;
  }

  return (
    <div className="toast-container">
      <CloseIcon className="toast-close-icon icon" onClick={removeToast} />
      <div className="flex-row-center content-start p-1">
        {icon} {toastMessage}
      </div>
      <div className="toast-bar" style={{ backgroundColor: color }}></div>
    </div>
  );
};

export { Toast };
