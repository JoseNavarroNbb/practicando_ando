<template>
  <header class="toolbar" :class="{ 'sidebar-abierto': sidebarAbierto }">
    <button class="boton-menu" @click="$emit('toggle-sidebar')">
      <span class="icono">☰</span>
    </button>
    
    <h1 class="titulo">Fundamentos de Programación</h1>
    
    <div class="menu-temas">
      <button class="boton-aplicaciones" @click="alternarMenu">
        <span class="icono">📱</span>
      </button>
      <div v-if="menuVisible" class="lista-temas">
        <button 
          v-for="tema in temas" 
          :key="tema.id"
          @click="seleccionarTema(tema)"
        >
          {{ tema.icono }} {{ tema.nombre }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useTemasStore } from '@/stores/temasStore';

defineProps({
  sidebarAbierto: Boolean
});

const emit = defineEmits(['toggle-sidebar', 'seleccionar-tema']);

const menuVisible = ref(false);
const { temas } = useTemasStore();

const alternarMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const seleccionarTema = (tema) => {
  emit('seleccionar-tema', tema);
  menuVisible.value = false;
};
</script>

<style lang="scss" scoped>
@use '~scss/_variables.scss';
@use '~scss/_toolbar.scss';
</style>