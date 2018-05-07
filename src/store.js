import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase, copy this from the cloud console

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {/* your settings... */
  timestampsInSnapshots: true
};
firestore.settings(settings);
// a reference to the Balls collection
const booksCollection = firebase.firestore().collection('books');

// the shared state object that any vue component
// can get access to
export const store = {
  booksInFeed: null,
  currentUser: null,
  addBook: (book) => {
    //console.log(book);
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
      image:book.image==null?'':book.image
    };
    return booksCollection.add(dt).catch(e => console.error('error inserting', dt, e));
  },
  deleteBook: (book) => {
    //console.log(book);
    // booksCollection//.where("id", "==", book.id)
    // .get()
    // .then(querySnapshot => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc);
    //     if(doc.id==book.id)
    //     {
    //       doc.ref.delete().then(() => {
    //         console.log("Document successfully deleted!");
    //       }).catch(function(error) {
    //         console.error("Error removing document: ", error);
    //       });
    //     }
    //
    //   });
    // })
    // .catch(function(error) {
    //   console.log("Error getting documents: ", error);
    // });
    return booksCollection.doc(book.id).delete().catch(e => console.error('error deleting', e));
  },
  updateBook: (book) => {
    //console.log(book);
    return booksCollection.doc(book.id).update({
      title: book.title,
      bought_on: book.bought_on,
      comments: book.comments,
      description: book.description,
      language: book.language,
      status: book.status,
      author: book.author,
      image:book.image
    }).catch(e => console.error('error updatting', e));
  },
  getBooks:()=>{
    // onSnapshot is executed every time the data
    // in the underlying firestore collection changes
    // It will get passed an array of references to
    // the documents that match your query
    booksCollection.where('user_name', '==', store.currentUser.uid)
      .get().then((booksRef) => { //.onSnapshot((booksRef) => {
      const books = [];
      booksRef.forEach((doc) => {
        const book = doc.data();
        book.id = doc.id;
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
