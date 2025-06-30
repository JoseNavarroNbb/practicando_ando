<template>
  <aside class="sidebar" :class="{ 'sidebar-cerrado': !abierto }">
    <div class="contenedor-temas">
      <div 
        v-for="tema in temas" 
        :key="tema.id"
        class="grupo-tema"
      >
        <h3 class="titulo-tema" @click="alternarTema(tema)">
          <v-icon small class="mr-2">{{ tema.icono }}</v-icon>
          {{ tema.nombre }}
        </h3>
        <div v-if="temaAbierto === tema.id" class="subtemas">
          <button
            v-for="subtema in tema.subtemas"
            :key="subtema.id"
            class="subtema"
            @click="seleccionarSubtema(tema, subtema)"
          >
            {{ subtema.nombre }}
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  abierto: Boolean,
  temas: Array
});

const emit = defineEmits(['seleccionar-tema']);

const temaAbierto = ref(null);

const alternarTema = (tema) => {
  temaAbierto.value = temaAbierto.value === tema.id ? null : tema.id;
};

const seleccionarSubtema = (tema, subtema) => {
  emit('seleccionar-tema', { 
    ...tema, 
    subtemaSeleccionado: subtema 
  });
};
</script>

<style lang="scss" scoped>
@use '~scss/_variables.scss';
@use '~scss/_sidebar.scss';
</style>