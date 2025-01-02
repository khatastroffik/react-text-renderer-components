// ~~~~~ WEEK RENDERER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Returns the ISO calendar week corresponding to the input date.
function calcISOWeek(inputDate) {
    const purifiedDate = new Date(inputDate.getTime());
    // Remove Time part of the Date value
    purifiedDate.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    const thursday = purifiedDate;
    // This is the four-digit year corresponding to the input ISO week of the date.
    const year = calcYearOfISOCalendarWeek(thursday);
    // January 4 is always in week 1.
    const fourthOfJanuaryWeek = new Date(year, 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    const week = 1 + Math.round(((thursday.getTime() - fourthOfJanuaryWeek.getTime()) / 86400000 - 3 + (fourthOfJanuaryWeek.getDay() + 6) % 7) / 7);
    return { week, year }
}

// Returns the four-digit year corresponding to the ISO week of the date.
function calcYearOfISOCalendarWeek(inputDate) {
    const purifiedDate = new Date(inputDate.getTime());
    // Thursday in current week decides the year.
    purifiedDate.setDate(purifiedDate.getDate() + 3 - (purifiedDate.getDay() + 6) % 7);
    // console.log("4", purifiedDate);
    return purifiedDate.getFullYear();
}

// const formatter = new Intl.NumberFormat(undefined, {minimumIntegerDigits:2, useGrouping: false, numberingSystem: "tibt"});
// const formatter = new Intl.NumberFormat(undefined, {minimumIntegerDigits:1, useGrouping: false, numberingSystem: "hanidec"});
const formatter = new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2, useGrouping: false });
const x = calcISOWeek(new Date("2025-12-29T11:11:11.111Z"));
console.log(`[${new Date("2025-12-29T11:11:11.111Z").toLocaleDateString()}] KW ${formatter.format(x.week)}/${formatter.format(x.year)}`);


// ~~~~~ QUARTER RENDERER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function calcQuarter(inputDate){ return Math.floor(1 + inputDate.getMonth() / 3) }
const d = new Date("2025-12-29T11:11:11.111Z");
const quarterFormatter = new Intl.NumberFormat(undefined, { minimumIntegerDigits: 1 });
const yearFormatter = new Intl.DateTimeFormat(undefined, { year: "numeric" });
console.log(`[${new Date("2025-12-29T11:11:11.111Z").toLocaleDateString()}] Q ${quarterFormatter.format(calcQuarter(d))}/${yearFormatter.format(d)}`);

/**
showdate("2024-10-06T19:40:55.221Z");  2024-10-06 -> CW 40 2024
showdate("2023-01-01T19:40:55.221Z");  2023-01-01 -> CW 52 2022
showdate("2025-12-28T11:11:11.111Z");  2025-12-28 -> CW 52 2025
showdate("2025-12-29T11:11:11.111Z");  2025-12-29 -> CW 01 2026
showdate("2024-12-29T11:11:11.111Z");  2024-12-29 -> CW 52 2024
showdate("2024-12-30T11:11:11.111Z");  2024-12-30 -> CW 01 2025
showdate("2024-12-31T11:11:11.111Z");  2024-12-31 -> CW 01 2025
showdate("2025-01-01T11:11:11.111Z");  2025-01-01 -> CW 01 2025
showdate("2026-12-27T11:11:11.111Z");  2026-12-27 -> CW 52 2026
showdate("2026-12-28T11:11:11.111Z");  2026-12-28 -> CW 53 2026
showdate("2026-12-29T11:11:11.111Z");  2026-12-29 -> CW 53 2026
showdate("2027-01-01T11:11:11.111Z");  2027-01-01 -> CW 53 2026
showdate("2027-01-02T11:11:11.111Z");  2027-01-02 -> CW 53 2026
showdate("2027-01-03T11:11:11.111Z");  2027-01-03 -> CW 53 2026
showdate("2027-01-04T11:11:11.111Z");  2027-01-04 -> CW 01 2027
*/
