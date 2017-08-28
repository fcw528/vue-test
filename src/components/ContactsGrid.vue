<template>
  <Table border stripe :columns="columns" :data="data"></Table>
</template>
<script>
  export default {
    name: 'contacts_grid',
    data () {
      return {
        columns: [
          {
            title: 'first_name',
            key: 'first_name',
            align: 'center'
          },
          {
            title: 'last_name',
            key: 'last_name',
            align: 'center'
          },
          {
            title: 'email',
            key: 'email',
            align: 'center'
          },
          {
            title: 'description',
            key: 'description',
            align: 'center'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.row)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.update(params.row)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delete(params.row)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        data: this.getList()
      }
    },
    props: ['parent_instance'],
    methods: {
      getList () {
        this.parent_instance.list(this)
      },
      show (row) {
        this.parent_instance.show(row.id)
      },
      update (row) {
        var contact = { id: row.id, first_name: row.first_name, last_name: row.last_name, email: row.email, description: row.description }
        this.parent_instance.editContact(contact)
      },
      delete (row) {
        this.$Modal.confirm({
          title: '删除确认',
          content: '<p>确定要删除该联系人？</p>',
          loading: true,
          onOk: () => {
            this.parent_instance.delete(this, row.id)
            this.$Modal.remove()
          }
        })
      }
    }
  }
</script>
