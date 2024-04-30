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
import './Tab2.css';

const Tab2: React.FC = () => {
  const [inputText1, setInputText1] = useState('');
  const [inputText2, setInputText2] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [error, setError] = useState('');

  const handleInputChange1 = (event: CustomEvent) => {
    setInputText1(event.detail.value || '');
  };

  const handleInputChange2 = (event: CustomEvent) => {
    setInputText2(event.detail.value || '');
  };

  const callRestApi = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        body: JSON.stringify({ inputText1, inputText2 }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setApiResponse(data.responseData); // Assuming your API response contains responseData field
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
          <IonTitle>Check if Same Author</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Enter Text</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput
              placeholder="Type Text 1"
              value={inputText1}
              onIonChange={handleInputChange1}
            />
            <IonInput
              placeholder="Type Text 2"
              value={inputText2}
              onIonChange={handleInputChange2}
            />
            <IonButton expand="block" onClick={callRestApi}>
              Check
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

export default Tab2;
