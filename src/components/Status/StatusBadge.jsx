const StatusBadge = ({ status }) => {
    const statusClasses = {
      "รอเข้ารับบริการ": "bg-white text-primary border-none",
      "บริการสำเร็จ": "bg-primary text-white/80 border border-secondary2",
      "ยกเลิกบริการ": "bg-cancel text-white/80 border border-bordercancel",
    };
  
    return (
      <div
        className={`inline-block w-[140px] py-2 text-base font-medium rounded-full ${
          statusClasses[status] || "bg-gray-200 text-gray-600"
        }`}
      >
        {status}
      </div>
    );
  };
  