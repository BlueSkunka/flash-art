import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Lara from '@/presets/lara'

import App from './App.vue'
import router from './router'

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

app.component("Card", Card)
app.component("SelectButton", SelectButton)
app.component("Button", Button)
app.component("Rating", Rating)
app.component("Tag", Tag)
app.component("CardComponent", CardComponent)
app.component("Toast", Toast)

app.mount('#app')
