/**
 * Process 12 h time to 24 h hours
 * @param part
 * @returns hours in 24h format
 */
const get24HH = (part: { hour: number; amPm: string }) => {
  const base = part.hour === 12 && part.amPm === "am" ? 0 : part.hour;
  const additional = part.amPm === "pm" ? (part.hour === 12 ? 0 : 12) : 0;
  return base + additional;
};

/**
 * @param strHourRange {HH:mma-HH:mma} "12:30pm-12:00am"
 * Can't get more than 24 hour difference. Assume very most 1 day difference worth of ms.
 * @returns milleseconds difference between stringified time range
 */
const getMsBetweenStrHourRange = (strHourRange: string) => {
  const ends = strHourRange.split("-");

  const timePattern = new RegExp(/(\d+):(\d+)(am|pm)/);
  const startParts = ends[0].split(timePattern);
  const endParts = ends[1].split(timePattern);

  const timeParts = {
    start: {
      hour: parseInt(startParts[1]),
      mins: parseInt(startParts[2]),
      amPm: startParts[3],
    },
    end: {
      hour: parseInt(endParts[1]),
      mins: parseInt(endParts[2]),
      amPm: endParts[3],
    },
  };

  const startTime = new Date();
  startTime.setSeconds(0);
  startTime.setHours(get24HH(timeParts.start));
  startTime.setMinutes(timeParts.start.mins);

  const endTime = new Date();
  endTime.setSeconds(0);
  endTime.setHours(get24HH(timeParts.end));
  endTime.setMinutes(timeParts.end.mins);

  const endTimeIsTomorrow =
    startTime.getHours() > endTime.getHours() ||
    (startTime.getHours() === endTime.getHours() &&
      startTime.getMinutes() > endTime.getMinutes());

  if (endTimeIsTomorrow) {
    endTime.setDate(endTime.getDate() + 1);
  }

  const diff = Math.ceil((Number(endTime) - Number(startTime)) / (1000 * 60));

  return diff;
};

export { getMsBetweenStrHourRange };
