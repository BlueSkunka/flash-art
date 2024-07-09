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
import ToastService from 'primevue/toastservice';

import Card from 'primevue/card';
import SelectButton from 'primevue/selectbutton';
import Button from 'primevue/button'
import Rating from 'primevue/rating'
import Tag from 'primevue/tag'
import 'primeicons/primeicons.css'
import CardComponent from './assets/components/CardComponent.vue';
import Toast from 'primevue/toast'

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

app.component("Card", Card)
app.component("SelectButton", SelectButton)
app.component("Rating", Rating)
app.component("Tag", Tag)
app.component("CardComponent", CardComponent)
app.component("Toast", Toast)

app.mount('#app')
