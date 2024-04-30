import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
} from '@ionic/react';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event: CustomEvent) => {
    setInputText(event.detail.value || '');
  };

  const callRestApi = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        body: JSON.stringify({ inputText }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setApiResponse(data.responseData); 
        setError('');
      } else {
        setError(data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error calling API:', error);
      setError('Network error occurred. Please try again later.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Find Author</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Enter Text</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput
              placeholder="Enter Text by Author"
              value={inputText}
              onIonChange={handleInputChange}
            />
            <IonButton expand="block" onClick={callRestApi}>
              Find Author
            </IonButton>
          </IonCardContent>
        </IonCard>

        {error && (
          <IonCard color="danger">
            <IonCardHeader>
              <IonCardTitle>Error</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText color="light">{error}</IonText>
            </IonCardContent>
          </IonCard>
        )}

        {apiResponse && !error && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>API Response</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {apiResponse}
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
