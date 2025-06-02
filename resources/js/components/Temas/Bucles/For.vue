<template>
  <article class="contenido-tema">
    <h2>Bucle For</h2>
    
    <section class="explicacion">
      <h3>¿Qué es un bucle For?</h3>
      <p>El bucle for es una estructura de control que repite un bloque de código un número determinado de veces.</p>
    </section>
    
    <section class="sintaxis">
      <h3>Sintaxis en JavaScript</h3>
      <pre><code>for (inicialización; condición; actualización) {
  // Código a ejecutar
}</code></pre>
    </section>
    
    <section class="ejemplo">
      <h3>Ejemplo Práctico</h3>
      <div class="demo-codigo">
        <pre><code>// Imprimir números del 1 al 5
for (let i = 1; i <= 5; i++) {
  console.log(i);
}</code></pre>
        <div class="resultado">
          <h4>Resultado:</h4>
          <output>1 2 3 4 5</output>
        </div>
      </div>
    </section>
    
    <section class="ejercicio">
      <h3>Inténtalo tú mismo</h3>
      <button @click="ejecutarEjemplo">Ejecutar ejemplo</button>
      <output>{{ resultado }}</output>
    </section>
  </article>
</template>

<script setup>
import { ref } from 'vue';

const resultado = ref('');

const ejecutarEjemplo = () => {
  resultado.value = '';
  for (let i = 1; i <= 5; i++) {
    resultado.value += `${i} `;
  }
};
</script>

<style lang="scss" scoped>
@use '~scss/_temas.scss';
</style>