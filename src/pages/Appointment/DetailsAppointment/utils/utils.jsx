// ฟังก์ชันแปลงวันที่
export const formatDate = (isoDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(isoDate).toLocaleDateString("th-TH", options);
  };
  
  // ฟังก์ชันแปลงเวลา
  export const formatTime = (isoDate) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    const time = new Date(isoDate).toLocaleTimeString("th-TH", options);
    return `${time} น.`;
  };
  
  // ฟังก์ชันแปลงเบอร์โทรศัพท์
  export const formatPhoneNumber = (number) => {
    if (!number) return "ไม่มีข้อมูล";
    const rawNumber = number.replace(/\D/g, "");
    if (rawNumber.length !== 10) return number;
    return `${rawNumber.slice(0, 3)}-${rawNumber.slice(3, 6)}-${rawNumber.slice(6)}`;
  };
  
  // ฟังก์ชัน render ข้อมูล
  export const renderInfoSection = (title, content) => (
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-40 font-medium text-gray-800 mb-1 sm:mb-0">
        {title}
      </div>
      <div className="flex-1">{content}</div>
    </div>
  );
  