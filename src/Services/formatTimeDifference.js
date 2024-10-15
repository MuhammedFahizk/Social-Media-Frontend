import moment from "moment";
 
 export const  formatTimeDifference = (timeDiff) => {
    const { diffYears, diffMonths, diffDays, diffHours, diffMinutes } =  getTimeDifference(timeDiff);

    if (diffYears > 0) return `${diffYears} Year${diffYears > 1 ? "s" : ""}`;
    if (diffMonths > 0) return `${diffMonths} Month${diffMonths > 1 ? "s" : ""}`;
    if (diffDays > 0) return `${diffDays} Day${diffDays > 1 ? "s" : ""}`;
    if (diffHours > 0) return `${diffHours} Hour${diffHours > 1 ? "s" : ""}`;
    if (diffMinutes > 0) return `${diffMinutes} Minute${diffMinutes > 1 ? "s" : ""}`;

    return "just now";
  };

  const getTimeDifference = (createdAt) => {
    const now = moment();
    const created = moment(createdAt);
    const diffYears = now.diff(created, "Years");
    created.add(diffYears, "years");
    const diffMonths = now.diff(created, "Months");
    created.add(diffMonths, "months");
    const diffDays = now.diff(created, "Days");
    created.add(diffDays, "days");
    const diffHours = now.diff(created, "Hours");
    created.add(diffHours, "hours");
    const diffMinutes = now.diff(created, "Minutes");

    return { diffYears, diffMonths, diffDays, diffHours, diffMinutes };
  };