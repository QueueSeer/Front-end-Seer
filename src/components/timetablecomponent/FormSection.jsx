const FormSection = () => {
    return (
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label>เวลาเปิดทำการ</label>
          <input type="text" placeholder="09.00-17.00 น." className="w-full border p-2 rounded" />
        </div>
        <div>
          <label>แพคเกจที่เปิดบริการ</label>
          <select className="w-full border p-2 rounded">
            <option>เลือกแพคเกจ</option>
          </select>
        </div>
        <div>
          <label>เวลาพัก</label>
          <input type="text" placeholder="10 นาที" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label>จำนวนสูงสุดต่อวัน</label>
          <input type="number" placeholder="10" className="w-full border p-2 rounded" />
        </div>
      </div>
    );
  };
  
  export default FormSection;
  