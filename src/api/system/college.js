import request from '@/utils/request'

// 查询学院列表
export function listCollege(query) {
  return request({
    url: '/system/school/list',
    method: 'get',
    params: query
  })
}

// 查询学院列表（排除节点）
export function listCollegeExcludeChild(collegeId) {
  return request({
    url: '/system/school/list/exclude/' + collegeId,
    method: 'get'
  })
}

// 查询学院详细
export function getCollege(collegeId) {
  return request({
    url: '/system/school/' + collegeId,
    method: 'get'
  })
}

// 查询学院下拉树结构
export function treeselect() {
  return request({
    url: '/system/school/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询学院树结构
export function roleCollegeTreeselect(roleId) {
  return request({
    url: '/system/school/roleSchoolListselect/' + roleId,
    method: 'get'
  })
}

// 新增学院
export function addCollege(data) {
  return request({
    url: '/system/school',
    method: 'post',
    data: data
  })
}

// 修改学院
export function updateCollege(data) {
  return request({
    url: '/system/school',
    method: 'put',
    data: data
  })
}

// 删除学院
export function delCollege(collegeId) {
  return request({
    url: '/system/school/' + collegeId,
    method: 'delete'
  })
}