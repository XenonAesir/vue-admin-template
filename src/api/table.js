import request from '@/utils/request'

// export function getList(params) {
//   return request({
//     url: '/teacher/ipage',
//     method: 'get',
//     params
//   })
// }

export function getList(params) {
  return request({
    url: '/teacher/all',
    method: 'get',
    params
  })
}

export function insertTeacher(data) {
  return request({
    url: '/teacher/insert',
    method: 'post',
    data
  })
}

export function queryTeacher(params) {
  return request({
    url: '/teacher/query',
    method: 'get',
    params
  })
}

export function deleteTeacher(params) {
  return request({
    url: '/teacher/delete',
    method: 'delete',
    params
  })
}

export function updateTeacher(params) {
  return request({
    url: '/teacher/update',
    method: 'put',
    params
  })
}