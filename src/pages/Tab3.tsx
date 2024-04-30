import React, { useEffect, useRef } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import Chart from 'chart.js/auto';
import './Tab3.css';

const Tab3: React.FC = () => {
  const lineChartRef = useRef<HTMLCanvasElement | null>(null);
  const barChartRef = useRef<HTMLCanvasElement | null>(null);
  const lineChartInstance = useRef<Chart | null>(null);
  const barChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (lineChartRef.current && barChartRef.current) {
      // Destroy existing charts if they exist
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
        lineChartInstance.current = null;
      }
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
        barChartInstance.current = null;
      }

      // Dummy data for charts
      const data1 = [65, 59, 80, 81, 56, 55, 40];
      const data2 = [28, 48, 40, 19, 86, 27, 90];
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

      // Line chart
      const ctxLine = lineChartRef.current.getContext('2d');
      lineChartInstance.current = new Chart(ctxLine, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Dataset 1',
              data: data1,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'Dataset 2',
              data: data2,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            },
          ],
        },
      });

      // Bar chart
      const ctxBar = barChartRef.current.getContext('2d');
      barChartInstance.current = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Dataset 1',
              data: data1,
              backgroundColor: 'rgb(75, 192, 192)',
            },
            {
              label: 'Dataset 2',
              data: data2,
              backgroundColor: 'rgb(255, 99, 132)',
            },
          ],
        },
      });
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Line Chart</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <canvas ref={lineChartRef} width="400" height="400"></canvas>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Bar Chart</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <canvas ref={barChartRef} width="400" height="400"></canvas>
          </IonCardContent>
        </IonCard>

        {/* Add more IonCard components for additional charts */}

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
