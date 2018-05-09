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
    <template slot-scope="data" slot="image1">
      <img v-bind:src="data.item.image1" />
    </template>
  </b-table>

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
        image1:{
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
