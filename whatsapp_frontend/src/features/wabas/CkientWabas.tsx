import React from 'react'
import { useGetClientWABAsQuery } from './WabasApi'
import WebhookComponent from './WebhookComponnent'
import WabaPhoneNumbers from './WabaPhoneNumbers'

function ClientWabas() {
    const { data: wabas, isLoading, error } = useGetClientWABAsQuery();

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {(error as any).data as string}</div>;

  return (
    <div className="wabas-section">
        <h3>Client Wabas</h3>
        <ul className="wabas-list">
            {wabas?.data.map((waba) => (
                <li key={waba.id} className='waba-card'>
                    <div className="waba-info">
                        <h4>{waba.name}</h4>
                        <span className="waba-id">{waba.id}</span>
                    </div>
                    <WebhookComponent wabaId={waba.id} />
                    <div className='waba-phone-numbers'>
                        <WabaPhoneNumbers wabaId={waba.id} />
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ClientWabas