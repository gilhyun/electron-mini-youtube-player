export const PouchDB = require('pouchdb/dist/pouchdb')
export const db = PouchDB('my_yt_videos') || new PouchDB('my_yt_videos')
export const remoteCouch = false
export const docOtions = {
  include_docs: true,
  attachments: true,
  descending: true
}

PouchDB.plugin(window.require('pouchdb-find'))

// 전체 데이터를 가져온다.
export function allDocs(callback) {
  db.allDocs(docOtions).then((result) => {
    callback(null, result)
  }).catch((err) => {
    callback(err, null)
  })
}

// 데이터를 넣는다.
export function insertDoc(doc, callback) {
  db.put(doc).then((response) => {
    callback(null, response)
  }).catch((err) => {
    callback(err, null)
  })
}

// 데이터를 삭제 한다.
export function deleteDoc(doc, callback) {
  db.get(doc).then((selectDoc) => {
    return db.remove(selectDoc)
  }).then(function (result) {
    callback(null, result)
  }).catch(function (err) {
    callback(err, null)
  })
}
