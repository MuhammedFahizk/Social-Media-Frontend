import moment from "moment";
 
 export const  formatTimeDifference = (timeDiff) => {
    const { diffYears, diffMonths, diffDays, diffHours, diffMinutes } =  getTimeDifference(timeDiff);

    if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? "s" : ""}`;
    if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? "s" : ""}`;
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;

    return "just now";
  };

  const getTimeDifference = (createdAt) => {
    const now = moment();
    const created = moment(createdAt);
    const diffYears = now.diff(created, "years");
    created.add(diffYears, "years");
    const diffMonths = now.diff(created, "months");
    created.add(diffMonths, "months");
    const diffDays = now.diff(created, "days");
    created.add(diffDays, "days");
    const diffHours = now.diff(created, "hours");
    created.add(diffHours, "hours");
    const diffMinutes = now.diff(created, "minutes");

    return { diffYears, diffMonths, diffDays, diffHours, diffMinutes };
  };