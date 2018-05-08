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

// the shared state object that any vue component
// can get access to
export const store = {
  booksInFeed: null,
  currentUser: null,
  addBook: (book) => {
    console.log(book);
    var photo = book.image.file;
      if (photo) {
//gs://mybooklibrary-27ef8.appspot.com
        let storageRef = firebase.storage().ref();//'profiles/avatar/'+Date.now()+'/'+photo.name);
        //let imageRef = storageRef.child(photo.name);
        let uploadTask = storageRef.put(photo);

        // uploadTask.on('state_changed', function(snapshot){
        //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //   console.log('Upload is ' + progress + '% done');
        //
        // }, function(error) {
        // }, function() {
        //   var downloadURL = uploadTask.snapshot.downloadURL
        //  firebase.database().ref('/profiles/' + this.$store.getters.profile.id ).update({ avatar: downloadURL })
        // })

      }

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
      image:book.image==null?'':book.image.name
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

    var photo = book.file;
      if (book.file.name!='') {
        console.log(photo);
//gs://mybooklibrary-27ef8.appspot.com
        let storageRef = firebase.storage().ref();//'profiles/avatar/'+Date.now()+'/'+photo.name);
        let imageRef = storageRef.child(photo.name);
        let uploadTask = imageRef.put(photo);

        // uploadTask.on('state_changed', function(snapshot){
        //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //   console.log('Upload is ' + progress + '% done');
        //
        // }, function(error) {
        // }, function() {
        //   var downloadURL = uploadTask.snapshot.downloadURL
        //  firebase.database().ref('/profiles/' + this.$store.getters.profile.id ).update({ avatar: downloadURL })
        // })

      }
    return booksCollection.doc(book.id).update({
      title: book.title,
      bought_on: book.bought_on,
      comments: book.comments,
      description: book.description,
      language: book.language,
      status: book.status,
      author: book.author,
      image:book.file.name
    }).catch(e => console.error('error updatting', e));
  },
  getBooks:()=>{
    // onSnapshot is executed every time the data
    // in the underlying firestore collection changes
    // It will get passed an array of references to
    // the documents that match your query
    var storageRef = firebase.storage().ref();
    booksCollection.where('user_name', '==', store.currentUser.uid)
      .get().then((booksRef) => { //.onSnapshot((booksRef) => {
      const books = [];
      booksRef.forEach((doc) => {
        const book = doc.data();
        book.id = doc.id;

        var imageURL='';
        if(book.image !='')
        {
          storageRef.child(book.image)
          .getDownloadURL().then(function(url) {
           imageURL = url;
         }).catch(function(error)
         {
           console.log(error);
         });
        }
        book.image = imageURL;
        console.log(imageURL);
        books.push(book);
      });

      store.booksInFeed = books;
    });
  },
  getImageUrl:(imagename)=>{
    var imageURL='';
    if(imagename !=null && imagename !='')
    {
      storageRef.child('images/'+imagename)
      .getDownloadURL().then(function(url) {
       imageURL = url;
     }).catch(function(error)
     {
       console.log(error);
     });
    }
    return imageURL;
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
