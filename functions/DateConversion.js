import React from "react";


export default function convertUTCToLocalTime(dateString) {
      let date = new Date(dateString);
      const milliseconds = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      );
      const localTime = new Date(milliseconds);
      return ((localTime.getMonth()+1)+"/"+localTime.getDate()+"/"+localTime.getFullYear());
    };