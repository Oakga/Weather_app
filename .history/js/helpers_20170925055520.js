const convertToDateTime = (time) => {
    let date = new Date(time*1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    year = date.getFullYear();
    month = months[date.getMonth()];
    numDate = date.getDate();
    formattedTime = numDate + ' ' + month + ' ' + year;
    return formattedTime;
};

const convertToUnixTime = (time) => {
    return Date.parse(time)/1000;
};