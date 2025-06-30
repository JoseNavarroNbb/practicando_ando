<template>
  <v-container>
    <v-card class="mb-6">
      <v-card-title class="headline">Bucle While con API de Pokémon</v-card-title>
      
      <v-card-text>
        <v-alert class="alert-info">
          Este ejemplo muestra cómo usar un bucle while para obtener y procesar datos de la PokeAPI.
          El while es ideal cuando queremos procesar datos hasta cumplir cierta condición.
        </v-alert>

        <v-row class="mb-4">
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="limitePokemon"
              label="Límite de Pokémon a cargar"
              type="number"
              min="1"
              max="100"
              :append-icon="cargando ? 'mdi-loading mdi-spin' : 'mdi-check'"
              :disabled="cargando"
              outlined
              @keyup.enter="cargarPokemones"
            ></v-text-field>
          </v-col>
          
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="pokemonInicial"
              label="Pokémon inicial"
              type="number"
              min="1"
              max="1000"
              :append-icon="cargando ? 'mdi-loading mdi-spin' : 'mdi-check'"
              :disabled="cargando"
              outlined
              @keyup.enter="cargarPokemones"
            ></v-text-field>
          </v-col>
          
          <v-col cols="12" sm="6" md="4" class="d-flex align-center">
            <v-btn 
              class="custom-button-confirmar"
              :loading="cargando"
              @click="cargarPokemones"
              block
            >
              <v-icon left>mdi-pokeball</v-icon>
              {{ cargando ? 'Cargando...' : 'Obtener Pokémon' }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Ejemplo básico con while -->
    <v-card class="mb-6">
      <v-card-title>Ejemplo 1: Obtener lista básica de Pokémon</v-card-title>
      
      <v-card-text>
        <v-row>
       
        <v-col cols="12" md="6">
        <pre class="code-block">
<code>let offset = 0;
  const limit = {{ limitePokemon }};
  const pokemones = [];

  while (offset < limit) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${offset + 1}`);
    const data = await response.json();
    pokemones.push(data.name);
    offset++;
  }
</code></pre>
        </v-col>
        <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="title-table">Pokémon obtenidos</v-card-title>
          
          <v-data-table
            v-if="pokemonesBasicos.length > 0"
            :headers="headersBasicos"
            :items="pokemonesBasicosTable"
            :items-per-page="-1"
            class="custom-data-table"
            fixed-header
            height="300px"
          >
            <template v-slot:item.index="{ index }">
              #{{ index + 1 }}
            </template>
          </v-data-table>
          
          <v-alert v-else class="alert-info">
            Ejecuta la carga para ver los resultados
          </v-alert>
        </v-card>
        </v-col>
      </v-row>
      </v-card-text>
    </v-card>

    <!-- Ejemplo avanzado con detalles -->
    <v-card class="mb-6">
      <v-card-title>Ejemplo 2: Obtener detalles completos con while</v-card-title>
      
      <v-card-text>
        <v-row>
       
        <v-col cols="12" md="6">
        <pre class="code-block"><code>let contador = {{ pokemonInicial }};
const pokemonesCompletos = [];

while (contador <= {{ pokemonInicial + limitePokemon - 1 }}) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${contador}`);
    const data = await response.json();
    
    pokemonesCompletos.push({
      id: data.id,
      name: data.name,
      types: data.types.map(t => t.type.name),
      abilities: data.abilities.map(a => a.ability.name)
    });
  } catch (error) {
    console.error(`Error con Pokémon ${contador}:`, error);
  }
  contador++;
}</code></pre>
        </v-col>
        <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="title-table">Pokémon con detalles</v-card-title>
          
          <v-progress-linear 
            v-if="cargando" 
            indeterminate 
            color="primary"
          ></v-progress-linear>
          
          <v-data-table
            v-else-if="pokemonesDetallados.length > 0"
            :headers="headersDetallados"
            :items="pokemonesDetallados"
            :items-per-page="-1"
            class="custom-data-table"
            fixed-header
            height="400px"
          >
            <template v-slot:item.types="{ item }">
              <v-chip 
                v-for="(type, i) in item.types" 
                :key="i"
                small
                class="mr-1"
                :color="getTypeColor(type)"
              >
                {{ type }}
              </v-chip>
            </template>
            
            <template v-slot:item.abilities="{ item }">
              <v-chip 
                v-for="(ability, i) in item.abilities" 
                :key="i"
                small
                class="mr-1"
                color="secondary"
              >
                {{ ability }}
              </v-chip>
            </template>
            
            <template v-slot:item.sprites="{ item }">
              <v-avatar size="80">
                <img :src="item.sprites.front_default" :alt="item.name">
              </v-avatar>
            </template>
          </v-data-table>
          
          <v-alert v-else class="alert-info">
            Ejecuta la carga para ver los resultados
          </v-alert>
        </v-card>
         </v-col>
      </v-row>
      </v-card-text>
    </v-card>
   

    <!-- Ejemplo con búsqueda -->
    <v-card class="mb-6">
      <v-card-title>Ejemplo 3: Buscar Pokémon por tipo con while</v-card-title>
      
      <v-card-text>
        <v-row class="mb-4">
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="tipoBuscado"
              :items="tiposPokemon"
              label="Tipo a buscar"
              outlined
            ></v-select>
          </v-col>
          
          <v-col cols="12" sm="6" md="4" class="d-flex align-center">
            <v-btn 
              class="custom-button-confirmar" 
              :loading="buscando"
              @click="buscarPorTipo"
              block
            >
              <v-icon left>mdi-magnify</v-icon>
              {{ buscando ? 'Buscando...' : 'Buscar Pokémon' }}
            </v-btn>
          </v-col>
        </v-row>
         <v-row>
       
        <v-col cols="12" md="6">
        
        <pre class="code-block"><code>let encontrados = 0;
let currentId = 1;
const maxPokemon = 100; // Límite para la búsqueda
const pokemonesTipo = [];

while (encontrados < 5 && currentId <= maxPokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentId}`);
  const data = await response.json();
  
  if (data.types.some(t => t.type.name === '{{ tipoBuscado }}')) {
    pokemonesTipo.push({
      id: data.id,
      name: data.name
    });
    encontrados++;
  }
  currentId++;
}</code></pre>
</v-col>
        <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="title-table">Pokémon de tipo {{ tipoBuscado }}</v-card-title>
          
          <v-progress-linear 
            v-if="buscando" 
            indeterminate 
            color="primary"
          ></v-progress-linear>
          
          <v-data-table
            v-else-if="pokemonesPorTipo.length > 0"
            :headers="headersPorTipo"
            :items="pokemonesPorTipo"
            :items-per-page="-1"
            class="custom-data-table"
            fixed-header
            height="300px"
          >
            <template v-slot:item.name="{ item }">
              {{ capitalize(item.name) }}
            </template>
          </v-data-table>
          
          <v-alert v-else class="alert-info">
            Ejecuta la búsqueda para ver resultados
          </v-alert>
          
        </v-card>
         </v-col>
    </v-row>
      </v-card-text>
      
    </v-card>
   

    <!-- Ejemplo con paginación -->
    <v-card class="mb-6">
      <v-card-title>Ejemplo 4: Paginación con while</v-card-title>
      
      <v-card-text>
        <v-btn 
          class="custom-button-confirmar"
          :loading="cargandoMas"
          @click="cargarMasPokemones"
        >
          <v-icon left>mdi-plus-circle</v-icon>
          {{ cargandoMas ? 'Cargando...' : 'Cargar más Pokémon' }}
        </v-btn>
        
        <pre class="code-block"><code>let paginaActual = 1;
const pokemonesPorPagina = 5;
let hayMasPokemones = true;

while (hayMasPokemones && paginaActual <= 3) { // Limitamos a 3 páginas
  const offset = (paginaActual - 1) * pokemonesPorPagina;
  
  for (let i = 1; i <= pokemonesPorPagina; i++) {
    const id = offset + i;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    pokemonesPagina.push(data);
  }
  
  paginaActual++;
  hayMasPokemones = pokemonesPagina.length < 15; // Limite total
}</code></pre>
        
        <v-card outlined class="mt-4">
          <v-card-title class="title-table">Pokémon cargados (página {{ paginaActual - 1 }})</v-card-title>
          
          <v-progress-linear 
            v-if="cargandoMas" 
            indeterminate 
            color="primary"
          ></v-progress-linear>
          
          <v-data-table
            v-else-if="pokemonesPaginados.length > 0"
            :headers="headersPaginados"
            :items="pokemonesPaginados"
            :items-per-page="-1"
            class="custom-data-table"
            fixed-header
            height="400px"
          >
            <template v-slot:item.name="{ item }">
              {{ capitalize(item.name) }}
            </template>
            
            <template v-slot:item.types="{ item }">
              <v-chip 
                v-for="(type, i) in item.types.map(t => t.type.name)" 
                :key="i"
                small
                class="mr-1"
                :color="getTypeColor(type)"
              >
                {{ type }}
              </v-chip>
            </template>
            
            <template v-slot:item.sprites="{ item }">
              <v-avatar size="80">
                <img :src="item.sprites.front_default" :alt="item.name">
              </v-avatar>
            </template>
          </v-data-table>
          
          <v-alert v-else class="alert-info">
            Presiona el botón para cargar Pokémon
          </v-alert>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      limitePokemon: 5,
      pokemonInicial: 1,
      cargando: false,
      pokemonesBasicos: [],
      pokemonesDetallados: [],
      tipoBuscado: 'fire',
      buscando: false,
      pokemonesPorTipo: [],
      cargandoMas: false,
      pokemonesPaginados: [],
      paginaActual: 1,
      tiposPokemon: [
        { title: 'Fuego', value: 'fire' },
        { title: 'Agua', value: 'water' },
        { title: 'Planta', value: 'grass' },
        { title: 'Eléctrico', value: 'electric' },
        { title: 'Psíquico', value: 'psychic' },
        { title: 'Tierra', value: 'ground' },
        { title: 'Volador', value: 'flying' },
        { title: 'Veneno', value: 'poison' },
      ],
      headersBasicos: [
        { title: '#', value: 'index', width: '80px' },
        { title: 'Nombre', value: 'name' },
      ],
      headersDetallados: [
        { title: 'ID', value: 'id', width: '80px' },
        { title: 'Nombre', value: 'name' },
        { title: 'Imagen', value: 'sprites' },
        { title: 'Tipos', value: 'types' },
        { title: 'Habilidades', value: 'abilities' },
      ],
      headersPorTipo: [
        { title: 'ID', value: 'id', width: '80px' },
        { title: 'Nombre', value: 'name' },
      ],
      headersPaginados: [
        { title: 'ID', value: 'id', width: '80px' },
        { title: 'Nombre', value: 'name' },
        { title: 'Imagen', value: 'sprites' },
        { title: 'Tipos', value: 'types' },
      ],
      typeColors: {
        fire: 'orange',
        water: 'blue',
        grass: 'green',
        electric: 'yellow darken-2',
        psychic: 'purple',
        ground: 'brown',
        flying: 'light-blue',
        poison: 'deep-purple',
      }
    }
  },
  computed: {
    pokemonesBasicosTable() {
      return this.pokemonesBasicos.map((name, index) => ({
        index: index + 1,
        name: this.capitalize(name)
      }));
    }
  },
  methods: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    
    getTypeColor(type) {
      return this.typeColors[type] || 'grey';
    },
    
    async cargarPokemones() {
      this.cargando = true;
      this.pokemonesBasicos = [];
      this.pokemonesDetallados = [];
      
      // Ejemplo 1: Obtener solo nombres
      let offset = 0;
      while (offset < this.limitePokemon) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonInicial + offset}`);
          const data = await response.json();
          this.pokemonesBasicos.push(data.name);
        } catch (error) {
          console.error(`Error con Pokémon ${this.pokemonInicial + offset}:`, error);
        }
        offset++;
      }
      
      // Ejemplo 2: Obtener detalles completos
      let contador = this.pokemonInicial;
      while (contador <= this.pokemonInicial + this.limitePokemon - 1) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${contador}`);
          const data = await response.json();
          
          this.pokemonesDetallados.push({
            id: data.id,
            name: data.name,
            types: data.types.map(t => t.type.name),
            abilities: data.abilities.map(a => a.ability.name),
            sprites: data.sprites
          });
        } catch (error) {
          console.error(`Error con Pokémon ${contador}:`, error);
        }
        contador++;
      }
      
      this.cargando = false;
    },
    
    async buscarPorTipo() {
      this.buscando = true;
      this.pokemonesPorTipo = [];
      
      let encontrados = 0;
      let currentId = 1;
      const maxPokemon = 100; // Límite para no sobrecargar la API
      
      while (encontrados < 5 && currentId <= maxPokemon) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentId}`);
          const data = await response.json();
          
          if (data.types.some(t => t.type.name === this.tipoBuscado)) {
            this.pokemonesPorTipo.push({
              id: data.id,
              name: data.name,
              types: data.types.map(t => t.type.name)
            });
            encontrados++;
          }
        } catch (error) {
          console.error(`Error con Pokémon ${currentId}:`, error);
        }
        currentId++;
      }
      
      this.buscando = false;
    },
    
    async cargarMasPokemones() {
      this.cargandoMas = true;
      const pokemonesPorPagina = 5;
      const offset = (this.paginaActual - 1) * pokemonesPorPagina;
      
      let i = 0;
      while (i < pokemonesPorPagina) {
        const id = offset + i + 1;
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await response.json();
          this.pokemonesPaginados.push(data);
        } catch (error) {
          console.error(`Error con Pokémon ${id}:`, error);
        }
        i++;
      }
      
      this.paginaActual++;
      this.cargandoMas = false;
    }
  }
}
</script>

<style lang="scss" scoped>


.configuracion, .controles {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f0f8ff;
  border-radius: 5px;
  
  label {
    display: block;
    margin-bottom: 10px;
    
    input, select {
      margin-left: 10px;
      padding: 5px;
    }
  }
  
  button {
    margin-top: 10px;
  }
}
.code-block {
  background-color: #282c34;
  color: #abb2bf;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  font-size: .7rem;
  font-family: 'Courier New', Courier, monospace;
  line-height: 1.5;
}

.v-card {
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
}

.v-data-table {
  .v-chip {
    text-transform: capitalize;
  }
}

.v-avatar img {
  object-fit: contain;
}

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
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
}

pre {
  background-color: #282c34;
  color: #abb2bf;
  padding: 15px;
  border-radius: 5px;
  flex: 1;
  overflow-x: auto;
}

.resultado {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  .pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 15px;
  }
  
  .pokemon-card {
    background: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    
    h5 {
      margin: 0 0 8px 0;
      color: #333;
      text-transform: capitalize;
    }
    
    p {
      margin: 5px 0;
      font-size: 0.9em;
    }
  }
}

button {
  padding: 8px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
  
  &:hover {
    background-color: #3aa876;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
}

output, .aviso, .cargando {
  white-space: pre-wrap;
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  min-height: 50px;
  border: 1px solid #ddd;
}

.cargando {
  color: #666;
  font-style: italic;
}

.aviso {
  color: #888;
}

ul {
  list-style-type: none;
  padding: 0;
  
  li {
    padding: 5px 0;
    border-bottom: 1px solid #eee;
    text-transform: capitalize;
  }
}
</style>