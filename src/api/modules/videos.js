import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'

// 获取最新mv
export function mv (params) {
    return request({
      url: requestUrl('/mv/first'),
      method: 'get',
      params: requestParam(params, 'get')
    })
  }