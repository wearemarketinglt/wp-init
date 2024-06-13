import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import AutoScroll from 'embla-carousel-auto-scroll'
import Fade from 'embla-carousel-fade'
import { addPrevNextBtnsClickHandlers } from './ext/embla-nav'

export function initEmbla() {
    
    const emblaNode = document.querySelectorAll('.embla')

    emblaNode.forEach((node) => {

        const viewportNode = node.querySelector('.embla__viewport')
        const options = { loop: false, align: 'start' }
        const prevBtn = node.querySelector('.prev')
        const nextBtn = node.querySelector('.next')
        

        if(!viewportNode) return
        
        if(node.classList.contains('drag-free')) {
            options.dragFree = true
        }

        if(node.classList.contains('dots')) {
            options.dots = true
        }

        if(node.classList.contains('loop')) {
            options.loop = true
            options.align = () => window.innerWidth > 1600 ? 18 * 5 : 17 * 5
        }

        const plugins = []

        if(node.classList.contains('autoplay')) {
            plugins.push(Autoplay(), Fade())
            options.watchDrag = false
        }

        if(node.classList.contains('auto-scroll')) {
            let speed = window.innerWidth > 1600 ? 1.6 : 1.7
            const dataSpeed = node.dataset.speed

            if(dataSpeed) {
                speed = parseFloat(dataSpeed)
            } 
            
            if (window.innerWidth < 1024) {
                speed = speed / 2
            }

            plugins.push(AutoScroll({stopOnInteraction: false, startDelay: 100, speed: speed}))
        }
        
        const emblaApi = EmblaCarousel(viewportNode, options, [...plugins])


        if (!prevBtn || !nextBtn) return

        const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
            emblaApi,
            prevBtn,
            nextBtn,
            node
        )

        emblaApi
        .on('destroy', removePrevNextBtnsClickHandlers)
    })
}