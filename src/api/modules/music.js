import request from '../request'
import requestUrl from '../requestUrl'
import requestUrl2 from '../requestUrl2'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'

// 获取列表
export function playlist (params) {
    return request({
      url: requestUrl('/user/playlist'),
      method: 'get',
      params: requestParam(params, 'get')
    })
  }
// 获取歌单列表详情
export function musiclist (params) {
  return request({
    url: requestUrl('/playlist/detail'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 获取歌曲链接
export function musicUrl (params) {
  return request({
    url: requestUrl('/music/url'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 获取歌曲详情
export function musicSong (params) {
  return request({
    url: requestUrl('/song/detail'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 获取歌曲歌词
export function musicLyric (params) {
  return request({
    url: requestUrl('/lyric'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 获取歌曲
export function musicPlay (params) {
  // console.log(params)
  return request({
    url: requestUrl2(params.url),
    method: 'get',
    params: requestParam(params, 'get')
  })
}
// 获取banner
export function banner (params) {
  return request({
    url: requestUrl('/banner'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 获取推荐歌单
export function recommendSongSheet (params) {
  return request({
    url: requestUrl('/personalized'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 获取独家放送
export function privatecontent (params) {
  return request({
    url: requestUrl('/personalized/privatecontent'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 获取最新音乐
export function newsong (params) {
  return request({
    url: requestUrl('/personalized/newsong'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}


// 获取推荐MV
export function recommendMV (params) {
  return request({
    url: requestUrl('/personalized/mv'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}
