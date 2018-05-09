import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// Initialize Firebase, copy this from the cloud console

var config = {
  apiKey: "AIzaSyB3505k9XIuzkZbZMlrYYOT5hHcxEAePpo",
  authDomain: "mybooklibrary-27ef8.firebaseapp.com",
  databaseURL: "https://mybooklibrary-27ef8.firebaseio.com",
  projectId: "mybooklibrary-27ef8",
  storageBucket: "mybooklibrary-27ef8.appspot.com",
  messagingSenderId: "931850129731"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {/* your settings... */
  timestampsInSnapshots: true
};
firestore.settings(settings);
// a reference to the Balls collection
const booksCollection = firebase.firestore().collection('books');
const storageRef = firebase.storage().ref();
// the shared state object that any vue component
// can get access to
export const store = {
  booksInFeed: null,
  currentUser: null,
  addBook: (book) => {
    var photo = book.file;
    if (book.file != null) { //.name != ''
      let imageRef = storageRef.child(photo.name);
      let uploadTask = imageRef.put(photo);
    }

      // uploadTask.on('state_changed', function(snapshot){
      //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //   console.log('Upload is ' + progress + '% done');
      //
      // }, function(error) {
      // }, function() {
      //   var downloadURL = uploadTask.snapshot.downloadURL
      //  firebase.database().ref('/profiles/' + this.$store.getters.profile.id ).update({ avatar: downloadURL })
      // })

    const dt = {
      bought_on: book.bought_on == null
        ? ''
        : book.bought_on,
      user_name: store.currentUser.uid,
      comments: book.comments == null
        ? ''
        : book.comments,
      description: book.description == null
        ? ''
        : book.description,
      language: book.language,
      status: book.status,
      title: book.title,
      author: book.author,
      image: book.file == null
        ? ''
        : book.file.name,
      imageUrl: ''
    };
    return booksCollection.add(dt).catch(e => console.error('error inserting', dt, e));
  },
  deleteBook: (book) => {
    return booksCollection.doc(book.id).delete().catch(e => console.error('error deleting', e));
  },
  updateBook: (book) => {
    var photo = book.file;
    if (book.file != null) {
      let imageRef = storageRef.child(photo.name);
      let uploadTask = imageRef.put(photo);
    }
    return booksCollection.doc(book.id).update({
      title: book.title,
      bought_on: book.bought_on,
      comments: book.comments,
      description: book.description,
      language: book.language,
      status: book.status,
      author: book.author,
      image: book.file == null ? '': book.file.name,
      imageUrl:''
    }).catch(e => console.error('error updatting', e));
  },
  getBooks: () => {
    // onSnapshot is executed every time the data
    // in the underlying firestore collection changes
    // It will get passed an array of references to
    // the documents that match your query
    booksCollection.where('user_name', '==', store.currentUser.uid).get().then((booksRef) => { //.onSnapshot((booksRef) => {
      const books = [];
      booksRef.forEach((doc) => {
        const book = doc.data();
        book.id = doc.id;

        if (book.image != '') {
          storageRef.child(book.image).getDownloadURL().then(function(url) {
            book.imageUrl = url;
          }).catch(function(error) {
            console.log(error);
          });
        }
        else {
          //book.image = "assets/logo.png";
          storageRef.child("logo.png").getDownloadURL().then(function(url) {
            book.imageUrl = url;
          }).catch(function(error) {
            console.log(error);
          });
        }
        //console.log(book);
        books.push(book);
      });
      store.booksInFeed = books;
    });
  }
};

// When a user logs in or out, save that in the store
firebase.auth().onAuthStateChanged((user) => {
  //console.log('Logged in as:', user);
  store.currentUser = user;
  if (store.currentUser != null) {
    store.getBooks();
  }
});
