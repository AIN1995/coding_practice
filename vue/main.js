const app = Vue.createApp({
    data() {
        return {
          year:777
        }
    },
    methods: {
        yearInputHandler($event) {
            this.year = $event.target.value;
        }
    },
    computed: {
 
    },
    watch: {
      
    } 
});

const ball = app.mount("#app");
