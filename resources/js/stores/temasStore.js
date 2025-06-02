import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTemasStore = defineStore('temas', () => {
  const temas = ref([]);

  const cargarTemas = () => {
    temas.value = [
      {
        id: 'bucles',
        nombre: 'Bucles',
        icono: '🔄',
        subtemas: [
          { id: 'for', nombre: 'Bucle For' },
          { id: 'while', nombre: 'Bucle While' },
          { id: 'dowhile', nombre: 'Bucle Do-While' }
        ]
      },
      {
        id: 'condicionales',
        nombre: 'Condicionales',
        icono: '❓',
        subtemas: [
          { id: 'if', nombre: 'If' },
          { id: 'else', nombre: 'Else' },
          { id: 'switch', nombre: 'Switch' }
        ]
      }
    
    ];
  };

  return { temas, cargarTemas };
});