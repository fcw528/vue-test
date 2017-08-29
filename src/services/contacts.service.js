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
  // list
  list (successHandler, errorHandler) {
    Axios.get(__url)
      .then(function (response) {
        successHandler(response)
      })
      .catch(function (error) {
        errorHandler(error)
      })
  }
  // show
  show (id, successHandler, errorHandler) {
    Axios.get(__url + id)
      .then(function (response) {
        successHandler(response)
      })
      .catch(function (error) {
        errorHandler(error)
      })
  }
  // create
  create (contact, successHandler, errorHandler) {
    Axios.post(__url, contact)
      .then(function (response) {
        successHandler(response)
      })
      .catch(function (error) {
        errorHandler(error)
      })
  }

  // update
  update (contact, successHandler, errorHandler) {
    Axios.put(__url + contact.id, contact)
      .then(function (response) {
        successHandler(response)
      })
      .catch(function (error) {
        errorHandler(error)
      })
  }
  // delete
  delete (id, successHandler, errorHandler) {
    Axios.delete(__url + id)
      .then(function (response) {
        successHandler(response)
      })
      .catch(function (error) {
        errorHandler(error)
      })
  }

}
