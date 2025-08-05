import React, { useState } from 'react'
import { useAddPhoneNumberMutation } from './phoneNumbersApi'


const AddPhoneNumber: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [addPhoneNumber, { isLoading }] = useAddPhoneNumberMutation();
  
    // Format phone number for display (add + if not present)
    const formatPhoneForDisplay = (value: string): string => {
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length === 0) {
        return '';
      }
      return `+${cleanValue}`;
    };

    // Get phone number with + for API call
    const getPhoneWithPlus = (value: string): string => {
      const cleanValue = value.replace(/\D/g, '');
      return cleanValue.length > 0 ? `+${cleanValue}` : '';
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const cleanValue = inputValue.replace(/\D/g, '');
      
      // Store only the numeric part, the + will be added when sending to API
      setPhoneNumber(cleanValue);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!phoneNumber.trim()) {
        alert('Please enter a phone number');
        return;
      }

      const phoneWithPlus = getPhoneWithPlus(phoneNumber);
      
      // Basic phone number validation
      const phoneRegex = /^\+[1-9]\d{1,14}$/;
      if (!phoneRegex.test(phoneWithPlus)) {
        alert('Please enter a valid phone number (e.g., +1234567890)');
        return;
      }

      try {
        await addPhoneNumber(phoneWithPlus).unwrap();
        alert('Phone number added successfully!');
        setPhoneNumber('');
      } catch (error) {
        console.error('Failed to add phone number:', error);
        alert('Failed to add phone number. Please try again.');
      }
    };
  
        const handleCancel = () => {
      setPhoneNumber('');
    };

    return (
      <div className="add-phone-number-container">
        <div className="add-phone-form">
          <h3>Add New Phone Number</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                value={formatPhoneForDisplay(phoneNumber)}
                onChange={handlePhoneChange}
                placeholder="+1234567890"
                className="phone-input"
                disabled={isLoading}
              />
              <small>Enter phone number in international format (e.g., +1234567890)</small>
            </div>
            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Phone Number'}
              </button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default AddPhoneNumber;