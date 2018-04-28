import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'

// 登录
export function login (params) {
    return request({
      url: requestUrl('/login/cellphone'),
      method: 'get',
      params: requestParam(params, 'get')
    })
  }