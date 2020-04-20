import { tween, styler } from 'popmotion'
import _get from 'lodash/get'
import Vue from 'vue'

let clone

function removeClone() {
    if (clone && clone.parentNode && clone.parentNode.removeChild) {
        clone.parentNode.removeChild(clone)
    }
}

export const enter = (duration = 400, fade = true) => (el, done) => {
    // remove clone if it already exists
    removeClone()

    // clone element
    clone = el.cloneNode(true)

    // hide clone
    clone.style.position = 'absolute'
    clone.style.opacity = 0
    clone.style.height = 'initial'
    clone.setAttribute('aria-hidden', 'true')

    // append clone
    el.parentNode.appendChild(clone)

    // get clone size
    const height = _get(clone.getBoundingClientRect(), 'height', false)

    // remove clone and cancel if the height isn't present
    if (height === false) {
        removeClone()
        done()
        return
    }

    const style = styler(el)

    tween({
        from: { height: 0, opacity: 0 },
        to: { height: height, opacity: 1 },
        duration
    }).start({
        update: style.set,
        complete: async () => {
            removeClone()

            await Vue.nextTick()

            // clear inline height styling
            el.style.height = ''
            done()
        }
    })
}

export const leave = (duration = 400, fade = true) => (el, done) => {
    const style = styler(el)

    // collapse el
    tween({
        from: { height: style.get('height'), opacity: 1 },
        to: { height: 0, opacity: fade ? 0 : 1 },
        duration
    }).start({
        update: style.set,
        complete: done
    })
}
