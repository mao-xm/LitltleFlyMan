// import request from '@/utils/request'

// // 查询任务信息列表
// export function listTask(query) {
//   return request({
//     url: '/activity/task/list',
//     method: 'get',
//     params: query
//   })
// }

// // 查询任务信息详细
// export function getTask(taskId) {
//   return request({
//     url: '/activity/task/' + taskId,
//     method: 'get'
//   })
// }

// // 新增任务信息
// export function addTask(data) {
//   return request({
//     url: '/activity/task',
//     method: 'post',
//     data: data
//   })
// }

// // 修改任务信息
// export function updateTask(data) {
//   return request({
//     url: '/activity/task',
//     method: 'put',
//     data: data
//   })
// }

// // 删除任务信息
// export function delTask(taskId) {
//   return request({
//     url: '/activity/task/' + taskId,
//     method: 'delete'
//   })
// }

// // 导出任务信息
// export function exportTask(query) {
//   return request({
//     url: '/activity/task/export',
//     method: 'get',
//     params: query
//   })
// }
import request from '@/utils/request'

// 查询任务信息列表
export function listTask(query) {
  return request({
    url: '/activity/task/list',
    method: 'get',
    params: query
  })
}

// 审核通过
export function agree(data) {
  return request({
    url: '/activity/task/agree',
    method: 'put',
    data:data
  })
}

// 审核不通过
export function cancel(data) {
  return request({
    url: '/activity/task/cancel',
    method: 'put',
    data:data
  })
}

// 查询任务信息详细
export function getTask(taskId) {
  return request({
    url: '/activity/task/' + taskId,
    method: 'get'
  })
}

// 新增任务信息
export function addTask(data) {
  return request({
    url: '/activity/task',
    method: 'post',
    data: data
  })
}

// 修改任务信息
export function updateTask(data) {
  return request({
    url: '/activity/task',
    method: 'put',
    data: data
  })
}

// 删除任务信息
export function delTask(taskId) {
  return request({
    url: '/activity/task/' + taskId,
    method: 'delete'
  })
}

// 导出任务信息
export function exportTask(query) {
  return request({
    url: '/activity/task/export',
    method: 'get',
    params: query
  })
}