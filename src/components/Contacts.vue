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
        var _this = this
        __service.list(function (response) {
          grid.data = response.data
        }, function (error) {
          _this.$Notice.error({title: '错误', desc: '获取联系人列表出现错误！' + error, duration: 3})
          grid.data = []
        })
      },
      // show contact
      show (id) {
        var _this = this
        __service.show(id, function (response) {
          var contact = response.data
          _this.$Modal.info({
            title: '联系人信息',
            content: `first_name：${contact.first_name}<br>last_name：${contact.last_name}<br>email：${contact.email}<br>description：${contact.description}<br>`
          })
        }, function (error) {
          _this.$Notice.error({title: '错误', desc: '获取联系人信息出现错误！' + error, duration: 3})
        })
      },
      // create contact
      create (dialog, contact) {
        var _this = this
        __service.create(contact, function (response) {
          // 刷新网格数据
          _this.$refs.contactGridRef.getList()
          _this.$Notice.success({title: '成功', desc: '创建联系人成功！', duration: 3})
        }, function (error) {
          _this.$Notice.error({title: '错误', desc: '创建联系人出现错误！' + error, duration: 3})
          // 创建错误，继续处理，模态处窗体无中止特性，采用此法不关闭窗口
          setTimeout(() => {
            dialog.showDialog = true
          }, 0)
        })
      },
      // update contact
      update (dialog, contact) {
        var _this = this
        __service.update(contact, function (response) {
          // 刷新网格数据
          _this.$refs.contactGridRef.getList()
          _this.$Notice.success({title: '成功', desc: '修改联系人信息成功！', duration: 3})
        }, function (error) {
          _this.$Notice.error({title: '错误', desc: '修改联系人信息出现错误！' + error, duration: 3})
          // 更新错误，继续处理，模态处窗体无中止特性，采用此法不关闭窗口
          setTimeout(() => {
            dialog.showDialog = true
          }, 0)
        })
      },
      // delete contact
      delete (grid, id) {
        var _this = this
        __service.delete(id, function (response) {
          // 刷新网格数据
          grid.getList()
          _this.$Notice.success({title: '成功', desc: '删除联系人成功！', duration: 3})
        }, function (error) {
          _this.$Notice.error({title: '错误', desc: '删除联系人信息出现错误！' + error, duration: 3})
        })
      }
    }
  }
</script>
