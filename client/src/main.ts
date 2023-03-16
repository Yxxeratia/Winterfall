import { createApp } from 'vue';
import App from './App.vue';
import Store from './store';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import {faCog} from '@fortawesome/free-solid-svg-icons'
import {faGaugeHigh} from '@fortawesome/free-solid-svg-icons'
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {faSignOut} from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */

library.add(faDiscord, faCog, faGaugeHigh, faAngleRight, faSignOut, faCaretDown, faCaretLeft, faCaretRight, faPlay, faPause);
import './assets/main.scss'
import router from './router'


createApp(App)
.use(router)
.use(Store)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
