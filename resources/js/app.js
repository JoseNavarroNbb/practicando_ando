import './bootstrap';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './components/Layout/AppLayout.vue';
import router from './router';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
      },
})

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(vuetify)
app.mount('#app');


