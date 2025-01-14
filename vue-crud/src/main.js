import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable';


export const apolloClient = new ApolloClient({
    uri: 'http://localhost:8081/graphql/', 
    cache: new InMemoryCache(),
  });


const app = createApp({
    setup(){
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
