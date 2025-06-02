<template>
  <div class="app-layout">
    <Toolbar @toggle-sidebar="alternarSidebar" />
    <Sidebar :abierto="sidebarAbierto" :temas="temas" @seleccionar-tema="cambiarTema" />
    <main class="contenido-principal">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // Importación añadida
import { useTemasStore } from '@/stores/temasStore';
import Toolbar from './Toolbar.vue';
import Sidebar from './Sidebar.vue';

const router = useRouter(); // Obtenemos el router
const sidebarAbierto = ref(true);
const temasStore = useTemasStore();

// Cargar temas al iniciar
temasStore.cargarTemas();

const temas = computed(() => temasStore.temas);

const alternarSidebar = () => {
  sidebarAbierto.value = !sidebarAbierto.value;
};

const cambiarTema = (tema) => {
  // Navegar a la ruta del tema seleccionado
  if (tema.subtemaSeleccionado) {
    router.push(`/temas/${tema.id}/${tema.subtemaSeleccionado.id}`);
  } else {
    router.push(`/temas/${tema.id}/${tema.subtemas[0].id}`);
  }
};
</script>

<style lang="scss">
@use '~scss/app.scss';

.app-layout {
  display: grid;
  grid-template-areas:
    "toolbar toolbar"
    "sidebar contenido";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
}

.contenido-principal {
  grid-area: contenido;
  padding: 1rem;
  overflow-y: auto;
}
</style>