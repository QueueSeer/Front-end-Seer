// HeaderProfile.js
import React from 'react';
import Images from '../../../assets'; 
import Header from '../../../components/Profile/Header';

const HeaderAppointment = () => {
  return (
    <Header image={Images.calendarIcon} alt='calendarIcon Icon' text="จองคิว" />

  );
};

export default HeaderAppointment;
