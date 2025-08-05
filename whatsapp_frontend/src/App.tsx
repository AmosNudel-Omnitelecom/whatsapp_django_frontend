import React from 'react';
import './App.css';
import PhoneNumbers from './features/phone_numbers/PhoneNumbers';
import EmbeddedSignup from './features/embedded_signup/EmbeddedSignup';

function App() {
  return (
    <div className="App">
      {/* <PhoneNumbers/> */}
      <EmbeddedSignup/>
    </div>
  );
}

export default App;
