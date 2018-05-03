<template>
  <div class="table-responsive">
  <b-table striped bordered small hover :fields="fields" :items=store.booksInFeed>
    <template slot="index" slot-scope="data">
      {{data.index + 1}}
    </template>
    <template slot="delete" slot-scope="data">
    <button v-on:click="deleteBook(data.item)">Delete</button>
    <button v-on:click="updateBook(data.item)">Update</button>
    </template>
  </b-table>

  </div>
</template>

<script>
import { store } from './store';
export default {
  data() {
    return {
    fields: {
       index:{
        label:'#'
       },
       title: {
         label: 'Title',
         sortable: true
       },
       author: {
         label: 'Author',
         sortable: true
       },
       language: {
        label: 'Language',
        sortable: true
       },
       description: {
        label: 'Description',
        sortable: false
       },
       comments: {
        label: 'Comments',
        sortable: false
       },
       status: {
        label: 'Status',
        sortable: true
       },
       delete: {
        label: ''
       }
     },
      store
    };
  },
  methods:
  {
    deleteBook:function(book)
    {
      store.deleteBook(book);
    },
    updateBook:function(book)
    {
      store.updateBook(book);
    }
  }
}
</script>
