export interface SensorData {
  time: string;
  value: number;
}

export const humidityData: SensorData[] = [
  { time: '3', value: 70 },
  { time: '9', value: 75 },
  { time: '15', value: 70 },
  { time: '21', value: 70 },
  { time: '27', value: 75 },
  { time: '33', value: 80 },
  { time: '39', value: 75 }
];

export const temperatureData: SensorData[] = [
  { time: '3', value: 16 },
  { time: '9', value: 16.5 },
  { time: '15', value: 16.3 },
  { time: '21', value: 16.5 },
  { time: '27', value: 15.8 },
  { time: '33', value: 16.3 },
  { time: '39', value: 15.5 }
];

export const co2Data: SensorData[] = [
  { time: '08:00', value: 450 },
  { time: '10:00', value: 480 },
  { time: '12:00', value: 520 },
  { time: '14:00', value: 600 },
  { time: '16:00', value: 650 },
  { time: '18:00', value: 580 },
  { time: '20:00', value: 500 }
];