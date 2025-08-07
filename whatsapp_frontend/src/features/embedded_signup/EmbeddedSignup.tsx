import React, { useEffect, useState } from 'react';
import EmbeddedSignupNumbersList from './EmbeddedSignupNumbersList';
import './EmbeddedSignupStyling.css';

function EmbeddedSignup() {
  const [responseData, setResponseData] = useState<any>(null);
  const [responseTitle, setResponseTitle] = useState<string>('');
  const [showResponse, setShowResponse] = useState<boolean>(false);
  const [selectedPhoneNumberId, setSelectedPhoneNumberId] = useState<string>('');

  // Get environment variables
  const appId = process.env.REACT_APP_FACEBOOK_APP_ID;
  const configId = process.env.REACT_APP_FACEBOOK_CONFIG_ID;

  // Handle phone number selection
  const handlePhoneNumberSelect = (id: string) => {
    setSelectedPhoneNumberId(id);
    console.log('Phone number selected in EmbeddedSignup:', id);
    
    // Display the configuration being used when phone number is selected
    // if (appId && configId) {
    //   displayResponse('Configuration Used', {
    //     appId: appId,
    //     configId: configId,
    //     selectedPhoneNumberId: id,
    //     timestamp: new Date().toISOString()
    //   });
    // }
  };

  // Display response function
  const displayResponse = (title: string, data: any) => {
    setResponseTitle(title);
    setResponseData(data);
    setShowResponse(true);
  };

  // Response callback
  const fbLoginCallback = (response: any) => {
    console.log('Full login response: ', response);
    displayResponse('Full Login Response', response);
    
    if (response.authResponse) {
      const code = response.authResponse.code;
      console.log('Auth code: ', code);
      displayResponse('Login Response (Code)', { code: code, fullResponse: response });
    } else {
      console.log('Login error/cancellation: ', response);
      displayResponse('Login Response (Error/Cancelled)', response);
    }
  };

  // Launch method and callback registration
  const launchWhatsAppSignup = (phoneNumberId?: string) => {
    const idToUse = phoneNumberId || selectedPhoneNumberId;
    try {
      // Check if environment variables are set
      if (!appId) {
        displayResponse('Error', { message: 'REACT_APP_FACEBOOK_APP_ID not found in environment variables' });
        return;
      }

      if (!configId) {
        displayResponse('Error', { message: 'REACT_APP_FACEBOOK_CONFIG_ID not found in environment variables' });
        return;
      }

      // Check if a phone number is selected
      if (!idToUse) {
        displayResponse('Error', { message: 'Please select a phone number before launching signup' });
        return;
      }

      // Check if FB is available
      if (typeof (window as any).FB === 'undefined') {
        displayResponse('Error', { message: 'Facebook SDK not loaded' });
        return;
      }
      
      // Prepare the request structure
      const fbLoginRequest = {
        config_id: configId,
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          feature: 'whatsapp_embedded_signup',
          setup: {
            preVerifiedPhone: {
              ids: [idToUse]
            }
          },
          featureType: '',
          sessionInfoVersion: '3',
        }
      };

      // Console log the complete request structure
      console.log('=== FB.login Request Structure ===');
      console.log('Full Request Object:', fbLoginRequest);
      console.log('Config ID:', configId);
      console.log('App ID:', appId);
      console.log('Selected Phone Number ID:', idToUse);
      console.log('Request Structure (formatted):', JSON.stringify(fbLoginRequest, null, 2));
      console.log('===================================');
      
      (window as any).FB.login(fbLoginCallback, fbLoginRequest);
    } catch (error: any) {
      console.error('Error launching WhatsApp signup:', error);
      displayResponse('Error Launching Signup', {
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    }
  };

  useEffect(() => {
    // Load Facebook SDK
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // SDK initialization
    (window as any).fbAsyncInit = function() {
      if (appId && typeof (window as any).FB !== 'undefined') {
        (window as any).FB.init({
          appId: appId,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v23.0'
        });
      }
    };
    
    // Session logging message event listener
    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.endsWith('facebook.com')) return;
      try {
        const data = JSON.parse(event.data);
        console.log('All message event: ', data);
        displayResponse('All Message Event', data);
        
        if (data.type === 'WA_EMBEDDED_SIGNUP') {
          console.log('WA_EMBEDDED_SIGNUP message event: ', data);
          displayResponse('WA_EMBEDDED_SIGNUP Event', data);
        }
      } catch {
        console.log('message event: ', event.data);
        displayResponse('Message Event (Raw)', event.data);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      document.head.removeChild(script);
    };
  }, [appId]);

  const clearPhoneNumberSelection = () => {
    setSelectedPhoneNumberId('');
  };

  return (
    <div className="embedded-signup-container" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/memphis-mini.png)`,
      backgroundRepeat: 'repeat',
      backgroundSize: '200px 200px',
      backgroundBlendMode: 'overlay'
    }}>
      <div className="embedded-signup-header">
      </div>
      
      <EmbeddedSignupNumbersList 
        onPhoneNumberSelect={handlePhoneNumberSelect}
        onLaunchSignup={launchWhatsAppSignup}
        onCancelSelection={clearPhoneNumberSelection}
      />
      
      {/* Response Display */}
      {showResponse && (
        <div className="response-display">
          <h3>Response Data</h3>
          <div className="response-content">
            <strong>{responseTitle}:</strong>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmbeddedSignup;