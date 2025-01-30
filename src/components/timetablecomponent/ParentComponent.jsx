import { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import CalendarHeader from "./CalendarHeader";

const ParentComponent = () => {
  const [toggleMode, setToggleMode] = useState(0);

  return (
    <div>
      <ToggleSwitch
        options={[
          { label: "เฉพาะวันนี้" },
          { label: "ทั้งสัปดาห์" },
        ]}
        onChange={(index) => setToggleMode(index)}
      />
      <CalendarHeader toggleMode={toggleMode} />
    </div>
  );
};

export default ParentComponent;
