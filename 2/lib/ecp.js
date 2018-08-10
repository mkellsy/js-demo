var ECP;
(function (ECP) {
    (function (DataType) {
        DataType[DataType["_AutoNumber"] = 1] = "_AutoNumber";
        DataType[DataType["_Barcode"] = 2] = "_Barcode";
        DataType[DataType["_BigInt"] = 3] = "_BigInt";
        DataType[DataType["_CaseBottle"] = 4] = "_CaseBottle";
        DataType[DataType["_Color"] = 5] = "_Color";
        DataType[DataType["_Currency"] = 6] = "_Currency";
        DataType[DataType["_Date"] = 7] = "_Date";
        DataType[DataType["_DateLocalTime"] = 8] = "_DateLocalTime";
        DataType[DataType["_DateTime"] = 9] = "_DateTime";
        DataType[DataType["_DayOfWeek"] = 10] = "_DayOfWeek";
        DataType[DataType["_Decimal"] = 11] = "_Decimal";
        DataType[DataType["_DocumentURL"] = 12] = "_DocumentURL";
        DataType[DataType["_EAN13"] = 13] = "_EAN13";
        DataType[DataType["_Email"] = 14] = "_Email";
        DataType[DataType["_File"] = 15] = "_File";
        DataType[DataType["_FileSize"] = 16] = "_FileSize";
        DataType[DataType["_GTIN"] = 17] = "_GTIN";
        DataType[DataType["_Hyperlink"] = 18] = "_Hyperlink";
        DataType[DataType["_HTML"] = 19] = "_HTML";
        DataType[DataType["_Identity"] = 20] = "_Identity";
        DataType[DataType["_Integer"] = 21] = "_Integer";
        DataType[DataType["_LocalTime"] = 22] = "_LocalTime";
        DataType[DataType["_MapPolygon"] = 23] = "_MapPolygon";
        DataType[DataType["_MonthAbbr"] = 24] = "_MonthAbbr";
        DataType[DataType["_MonthDay"] = 25] = "_MonthDay";
        DataType[DataType["_MonthName"] = 26] = "_MonthName";
        DataType[DataType["_Months"] = 27] = "_Months";
        DataType[DataType["_None"] = 28] = "_None";
        DataType[DataType["_PalletsCases"] = 29] = "_PalletsCases";
        DataType[DataType["_Password"] = 30] = "_Password";
        DataType[DataType["_Phone"] = 31] = "_Phone";
        DataType[DataType["_PostalCode"] = 32] = "_PostalCode";
        DataType[DataType["_Percentage"] = 33] = "_Percentage";
        DataType[DataType["_Signature"] = 34] = "_Signature";
        DataType[DataType["_Time"] = 35] = "_Time";
        DataType[DataType["_Text"] = 36] = "_Text";
        DataType[DataType["_TextDblSpc"] = 37] = "_TextDblSpc";
        DataType[DataType["_TextEncoded"] = 38] = "_TextEncoded";
        DataType[DataType["_TextNoSpc"] = 39] = "_TextNoSpc";
        DataType[DataType["_TimeZone"] = 40] = "_TimeZone";
        DataType[DataType["_UPC"] = 41] = "_UPC";
        DataType[DataType["_UPCA"] = 42] = "_UPCA";
        DataType[DataType["_UPCE"] = 43] = "_UPCE";
        DataType[DataType["_WeekLocalTime"] = 44] = "_WeekLocalTime";
        DataType[DataType["_YearMonth"] = 45] = "_YearMonth";
        DataType[DataType["_YesNo"] = 46] = "_YesNo";
    })(ECP.DataType || (ECP.DataType = {}));
    var DataType = ECP.DataType;
    class Format {
        constructor() {
            this._userLanguage = "";
            //1,1) MM/DD/YYYY;2,2) YYYY-MM-DD;3,3) DD.MM.YYYY
            this._userDateFormat = 0;
            //1,1) 12 Hour;2, 2) 24 Hour
            this._userTimeFormat = -1;
            //1,1) # (###) ###-####;2,2) AUS: (##) ####-####
            this._userPhoneFormat = -1;
        }
        get userLanguage() {
            if (this._userLanguage === "") {
                this._userLanguage = document.getElementById("UserLanguage").value;
            }
            if (!this._userLanguage || this._userLanguage === "") {
                this._userLanguage = "EN";
            }
            return this._userLanguage;
        }
        ;
        get userDateFormat() {
            if (this._userDateFormat === 0) {
                this._userDateFormat = Number(document.getElementById("UserDateFormat").value);
            }
            return this._userDateFormat;
        }
        ;
        get userTimeFormat() {
            if (this._userTimeFormat == -1) {
                this._userTimeFormat = Number(document.getElementById("UserTimeFormat").value);
            }
            return this._userTimeFormat;
        }
        ;
        get userPhoneFormat() {
            if (this._userPhoneFormat == -1) {
                this._userPhoneFormat = Number(document.getElementById("UserPhoneFormat").value);
            }
            return this._userPhoneFormat;
        }
        ;
        DataTypeParse(DataTypeStr) {
            return DataType["_" + DataTypeStr.replace("_", "")];
        }
        ;
        NullChk(expression, replacement) {
            if (expression === null || typeof expression === "undefined") {
                return replacement;
            }
            else if (expression.toString().length === 0) {
                return replacement;
            }
            else if (expression.toString().toLowerCase() === "null") {
                return replacement;
            }
            else {
                return expression;
            }
        }
        ;
        NullChkStr(expression, replacement) {
            return this.NullChk(expression, replacement).toString();
        }
        ;
        Null2EmptyStr(value) {
            return this.NullChkStr(value, "");
        }
        ;
        Null2NullStr(value) {
            return this.NullChkStr(value, "Null");
        }
        ;
        Null2Zero(value) {
            return this.NullChkStr(value, "0");
        }
        ;
        Null2ZeroInt(value) {
            value = this.NullChkStr(value, "0");
            if (this.isNumber(value)) {
                return Number(value);
            }
            return 0;
        }
        ;
        isNumber(value) {
            if (value === null || value === undefined || value === "")
                return false;
            if (typeof value === "number")
                return true;
            return !isNaN(Number(value));
        }
        ;
        isInteger(value) {
            if (value === null || value === undefined || value === "")
                return false;
            if (parseInt(value.toString()) === parseFloat(value.toString()))
                return true;
            return false;
        }
        ;
        Round(value, decimalPlaces) {
            if (!this.isNumber(value)) {
                return undefined;
            }
            decimalPlaces = this.NullChk(decimalPlaces, 0);
            return Number(Number(value).toFixed(decimalPlaces));
        }
        ;
        Left(value, n) {
            if (n <= 0)
                return "";
            else if (n > value.toString().length)
                return value.toString();
            else
                return value.toString().substring(0, n);
        }
        ;
        Right(value, n) {
            if (n <= 0)
                return "";
            else if (n > value.toString().length)
                return value.toString();
            else {
                let stringLength = value.toString().length;
                return value.toString().substring(stringLength, stringLength - n);
            }
        }
        ;
        Split(value, characters) {
            for (let i = 1; i < characters.length; i++) {
                value = value.replace(characters[i], characters[0]);
            }
            return value.split(characters[0]);
        }
        ;
        ChkDate(value) {
            let isDate = (value instanceof Date);
            if (!isDate) {
                let timestamp = Date.parse(value);
                if (!isNaN(timestamp)) {
                    isDate = true;
                }
            }
            return isDate;
        }
        ;
        ToDate(value) {
            if (value instanceof Date) {
                return value;
            }
            else {
                let myDate = Date.parse(value);
                if (!isNaN(myDate)) {
                    return new Date(myDate);
                }
            }
            return undefined;
        }
        ;
        isEmail(email) {
            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(email).toLowerCase());
        }
        ;
        FileSizeConvert(bytes) {
            let threshhold = 1000;
            if (Math.abs(bytes) < threshhold) {
                return bytes + " B";
            }
            let units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
            let u = -1;
            do {
                bytes /= threshhold;
                ++u;
            } while (Math.abs(bytes) >= threshhold && u < units.length - 1);
            return this.FormatNumber(bytes, 0, 4) + " " + units[u];
        }
        ;
        FormatNumber(value, minimumDigits, maximumDigits) {
            value = String(value);
            minimumDigits = this.NullChk(minimumDigits, 0);
            maximumDigits = this.NullChk(maximumDigits, 6);
            if (maximumDigits >= 6 && (minimumDigits < 6 || this.Round(value, 4) != this.Round(value, 6))) {
                return this.Round(value, 6).toString();
            }
            else if (maximumDigits >= 4 && (minimumDigits < 4 || this.Round(value, 2) != this.Round(value, 4))) {
                return this.Round(value, 4).toString();
            }
            else if (maximumDigits >= 2 && (minimumDigits < 2 || this.Round(value, 1) != this.Round(value, 2))) {
                return this.Round(value, 2).toString();
            }
            else if (maximumDigits >= 1 && (minimumDigits < 1 || this.Round(value) != this.Round(value, 1))) {
                return this.Round(value, 1).toString();
            }
            else if (this.isNumber(value)) {
                return this.Round(value).toString();
            }
            else {
                return "";
            }
        }
        ;
        IsImage(url) {
            if (this.Right(url, 5).toLowerCase() == ".jpeg") {
                return true;
            }
            switch (this.Right(url, 4).toLowerCase()) {
                case ".jpg":
                case ".png":
                case ".bmp":
                    return true;
            }
            return false;
        }
        ;
        HTMLSafe(value) {
            if (value === undefined) {
                return "";
            }
            return value.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace("\"", "&quot;")
                .replace(">", "&gt;")
                .replace("'", "&#39;");
        }
        ;
        JSONSafe(value) {
            if (value === undefined) {
                return "";
            }
            return value.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
        }
        ;
        DateToDayOfWeek(value) {
            switch (value.getDay()) {
                case 0:
                    return "Sun";
                case 1:
                    return "Mon";
                case 2:
                    return "Tue";
                case 3:
                    return "Wed";
                case 4:
                    return "Thu";
                case 5:
                    return "Fri";
                case 6:
                    return "Sat";
            }
            return "";
        }
        ;
        MultipleSelected(valueArr) {
            if (valueArr === undefined) {
                return false;
            }
            else if (valueArr.length === 0) {
                return false;
            }
            else if (valueArr.length === 1 && (valueArr[0].toLowerCase() == "null" || valueArr[0] == "0")) {
                return false;
            }
            else {
                return true;
            }
        }
        ;
        RandomNum(strLength) {
            return this.Left((Math.random() * (10 * strLength)).toString(), strLength);
        }
        ;
        getStringDataType(value) {
            if (this.Null2EmptyStr(value) === "") {
                return DataType._None;
            }
            else if (this.ChkDate(value)) {
                return DataType._DateTime;
            }
            else if (this.isInteger(value)) {
                return DataType._Integer;
            }
            else if (this.isNumber(value)) {
                return DataType._Decimal;
            }
            else {
                switch (value.toLowerCase()) {
                    case "true":
                    case "false":
                    case "yes":
                    case "no":
                        return DataType._YesNo;
                }
            }
            return DataType._Text;
        }
        ;
        ArrayIntToString(valueArr) {
            let returnArr = [];
            for (let i = 0; i < valueArr.length; i++) {
                returnArr.push(String(valueArr[i]));
            }
            return returnArr;
        }
        ;
        ArrayStringToInt(valueArr) {
            let returnArr = [];
            for (let i = 0; i < valueArr.length; i++) {
                returnArr.push(Number(valueArr[i]));
            }
            return returnArr;
        }
        ;
        ScreenFmt(value, myDataType, decimalPlaces) {
            let ReturnValue = "";
            value = this.NullChkStr(value, "");
            if (typeof myDataType === "string") {
                myDataType = this.DataTypeParse(myDataType.toString());
            }
            switch (myDataType) {
                case DataType._Currency:
                    let CurrSymbol;
                    if (this.userLanguage == "ZH") {
                        CurrSymbol = "¥";
                    }
                    else {
                        CurrSymbol = "$";
                    }
                    value.replace(CurrSymbol, "");
                    if (value !== "" && this.isNumber(value)) {
                        let myDec = Number(value);
                        if (decimalPlaces > -1) {
                            ReturnValue = this.Round(myDec, decimalPlaces).toString();
                        }
                        else {
                            ReturnValue = this.FormatNumber(myDec, 2);
                        }
                        ReturnValue = CurrSymbol + ReturnValue;
                    }
                    break;
                case DataType._LocalTime:
                    if (value !== "" && this.isNumber(value)) {
                        ReturnValue = this.Right("0000" + value, 4);
                        let myHour = Number(this.Left(ReturnValue, 2));
                        let myMinute = Number(this.Right(ReturnValue, 2));
                        if (myHour > 12) {
                            ReturnValue = (myHour - 12) + ":" + this.Right("0" + myMinute, 2) + " PM";
                        }
                        else if (myHour == 12) {
                            ReturnValue = "12:" + this.Right("0" + myMinute, 2) + " PM";
                        }
                        else if (myHour === 0) {
                            ReturnValue = "12:" + this.Right("0" + myMinute, 2) + " AM";
                        }
                        else {
                            ReturnValue = myHour + ":" + this.Right("0" + myMinute, 2) + " AM";
                        }
                    }
                    let TimeComponents = ReturnValue.split(" ");
                    let Time = TimeComponents[0];
                    let IsPm = false;
                    if (TimeComponents.length > 1 && TimeComponents[1] == "PM") {
                        IsPm = true;
                    }
                    let HoursMinutes = Time.split(":");
                    if (this.userTimeFormat == 2) {
                        if (HoursMinutes.length < 2) {
                            if (IsPm) {
                                ReturnValue = (Number(HoursMinutes[0]) + 12) + ":00";
                            }
                            else {
                                ReturnValue = HoursMinutes[0] + ":00";
                            }
                        }
                        else {
                            if (Number(HoursMinutes[0]) == 12) {
                                HoursMinutes[0] = "0";
                            }
                            if (IsPm) {
                                ReturnValue = (Number(HoursMinutes[0]) + 12) + ":" + HoursMinutes[1];
                            }
                            else {
                                ReturnValue = HoursMinutes[0] + ":" + HoursMinutes[1];
                            }
                        }
                    }
                    else {
                        if (HoursMinutes.length < 2) {
                            if (IsPm) {
                                ReturnValue = HoursMinutes[0] + ":00 PM";
                            }
                            else {
                                ReturnValue = HoursMinutes[0] + ":00 AM";
                            }
                        }
                        else {
                            if (IsPm) {
                                ReturnValue = HoursMinutes[0] + ":" + HoursMinutes[1] + " PM";
                            }
                            else {
                                ReturnValue = HoursMinutes[0] + ":" + HoursMinutes[1] + " AM";
                            }
                        }
                    }
                    break;
                case DataType._Date:
                case DataType._DateTime:
                case DataType._DateLocalTime:
                    let TmpTime = "";
                    let SearchValStr = value.split("^");
                    let tmpValStr;
                    let myDate;
                    let myHour;
                    let myMinute;
                    for (let i = 0; i < SearchValStr.length; i++) {
                        value = SearchValStr[i];
                        if (!this.ChkDate(value)) {
                            if (value.toUpperCase() == "IS NULL" || value.toUpperCase() == "NOT IS NULL") {
                                ReturnValue = value.toUpperCase();
                            }
                        }
                        else {
                            myDate = this.ToDate(value);
                            myHour = myDate.getHours();
                            myMinute = myDate.getMinutes();
                            if (myDataType == DataType._DateTime || myDataType == DataType._DateLocalTime || myHour !== 0 || myMinute !== 0) {
                                if (myDataType == DataType._DateTime) {
                                }
                                if (this.userTimeFormat == 2) {
                                    TmpTime = " " + myHour + ":" + this.Right("0" + myMinute, 2);
                                }
                                else {
                                    if (myHour > 12) {
                                        TmpTime = " " + (myHour - 12) + ":" + this.Right("0" + myMinute, 2) + " PM";
                                    }
                                    else if (myHour == 12) {
                                        TmpTime = "12:" + this.Right("0" + myMinute, 2) + " PM";
                                    }
                                    else if (myHour === 0) {
                                        TmpTime = "12:" + this.Right("0" + myMinute, 2) + " AM";
                                    }
                                    else {
                                        TmpTime = " " + myHour + ":" + this.Right("0" + myMinute, 2) + " AM";
                                    }
                                }
                            }
                            switch (this.userDateFormat) {
                                case 2:
                                    tmpValStr = myDate.getFullYear() + "-" + myDate.getMonth() + "-" + myDate.getDay();
                                    break;
                                case 3:
                                    tmpValStr = myDate.getDay() + "." + myDate.getMonth() + "." + myDate.getFullYear();
                                    break;
                                default:
                                    tmpValStr = myDate.getMonth() + "/" + myDate.getDay() + "/" + myDate.getFullYear();
                            }
                            ReturnValue = tmpValStr + TmpTime;
                            if (i != (SearchValStr.length - 1)) {
                                ReturnValue += "^";
                            }
                        }
                    }
                    break;
                case DataType._MonthDay:
                    if (this.isInteger(value.replace("/", ""))) {
                        let TmpArr = value.split("/");
                        let myMonth = 0;
                        let myDay = 0;
                        if (TmpArr.length > 1) {
                            myMonth = Number(TmpArr[0]);
                            myDay = Number(TmpArr[1]);
                        }
                        else {
                            value = "0000" + value.replace("/", "");
                            myMonth = Number(this.Left(this.Right(value, 4), 2));
                            myDay = Number(this.Right(value, 2));
                        }
                        switch (this.userDateFormat) {
                            case 2:
                                ReturnValue = myMonth + "-" + myDay;
                                break;
                            case 3:
                                ReturnValue = myDay + "." + myMonth;
                                break;
                            default:
                                ReturnValue = myMonth + "/" + myDay;
                        }
                    }
                    break;
                case DataType._Months:
                    if (this.isInteger(value)) {
                        const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        ReturnValue = monthNames[Number(value)];
                    }
                    else if (",January,Jan,February,Feb,March,Mar,April,Apr,May,May,June,Jun,July,Jul,August,Aug,September,Sep,November,Nov,December,Dec,".indexOf("," + value + ",") != -1) {
                        ReturnValue = value;
                    }
                    else {
                        ReturnValue = "Is Null";
                    }
                    break;
                case DataType._YearMonth:
                    let yearMonthArr;
                    let myMonth = 0;
                    let myYear = 0;
                    if (this.isInteger(value.replace(" ", ""))) {
                        yearMonthArr = value.split(" ");
                        if (yearMonthArr.length > 1) {
                            myMonth = Number(yearMonthArr[0]);
                            myYear = Number(yearMonthArr[1]);
                        }
                        else {
                            value = "000000" + value.replace(" ", "");
                            myMonth = Number(this.Right(value, 2));
                            myYear = Number(this.Left(this.Right(value, 6), 4));
                        }
                        ReturnValue = myYear + " " + this.Right("0" + myMonth, 2);
                    }
                    else if (this.isInteger(value.replace("/", ""))) {
                        yearMonthArr = value.split("/");
                        if (yearMonthArr.length > 1) {
                            myMonth = Number(yearMonthArr[0]);
                            myYear = Number(yearMonthArr[1]);
                        }
                        else {
                            value = "000000" + value.replace(" ", "");
                            myMonth = Number(this.Right(value, 2));
                            myYear = Number(this.Left(this.Right(value, 6), 4));
                        }
                        switch (this.userDateFormat) {
                            case 2:
                                ReturnValue = myYear + "-" + myMonth;
                                break;
                            case 3:
                                ReturnValue = myMonth + "." + myYear;
                                break;
                            default:
                                ReturnValue = myMonth + "/" + myYear;
                        }
                    }
                    break;
                case DataType._Email:
                    if (this.isEmail(value)) {
                        ReturnValue = value;
                    }
                    break;
                case DataType._Phone:
                    let Phone = value;
                    Phone = Phone.replace("(", "")
                        .replace(")", "")
                        .replace("-", "")
                        .replace(" ", "")
                        .replace(".", "");
                    ReturnValue = value;
                    if (this.isNumber(Phone)) {
                        switch (Phone.length) {
                            case 11:
                                if (this.userPhoneFormat == 3) {
                                    ReturnValue = Phone.substr(0, 3) + "-" + Phone.substr(3, 4) + "-" + Phone.substr(7, 4);
                                }
                                else {
                                    ReturnValue = Phone.substr(0, 1) + " (" + Phone.substr(1, 3) + ") " + Phone.substr(4, 3) + "-" + Phone.substr(7, 4);
                                }
                                break;
                            case 10:
                                if (this.userPhoneFormat == 2) {
                                    if (Phone.substr(0, 2) == "04") {
                                        ReturnValue = Phone.substr(0, 4) + " " + Phone.substr(4, 3) + " " + Phone.substr(7, 3);
                                    }
                                    else {
                                        ReturnValue = "(" + Phone.substr(0, 2) + ") " + Phone.substr(2, 4) + "-" + Phone.substr(6, 4);
                                    }
                                }
                                else {
                                    ReturnValue = "(" + Phone.substr(0, 3) + ") " + Phone.substr(3, 3) + "-" + Phone.substr(6, 4);
                                }
                                break;
                            case 9:
                                ReturnValue = Phone.substr(0, 3) + "-" + Phone.substr(3, 3) + "-" + Phone.substr(6, 3);
                                break;
                            case 7:
                                ReturnValue = Phone.substr(0, 3) + "-" + Phone.substr(3, 4);
                                break;
                        }
                    }
                    break;
                case DataType._PostalCode:
                    let PostalCode = value;
                    PostalCode = PostalCode.replace("-", "")
                        .replace(" ", "")
                        .replace(".", "");
                    if (this.isNumber(PostalCode)) {
                        ReturnValue = value;
                    }
                    else {
                        if (PostalCode.length <= 9 && PostalCode.length >= 6) {
                            ReturnValue = PostalCode.substr(0, 5) + "-" + this.Right("00000" + PostalCode, 5);
                        }
                        else {
                            ReturnValue = PostalCode;
                        }
                    }
                    break;
                case DataType._UPC:
                    let upc = value;
                    upc = upc.replace("-", "").trim();
                    if (!this.isInteger(upc)) {
                        ReturnValue = value;
                    }
                    else {
                        switch (upc.length) {
                            case 12:
                                ReturnValue = upc.substr(0, 1) + "-" + upc.substr(1, 5) + "-" + upc.substr(6, 5) + "-" + upc.substr(11, 1);
                                break;
                            case 11:
                                ReturnValue = upc.substr(0, 1) + "-" + upc.substr(1, 5) + "-" + upc.substr(6, 5);
                                break;
                            case 10:
                                ReturnValue = upc.substr(0, 5) + "-" + upc.substr(5, 5);
                                break;
                            case 8:
                                ReturnValue = upc.substr(0, 1) + "-" + upc.substr(1, 3) + "-" + upc.substr(4, 3) + "-" + upc.substr(7, 1);
                                break;
                            case 14:
                                ReturnValue = upc.substr(0, 1) + "-" + upc.substr(1, 2) + "-" + upc.substr(3, 5) + "-" + upc.substr(8, 5) + "-" + upc.substr(13, 1);
                                break;
                        }
                    }
                    break;
                case DataType._Decimal:
                case DataType._Integer:
                    if (!this.isNumber(value) || value === "") {
                        ReturnValue = "";
                    }
                    else {
                        if (decimalPlaces > -1) {
                            ReturnValue = this.Round(value, decimalPlaces).toString();
                        }
                        else {
                            ReturnValue = this.FormatNumber(value);
                        }
                    }
                    break;
                case DataType._YesNo:
                    if (this.isInteger(value)) {
                        if (value == "0") {
                            ReturnValue = "True";
                        }
                        else {
                            ReturnValue = "False";
                        }
                    }
                    else {
                        ReturnValue = value;
                    }
                    break;
                case DataType._Percentage:
                    value = value.replace("%", "");
                    ReturnValue = value;
                    if (value !== "" && this.isNumber(value)) {
                        let TmpDec = 100 * Number(value);
                        if (decimalPlaces > -1) {
                            ReturnValue = this.Round(TmpDec, decimalPlaces).toString();
                        }
                        else {
                            ReturnValue = this.FormatNumber(TmpDec, 0, 4);
                        }
                        ReturnValue += "%";
                    }
                    break;
                case DataType._FileSize:
                    if (this.isNumber(value)) {
                        ReturnValue = this.FileSizeConvert(Number(value));
                    }
                    else {
                        ReturnValue = "0 B";
                    }
                    break;
                case DataType._Signature:
                    if (value !== "" && this.isInteger(value.substr(0, 1))) {
                    }
                    break;
                case DataType._DocumentURL:
                    if (value !== "") {
                        let ValueArray = value.split("|");
                        if (ValueArray.length < 4) {
                            throw "Encompass Fmt: value= '" + value + "' must have ValueArray.length >= 4: DocumentID|FileName|DocumentURL|ThumbnailURL|Height ";
                        }
                        let FileName = ValueArray[1];
                        let DocumentURL = ValueArray[2];
                        let ThumbnailURL = ValueArray[3];
                        let Height;
                        if (ValueArray.length >= 5) {
                            Height = "Height='" + ValueArray[4] + "' ";
                        }
                        if (ThumbnailURL === "") {
                            ThumbnailURL = DocumentURL;
                        }
                        if (this.IsImage(DocumentURL)) {
                            ReturnValue = "<a href='" + DocumentURL + "'><img src='" + ThumbnailURL + "' " + Height + "/></a>";
                        }
                        else {
                            ReturnValue = "<a href='" + DocumentURL + "'>" + FileName + "</a>";
                        }
                    }
                    break;
                case DataType._TextEncoded:
                    if (value !== "") {
                        ReturnValue = "<xmp>" + value + "</xmp>";
                    }
                    break;
                default:
                    ReturnValue = value;
            }
            return ReturnValue;
        }
        ;
    }
    ECP.Format = Format;
})(ECP || (ECP = {}));
var EC_Fmt = new ECP.Format();
var ECP;
(function (ECP) {
    class EC_Record {
        constructor(recordset) {
            let Me = this;
            Me.Recordset = recordset;
            for (let i = 0; i < Me.Recordset.Fields.length; i++) {
                Me.Fields[Me.Recordset.Fields[i].Name] = null;
            }
        }
        Update(name, value) {
            let Me = this;
            Me.Fields[name] = value;
        }
    }
    ECP.EC_Record = EC_Record;
    function API2Rs(request) {
        return new Promise(function (resolve, reject) {
            request.Submit().then(function (data) {
                resolve(new EC_Recordset(data));
            }).catch(function (error) {
                reject(error);
            });
        });
    }
    ECP.API2Rs = API2Rs;
    class EC_Recordset {
        constructor(data) {
            let Me = this;
            if (data !== undefined) {
                Me.Records = new Array();
                if (typeof data.Export.Table == "object") {
                    data = data.Export.Table;
                }
                else {
                    data = data.Export.Report;
                }
                if (data.Field instanceof Array) {
                    Me.Fields = data.Field;
                }
                else {
                    Me.Fields.push(data.Field);
                }
                if (data.Row instanceof Array) {
                    Me.Records = data.Row;
                }
                else {
                    Me.Records.push(data.Row);
                }
                Me.RecordCount = data.RecordCount;
            }
            else {
                Me.RecordCount = 0;
            }
            Me.Index = 0;
            Me.EOF = true;
            Me.BOF = true;
            if (Me.RecordCount > 0) {
                Me.EOF = false;
            }
        }
        ColumnExists(name) {
            let Me = this;
            for (let i = 0; i < Me.Fields.length; i++) {
                if (Me.Fields[i].Name.toLowerCase() == name.toLowerCase()) {
                    return true;
                }
            }
            return false;
        }
        AddColumn(name, dataType, dataFormat) {
            let Me = this;
            if (!Me.ColumnExists(name)) {
                Me.Fields.push({
                    Name: name,
                    Alias: undefined,
                    DataType: dataType,
                    DataFormat: dataFormat
                });
            }
            for (let i = 0; i < Me.Records.length; i++) {
                if (!Me.Records[i].hasOwnProperty(name)) {
                    Me.Records[i][name] = null;
                }
            }
        }
        AddRecord(record) {
            let Me = this;
            Me.Records.push(record);
            if (Me.Index <= 0) {
                Me.Index = 0;
                Me.EOF = false;
                Me.BOF = true;
            }
            else if (Me.Index >= Me.Records.length) {
                Me.Index = Me.Index - 1;
                Me.EOF = true;
                Me.BOF = false;
            }
        }
        MoveNext() {
            let Me = this;
            Me.Index += 1;
            if (Me.Index <= 0) {
                Me.Index = 0;
                Me.EOF = false;
                Me.BOF = true;
            }
            else if (Me.Index >= Me.Records.length) {
                Me.Index = Me.Index - 1;
                Me.EOF = true;
                Me.BOF = false;
            }
        }
        MovePrevious() {
            let Me = this;
            Me.Index -= 1;
            if (Me.Index <= 0) {
                Me.Index = 0;
                Me.EOF = false;
                Me.BOF = true;
            }
            else if (Me.Index >= Me.Records.length) {
                Me.Index = Me.Index - 1;
                Me.EOF = true;
                Me.BOF = false;
            }
        }
        MoveFirst() {
            let Me = this;
            Me.Index = 0;
            Me.EOF = false;
            Me.BOF = true;
        }
        Item(key, type) {
            if (!type) {
                type = "string";
            }
            let Me = this;
            if (typeof key == "number") {
                switch (type.toLowerCase()) {
                    case "int":
                    case "integer":
                        if (!Me.Records[Me.Index][Me.Fields[key].Name])
                            return 0;
                        return parseInt(Me.Records[Me.Index][Me.Fields[key].Name]);
                    case "float":
                    case "decimal":
                    case "number":
                        if (!Me.Records[Me.Index][Me.Fields[key].Name])
                            return 0;
                        return parseFloat(Me.Records[Me.Index][Me.Fields[key].Name]);
                    case "bool":
                    case "boolean":
                        if (!Me.Records[Me.Index][Me.Fields[key].Name])
                            return false;
                        if (Me.Records[Me.Index][Me.Fields[key].Name].toLowerCase() == "true" || Me.Records[Me.Index][Me.Fields[key].Name] == "1")
                            return true;
                        return false;
                    default:
                        if (!Me.Records[Me.Index][Me.Fields[key].Name])
                            return "";
                        return Me.Records[Me.Index][Me.Fields[key].Name];
                }
            }
            else {
                switch (type.toLowerCase()) {
                    case "int":
                    case "integer":
                        if (!Me.Records[Me.Index][key])
                            return 0;
                        return parseInt(Me.Records[Me.Index][key]);
                    case "float":
                    case "decimal":
                    case "number":
                        if (!Me.Records[Me.Index][key])
                            return 0;
                        return parseFloat(Me.Records[Me.Index][key]);
                    case "bool":
                    case "boolean":
                        if (!Me.Records[Me.Index][key])
                            return false;
                        if (Me.Records[Me.Index][key].toLowerCase() == "true" || Me.Records[Me.Index][key] == "1")
                            return true;
                        return false;
                    default:
                        if (!Me.Records[Me.Index][key])
                            return "";
                        return Me.Records[Me.Index][key];
                }
            }
        }
        ItemInt(key) {
            let Me = this;
            return Me.Item(key, "int");
        }
        ItemFloat(key) {
            let Me = this;
            return Me.Item(key, "float");
        }
        ItemBool(key) {
            let Me = this;
            return Me.Item(key, "bool");
        }
    }
    ECP.EC_Recordset = EC_Recordset;
})(ECP || (ECP = {}));
var ECP;
(function (ECP) {
    (function (EC_Verb) {
        EC_Verb[EC_Verb["Get"] = 1] = "Get";
        EC_Verb[EC_Verb["Post"] = 2] = "Post";
    })(ECP.EC_Verb || (ECP.EC_Verb = {}));
    var EC_Verb = ECP.EC_Verb;
    (function (EC_ReturnType) {
        EC_ReturnType[EC_ReturnType["Json"] = 1] = "Json";
        EC_ReturnType[EC_ReturnType["Text"] = 2] = "Text";
    })(ECP.EC_ReturnType || (ECP.EC_ReturnType = {}));
    var EC_ReturnType = ECP.EC_ReturnType;
    (function (EC_Operator) {
        EC_Operator[EC_Operator["Equals"] = 1] = "Equals";
        EC_Operator[EC_Operator["NotEquals"] = 2] = "NotEquals";
        EC_Operator[EC_Operator["GreaterThan"] = 3] = "GreaterThan";
        EC_Operator[EC_Operator["GreaterThanEquals"] = 4] = "GreaterThanEquals";
        EC_Operator[EC_Operator["LessThan"] = 5] = "LessThan";
        EC_Operator[EC_Operator["LessThanEquals"] = 6] = "LessThanEquals";
        EC_Operator[EC_Operator["Like"] = 7] = "Like";
    })(ECP.EC_Operator || (ECP.EC_Operator = {}));
    var EC_Operator = ECP.EC_Operator;
    class EC_Request {
        constructor(command) {
            let Me = this;
            Me.Command = command;
            Me.Public = false;
            Me.Verb = EC_Verb.Get;
            Me.ReturnType = EC_ReturnType.Json;
            Me.ContentType = "application/x-www-form-urlencoded";
            Me.Parameters = new Array();
            Me.Variables = new Array();
        }
        SetAPIToken(token) {
            let Me = this;
            Me.APIToken = token;
            Me.Public = true;
        }
        SetReturnType(returnType) {
            let Me = this;
            Me.ReturnType = returnType;
        }
        AddParameter(name, value, operator) {
            let Me = this;
            Me.Parameters.push({
                Name: name,
                Value: value,
                Verb: EC_Verb.Get,
                Operator: operator
            });
        }
        AddRequestVariable(name, value, verb) {
            let Me = this;
            if (verb === undefined) {
                verb = EC_Verb.Get;
            }
            Me.Variables.push({
                Name: name,
                Value: value,
                Verb: verb,
                Operator: EC_Operator.Equals
            });
            if (verb == EC_Verb.Post) {
                Me.Verb = EC_Verb.Post;
            }
        }
        AddJSON(json) {
            let Me = this;
            Me.Body = json;
            Me.Verb = EC_Verb.Post;
            Me.ContentType = "application/json";
        }
        Submit() {
            let Me = this;
            return new Promise(function (resolve, reject) {
                let url = "https://api.encompass8.com/aspx1/API.ashx?APICommand=" + encodeURIComponent(Me.Command) + "&EncompassID=Pioneer1808";
                if (Me.Public) {
                    url += "&APIToken=" + encodeURIComponent(Me.APIToken);
                }
                for (let i = 0; i < Me.Variables.length; i++) {
                    if (Me.Variables[i].Verb == EC_Verb.Get) {
                        url += "&" + encodeURIComponent(Me.Variables[i].Name) + "=" + encodeURIComponent(Me.Variables[i].Value);
                    }
                }
                let parameters = "";
                for (let i = 0; i < Me.Parameters.length; i++) {
                    if (parameters !== "") {
                        parameters += "|";
                    }
                    parameters += "F:" + encodeURIComponent(Me.Parameters[i].Name) + "~V:" + encodeURIComponent(Me.Parameters[i].Value);
                    switch (Me.Parameters[i].Operator) {
                        case EC_Operator.GreaterThan:
                            parameters += "~O:G";
                            break;
                        case EC_Operator.GreaterThanEquals:
                            parameters += "~O:GE";
                            break;
                        case EC_Operator.LessThan:
                            parameters += "~O:L";
                            break;
                        case EC_Operator.LessThanEquals:
                            parameters += "~O:LE";
                            break;
                        case EC_Operator.NotEquals:
                            parameters += "~O:NE";
                            break;
                        case EC_Operator.Like:
                            parameters += "~O:LIKE";
                            break;
                        default:
                            parameters += "~O:E";
                            break;
                    }
                }
                if (parameters !== "") {
                    url += "&Parameters=" + parameters;
                }
                let xhr = new XMLHttpRequest();
                if (Me.Verb == EC_Verb.Post) {
                    xhr.open("POST", url);
                }
                else {
                    xhr.open("GET", url);
                }
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        switch (Me.ReturnType) {
                            case EC_ReturnType.Json:
                                resolve(JSON.parse(xhr.responseText));
                                break;
                            default:
                                resolve(xhr.responseText);
                                break;
                        }
                    }
                    else {
                        reject(xhr.statusText);
                    }
                };
                xhr.onerror = function () {
                    reject(xhr.statusText);
                };
                if (Me.Verb == EC_Verb.Post && Me.Body === undefined) {
                    for (let i = 0; i < Me.Variables.length; i++) {
                        if (Me.Variables[i].Verb == EC_Verb.Post) {
                            if (Me.Body === undefined) {
                                Me.Body = "";
                            }
                            if (Me.Body !== "") {
                                Me.Body += "&";
                            }
                            Me.Body += encodeURIComponent(Me.Variables[i].Name) + "=" + encodeURIComponent(Me.Variables[i].Value);
                        }
                    }
                }
                if (Me.Verb == EC_Verb.Post && Me.Body !== undefined) {
                    xhr.setRequestHeader("Content-Type", Me.ContentType);
                    xhr.send(Me.Body);
                }
                else {
                    xhr.send();
                }
            });
        }
    }
    ECP.EC_Request = EC_Request;
})(ECP || (ECP = {}));
//# sourceMappingURL=ECP.js.map
