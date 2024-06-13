import { slideToggle } from './slide-toggle'

// SLIDE TOGGLE

const toSlideToggle = document.querySelectorAll('[data-slide-toggle]') 

toSlideToggle.forEach((el) => {
    el.addEventListener('click', () => {
      let target
      
      if (el.getAttribute('data-slide-toggle') === 'next') {
        target = el.nextElementSibling
        el.parentNode.classList.toggle('active');
      }

      slideToggle(target)
    })
})

// DATA-SCROLL ACTIONS

const scrollElements = document.querySelectorAll('[data-scroll]')

scrollElements.forEach((element) => {
    
    let scrollDirection = element.dataset.scroll
    let scrollTarget

    if (scrollDirection) {
        scrollTarget = document.querySelector(scrollDirection)
    } else {
        scrollTarget = element.closest('section').nextElementSibling
    }

    if (!scrollTarget) return

    element.addEventListener('click', () => {
        scrollTarget.scrollIntoView({ behavior: 'smooth' })
    })
})

// COPY TO CLICKBOARD

const copyToClipboard = document.querySelectorAll('.copy-to-clipboard')

copyToClipboard.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        const text = item.dataset.href
        const notification = item.dataset.message

        navigator.clipboard.writeText(text)

        showNotification(notification)
    })
})