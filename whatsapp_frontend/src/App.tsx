import React, { useState } from 'react';
import './App.css';
import PhoneNumbers from './features/phone_numbers/PhoneNumbers';
import EmbeddedSignup from './features/embedded_signup/EmbeddedSignup';
import WabasList from './features/wabas/WabasList';

function App() {
  const [activeTab, setActiveTab] = useState<'phone-numbers' | 'embedded-signup' | 'wabas'>('phone-numbers');
  
  const tabs = ['phone-numbers', 'embedded-signup', 'wabas'] as const;
  const currentIndex = tabs.indexOf(activeTab);
  
  const navigateLeft = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    setActiveTab(tabs[prevIndex]);
  };
  
  const navigateRight = () => {
    const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    setActiveTab(tabs[nextIndex]);
  };

  return (
    <div className="App" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/memphis-mini.png)`,
      backgroundRepeat: 'repeat',
      backgroundSize: '200px 200px',
      backgroundBlendMode: 'overlay'
    }}>
      <div className="app-header">
        <h1>WhatsApp Business API Dashboard</h1>
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
      </div>

      {/* Edge Glow Elements */}
      <div className="edge-glow edge-glow-left"></div>
      <div className="edge-glow edge-glow-right"></div>

      {/* Navigation Buttons */}
      <button 
        className="nav-button nav-button-left" 
        onClick={navigateLeft}
        onMouseEnter={() => {
          const leftGlow = document.querySelector('.edge-glow-left') as HTMLElement;
          if (leftGlow) leftGlow.style.opacity = '1';
        }}
        onMouseLeave={() => {
          const leftGlow = document.querySelector('.edge-glow-left') as HTMLElement;
          if (leftGlow) leftGlow.style.opacity = '0';
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <button 
        className="nav-button nav-button-right" 
        onClick={navigateRight}
        onMouseEnter={() => {
          const rightGlow = document.querySelector('.edge-glow-right') as HTMLElement;
          if (rightGlow) rightGlow.style.opacity = '1';
        }}
        onMouseLeave={() => {
          const rightGlow = document.querySelector('.edge-glow-right') as HTMLElement;
          if (rightGlow) rightGlow.style.opacity = '0';
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="app-content">
        {activeTab === 'phone-numbers' && <PhoneNumbers/>}
        {activeTab === 'embedded-signup' && <EmbeddedSignup/>}
        {activeTab === 'wabas' && <WabasList/>}
      </div>
    </div>
  );
}

export default App;
