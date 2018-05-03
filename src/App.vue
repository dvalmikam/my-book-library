<template>
  <div id="app">
  <b-navbar toggleable="md" type="dark" variant="info">


  <b-navbar-brand href="#">Books, Books & Books</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

    <b-navbar-nav>
          <b-nav-item href="#" @click="logout" v-if="store.currentUser">
            Logout
          </b-nav-item>
          <b-nav-item href="#" @click="signInWithGoogle" v-if="!store.currentUser">
            Login
          </b-nav-item>

    </b-navbar-nav>

    </b-navbar-nav>

  </b-collapse>
</b-navbar>


    <div v-if="store.currentUser" >

      <BooksFeed />
    </div>

    <div>
  <b-btn v-b-modal.modal1>Add New Book</b-btn>

  <!-- Modal Component -->
  <b-modal id="modal1" title="Book Details">
    <InputForm />
  </b-modal>
</div>

  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { store } from './store';
import Login from './Login';
import InputForm from './InputForm';
import BooksFeed from './BooksFeed';
export default {
  components: { Login, InputForm, BooksFeed },
  data() {
    return {
      store
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut()
        .catch((err) => alert(err.message || err));
    },
    signInWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.logo {
  font-size: 300%;
  font-weight: bold;
  font-variant: small-caps;
  /*text-shadow: 2px 2px #ff0000;*/
}
input {
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px #ddd;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
}
</style>
