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