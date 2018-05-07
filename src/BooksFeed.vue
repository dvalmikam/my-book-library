<template>
<div class="table-responsive">
  <b-row>
    <b-col md="6" class="my-1">
      <b-form-group horizontal label="Search" class="mb-0">
        <b-input-group>
          <b-form-input v-model="filter" placeholder="Type to Search" />
          <b-input-group-append>
            <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col>
  </b-row>
  <b-table striped bordered small hover :fields="fields" :items=store.booksInFeed :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter">
    <template slot="index" slot-scope="data">
        {{data.index + 1}}
      </template>
    <template slot="delete" slot-scope="data">
        <button v-on:click="updateBook(data.item, data.index, $event.target)">Update</button>
        <button v-on:click="deleteBook(data.item)">Delete</button>
      </template>
  </b-table>

  <b-modal id="modalInfo" ref="modalInfo" @hidden="resetModal" title="Book Details" hide-footer>
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="3"><label>Title :</label></b-col>
        <b-col sm="9">
          <b-form-input v-model="modalInfo.content.title" :state="!$v.modalInfo.content.title.$invalid"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3"><label>Author :</label></b-col>
        <b-col sm="9">
          <b-form-input v-model="modalInfo.content.author" :state="!$v.modalInfo.content.author.$invalid"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3"><label>Description :</label></b-col>
        <b-col sm="9">
          <b-form-textarea id="textarea1" v-model="modalInfo.content.description" :rows="3" :max-rows="6">
          </b-form-textarea>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3"><label>Language :</label></b-col>
        <b-col sm="9">
          <b-form-select v-model="modalInfo.content.language" class="mb-3" size="sm" :state="!$v.modalInfo.content.language.$invalid">
            <option value="Telugu">Telugu</option>
            <option value="English">English</option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3"><label>Comments :</label></b-col>
        <b-col sm="9">
          <b-form-textarea v-model="modalInfo.content.comments" :rows="3" :max-rows="6">
          </b-form-textarea>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3"><label>Bought On :</label></b-col>
        <b-col sm="9">
          <b-form-input v-model="modalInfo.content.bought_on" type="date" :state="!$v.modalInfo.content.bought_on.$invalid"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3"><label>Status :</label></b-col>
        <b-col sm="9">
          <b-form-select v-model="modalInfo.content.status" class="mb-3" size="sm" :state="!$v.modalInfo.content.status.$invalid">
            <option value="New">New</option>
            <option value="Started">Started</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3"><label>Image :</label></b-col>
        <b-col sm="9">
          <b-form-file v-model="modalInfo.content.image"  placeholder="Choose a file..."></b-form-file>
        </b-col>
      </b-row>
    </b-container>
    <b-btn class="mt-3" variant="outline-success" block @click="saveModal" :disabled="$v.modalInfo.content.$invalid">Save</b-btn>
  </b-modal>

  <button v-on:click="addBook($event.target)">Add New Book</button>

</div>
</template>

<script>
import {
  store
} from './store';
import {
  required,
  minLength,
  between
} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      sortBy: 'title',
      sortDesc: false,
      filter: null,
      modalInfo: {
        content: [{
          title: '',
          author: '',
          language: '',
          description: '',
          comments: '',
          status: '',
          bought_on: '',
          image:''
        }],
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
        title: {
          required
        },
        author: {
          required
        },
        language: {
          required
        },
        status: {
          required
        },
        bought_on: {
          required
        }
      }
    }
  },
  methods: {
    deleteBook: function(book) {
      store.deleteBook(book);
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
      //console.log("test");
      this.modalInfo.content = {
        title: '',
        author: '',
        language: '',
        description: '',
        comments: '',
        status: '',
        bought_on: '',
        image:''
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
      this.modalInfo.content = {
        title: '',
        author: '',
        language: '',
        description: '',
        comments: '',
        status: '',
        bought_on: '',
        image:''
      };
      this.$refs.modalInfo.hide();
    },
  }
}
</script>
