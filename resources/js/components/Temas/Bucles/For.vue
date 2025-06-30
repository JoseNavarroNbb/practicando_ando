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

    <!-- Ejemplo básico -->
    <section class="ejemplo">
      <h3>Ejemplo 1: Números del 1 al 5</h3>
      <div class="demo-codigo">
        <pre><code>for (let i = 1; i <= 5; i++) {
          console.log(i);
        }</code>
        </pre>
        <div class="resultado">
          <button @click="ejemploBasico">Ejecutar</button>
          <output>{{ resultado1 }}</output>
        </div>
      </div>
    </section>

    <!-- Ejemplo números pares -->
    <section class="ejemplo">
      <h3>Ejemplo 2: Números pares del 2 al 10</h3>
      <div class="demo-codigo">
        <pre><code>for (let i = 2; i <= 10; i += 2) {
  console.log(i);
}</code>
</pre>
        <div class="resultado">
          <button @click="ejemploPares">Ejecutar</button>
          <output>{{ resultado2 }}</output>
        </div>
      </div>
    </section>

    <!-- Ejemplo cuenta regresiva -->
    <section class="ejemplo">
      <h3>Ejemplo 3: Cuenta regresiva de 5 a 1</h3>
      <div class="demo-codigo">
        <pre><code>for (let i = 5; i > 0; i--) {
  console.log(i);
}</code>
</pre>
        <div class="resultado">
          <button @click="ejemploRegresivo">Ejecutar</button>
          <output>{{ resultado3 }}</output>
        </div>
      </div>
    </section>

    <!-- Ejemplo recorrer array -->
    <section class="ejemplo">
      <h3>Ejemplo 4: Recorrer un array</h3>
      <div class="demo-codigo">
        <pre><code>const frutas = ['manzana', 'banana', 'naranja'];
for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}</code>
</pre>
        <div class="resultado">
          <button @click="ejemploRecorrerArray">Ejecutar</button>
          <output>{{ resultado4 }}</output>
        </div>
      </div>
    </section>

    <!-- Ejemplo suma array -->
    <section class="ejemplo">
      <h3>Ejemplo 5: Sumar elementos de un array</h3>
      <div class="demo-codigo">
        <pre><code>const numeros = [1, 2, 3, 4, 5];
let suma = 0;
for (let i = 0; i < numeros.length; i++) {
  suma += numeros[i];
}
console.log(suma);</code>
</pre>
        <div class="resultado">
          <button @click="ejemploSumaArray">Ejecutar</button>
          <output>{{ resultado5 }}</output>
        </div>
      </div>
    </section>

    <!-- Ejemplo for of -->
    <section class="ejemplo">
      <h3>Ejemplo 6: Bucle for...of</h3>
      <div class="demo-codigo">
        <pre><code>const colores = ['rojo', 'verde', 'azul'];
for (const color of colores) {
  console.log(color);
}</code>
</pre>
        <div class="resultado">
          <button @click="ejemploForOf">Ejecutar</button>
          <output>{{ resultado6 }}</output>
        </div>
      </div>
    </section>

    <!-- Ejemplo tabla multiplicar -->
    <section class="ejemplo">
      <h3>Ejemplo 7: Tabla de multiplicar del 5</h3>
      <div class="demo-codigo">
        <pre><code>const numero = 5;
          for (let i = 1; i <= 10; i++) {
            console.log(`${numero} x ${i} = ${numero * i}`);
          }</code>
        </pre>
        <div class="resultado">
          <button @click="ejemploTablaMultiplicar">Ejecutar</button>
          <output>{{ resultado7 }}</output>
        </div>
      </div>
    </section>






    <h2>Bucle For con Datos de API</h2>

    <section class="explicacion">
      <h3>Recorriendo datos de una API</h3>
      <p>Podemos usar bucles for para procesar y mostrar datos recibidos de una API.</p>
    </section>

    <!-- Ejemplo con datos de API simulados -->
    <section class="ejemplo">
      <h3>Ejemplo: Municipios de Puebla</h3>
      <div class="demo-codigo">
        <pre><code>// Datos simulados de API
const municipios = [
  { Nombre: "Puebla", Poblacion: "1,542,232" },
  { Nombre: "Tehuacán", Poblacion: "327,312" },
  // ... más municipios
];

// Recorrer con for
for (let i = 0; i < municipios.length; i++) {
  console.log(`${municipios[i].Nombre}: ${municipios[i].Poblacion} hab.`);
}</code></pre>
        <div class="resultado">
          <button @click="cargarMunicipios">Cargar Municipios</button>
          <div v-if="cargando" class="cargando">Cargando datos...</div>
          <ul v-else-if="municipios.length > 0">
            <li v-for="(municipio, index) in municipios" :key="index">
              {{ municipio.Nombre }}: {{ municipio.Poblacion }} habitantes
            </li>
          </ul>
          <div v-else-if="error" class="error">{{ error }}</div>
          <div v-else class="aviso">Presiona el botón para cargar los datos</div>
        </div>
      </div>
    </section>

    <!-- Ejemplo con filtrado -->
    <section class="ejemplo">
      <h3>Filtrar municipios por población</h3>
      <div class="filtros">
        <label>
          Población mínima:
          <input type="number" v-model="poblacionMinima" min="0">
        </label>
        <button @click="filtrarMunicipios">Filtrar</button>
      </div>
      <div class="resultado-filtrado">
        <ul v-if="municipiosFiltrados.length > 0">
          <li v-for="(municipio, index) in municipiosFiltrados" :key="'filtrado-' + index">
            {{ municipio.Nombre }}: {{ municipio.Poblacion }} habitantes
          </li>
        </ul>
        <div v-else class="aviso">No hay municipios que cumplan el filtro</div>
      </div>
    </section>


  </article>
</template>

<script>
export default {
  data() {
    return {
      resultado1: '',
      resultado2: '',
      resultado3: '',
      resultado4: '',
      resultado5: '',
      resultado6: '',
      resultado7: '',
      cargando: false,
      municipios: [],
      municipiosFiltrados: [],
      poblacionMinima: 100000,
      error: null
    }
  },
  methods: {
    ejemploBasico() {
      this.resultado1 = '';
      for (let i = 1; i <= 5; i++) {
        this.resultado1 += `${i} `;
      }
    },
    ejemploPares() {
      this.resultado2 = '';
      for (let i = 2; i <= 10; i += 2) {
        this.resultado2 += `${i} `;
      }
    },
    ejemploRegresivo() {
      this.resultado3 = '';
      for (let i = 5; i > 0; i--) {
        this.resultado3 += `${i} `;
      }
    },
    ejemploRecorrerArray() {
      this.resultado4 = '';
      const frutas = ['manzana', 'banana', 'naranja'];
      for (let i = 0; i < frutas.length; i++) {
        this.resultado4 += `${frutas[i]} `;
      }
    },
    ejemploSumaArray() {
      const numeros = [1, 2, 3, 4, 5];
      let suma = 0;
      for (let i = 0; i < numeros.length; i++) {
        suma += numeros[i];
      }
      this.resultado5 = `La suma es: ${suma}`;
    },
    ejemploForOf() {
      this.resultado6 = '';
      const colores = ['rojo', 'verde', 'azul'];
      for (const color of colores) {
        this.resultado6 += `${color} `;
      }
    },
    ejemploTablaMultiplicar() {
      this.resultado7 = '';
      const numero = 5;
      for (let i = 1; i <= 10; i++) {
        this.resultado7 += `${numero} x ${i} = ${numero * i}\n`;
      }
    },



    // Método para simular la carga de datos de una API
    cargarMunicipios() {
      this.cargando = true;
      this.error = null;

      // Simulamos un retraso de red con setTimeout
      setTimeout(() => {
        try {
          // Datos mockeados - en una aplicación real estos vendrían de una API
          const datosMockeados = [
            { Nombre: "Puebla", Poblacion: "1,542,232" },
            { Nombre: "Tehuacán", Poblacion: "327,312" },
            { Nombre: "San Martín Texmelucan", Poblacion: "155,738" },
            { Nombre: "Atlixco", Poblacion: "127,062" },
            { Nombre: "San Pedro Cholula", Poblacion: "120,459" },
            { Nombre: "Huauchinango", Poblacion: "98,957" },
            { Nombre: "Zacatlán", Poblacion: "76,296" },
            { Nombre: "Chignahuapan", Poblacion: "55,510" },
            { Nombre: "Cuetzalan", Poblacion: "48,866" },
            { Nombre: "Xicotepec", Poblacion: "72,427" }
          ];

          this.municipios = datosMockeados;
          this.municipiosFiltrados = [...datosMockeados];
        } catch (err) {
          this.error = "Error al cargar los datos: " + err.message;
        } finally {
          this.cargando = false;
        }
      }, 1000); // Simulamos 1 segundo de delay
    },

    // Método para filtrar municipios por población
    filtrarMunicipios() {
      // Convertimos la población a número (quitamos comas)
      const minPoblacion = Number(this.poblacionMinima);

      // Filtramos usando for tradicional
      const resultados = [];
      for (let i = 0; i < this.municipios.length; i++) {
        const poblacion = Number(this.municipios[i].Poblacion.replace(/,/g, ''));
        if (poblacion >= minPoblacion) {
          resultados.push(this.municipios[i]);
        }
      }

      this.municipiosFiltrados = resultados;
    },

    // Versión alternativa con for...of
    filtrarMunicipiosForOf() {
      const minPoblacion = Number(this.poblacionMinima);
      const resultados = [];

      for (const municipio of this.municipios) {
        const poblacion = Number(municipio.Poblacion.replace(/,/g, ''));
        if (poblacion >= minPoblacion) {
          resultados.push(municipio);
        }
      }

      this.municipiosFiltrados = resultados;
    }



  }
}
</script>

<style lang="scss" scoped>
@use '~scss/_temas.scss';



.ejemplo {
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.demo-codigo {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

pre {
  background-color: #282c34;
  color: #abb2bf;
  padding: 15px;
  border-radius: 5px;
  flex: 1;
}

.resultado {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  padding: 8px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
}

button:hover {
  background-color: #3aa876;
}

output {
  white-space: pre-wrap;
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  min-height: 50px;
  border: 1px solid #ddd;
}
</style>