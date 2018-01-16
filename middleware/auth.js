import {
  getCookieKey,
  getToken
} from '~/utils/auth'
import Cookie from 'cookie'

export default function(ctx) {
  if (!ctx.islogin) {
    ctx.redirect('/login')
    return
  }
  ctx.userinfo = ctx.store.state.user.userinfo
  if (ctx.isServer) {
    let cookieStr = ctx.req.headers.cookie
    const cookies = Cookie.parse(cookieStr || '') || {}
    ctx.token = cookies[getCookieKey()]
  } else {
    let token = getToken()
    ctx.token = token.token
  }
  ctx.store.commit('token/tokeninfo', ctx.token)
  console.log(ctx.token)
}
