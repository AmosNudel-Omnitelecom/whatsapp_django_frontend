import React from 'react';
import { useGetWABASubscriptionsQuery, useSubscribeWebhooksMutation } from './WabasApi';

interface WebhookComponentProps {
  wabaId: string;
}

function WebhookComponent({ wabaId }: WebhookComponentProps) {
  const { data: subscriptions, isLoading, error, refetch } = useGetWABASubscriptionsQuery(wabaId);
  const [subscribeWebhooks, { isLoading: isSubscribing }] = useSubscribeWebhooksMutation();

  const handleSubscribe = async () => {
    try {
      await subscribeWebhooks(wabaId).unwrap();
      refetch(); // Refresh the subscriptions data
    } catch (error) {
      console.error('Failed to subscribe to webhooks:', error);
    }
  };

  if (isLoading) {
    return <div className="webhook-status">Checking webhook status...</div>;
  }

  if (error) {
    return <div className="webhook-status error">Error checking webhook status</div>;
  }

  // Check if there are any subscriptions - if data exists and has items, it's subscribed
  const isSubscribed = subscriptions?.data && subscriptions.data.length > 0;

  return (
    <div className="webhook-component">
      <div className="webhook-status">
        <span className={`status-indicator ${isSubscribed ? 'subscribed' : 'not-subscribed'}`}>
        </span>
        <span className="status-text">
          {isSubscribed ? 'Subscribed to webhook' : 'Not subscribed to webhook'}
        </span>
      </div>
      
      {!isSubscribed && (
        <button 
          onClick={handleSubscribe} 
          disabled={isSubscribing}
          className="subscribe-button"
        >
          {isSubscribing ? 'Subscribing...' : 'Subscribe to Webhooks'}
        </button>
      )}
    </div>
  );
}

export default WebhookComponent;