<template>
<div>
  <div>&nbsp;</div>
  <b-container class="bv-example-row" fluid>
    <div class="row">
      <div class="col-lg-4">
        <b-form-group horizontal label="Title">
          <b-input-group>
            <b-form-input v-model="filter"  placeholder="Type to Search"/>
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''" variant="outline-primary">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
      <div class="col-lg-4">
        <b-form-group horizontal label="Author">
          <b-input-group>
            <b-form-input v-model="author" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!author" @click="author = ''" variant="outline-primary">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
      <div class="col-lg-4">
        <b-form-group horizontal label="Status">
            <b-form-select v-model="status" variant="outline-primary">
              <option value="">All</option>
              <option value="HaveToBuy">Have To Buy</option>
              <option value="New">New</option>
              <option value="Started">Started</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </b-form-select>
        </b-form-group>
      </div>
    </div>
  </b-container>

  <div>&nbsp;</div>
 <div>
   <b-button size="lg" variant="outline-primary" v-on:click="addBook($event.target)">
                Add New Book
   </b-button>
</div>
<div>&nbsp;</div>
<b-container class="bv-example-row" fluid>
    <b-row>
        <b-col>
          <b-pagination size="lg" v-on:input="setSliceRange()" :total-rows=sortedList.length v-model="currentPage" :per-page="pageSize">
          </b-pagination>
        </b-col>
        <b-col>
          <label>Number Of Books: </label>{{sortedList.length}}
        </b-col>
    </b-row>
</b-container>

<b-container class="bv-example-row" fluid>
    <b-row>
        <b-col v-for="item in sortedList.slice(startIndex, endIndex)" class="col-lg-2" :key ="item.title">
          <b-card :title=item.title
                 :img-src=item.imageUrl
                 img-alt="Image"
                 img-top
                 tag="article"
                 style="max-width: 15rem;"
                 class="mb-4"
                 >
                 <!-- v-on:click="updateBook(item, $event.target)" -->
           <p class="card-text">
             {{item.author}}<br/>
             <b-btn variant="outline-primary" @click="updateBook(item, $event.target)">Edit</b-btn>
             <form method="get" action="http://www.google.com/search" target="_blank">
               <div>
                 <input type="hidden" name="q"  v-model="item.title" />
                 <b-btn type="submit" variant="outline-primary">Search For Book </b-btn>
                 <input type="hidden"  name="sitesearch"/>
               </div>
             </form>
           </p>
         </b-card>
        </b-col>
    </b-row>
</b-container>

 <b-modal id="modalInfo" ref="modalInfo" @hidden="resetModal" title="Book Details" hide-footer>
    <div>
      <b-form-group horizontal label="Title">
          <b-form-input v-model="modalInfo.content.title" :state="!$v.modalInfo.content.title.$invalid"></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Author">
          <b-form-input v-model="modalInfo.content.author" :state="!$v.modalInfo.content.author.$invalid"></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Language">
          <b-form-select v-model="modalInfo.content.language" class="mb-3" size="sm" :state="!$v.modalInfo.content.language.$invalid">
            <option value="Telugu">Telugu</option>
            <option value="English">English</option>
          </b-form-select>
      </b-form-group>

      <b-form-group horizontal label="Bought On">
          <b-form-input v-model="modalInfo.content.bought_on" type="date" :state="!$v.modalInfo.content.bought_on.$invalid"></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Status">
          <b-form-select v-model="modalInfo.content.status" class="mb-3" size="sm" :state="!$v.modalInfo.content.status.$invalid">
            <option value="HaveToBuy">Have To Buy</option>
            <option value="New">New</option>
            <option value="Started">Started</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </b-form-select>
      </b-form-group>
      <b-form-group horizontal label="Image">
          <b-form-file v-model="modalInfo.content.file"  placeholder="Choose a file..."></b-form-file>
      </b-form-group>
      <b-form-group horizontal label="Description">
          <b-form-textarea id="textarea1" v-model="modalInfo.content.description" :rows="3" :max-rows="6">
          </b-form-textarea>
      </b-form-group>
      <b-form-group horizontal label="Comments">
          <b-form-textarea v-model="modalInfo.content.comments" :rows="3" :max-rows="6">
          </b-form-textarea>
      </b-form-group>
    </div>
    <b-btn variant="outline-success" block @click="saveModal" :disabled="$v.modalInfo.content.$invalid">Save</b-btn>
  </b-modal>
</div>
</template>

<script>
import _ from 'lodash'
import {store} from './store';
import {required,minLength,between} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      currentPage:1,
      pageSize:24,
      startIndex: 0,
      endIndex : 24,
      filter: null,
      author:null,
      status:null,
      modalInfo: {
        content: {
          title: '',
          author: '',
          language: 'Telugu',
          description: '',
          comments: '',
          status: 'New',
          bought_on: '',
          image:null,
          file:null
        },
        newItemFlag: false
      },
      store
    };
  },
  validations: {
    modalInfo: {
      content: {
        title: {required},
        author: {required},
        language: {required},
        status: {required},
        bought_on: {required}
      }
    }
  },
  computed:{
    sortedList:function()
    {
      var self= this;
      //let filteredList = _.filter(store.booksInFeed, b=>b.title.indexOf(this.filter) != -1);
      let filteredList =  store.booksInFeed;
      if(self.filter !=null)
      {
        // for(var item in store.booksInFeed)
        // {
        //   if(item.title.startsWith(this.filter))
        //     filteredList.push(item);
        // }
        filteredList =  filteredList.filter(item => {
           return item.title.toLowerCase().indexOf(self.filter.toLowerCase()) != -1;
           //.startsWith(this.filter) == true;//.indexOf(this.filter) > -1
        });
      }
      if(self.author !=null)
      {
        filteredList =  filteredList.filter(item => {
           return item.author.toLowerCase().startsWith(self.author.toLowerCase()) == true;
           //.indexOf(this.author) > -1
        });
      }
      if(self.status !=null && self.status!="")
      {
        filteredList =  filteredList.filter(item => {
           return item.status ==self.status;//.toLowerCase().indexOf(this.status) > -1
        });
      }
      //console.log(filteredList);
      return _.orderBy(filteredList, 'title');//return _.orderBy(store.booksInFeed,'title');
    }
  },
  methods: {
    setSliceRange:function(){
      //console.log(this.currentPage);
      this.startIndex = ((this.currentPage - 1) * this.pageSize);
      //console.log(this.startIndex);
      this.endIndex  =(this.startIndex) + this.pageSize;
    },

    deleteBook: function(book) {
      store.deleteBook(book);
      //this.resetModal();
      store.getBooks();
    },
    addBook: function(button) {
      this.modalInfo.newItemFlag = true;
      //this.$root.$emit('bv::show::modal', 'modalInfo', button)
      this.$refs.modalInfo.show();
    },
    updateBook(item, button) {
      this.modalInfo.newItemFlag = false;
      this.modalInfo.content = item;
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal() {
      this.modalInfo.content = {
        title: '',
        author: '',
        language: 'Telugu',
        description: '',
        comments: '',
        status: 'New',
        bought_on: '',
        image:null,
        file:null
      };
      this.$refs.modalInfo.hide();
    },
    saveModal() {
      if (this.modalInfo.newItemFlag == true) {
        store.addBook(this.modalInfo.content);
      } else {
        store.updateBook(this.modalInfo.content);
      }
      this.modalInfo.newItemFlag = false;
      this.resetModal();
      store.getBooks();
    },
  }
}
</script>
