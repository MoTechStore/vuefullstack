import { defineStore } from 'pinia';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { watch } from 'vue';
import { apolloClient } from '@/main';


export const useItemStore = defineStore('itemStore', {
    state: () =>({
        items: [], // define items in the Pinia store
    }),

    actions: {

        async fetchItems(){
        const fetchQuery = gql`
        query {
            items {
            id
            name
            description 
            price
            }
        }`

        try {
             const response = await apolloClient.query({
                query: fetchQuery,
                fetchPolicy: "no-cache"
             })

             const { data } = response;
             const result = data.items;
             this.items = result;
        } catch (error) {
            console.log(error)
        }
        },


        async createItem(name, description, price){
            const CREATE_ITEM = gql`
          mutation($name: String!, $description: String, $price: Decimal!) {
            createItem(name: $name, description: $description, price: $price) {
              item {
                id
                name
                description
                price
              }
            }
          }`

            try {
                const response = await apolloClient.mutate({
                    fetchPolicy:"no-cache",
                    mutation: CREATE_ITEM,
                    variables: {
                        name,
                        description,
                        price
                    }
                })

               await this.fetchItems(); 
            } catch (error) {
                console.log(error)
                
            }
        },



    async updateItem(id, name, description, price){
        const UPDATE_ITEM = gql`
            mutation($id: ID!, $name: String, $description: String, $price: Decimal) {
                updateItem(id: $id, name: $name, description: $description, price: $price) {
                    item {
                        id
                        name
                        description
                        price
                    }
                }
            }`

        try {
            const response = await apolloClient.mutate({
                fetchPolicy: "no-cache",
                mutation: UPDATE_ITEM,
                variables: {
                    id,
                    name,
                    description,
                    price
                }
            });

            await this.fetchItems();
            
        } catch (error) {
            console.log(error);
        }
    },


    async deleteItem (id){

        const DELETE_ITEM = gql`
            mutation($id: ID!) {
                deleteItem(id: $id) {
                    success
                }
            }
        `

        try {
            await apolloClient.mutate({
                fetchPolicy: "no-cache",
                mutation: DELETE_ITEM,
                variables: {
                    id,
                }
            });

            await this.fetchItems();
        } catch (error) {
            console.log(error)
            
        }
    },



    },
}
)