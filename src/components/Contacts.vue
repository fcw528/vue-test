<template>
  <div>
    <div class="panel panel-info">
      <div class="panel-heading">联系人管理</div>
      <div class="panel-body">
      </div>
      <div>
        <contacts-grid v-bind:parent_instance="instance" ref="contactGridRef"></contacts-grid>
      </div>
    </div>
  </div>
</template>
<script>
  import Axios from 'axios'
  import ContactsGrid from '@/components/ContactsGrid'

  export default {
    name: 'contacts',
    data () {
      return {
        url: 'http://127.0.0.1:8089/contacts/',
        instance: this
      }
    },
    components: { ContactsGrid },
    methods: {
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
      }
    }
  }
</script>
