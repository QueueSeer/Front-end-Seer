const DateInfo = ({ date, time }) => {
    // ฟังก์ชันแปลงเวลาเป็น HH:MM
    const convertToHHMM = (time) => {
      console.log("Time received:", time);  // ตรวจสอบค่า time ที่ได้รับมา
  
      const dateObj = new Date(time);  // แปลง timestamp เป็น Date object
      console.log("Date object:", dateObj);  // ตรวจสอบ Date object ที่สร้างขึ้น
  
      // ตรวจสอบว่า dateObj เป็นวันที่ที่ถูกต้องหรือไม่
      if (isNaN(dateObj.getTime())) {
        return "Invalid time"; // หากไม่สามารถแปลงเป็นวันที่ได้
      }
  
      // ใช้เวลา UTC ในการแสดงผล (ไม่ใช่เวลา local)
      const hours = dateObj.getUTCHours().toString().padStart(2, "0");
      const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");
  
      return `${hours}:${minutes}`;
    };

    const convertToThaiDate = (dateString) => {
        const dateObj = new Date(dateString); // แปลงวันที่จากสตริงเป็น Date object
        
        // ชื่อเดือนภาษาไทย
        const thaiMonths = [
          "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", 
          "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", 
          "พฤศจิกายน", "ธันวาคม"
        ];
        
        const day = dateObj.getDate(); // ดึงวันที่
        const month = thaiMonths[dateObj.getMonth()]; // ดึงเดือนและแปลงเป็นชื่อภาษาไทย
        
        return `${day} ${month}`;
      };
  
    return (
      <div className="flex flex-col space-y-2 items-center bg-secondary py-2 px-4 rounded-lg">
        <p className="text-[18px] text-white font-semibold">{convertToThaiDate(date)}</p>
        <p className="text-[14px] text-white opacity-90">เวลา {convertToHHMM(time)} น.</p>
      </div>
    );
  };
  
  export default DateInfo;
  