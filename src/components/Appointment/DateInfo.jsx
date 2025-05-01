const DateInfo = ({ date, time }) => {
    
  
    return (
      <div className="flex flex-col space-y-2 items-center  py-2 px-4 rounded-lg">
        <p className="text-[18px]  font-semibold">{date}</p>
        <p className="text-[16px]  opacity-90">เวลา {time}</p>
      </div>
    );
  };
  
  export default DateInfo;
  