/*import { ref } from "vue";
import { io, Socket } from "socket.io-client";

const socket = ref<Socket | null>(null);

export function useSocket() {
  const connect = () => {
    if (!socket.value) {
      const api = import.meta.env.VITE_API_URL;
      socket.value = io(`http://${api}`, { reconnection: true });
    }
  };

  const disconnect = () => {
    socket.value?.disconnect();
    socket.value = null;
  };

  return { socket, connect, disconnect };
}*/
