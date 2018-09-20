<template>
<div id="app">
  <b-navbar toggleable="md" type="dark" variant="primary">


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


  <div v-if="store.currentUser">
    <BooksFeed />
  </div>

</div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  store
} from './store';
import Login from './Login';
import BooksFeed from './BooksFeed';
export default {
  components: {
    Login,
    BooksFeed
  },
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
</style>
