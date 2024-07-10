import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import PrimeVue from 'primevue/config';
import Lara from '@/presets/lara'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

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
import Toast from 'primevue/toast'
import AutoComplete from "primevue/autocomplete";
import CommentComponent from './components/CommentComponent.vue';
import Avatar from 'primevue/avatar'
import Dropdown from "primevue/dropdown";
import Fieldset from "primevue/fieldset";
import Panel from "primevue/panel";

import MultiSelect from 'primevue/multiselect';
import FileUpload from 'primevue/fileupload';
import Toolbar from 'primevue/toolbar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Image from "primevue/image";
import Textarea from "primevue/textarea";
import Message from "primevue/message";
import ProgressSpinner from "primevue/progressspinner";
import SplitterPanel from "primevue/splitterpanel";
import Splitter from "primevue/splitter";

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

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
app.component("Menubar", Menubar);
app.component("Button", Button);
app.component("InputGroup", InputGroup);
app.component("InputText", InputText);
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
app.component("AutoComplete", AutoComplete)
app.component("CommentComponent", CommentComponent)
app.component("Avatar", Avatar)
app.component("Dropdown", Dropdown)
app.component("Fieldset", Fieldset)
app.component("Panel", Panel)
app.component("MultiSelect", MultiSelect)
app.component("FileUpload", FileUpload)
app.component("Toolbar", Toolbar)
app.component("DataTable", DataTable)
app.component("Column", Column)
app.component("Image", Image);
app.component("Textarea", Textarea);
app.component("Message", Message);
app.component("ProgressSpinner", ProgressSpinner);
app.component("Splitter", Splitter);
app.component("SplitterPanel", SplitterPanel);

app.mount('#app')
