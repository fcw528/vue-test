import Axios from 'axios'

// single instance
let __instance = (function () {
  let instance
  return (newInstance) => {
    if (newInstance) instance = newInstance
    return instance
  }
}())

const __url = 'http://127.0.0.1:8089/contacts/'

export class ContactsService {
  constructor () {
    if (__instance()) return __instance()
    __instance(this)
  }
  // contact list
  list (grid, caller) {
    Axios.get(__url)
      .then(function (response) {
        grid.data = response.data
      })
      .catch(function (error) {
        caller.$Notice.error({title: '错误', desc: '获取联系人列表出现错误！' + error, duration: 3})
        grid.data = []
      })
  }

  // show contact
  show (id, caller) {
    Axios.get(__url + id)
      .then(function (response) {
        var contact = response.data
        caller.$Modal.info({
          title: '联系人信息',
          content: `first_name：${contact.first_name}<br>last_name：${contact.last_name}<br>email：${contact.email}<br>description：${contact.description}<br>`
        })
      })
      .catch(function (error) {
        caller.$Notice.error({title: '错误', desc: '获取联系人信息出现错误！' + error, duration: 3})
      })
  }
  // create contact
  create (dialog, contact, caller) {
    Axios.post(__url, contact)
      .then(function (response) {
        // 刷新网格数据
        caller.$refs.contactGridRef.getList()
        caller.$Notice.success({title: '成功', desc: '创建联系人成功！', duration: 3})
      })
      .catch(function (error) {
        caller.$Notice.error({title: '错误', desc: '创建联系人出现错误！' + error, duration: 3})
        // 创建错误，继续处理，模态处窗体无中止特性，采用此法不关闭窗口
        setTimeout(() => {
          dialog.showDialog = true
        }, 0)
      })
  }

  // edit contact
  update (dialog, contact, caller) {
    Axios.put(__url + contact.id, contact)
      .then(function (response) {
        // 刷新网格数据
        caller.$refs.contactGridRef.getList()
        caller.$Notice.success({title: '成功', desc: '修改联系人信息成功！', duration: 3})
      })
      .catch(function (error) {
        caller.$Notice.error({title: '错误', desc: '修改联系人信息出现错误！' + error, duration: 3})
        // 更新错误，继续处理，模态处窗体无中止特性，采用此法不关闭窗口
        setTimeout(() => {
          dialog.showDialog = true
        }, 0)
      })
  }
  // delete contact
  delete (grid, id, caller) {
    Axios.delete(__url + id)
      .then(function (response) {
        // 刷新网格数据
        grid.getList()
        caller.$Notice.success({title: '成功', desc: '删除联系人成功！', duration: 3})
      })
      .catch(function (error) {
        caller.$Notice.error({title: '错误', desc: '删除联系人信息出现错误！' + error, duration: 3})
      })
  }

}
