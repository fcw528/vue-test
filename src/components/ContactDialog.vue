<template>
  <div>
    <Modal
      v-model="showDialog"
      :closable="true"
      :mask-closable="false"
      title="联系人信息"
      ok-text="保存"
      cancel-text="返回"
      @on-ok="ok">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <Form-item label="first_name:" prop="first_name">
          <Input v-model="formValidate.first_name" placeholder="请输入 fisrt name"></Input>
        </Form-item>
        <Form-item label="last_name:" prop="last_name">
          <Input v-model="formValidate.last_name" placeholder="请输入 last name"></Input>
        </Form-item>
        <Form-item label="email:" prop="email">
          <Input v-model="formValidate.email" placeholder="请输入 email"></Input>
        </Form-item>
        <Form-item label="description:" prop="description">
          <Input v-model="formValidate.description" placeholder="请输入 description"></Input>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'contact-dialog',
    data () {
      return {
        showDialog: false,
        createOrEdit: 'show',
        formValidate: this.getBlankData(),
        ruleValidate: {
          first_name: [
            { required: true, message: 'first name 不能为空!', trigger: 'blur' }
          ],
          last_name: [
            { required: true, message: 'last name 不能为空!', trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'email 不能为空!', trigger: 'blur' },
            { type: 'email', message: 'email 格式有误!', trigger: 'blur' }
          ],
          description: [
            { required: true, message: 'description 不能为空!', trigger: 'blur' }
          ]
        }
      }
    },
    props: ['parent_instance'],
    methods: {
      createContact () {
        // todo
      },
      editContact (contract) {
        // todo
      },
      getBlankData () {
        return { first_name: '', last_name: '', email: '', description: '' }
      },
      ok () {
        // todo
      }
    }
  }
</script>
