const DateInfo = ({ date, time }) => {
    
  
    return (
      <div className="flex flex-col space-y-2 items-center bg-primary py-2 px-4 rounded-lg">
        <p className="text-[18px] text-white font-semibold">{date}</p>
        <p className="text-[16px] text-white opacity-90">เวลา {time} น.</p>
      </div>
    );
  };
  
  export default DateInfo;
  