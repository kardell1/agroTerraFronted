import { reactive, onMounted, onUnmounted, provide } from "vue";
import { useSocket } from "./useSocket";

// Definimos el tipo de datos de los sensores
export interface SensorData {
  SensorLuz: string;
  SensorTemperatura: string;
  SensorHumedad: string;
  SensorSuelo: string;
}

// Clave para provide/inject
export const ContextSocketKey = Symbol("ContextSocket");

// Composable que provee los datos de los sensores a los hijos
export function provideSocketContext() {
  const data = reactive<SensorData>({
    SensorLuz: "0",
    SensorTemperatura: "0",
    SensorHumedad: "0",
    SensorSuelo: "0",
  });

  const { socket, connect, disconnect } = useSocket();

onMounted(() => {
  connect();

  // Escuchar eventos del socket
  socket.value?.on("esp32/ResHumedad", (value: string) => {
    data.SensorHumedad = value;
  });
  socket.value?.on("esp32/ResTemperatura", (value: string) => {
    data.SensorTemperatura = value;
  });
  socket.value?.on("esp32/ResSuelo", (value: string) => {
    data.SensorSuelo = value;
  });
  socket.value?.on("esp32/ResLuz", (value: string) => {
    data.SensorLuz = value;
  });
});
onUnmounted(() => {
  socket.value?.off("esp32/ResHumedad");
  socket.value?.off("esp32/ResTemperatura");
  socket.value?.off("esp32/ResSuelo");
  socket.value?.off("esp32/ResLuz");
  disconnect();
});

  // Proveemos los datos a los hijos
  provide(ContextSocketKey, data);

  return { data };
}
