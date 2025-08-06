import React, { useState } from 'react';
import './App.css';
import PhoneNumbers from './features/phone_numbers/PhoneNumbers';
import EmbeddedSignup from './features/embedded_signup/EmbeddedSignup';
import WabasList from './features/wabas/WabasList';

function App() {
  const [activeTab, setActiveTab] = useState<'phone-numbers' | 'embedded-signup' | 'wabas'>('phone-numbers');

  return (
    <div className="App">
      <div className="app-header">
        <h1>WhatsApp Business API Dashboard</h1>
      </div>
      
      <div className="app-tabs">
        <button 
          className={`app-tab-button ${activeTab === 'phone-numbers' ? 'active' : ''}`}
          onClick={() => setActiveTab('phone-numbers')}
        >
          Phone Numbers
        </button>
        <button 
          className={`app-tab-button ${activeTab === 'embedded-signup' ? 'active' : ''}`}
          onClick={() => setActiveTab('embedded-signup')}
        >
          Embedded Signup
        </button>
        <button 
          className={`app-tab-button ${activeTab === 'wabas' ? 'active' : ''}`}
          onClick={() => setActiveTab('wabas')}
        >
          WABAs
        </button>
      </div>

      <div className="app-content">
        {activeTab === 'phone-numbers' && <PhoneNumbers/>}
        {activeTab === 'embedded-signup' && <EmbeddedSignup/>}
        {activeTab === 'wabas' && <WabasList/>}
      </div>
    </div>
  );
}

export default App;
