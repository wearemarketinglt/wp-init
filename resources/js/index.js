import '../css/frontend.css'
import htmx from 'htmx.org'

import './etc'
import './htmx-events'

import { initEmbla } from './embla'

// INIT

window.htmx = htmx
htmx.config.scrollBehavior = 'auto'

document.addEventListener('DOMContentLoaded', () => {
    initEmbla()
})