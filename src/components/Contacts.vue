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
  import Axios from 'axios'
  import ContactsGrid from '@/components/ContactsGrid'
  import ContactDialog from '@/components/ContactDialog'

  export default {
    name: 'contacts',
    data () {
      return {
        url: 'http://127.0.0.1:8089/contacts/',
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
        var this_ = this
        Axios.get(this.url)
          .then(function (response) {
            grid.data = response.data
          })
          .catch(function (error) {
            this_.$Notice.error({title: '错误', desc: '获取联系人列表出现错误！' + error, duration: 3})
            grid.data = []
          })
      },
      // show contact
      show (id) {
        var this_ = this
        Axios.get(this.url + id)
          .then(function (response) {
            var contact = response.data
            this_.$Modal.info({
              title: '联系人信息',
              content: `first_name：${contact.first_name}<br>last_name：${contact.last_name}<br>email：${contact.email}<br>description：${contact.description}<br>`
            })
          })
          .catch(function (error) {
            this_.$Notice.error({title: '错误', desc: '获取联系人信息出现错误！' + error, duration: 3})
          })
      },
      // create contact
      create (dialog, contact) {
        var this_ = this
        Axios.post(this.url, contact)
          .then(function (response) {
            // 刷新网格数据
            this_.$refs.contactGridRef.getList()
            this_.$Notice.success({title: '成功', desc: '创建联系人成功！', duration: 3})
          })
          .catch(function (error) {
            this_.$Notice.error({title: '错误', desc: '创建联系人出现错误！' + error, duration: 3})
            // 创建错误，继续处理，模态处窗体无中止特性，采用此法不关闭窗口
            setTimeout(() => {
              dialog.showDialog = true
            }, 0)
          })
      },
      // edit contact
      update (dialog, contact) {
        var this_ = this
        Axios.put(this.url + contact.id, contact)
          .then(function (response) {
            // 刷新网格数据
            this_.$refs.contactGridRef.getList()
            this_.$Notice.success({title: '成功', desc: '修改联系人信息成功！', duration: 3})
          })
          .catch(function (error) {
            this_.$Notice.error({title: '错误', desc: '修改联系人信息出现错误！' + error, duration: 3})
            // 更新错误，继续处理，模态处窗体无中止特性，采用此法不关闭窗口
            setTimeout(() => {
              dialog.showDialog = true
            }, 0)
          })
      }
    }
  }
</script>
