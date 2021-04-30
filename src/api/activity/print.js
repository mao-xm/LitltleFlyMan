import request from '@/utils/request'

// 查询打印订单列表
export function listPrint(query) {
 console.log("请求进入");
  return request({
    url: '/activity/print/list',
    method: 'get',
    params: query
  })
}

// 查询打印订单详细
export function getPrint(printId) {
  return request({
    url: '/activity/print/' + printId,
    method: 'get'
  })
}

// 新增打印订单
export function addPrint(data) {
  return request({
    url: '/activity/print',
    method: 'post',
    data: data
  })
}

// 修改打印订单为接单
export function updatePrint(data) {
  return request({
    url: '/activity/print/editPrintStatus',
    method: 'put',
    data: data
  })
}

// 修改打印订单为派送
export function editDeliveryStatus(data) {
  return request({
    url: '/activity/print/editDeliveryStatus',
    method: 'put',
    data: data
  })
}

// 取消订单
export function editCancelStatus(data) {
  return request({
    url: '/activity/print/editCancelStatus',
    method: 'put',
    data: data
  })
}

// 删除打印订单
export function delPrint(printId) {
  return request({
    url: '/activity/print/' + printId,
    method: 'delete'
  })
}

// 导出打印订单
// export function exportPrint(query) {
//   return request({
//     url: '/activity/print/export',
//     method: 'get',
//     params: query
//   })
// }