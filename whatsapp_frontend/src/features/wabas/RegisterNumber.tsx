import React, { useState } from 'react'
import { useRegisterPhoneNumberMutation } from './WabasApi'

interface RegisterNumberProps {
  phoneNumberId: string;
  displayPhoneNumber: string;
  status?: string;
}

function RegisterNumber({ phoneNumberId, displayPhoneNumber, status }: RegisterNumberProps) {
  const [registerPhoneNumber, { isLoading: isRegistering }] = useRegisterPhoneNumberMutation();
  const [showPinInput, setShowPinInput] = useState(false);
  const [pin, setPin] = useState('');

  // Check if registration is allowed based on status
  const isRegistrationAllowed = status === 'VERIFIED' || status === 'PENDING';
  const isStatusLoading = !status || status === 'UNKNOWN';

  const handleRegister = async () => {
    if (pin.length !== 6) {
      alert('Please enter a 6-digit PIN');
      return;
    }

    // Debug: Log what we're sending
    console.log('Sending registration data:', { phoneNumberId, pin });
    console.log('Request body will be:', { waba_phone_number_id: phoneNumberId, pin });

    try {
      await registerPhoneNumber({ phoneNumberId, pin }).unwrap();
      alert('Phone number registered successfully!');
      setShowPinInput(false);
      setPin('');
    } catch (error) {
      console.error('Failed to register phone number:', error);
      console.error('Error details:', error);
      alert('Failed to register phone number. Please try again.');
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setPin(value);
    }
  };

  return (
    <div>
      <button 
        onClick={() => setShowPinInput(!showPinInput)}
        disabled={isRegistering || !isRegistrationAllowed || isStatusLoading}
        style={{ 
          marginRight: '8px',
          opacity: isRegistrationAllowed ? 1 : 0.5,
          cursor: isRegistrationAllowed ? 'pointer' : 'not-allowed'
        }}
        title={
          isStatusLoading 
            ? 'Loading status...' 
            : !isRegistrationAllowed 
              ? `Registration not allowed for status: ${status}` 
              : 'Click to register phone number'
        }
      >
        Register
      </button>
      
      {showPinInput && (
        <div style={{ marginTop: '8px' }}>
          <div style={{ marginBottom: '8px' }}>
            Registering: {displayPhoneNumber}
          </div>
          <input
            type="text"
            placeholder="Enter 6-digit PIN"
            value={pin}
            onChange={handlePinChange}
            maxLength={6}
            style={{ marginRight: '8px', width: '120px' }}
          />
          <button 
            onClick={handleRegister}
            disabled={isRegistering || pin.length !== 6}
            style={{ marginRight: '8px' }}
          >
            {isRegistering ? 'Registering...' : 'Submit'}
          </button>
          <button 
            onClick={() => {
              setShowPinInput(false);
              setPin('');
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default RegisterNumber