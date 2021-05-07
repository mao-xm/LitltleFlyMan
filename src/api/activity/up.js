// import request from '@/utils/request'

// // 查询包裹订单信息列表
// export function listPackage(query) {
//   return request({
//     url: '/activity/package/list',
//     method: 'get',
//     params: query
//   })
// }

// // 查询包裹订单信息详细
// export function getPackage(packageId) {
//   return request({
//     url: '/activity/package/' + packageId,
//     method: 'get'
//   })
// }

// // 新增包裹订单信息
// export function addPackage(data) {
//   return request({
//     url: '/activity/package',
//     method: 'post',
//     data: data
//   })
// }

// // 修改包裹订单信息
// export function updatePackage(data) {
//   return request({
//     url: '/activity/package',
//     method: 'put',
//     data: data
//   })
// }

// // 删除包裹订单信息
// export function delPackage(packageId) {
//   return request({
//     url: '/activity/package/' + packageId,
//     method: 'delete'
//   })
// }

// // 导出包裹订单信息
// export function exportPackage(query) {
//   return request({
//     url: '/activity/package/export',
//     method: 'get',
//     params: query
//   })
// }

import request from '@/utils/request'

// 查询打印订单列表
export function listUp(query) {
  return request({
    url: '/activity/up/list',
    method: 'get',
    params: query
  })
}

// 查询打印订单详细
export function getUp(pickUpId) {
  return request({
    url: '/activity/up/' + pickUpId,
    method: 'get'
  })
}

// 新增打印订单
export function addUp(data) {
  return request({
    url: '/activity/up',
    method: 'post',
    data: data
  })
}

// 修改打印订单为派送状态
export function editDeliveryStatus(data) {
  return request({
    url: '/activity/up/editDeliveryStatus',
    method: 'put',
    data: data
  })
}

//取消订单
export function editCancelStatus(data) {
  return request({
    url: '/activity/up/editCancelStatus',
    method: 'put',
    data: data
  })
}

// 删除打印订单
export function delUp(pickUpId) {
  return request({
    url: '/activity/up/' + pickUpId,
    method: 'delete'
  })
}

// 导出打印订单
export function exportUp(query) {
  return request({
    url: '/activity/up/export',
    method: 'get',
    params: query
  })
}