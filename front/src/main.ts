import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Lara from '@/presets/lara'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

import Toast from "primevue/toast";
import Menubar from "primevue/menubar";
import Ripple from "primevue/ripple";
import Tooltip from "primevue/tooltip";
import Card from "primevue/card"
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import ToastService from 'primevue/toastservice';
import SelectButton from 'primevue/selectbutton';
import Rating from 'primevue/rating'
import Tag from 'primevue/tag'
import CardComponent from './components/CardComponent.vue';
import Dropdown from "primevue/dropdown";
import Image from "primevue/image";

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
app.use(ToastService);

app.component("IconField", IconField)
app.component("InputIcon", InputIcon)
app.component("Password", Password)
app.component("SelectButton", SelectButton)
app.component("Rating", Rating)
app.component("Tag", Tag)
app.component("CardComponent", CardComponent)
app.component("Dropdown", Dropdown)
app.component("Image", Image);

app.mount('#app')
