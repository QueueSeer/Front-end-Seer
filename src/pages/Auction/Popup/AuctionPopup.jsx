import React from "react";
import LayoutPopup from "../../../components/Popup/LayoutPopup";

const AuctionPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // ไม่แสดง Popup ถ้า isOpen เป็น false

  return (
    <LayoutPopup title="ประมูลดูดวง" isOpen={isOpen} onClose={onClose}>
      <p>
        การประมูลดูดวง
        คือระบบที่เปิดให้ลูกค้าสามารถเข้าร่วมประมูลเพื่อขอคำปรึกษาหรือดูดวงจากหมอดู
        โดยที่ลูกค้าสามารถเสนอราคาสำหรับบริการดูดวงตามที่ตนเองต้องการ
      </p>
      <p className="text-[20px] font-semibold">1. การสร้างแพ็กเกจประมูล</p>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>
          <span className="font-semibold text-gray-800">ชื่อหัวข้อ: </span>
          <span className="ml-2 text-gray-700">
            สำหรับชื่อแพ็กเกจประมูลที่เหมาะสมและน่าสนใจ
          </span>
        </li>
        <li>
          <span className="font-semibold text-gray-800">คำอธิบายสั้น ๆ: </span>
          <span className="ml-2 text-gray-700">
            อธิบายเนื้อหาของแพ็กเกจประมูลอย่างสั้น ๆ และกระชับ
          </span>
        </li>
        <li>
          <span className="font-semibold text-gray-800">
            วันเวลาที่เปิดและปิดการประมูล:{" "}
          </span>
          <span className="ml-2 text-gray-700">
            กำหนดวันและเวลาที่ชัดเจน เพื่อให้ลูกค้าสามารถเข้าร่วมการประมูล
            และเสนอราคาได้
          </span>
        </li>

        <li>
          <span className="font-semibold text-gray-800">
            ปิดประมูลก่อนกำหนด:{" "}
          </span>
          <span className="ml-2 text-gray-700">
            เมื่อต้องการปิดประมูลก่อนกำหนด สามารถเปลี่ยนสถานะประมูลเป็น
            “ปิดประมูล”
          </span>
        </li>
        <li>
          <span className="font-semibold text-gray-800">เลือกหมวดหมู่: </span>
          <span className="ml-2 text-gray-700">
            สามารถเลือกหมวดหมู่ของการดูดวงที่ตนเชี่ยวชาญและต้องการให้บริการในแต่ละรอบการประมูล{" "}
          </span>
        </li>
        <li>
          <span className="font-semibold text-gray-800">ราคาขั้นต่ำ: </span>
          <span className="ml-2 text-gray-700">
            กำหนดราคาขั้นต่ำที่ต้องการสำหรับการเริ่มต้นประมูล{" "}
          </span>
        </li>
        <li>
          <span className="font-semibold text-gray-800">รายละเอียด: </span>
          <span className="ml-2 text-gray-700">
            ช่วยให้ลูกค้าเข้าใจบริการและคาดหวังสิ่งที่จะได้รับจากการดูดวงได้อย่างชัดเจน
            ในการดูดวง หมอดูสามารถให้รายละเอียดต่าง ๆ
            เพื่ออธิบายเกี่ยวกับการบริการ และสามารถเพิ่มข้อเสนอพิเศษ เช่น
            การให้คำแนะนำเพิ่มเติม การตรวจดวงชะตาละเอียด
            หรือบริการติดตามผลหลังการดูดวง{" "}
          </span>
        </li>
      </ul>
      <p className="text-[20px] font-semibold">
        2. การกำหนดราคาขั้นต่ำสำหรับการประมูล
      </p>
      <div className=" space-y-2 ">
        <p className="text-gray-700">
          สามารถกำหนดราคาขั้นต่ำที่ต้องการสำหรับการเริ่มต้นประมูล
          ซึ่งช่วยให้หมอดูมั่นใจว่าได้รับราคาที่เหมาะสม สำหรับการบริการ
        </p>
        <p className="text-gray-700">ตัวอย่างเช่น: </p>
        <div>
          <li className="ml-6">
            <span className="font-regular text-gray-700">
              ราคาขั้นต่ำ 200 บาท สำหรับแพ็กเกจ 1 คำถาม
            </span>
          </li>
          <li className="ml-6">
            <span className="font-regular text-gray-700">
              ราคาขั้นต่ำ 500 บาท สำหรับแพ็กเกจ 3 คำถาม
            </span>
          </li>
        </div>
      </div>
      <p className="text-[20px] font-semibold">
        3. การจัดการคำถามและการตอบคำถาม
      </p>
      <div className=" space-y-2 ">
        <p className="text-gray-700">
          เมื่อการประมูลสิ้นสุดลงและมีผู้ชนะการประมูล
          หมอดูจะได้รับข้อมูลส่วนตัวจากลูกค้า หมอดูสามารถจัดลำดับ
          ความสำคัญของคำถามและตอบคำถามตามจำนวนที่กำหนด หรือที่ได้อธิบายในแพ็กเกจ
        </p>
        <div>
          <li className="ml-6">
            <span className="font-regular text-gray-700">
              หมอดูรับ code เมื่อถึงเวลาที่กำหนดลูกค้าส่งข้อความมาหาหมอดู
            </span>
          </li>
          <li className="ml-6 ">
            <span className="font-regular text-gray-700">
              หมอดูสามารถให้รายละเอียดและคำแนะนำอย่างครบถ้วน
              รวมถึงการส่งข้อความติดตามเพื่อให้ลูกค้าได้รับข้อมูลที่ชัดเจน
            </span>
          </li>
        </div>
      </div>
      <p className="text-[20px] font-semibold">4. การจัดการการจ่ายเงิน </p>
      <div className=" space-y-2 ">
        <p className="text-gray-700">
          หลังจากการตอบคำถามเรียบร้อยแล้ว
          หมอดูได้รับการชำระเงินตามราคาที่ลูกค้าประมูลได้ในรูปแบบโชคคอยน์
          การจ่ายเงินจะดำเนินการผ่านระบบ
          และหมอดูสามารถติดตามยอดเงินคงเหลือและสถานะการชำระเงินได้ อย่างชัดเจน
        </p>
      </div>
      <p className="text-[20px] font-semibold">
        5. การสร้างความสัมพันธ์กับลูกค้า
      </p>
      <div className=" space-y-2 pb-6">
        <p className="text-gray-700">
          หมอดูสามารถใช้การประมูลเพื่อสร้างความสัมพันธ์ระยะยาวกับลูกค้า
          โดยการให้บริการที่ดีและตอบคำถามอย่างรวดเร็ว
        </p>
        <p className="text-gray-700">
          หมอดูสามารถเสนอบริการเพิ่มเติมหรือแพ็กเกจส่วนลดสำหรับลูกค้าที่เคยประมูลและชนะการประมูล{" "}
        </p>
      </div>
    </LayoutPopup>
  );
};

export default AuctionPopup;
