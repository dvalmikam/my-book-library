<template>
  <div>
  <a href="#" @click="signInWithGoogle">
    <span class="glyphicon glyphicon-log-in"></span>
    Login
  </a>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  methods: {
    signInWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    }
  }
}
</script>
