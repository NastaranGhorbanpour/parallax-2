
const sec1 = document.querySelector('#sec1>img')

const sec3 = document.querySelector('#sec3')
const sec3Child = document.querySelectorAll('#sec3>div')
const sec3P = document.querySelector('#sec3-p')

const container = document.querySelector("#imageC");
const panels = gsap.utils.toArray("#imageC > div");

const sec7 = document.getElementById('sec7')

const panelsSec8 = gsap.utils.toArray("#sec8 > div");

const sec9 = document.getElementById('sec9')
const sec9Child = document.querySelectorAll('#sec9>div')

const sec10 = document.getElementById('sec10')
const sec10Spans = document.querySelectorAll('#sec10UL>li>span')

const sec12 = document.getElementById('sec12')

const sec13 = document.querySelector('#sec13>img')

let direction = null
window.addEventListener('wheel', (e) => {
    direction = e.deltaY > 0 ? 'down' : 'up'
})

window.addEventListener('scroll', () => {
    let st = window.scrollY

    // sec1
    if (st < sec1.clientHeight && direction === 'down') {
        sec1.style.scale = parseFloat(getComputedStyle(sec1).scale) + 0.05
    }
    if (st < sec1.clientHeight && direction === 'up') {
        sec1.style.scale = parseFloat(getComputedStyle(sec1).scale) - 0.05
    }
    // sec1


    // sec3
    let sec3Top = calculateTop(sec3)
    if (sec3Top < 200 && direction === 'down') {

        sec3P.classList.replace('hidden', 'visible')

        if (sec3Top < 50) {
            sec3Child[1].style.transform = `translateY(${sec3Child[1].clientHeight }px)`

            sec3Child[2].style.transform = `translateY(${((sec3Child[1].clientHeight + sec3Child[2].clientHeight)) + 10}px)`
        }


    }
    if (sec3Top < 200 && direction === 'up') {
        sec3P.classList.replace('visible', 'hidden')
        if (sec3Top < 50) {
            sec3Child[1].style.transform = `translateY(0px)`

            sec3Child[2].style.transform = `translateY(0px)`
        }
        if (sec3Top < -50) {
            sec3Child[1].style.transform = `translateY(${sec3Child[1].clientHeight / 2}px)`

            sec3Child[2].style.transform = `translateY(${(sec3Child[1].clientHeight + sec3Child[2].clientHeight) / 2}px)`
        }

    }
    // sec3


    // sec7
    let sec7Top = calculateTop(sec7)
    if (sec7Top < 200 && direction === 'down') {
        sec7.style.transform = `translateY(${(st / 30)}px)`
    } else {
        sec7.style.transform = 'translateY(0)'
    }
    // sec7

    // sec9
    let sec9Top = calculateTop(sec9)
    if (sec9Top < 400 && direction === 'down') {
        sec9Child[1].style.transform = `translateY(${sec9Child[1].clientHeight}px)`
        sec9Child[2].style.transform = `translateY(${(sec9Child[1].clientHeight) + (sec9Child[2].clientHeight)}px)`

    }
    if (sec9Top < 300 && direction === 'up') {
        sec9Child[1].style.transform = `translateY(0px)`
        sec9Child[2].style.transform = `translateY(0px)`
    }
    // sec9

    // sec10
    let sec10Top = calculateTop(sec10)
    if (sec10Top < 400 && direction === 'down') {
        sec10Spans.forEach((val, i) => {
            val.style.width = i === 0 && '35%'
            val.style.width = i === 1 && '75%'
            val.style.width = i === 2 && '45%'
        })
    } else {
        sec10Spans.forEach((val) => {
            val.style.width = '0'

        })
    }
    // sec10

    // sec13
    let sec13Top = calculateTop(sec13)
    if (sec13Top < 600 && direction === 'down') {
        sec13.style.scale = parseFloat(getComputedStyle(sec13).scale) - 0.05
    } else {
        sec13.style.scale = parseFloat(getComputedStyle(sec13).scale) + 0.05
    }
    // sec13
})


function calculateTop(sec) {
    return parseInt(sec.getBoundingClientRect().top)
}

gsap.registerPlugin(ScrollTrigger);

// sec5
panels.forEach((p, i) => {
    const img = p.querySelector("img");
    const texts = p.querySelectorAll(".texts");

    if (i === 0) {
        gsap.set(img, { scale: 0.5, transformOrigin: "center center", y: 0 });
    } else {
        gsap.set(img, { scale: 1, transformOrigin: "center center", y: "100%" });
    }

    gsap.set(texts, { opacity: 0, y: 20 });
    gsap.set(p, { zIndex: 1 });
});
const scrollEnd = () => "+=" + (panels.length * window.innerHeight);
const master = gsap.timeline({
    scrollTrigger: {
        trigger: container,
        start: "top top",
        end: scrollEnd,
        scrub: true,
        pin: true,
        anticipatePin: 1,
    }
});
panels.forEach((panel, i) => {
    const img = panel.querySelector("img");
    const texts = panel.querySelectorAll(".texts");

    master.set(panel, { zIndex: 3 });

    if (i === 0) {
        master.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
    } else {
        master.to(img, { y: 0, duration: 0.6, ease: "power2.out" });
    }

    master.to(texts, { opacity: 1, y: 0, stagger: 0.12, duration: 0.45, ease: "power1.out" }, "<0.05");

    if (i < panels.length - 1) {
        master.to(img, { scale: 0.8, duration: 0.5, ease: "power2.in" }, "+=0.12");
        master.to(texts, { opacity: 0, duration: 0.25 }, "<0.15");
    }
    if (i < panels.length - 1) {
        master.set(panel, { opacity: 0.5 })
    }
    master.set(panel, { zIndex: 1 });
});
// sec5

// sec8
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    gsap.set('.col-3, .col-content-wrapper', { y: '0%' })
    gsap.set('.col-3, .col-content-wrapper-2', { y: '-125%' })

    let curentPhase = 0

    ScrollTrigger.create({
        trigger: '.sticky-cols',
        start: 'top top',
        end: `+=${window.innerHeight * 5}px`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
            const progress = self.progress

            if (progress > 0.25 && curentPhase === 0) {
                curentPhase = 1

                gsap.to('.col-1', { opacity: 0, scale: 0.75, duration: 0.75 })
                gsap.to('.col-2', { x: '0%', duration: 0.75 })
                gsap.to('.col-3', { y: '0%', duration: 0.75 })

                gsap.to('.col-img-1 img', { scale: 1.25, duration: 0.75 })
                gsap.to('.col-img-1 img', { clipPath: 'polygon(0% 0%,100% 0% ,100% 100%,0% 100%)', duration: 0.75 })
                gsap.to('.col-img-2 img', { scale: 1, duration: 0.75 })
            }
            if (progress > 0.5 && curentPhase === 1) {
                curentPhase = 2

                gsap.to('.col-2', { opacity: 0, scale: 0.75, duration: 0.75 })
                gsap.to('.col-3', { x: '0%', duration: 0.75 })
                gsap.to('.col-4', { y: '0%', duration: 0.75 })

                gsap.to('.col-3, .col-content-wrapper', {
                    y: "-125%",
                    duration: 0.75
                })

                gsap.to('.col-3, .col-content-wrapper-2', {
                    y: "0%",
                    duration: 0.75,
                    delay: 0.5
                })

            }
            if (progress < 0.25 && curentPhase >= 1) {
                curentPhase = 0

                gsap.to('.col-1', { opacity: 1, scale: 1, duration: 0.75 })
                gsap.to('.col-2', { x: '100%', duration: 0.75 })
                gsap.to('.col-3', { y: '100%', duration: 0.75 })

                gsap.to('.col-img-1 img', { scale: 1, duration: 0.75 })
                gsap.to('.col-img-2', {
                    clipPath: 'polygon(0% 0%,100% 0%,100% 0%, 0% 0%)'
                    , duration: 0.75
                })
                gsap.to('.col-img-2 img', { scale: 1.25, duration: 0.75 })


            }
            if (progress < 0.5 && curentPhase === 2) {
                curentPhase = 1
                gsap.to('.col-2', { opacity: 1, scale: 1, duration: 0.75 })
                gsap.to('.col-3', { x: '100%', duration: 0.75 })
                gsap.to('.col-4', { y: '100%', duration: 0.75 })

                gsap.to('.col-3, .col-content-wrapper', {
                    y: '0%',
                    duration: 0.75,
                    delay: 0.5
                })
                gsap.to('.col-3, .col-content-wrapper-2', {
                    y: '-125%',
                    duration: 0.75,
                })
            }
        }
    })

})

// sec8
