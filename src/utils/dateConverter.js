const convertDateTimeArrToString = (dateTimeArr, type) => {
    const [year, month, day, hour, minute, second, milliseconds] = dateTimeArr;
    switch (type) {
        case "DATE_TIME":
            return `${hour}:${minute}:${second} ${day}/${month}/${year}`
        case "DATE":
            return `${day}/${month}/${year}`
        case "TIME":
            return `${hour}/${minute}/${second}`
        default:
            throw new Error("convertDateTimeArrToString.type uninplemented or unspecified");
    }
}

export default convertDateTimeArrToString;