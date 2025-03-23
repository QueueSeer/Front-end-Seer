export const formatDate = (isoDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(isoDate).toLocaleDateString("th-TH", options);
  };
  
  export const formatTime = (isoDate) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(isoDate).toLocaleTimeString("th-TH", options);
  };
  