import request from '@/utils/request'

// 查询洗衣订单信息列表
export function listLaundry(query) {
  return request({
    url: '/activity/laundry/list',
    method: 'get',
    params: query
  })
}

// 查询洗衣订单信息详细
export function getLaundry(laundryId) {
  return request({
    url: '/activity/laundry/' + laundryId,
    method: 'get'
  })
}

// 新增洗衣订单信息
export function addLaundry(data) {
  return request({
    url: '/activity/laundry',
    method: 'post',
    data: data
  })
}

// 修改洗衣订单信息
export function updateLaundry(data) {
  return request({
    url: '/activity/laundry',
    method: 'put',
    data: data
  })
}

// 删除洗衣订单信息
export function delLaundry(laundryId) {
  return request({
    url: '/activity/laundry/' + laundryId,
    method: 'delete'
  })
}

// 导出洗衣订单信息
export function exportLaundry(query) {
  return request({
    url: '/activity/laundry/export',
    method: 'get',
    params: query
  })
}