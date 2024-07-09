import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Lara from '@/presets/lara'

import App from './App.vue'
import router from './router'
import Toast from "primevue/toast";
import Menubar from "primevue/menubar";
import Ripple from "primevue/ripple";
import Tooltip from "primevue/tooltip";
import Card from "primevue/card"
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import InputText from "primevue/inputtext";
import "primeicons/primeicons.css"


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
    unstyled: true,
    pt: Lara
});
app.directive('ripple', Ripple);
app.directive('tooltip', Tooltip);
app.directive('focus', {
    mounted(el) {
        el.focus();
    },
});
app.component("Toast", Toast);
app.component("Menubar", Menubar);
app.component("Card", Card);
app.component("Button", Button);
app.component("InputGroup", InputGroup);
app.component("InputText", InputText);

app.mount('#app')
