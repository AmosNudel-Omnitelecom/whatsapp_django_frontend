import React, { useState } from 'react'
import PortfolioWabas from './PortfolioWabas'
import ClientWabas from './CkientWabas'
import './WabasStyling.css'

function WabasList() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'client'>('portfolio');

  return (
    <div className="wabas-container">
        <div className="wabas-header">
        </div>
        
        <div className="wabas-tabs">
            <button 
                className={`tab-button ${activeTab === 'portfolio' ? 'active' : ''}`}
                onClick={() => setActiveTab('portfolio')}
            >
                Portfolio Wabas
            </button>
            <button 
                className={`tab-button ${activeTab === 'client' ? 'active' : ''}`}
                onClick={() => setActiveTab('client')}
            >
                Client Wabas
            </button>
        </div>

        <div className="tab-content">
            {activeTab === 'portfolio' && <PortfolioWabas/>}
            {activeTab === 'client' && <ClientWabas/>}
        </div>
    </div>
  )
}

export default WabasList