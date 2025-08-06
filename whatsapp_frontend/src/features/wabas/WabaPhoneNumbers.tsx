import React, { useState } from 'react'
import { useGetWABAPhoneNumbersQuery } from './WabasApi'
import { useGetSinglePhoneNumberQuery } from '../phone_numbers/phoneNumbersApi'
import RegisterNumber from './RegisterNumber'

function WabaPhoneNumbers({ wabaId }: { wabaId: string }) {
    const { data: phoneNumbers, isLoading, error } = useGetWABAPhoneNumbersQuery(wabaId);
    const [isExpanded, setIsExpanded] = useState(false);

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {(error as any).data as string}</div>;

    const hasPhoneNumbers = phoneNumbers?.data && phoneNumbers.data.length > 0;

  return (
    <div className="phone-numbers-collapsible">
        <div className="phone-numbers-header" onClick={() => setIsExpanded(!isExpanded)}>
            <h4>Waba Phone Numbers ({phoneNumbers?.data?.length || 0})</h4>
            <span className={`collapse-icon ${isExpanded ? 'expanded' : ''}`}>
                {isExpanded ? '−' : '+'}
            </span>
        </div>
        
        {isExpanded && (
            <div className="phone-numbers-content">
                {hasPhoneNumbers ? (
                    <ul>
                        {phoneNumbers.data.map((phoneNumber) => (
                            <PhoneNumberWithStatus key={phoneNumber.id} phoneNumber={phoneNumber} />
                        ))}
                    </ul>
                ) : (
                    <div className="no-phone-numbers">
                        <p>No phone numbers found for this WABA.</p>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}

function PhoneNumberWithStatus({ phoneNumber }: { phoneNumber: any }) {
    const { data: detailedInfo, isLoading: isLoadingDetails } = useGetSinglePhoneNumberQuery(phoneNumber.id);
    const status = isLoadingDetails ? 'UNKNOWN' : (detailedInfo?.status || 'UNKNOWN');

    return (
        <div className='waba-card'>
            <div className="waba-info">
                <span>{phoneNumber.display_phone_number}</span>
                <span className="waba-id">{phoneNumber.id}</span>
                <span className={`status-${status.toLowerCase()}`}>Status: {status}</span>
                <span>Code Verification Status: {phoneNumber.code_verification_status}</span>
            </div>
            <RegisterNumber 
                phoneNumberId={phoneNumber.id}
                displayPhoneNumber={phoneNumber.display_phone_number}
                status={status}
            />
        </div>
    );
}

export default WabaPhoneNumbers