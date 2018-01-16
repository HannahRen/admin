export default function(context) {
  // console.log('context.route.fullPath' + context.route.fullPath);
  context.userAgent = context.isServer
    ? context.req.headers['user-agent']
    : navigator.userAgent;
}
