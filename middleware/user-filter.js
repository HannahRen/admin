import axios from '~/plugins/axios'
import {
  getCookieKey,
  getToken
} from '~/utils/auth'

export default async function(ctx) {
  // console.log(ctx.route);
  ctx.islogin = false
  if (ctx.isServer) {
    let cookies = ctx.req.headers.cookie
    if (!cookies || cookies.indexOf(getCookieKey()) < 0) {
      return
    }
  } else {
    let token = getToken()
    if (!token) {
      return
    }
  }
  if (ctx.store.state.user.userinfo) {
    ctx.islogin = true
    return
  }
  axios.ctx = ctx
  let url = '/administrator/userInfo'
  let result = await axios.get(url)
  if (result.code !== 0) {
    return
  }
  ctx.islogin = true
  let userinfo = result.data
  ctx.store.commit('user/userinfo', userinfo)
}
