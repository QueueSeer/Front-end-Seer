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
  
  export const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  
  export const AmpStatus = (status) => {
    switch (status) {
      case "pending":
        return <div className="py-2 text-white text-base font-medium rounded-md">รอเข้ารับบริการ</div>;
      case "completed":
        return <div className="py-2 text-white text-base font-medium rounded-md">บริการสำเร็จ</div>;
      case "s_cancelled":
        return <div className="py-2 text-white text-base font-medium rounded-md">ยกเลิกบริการ</div>;
      case "u_cancelled":
        return <div className="py-2 text-white text-base font-medium rounded-md">ยกเลิกโดยผู้ใช้</div>;
      default:
        return <div className="py-2  text-white text-base font-medium rounded-md">ไม่ทราบสถานะ</div>;
    }
  };

  export const getChannelLabel = (channel) => {
    switch (channel) {
      case "chat":
        return "ช่องทางสนทนา";
      case "phone":
        return "การโทร";
      case "video":
        return "การวิดีโอคอล";
      default:
        return "ไม่ระบุช่องทาง";
    }
  };


  export const AppointmentStatus = ({ status }) => {
    switch (status) {
      case "pending":
        return (
          <div className="inline-block w-[140px] py-2 bg-white text-secondary2/90 text-base font-medium rounded-full">
            รอเข้ารับบริการ
          </div>
        );
      case "completed":
        return (
          <div className="inline-block w-[140px] py-2 bg-primary text-white text-base font-medium rounded-full border border-secondary2">
            บริการสำเร็จ
          </div>
        );
      case "s_cancelled":
        return (
          <div className="inline-block w-[140px] py-2 bg-cancel text-white/90 text-base font-medium rounded-full border border-bordercancel">
            ยกเลิกบริการ
          </div>
        );
      case "u_cancelled":
        return (
          <div className="inline-block w-[140px] py-2 bg-cancel text-white/90 text-base font-medium rounded-full border border-bordercancel">
            ยกเลิกโดยผู้ใช้
          </div>
        );
      default:
        return null;
    }
  };
  
  