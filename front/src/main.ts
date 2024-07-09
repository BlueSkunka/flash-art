import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import PrimeVue from 'primevue/config';
import Lara from '@/presets/lara'
import 'primeicons/primeicons.css'

import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

import App from './App.vue'
import router from './router'
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ToastService from 'primevue/toastservice';
import Toast from "primevue/toast";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
    unstyled: true,
    pt: Lara
});
app.use(ToastService);

app.component("IconField", IconField)
app.component("InputIcon", InputIcon)
app.component("Password", Password)
app.component("InputText", InputText)
app.component("Button", Button)
app.component("Toast", Toast)


app.mount('#app')
