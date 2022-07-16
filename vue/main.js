const app = Vue.createApp({
    data() {
        return {
            list:[
                {code:"A01",name:"プロA"},
                {code:"A02",name:"プロB"},
                {code:"A03",name:"プロC"}
            ]
        }
    },
    methods: {

    },
    computed: {

    },
    watch: {

    }
});

const ball = app.mount("#app");
