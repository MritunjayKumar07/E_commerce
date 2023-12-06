import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { ToastData } from '../server/ApiNotifucationToast';

export default function NotificationToast() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [seconds]);

  return (
    <>
      {seconds === 0 ? ToastData.map((toast) => (
        <div key={toast.id} className="notification-toast" data-toast>
          <button className="toast-close-btn" data-toast-close onClick={() => setSeconds(5 * 60)}>
            <IoMdClose />
          </button>

          <div className="toast-banner">
            <img src={toast.img} alt={toast.toast_Title} width="80" height="70" />
          </div>

          <div className="toast-detail">
            <p className="toast-message">{toast.toast_message}</p>
            <p className="toast-title">{toast.toast_Title}</p>
            <p className="toast-meta">
              <time dateTime={`PT${toast.toast_meta}`}>{toast.toast_meta}</time> ago
            </p>
          </div>
        </div>
      )) : null}
    </>
  );
}
