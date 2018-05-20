import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'

// 获取信息
export function information (params) {
    return request({
      url: requestUrl('/user/detail'),
      method: 'get',
      params: requestParam(params, 'get')
    })
  }
// 获取歌手信息
export function artist (params) {
  return request({
    url: requestUrl('/artist/desc'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}