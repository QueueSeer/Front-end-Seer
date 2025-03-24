const AppointmentStatus = ({ status }) => {
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
  
  export default AppointmentStatus;
  