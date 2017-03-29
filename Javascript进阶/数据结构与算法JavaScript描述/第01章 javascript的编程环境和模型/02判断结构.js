// 简单的if语句
var mid = 25; 
var high = 50;
var low = 1;
var current = 13;
var found = -1;
if (current < mid) {
  mid = (current - low) / 2;
}

// if-else 
// if-else if 省略

// switch 语句
putstr("Enter a mouth number: ");
var monthNum = readline();
var monthName;

switch (monthNum) {
  case "1":
    monthName = "Januuary";
    break;

  case "2":
    monthName = "February";
    break;

  case "3":
    monthName = "March";
    break;

  case "4":
    monthName = "April";
    break;

  case "5":
    monthName = "May";
    break;

  case "6":
    monthName = "June";
    break;

  case "7":
    monthName = "July";
    break;

  case "8":
    monthName = "August";
    break;

  case "9":
    monthName = "September";
    break;

  case "10":
    monthName = "Octorber";
    break;

  case "11":
    monthName = "November";
    break;

  case "12":
    monthName = "December";
    break;

  default:
    print("Bad input.");
}