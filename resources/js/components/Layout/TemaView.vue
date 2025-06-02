<template>
  <component :is="componenteTema" v-if="componenteTema" />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import NotFound from '@/components/Temas/NotFound.vue';

const route = useRoute();
const componenteTema = ref(null);

const cargarComponente = async () => {
  try {
    // Construct the actual file path
    const temaId = route.params.temaId;
    const subtemaId = route.params.subtemaId;
    
    // Capitalize first letter for folder names
    const temaFolder = temaId.charAt(0).toUpperCase() + temaId.slice(1);
    const componentName = subtemaId.charAt(0).toUpperCase() + subtemaId.slice(1);
    
    // Use the actual path structure from your project
    const componentPath = `/resources/js/components/Temas/${temaFolder}/${componentName}.vue`;
    
    const modulo = await import(/* @vite-ignore */ componentPath);
    componenteTema.value = modulo.default;
  } catch (error) {
    console.error('Error cargando componente:', error);
    componenteTema.value = NotFound;
  }
};

// Cargar componente inicial
cargarComponente();

// Recargar cuando cambien los parámetros
watch(() => [route.params.temaId, route.params.subtemaId], cargarComponente);
</script>
<!-- <template>
  <component :is="componenteTema" v-if="componenteTema" />
</template>


<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import NotFound from '@/components/Temas/NotFound.vue';

const route = useRoute();
const componenteTema = ref(null);

const cargarComponente = async () => {
  try {
    // Map the route parameters to actual component paths
    const componentMap = {
      'bucles/for': () => import('@/components/Temas/Bucles/For.vue'),
      'bucles/while': () => import('@/components/Temas/Bucles/While.vue'),
      'condicionales/if': () => import('@/components/Temas/Condicionales/If.vue'),
      'condicionales/switch': () => import('@/components/Temas/Condicionales/Switch.vue'),
    };
    
    const componentKey = `${route.params.temaId}/${route.params.subtemaId}`;
    const importFunction = componentMap[componentKey];
    
    if (importFunction) {
      const modulo = await importFunction();
      componenteTema.value = modulo.default;
    } else {
      componenteTema.value = NotFound;
    }
  } catch (error) {
    console.error('Error cargando componente:', error);
    componenteTema.value = NotFound;
  }
};

// Cargar componente inicial
cargarComponente();

// Recargar cuando cambien los parámetros
watch(() => [route.params.temaId, route.params.subtemaId], cargarComponente);
</script> -->