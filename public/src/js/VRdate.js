//To easily select something from the DOM
VR.date = (function () {
  let dates = {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  };

  function readableDate(unfromatedDate) {
    let newDate = new Date(unfromatedDate);
    let month = dates.months[newDate.getMonth()];
    let date = newDate.getDate();
    let day = dates.days[newDate.getDay()];
    let year = newDate.getFullYear();

    return day + ' ' + date + ' ' + month + ' ' + year;
  }


  return { //return only the funtions that are nesseeriy
    readableDate: readableDate
  };
})();
