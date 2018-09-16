  <div v-for="item in store.booksInFeed" v-if="item.index%4==0" class="row">
      <div class="col-md-3 col-6 my-1">
          <img :src="item.imageUrl" class="card-img-top">
          <div class="card-body">
              <div class="card-title">{{ items[index].title }}</div>
              <div>
                  {{ items[index].Author }}
              </div>
          </div>
      </div>
  </div>
  <b-pagination size="md" :total-rows=store.booksInFeed.length v-model="currentPage" :per-page="pageSize">
  </b-pagination>
  <div class="col-md-3 col-6 my-1">
      <img :src="item.imageUrl" class="card-img-top">
      <div class="card-body">
          <div class="card-title">{{ item.title }}</div>
          <div>
              {{ item.Author }}
          </div>
      </div>
  </div>



  <div class="columns">

  <ul>
            <li v-for="item in store.booksInFeed">

  <div>
   <img :src="item.imageUrl" class="card-img-top">
   <div class="card-body">
       <div class="card-title">{{item.title}}</div>
       <div class="card-body">
           {{item.author}}
       </div>
   </div>
  </div>
            </li>
    </ul>
   </div>
   <style>
   .columns
   {
       -moz-column-width: 11.5em; /* Firefox */
       -webkit-column-width: 11.5em; /* webkit, Safari, Chrome */
       column-width: 11.5em;
   }
   /*remove standard list and bullet formatting from ul*/
   .columns ul
   {
       margin: 0;
       padding: 0;
       list-style-type: none;
   }
   /* correct webkit/chrome uneven margin on the first column*/
   .columns ul li:first-child
   {
       margin-top:0px;
   }
   </style>



   <b-table striped bordered small hover :fields="fields" :items=store.booksInFeed :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter">
     <template slot="index" slot-scope="data">
         {{data.index + 1}}
       </template>
     <template slot="delete" slot-scope="data">
         <button v-on:click="updateBook(data.item, data.index, $event.target)">Update</button>
         <button v-on:click="deleteBook(data.item)">Delete</button>
     </template>
     <template slot-scope="data" slot="imageUrl">
       <img width="100" height="100" v-bind:src="data.item.imageUrl" />
     </template>
   </b-table>



   store.booksInFeed.slice(startIndex, endIndex)

   <template>
   <div class="table-responsive">
     <b-row>
       <b-col md="4" class="my-1">
         <b-form-group horizontal label="Title" class="mb-0">
           <b-input-group>
             <b-form-input v-model="filter" placeholder="Type to Search" />
             <b-input-group-append>
               <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
             </b-input-group-append>
           </b-input-group>
         </b-form-group>
       </b-col>
       <b-col md="4" class="my-1">
         <b-form-group horizontal label="Author" class="mb-0">
           <b-input-group>
             <b-form-input v-model="author" placeholder="Type to Search" />
             <b-input-group-append>
               <b-btn :disabled="!author" @click="author = ''">Clear</b-btn>
             </b-input-group-append>
           </b-input-group>
         </b-form-group>
       </b-col>
       <b-col md="4" class="my-1">
         <b-form-group horizontal label="Status">
             <b-form-select v-model="status" class="mb-3" size="sm">
               <option value="">All</option>
               <option value="HaveToBuy">HaveToBuy</option>
               <option value="New">New</option>
               <option value="Started">Started</option>
               <option value="Completed">Completed</option>
               <option value="Pending">Pending</option>
             </b-form-select>
         </b-form-group>
       </b-col>
     </b-row>

    <div>&nbsp;</div>
    <button v-on:click="addBook($event.target)">Add New Book</button>

    <b-pagination size="md" v-on:input="setSliceRange()" :total-rows=store.booksInFeed.length v-model="currentPage" :per-page="pageSize">
    </b-pagination>

    <div class="row">
     <div v-for="item in sortedList.slice(startIndex, endIndex)" class="col-md-2">
      <button v-on:click="updateBook(item, index, $event.target)">
      <img :src="item.imageUrl" class="card-img-top"  style="width:100px;height:150px">
      </button>
      <div class="card-body">
          <div class="card-title">{{item.title}}</div>
          <div class="card-body">
              {{item.author}}
          </div>
      </div>
     </div>
    </div>

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
               <option value="HaveToBuy">HaveToBuy</option>
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
         sortBy: 'title',
         sortDesc: false,
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
         fields: {
           index: {
             label: '#'
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
           'bought_on': {
             label: 'Bought On',
             sortable: true
           },
           comments: {
             label: 'Comments',
             sortable: false
           },
           status: {
             label: 'Status',
             sortable: true
           },
           imageUrl:{
             label:'Image',
             sortable:false
           },
           delete: {
             label: ''
           }
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
         //let filteredList = _.filter(store.booksInFeed, b=>b.title.indexOf(this.filter) != -1);
         let filteredList =  store.booksInFeed;
         if(this.filter !=null)
         {
           filteredList =  filteredList.filter(item => {
              return item.title.toLowerCase().indexOf(this.filter) > -1
           });
         }
         if(this.author !=null)
         {
           filteredList =  filteredList.filter(item => {
              return item.author.toLowerCase().indexOf(this.author) > -1
           });
         }
         if(this.status !=null && this.status!="")
         {
           filteredList =  filteredList.filter(item => {
              return item.status ==this.status//.toLowerCase().indexOf(this.status) > -1
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
         this.$root.$emit('bv::show::modal', 'modalInfo', button)
       },
       updateBook(item, index, button) {
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
   <button v-on:click="updateBook(item, index, $event.target)">
   <img :src="item.imageUrl"  style="width:100px;height:150px">
   </button>
   <div class="card-body">
       <div class="card-title">{{item.title}}</div>
       <div class="card-body">
           {{item.author}}
       </div>
   </div>
