import React from 'react';
import './App.css';
import PhoneNumbers from './features/phone_numbers/PhoneNumbers';
import EmbeddedSignup from './features/embedded_signup/EmbeddedSignup';
import WabasList from './features/wabas/WabasList';

function App() {
  return (
    <div className="App">
      <PhoneNumbers/>
      <EmbeddedSignup/>
      <WabasList/>
    </div>
  );
}

export default App;
