const youtubeSearch = window.require('./utils/youtubeSearch')
const youtubeKeys = [
  'AIzaSyDXR30frL9rfEk6-7nPd88VGambN5Y-b_8'
]

const youtubeKey = youtubeKeys[Math.floor(Math.random() * youtubeKeys.length)]

// 비디오 데이터.
export function getVideoData(keyword, callback) {
  let opts = {
    maxResults: 1,
    key: youtubeKey
  }
  youtubeSearch(keyword, opts, (err, results) => {
    if (err) return console.log(err)
    if (!results.length) {
      callback(null, 0)
    }

    callback(null, results[0])
  })
}

// 비디오 키워드 검색.
export function findVideos(keyword, callback, pageToken = null, maxResults = 48) {
  let opts = {
    maxResults: maxResults,
    key: youtubeKey,
    videoLicense: 'youtube',
    type: 'video',
    videoSyndicated: true
  }

  if (pageToken) {
    opts.pageToken = pageToken
  }

  youtubeSearch(keyword, opts, (err, results, pageInfo) => {
    if (err) return console.log(err)
    if (!results.length) {
      callback(null, 0, null)
    }

    callback(null, results, pageInfo)
  })
}
