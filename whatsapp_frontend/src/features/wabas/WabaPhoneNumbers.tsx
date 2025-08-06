import React from 'react'
import { useGetWABAPhoneNumbersQuery } from './WabasApi'
import { useGetSinglePhoneNumberQuery } from '../phone_numbers/phoneNumbersApi'
import RegisterNumber from './RegisterNumber'

function WabaPhoneNumbers({ wabaId }: { wabaId: string }) {
    const { data: phoneNumbers, isLoading, error } = useGetWABAPhoneNumbersQuery(wabaId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as any).data as string}</div>;

  return (
    <div>
        <h4>Waba Phone Numbers</h4>
        <ul>
            {phoneNumbers?.data.map((phoneNumber) => (
                <PhoneNumberWithStatus key={phoneNumber.id} phoneNumber={phoneNumber} />
            ))}
        </ul>
    </div>
  )
}

function PhoneNumberWithStatus({ phoneNumber }: { phoneNumber: any }) {
    const { data: detailedInfo, isLoading: isLoadingDetails } = useGetSinglePhoneNumberQuery(phoneNumber.id);
    const status = isLoadingDetails ? 'UNKNOWN' : (detailedInfo?.status || 'UNKNOWN');

    return (
        <div className='waba-card'>
            <span>{phoneNumber.id} - {phoneNumber.display_phone_number}</span>
            <br />
            <span>Status: {status}</span>
            <br />
            <span>Code Verification Status: {phoneNumber.code_verification_status}</span>
            <br />
            <RegisterNumber 
                phoneNumberId={phoneNumber.id}
                displayPhoneNumber={phoneNumber.display_phone_number}
                status={status}
            />
        </div>
    );
}

export default WabaPhoneNumbers