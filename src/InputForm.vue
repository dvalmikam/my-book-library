<template>
  <form @submit.prevent="formPost">
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="3"><label>Title :</label></b-col>
        <b-col sm="9"><b-form-input v-model="book.title"></b-form-input></b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3"><label>Author :</label></b-col>
        <b-col sm="9"><b-form-input v-model="book.author"></b-form-input></b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3"><label>Description :</label></b-col>
        <b-col sm="9">
          <b-form-textarea id="textarea1"
                       v-model="book.description"
                       :rows="3"
                       :max-rows="6">
          </b-form-textarea>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3"><label>Language :</label></b-col>
        <b-col sm="9">
          <b-form-select v-model="book.language" class="mb-3" size="sm">
           <option value="Telugu">Telugu</option>
           <option value="English">English</option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3"><label>Comments :</label></b-col>
        <b-col sm="9">
          <b-form-textarea
                       v-model="book.comments"
                       :rows="3"
                       :max-rows="6">
          </b-form-textarea>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3"><label>Bought On :</label></b-col>
        <b-col sm="9">
          <b-form-input v-model="book.bought_on" type="date"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3"><label>Status :</label></b-col>
        <b-col sm="9">
          <b-form-select v-model="book.status" class="mb-3" size="sm">
           <option value="HaveToBuy">HaveToBuy</option>
           <option value="New">New</option>
           <option value="Started">Started</option>
           <option value="Completed">Completed</option>
           <option value="Pending">Pending</option>
          </b-form-select>
        </b-col>
      </b-row>
    </b-container>
    <input type="submit" value="Add" />
  </form>
</template>

<script>
import { store } from './store';
export default {
  data() {
    return {
     book:{
      title:'',
      author:'',
      comments:'',
      description:'',
      language:'',
      status:'',
      bought_on:''
     }
    };
  },
  methods: {
    formPost() {
      store.addBook(this.book);
      this.book = {};
      //this.$refs.inputMessage.focus();
    }
  },
}
</script>
