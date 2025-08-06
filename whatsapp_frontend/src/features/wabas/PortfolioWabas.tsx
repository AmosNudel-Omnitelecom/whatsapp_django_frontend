import React from 'react'
import { useGetWABAsQuery } from './WabasApi'
import WebhookComponent from './WebhookComponnent';

function PortfolioWabas() {
    const { data: wabas, isLoading, error } = useGetWABAsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as any).data as string}</div>;

  return (
    <div>
        <h1>Portfolio Wabas</h1>
        <ul>
            {wabas?.data.map((waba) => (
                <div key={waba.id} className='waba-card'>
                    <span>{waba.name} - {waba.id}</span>
                    <WebhookComponent wabaId={waba.id} />
                </div>
            ))}
        </ul>
    </div>
  )
}  

export default PortfolioWabas