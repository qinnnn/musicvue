import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'

// 获取动态消息
export function event (params) {
    return request({
      url: requestUrl('/event'),
      method: 'get',
      params: requestParam(params, 'get')
    })
  }