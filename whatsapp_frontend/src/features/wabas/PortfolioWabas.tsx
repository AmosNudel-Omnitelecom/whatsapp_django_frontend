import React from 'react'
import { useGetWABAsQuery } from './WabasApi'
import WebhookComponent from './WebhookComponnent';
import WabaPhoneNumbers from './WabaPhoneNumbers';

function PortfolioWabas() {
    const { data: wabas, isLoading, error } = useGetWABAsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as any).data as string}</div>;

  return (
    <div>
        <h3>Portfolio Wabas</h3>
        <ul>
            {wabas?.data.map((waba) => (
                <div key={waba.id} className='waba-card'>
                    <span>{waba.name} - {waba.id}</span>
                    <WebhookComponent wabaId={waba.id} />
                    <div className='waba-phone-numbers'>
                        <WabaPhoneNumbers wabaId={waba.id} />
                    </div> 
                </div>
            ))}
        </ul>
    </div>
  )
}  

export default PortfolioWabas