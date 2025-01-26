import React from "react";
import Layout from "./Layout";

import CardAppointment from "./CardAppointment";

export default function Appointment() {
  return (
    <div>
      <Layout>
        <div className="flex-1 pb-10">
          <CardAppointment />
        </div>
      </Layout>
    </div>
  );
}
