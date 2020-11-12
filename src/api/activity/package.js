import request from '@/utils/request'

// 查询包裹订单信息列表
export function listPackage(query) {
  return request({
    url: '/activity/package/list',
    method: 'get',
    params: query
  })
}

// 查询包裹订单信息详细
export function getPackage(packageId) {
  return request({
    url: '/activity/package/' + packageId,
    method: 'get'
  })
}

// 新增包裹订单信息
export function addPackage(data) {
  return request({
    url: '/activity/package',
    method: 'post',
    data: data
  })
}

// 修改包裹订单信息
export function updatePackage(data) {
  return request({
    url: '/activity/package',
    method: 'put',
    data: data
  })
}

// 删除包裹订单信息
export function delPackage(packageId) {
  return request({
    url: '/activity/package/' + packageId,
    method: 'delete'
  })
}

// 导出包裹订单信息
export function exportPackage(query) {
  return request({
    url: '/activity/package/export',
    method: 'get',
    params: query
  })
}