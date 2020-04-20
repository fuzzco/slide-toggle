[Slide-toggle](https://api.jquery.com/slidetoggle/) equivalent for Vue components.

Usage:

1. Copy this JS file into your project (in this example, under `animations/slide-toggle.js`)
1. In your Vue component:

```html
<template>
    <div>
        <transition :css="false" @enter="enter" @leave="leave">
            <div v-if="show">Visible</div>
        </transition>

        <button @click="show = !show">Toggle</button>
    </div>
</template>

<script>
    import { enter, leave } from 'animations/slide-toggle'

    export default {
        data() {
            return {
                show: true
            }
        },
        methods: {
            enter,
            leave
        }
    }
</script>
```
