import request from '@/utils/request'

// // 查询洗衣订单信息列表
// export function listLaundry(query) {
//   return request({
//     url: '/activity/laundry/list',
//     method: 'get',
//     params: query
//   })
// }

// // 查询洗衣订单信息详细
// export function getLaundry(laundryId) {
//   return request({
//     url: '/activity/laundry/' + laundryId,
//     method: 'get'
//   })
// }

// // 新增洗衣订单信息
// export function addLaundry(data) {
//   return request({
//     url: '/activity/laundry',
//     method: 'post',
//     data: data
//   })
// }

// // 修改洗衣订单信息
// export function updateLaundry(data) {
//   return request({
//     url: '/activity/laundry',
//     method: 'put',
//     data: data
//   })
// }

// // 删除洗衣订单信息
// export function delLaundry(laundryId) {
//   return request({
//     url: '/activity/laundry/' + laundryId,
//     method: 'delete'
//   })
// }

// // 导出洗衣订单信息
// export function exportLaundry(query) {
//   return request({
//     url: '/activity/laundry/export',
//     method: 'get',
//     params: query
//   })
// }



// 查询洗衣订单列表
export function listWashing(query) {
  return request({
    url: '/activity/washing/list',
    method: 'get',
    params: query
  })
}

// 查询洗衣订单详细
export function getWashing(washingId) {
  return request({
    url: '/activity/washing/' + washingId,
    method: 'get'
  })
}

// 新增洗衣订单
export function addWashing(data) {
  return request({
    url: '/activity/washing',
    method: 'post',
    data: data
  })
}

// 修改洗衣订单为派送状态
export function editDeliveryStatus(data) {
  return request({
    url: '/activity/washing/editDeliveryStatus',
    method: 'put',
    data: data
  })
}

// 修改洗衣订单为取衣状态
export function editFetchStatus(data) {
  return request({
    url: '/activity/washing/editFetchStatus',
    method: 'put',
    data: data
  })
}

// 修改洗衣订单为接单状态
export function editTakeStatus(data) {
  return request({
    url: '/activity/washing/editTakeStatus',
    method: 'put',
    data: data
  })
}

// 修改洗衣订单为清洗状态
export function editWashingStatus(data) {
  return request({
    url: '/activity/washing/editWashingStatus',
    method: 'put',
    data: data
  })
}



// 删除洗衣订单
export function delWashing(washingId) {
  return request({
    url: '/activity/washing/' + washingId,
    method: 'delete'
  })
}

// 取消订单
export function editCancelStatus(data) {
  return request({
    url: '/activity/washing/editCancelStatus',
    method: 'put',
    data: data
  })
}

// 导出洗衣订单
export function exportWashing(query) {
  return request({
    url: '/activity/washing/export',
    method: 'get',
    params: query
  })
}