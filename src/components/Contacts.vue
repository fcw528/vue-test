<template>
  <div>
    <div class="panel panel-info">
      <div class="panel-heading">联系人管理</div>
      <div class="panel-body">
        <button type="button" v-on:click="createContact" class="btn-sm btn-info" style="float: left;">新建联系人</button>
      </div>
      <div>
        <contacts-grid v-bind:parent_instance="instance" ref="contactGridRef"></contacts-grid>
      </div>
    </div>
    <contact-dialog v-bind:parent_instance="instance" ref="contactDialogRef"></contact-dialog>
  </div>
</template>
<script>
  import ContactsGrid from '@/components/ContactsGrid'
  import ContactDialog from '@/components/ContactDialog'
  import { ContactsService } from '@/services/contacts.service'

  const __service = new ContactsService()

  export default {
    name: 'contacts',
    data () {
      return {
        instance: this
      }
    },
    components: { ContactsGrid, ContactDialog },
    methods: {
      createContact: function () {
        this.$refs.contactDialogRef.createContact()
      },
      editContact: function (contact) {
        this.$refs.contactDialogRef.editContact(contact)
      },
      // contact list
      list (grid) {
        __service.list(grid, this)
      },
      // show contact
      show (id) {
        __service.show(id, this)
      },
      // create contact
      create (dialog, contact) {
        __service.create(dialog, contact, this)
      },
      // edit contact
      update (dialog, contact) {
        __service.update(dialog, contact, this)
      },
      // delete contact
      delete (grid, id) {
        __service.delete(grid, id, this)
      }
    }
  }
</script>
