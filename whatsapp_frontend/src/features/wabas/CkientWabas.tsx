import React from 'react'
import { useGetClientWABAsQuery } from './WabasApi'
import WebhookComponent from './WebhookComponnent'

function ClientWabas() {
    const { data: wabas, isLoading, error } = useGetClientWABAsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as any).data as string}</div>;

  return (
    <div>
        <h1>Client Wabas</h1>
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

export default ClientWabas