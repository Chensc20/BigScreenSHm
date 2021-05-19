import request from '@/utils/request'

// export default {
//   //chaxunshuju huixian
//   getDataV(){
//     return request({
//       url: '/staservice/tab/showData',
//       method: 'get'
//     })
//   },
// }

export default {
  getDataV(searchObj){
    return request({
      url: `/staservice/tab/showData`,
      method: 'get',
      async: false
    });
  }
}
