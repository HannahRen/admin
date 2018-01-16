import moment from 'moment'
moment.locale('zh-cn')

export default {
  addDay(time, day) {
    return moment(time).add(day, 'days')
  },
  addSecond(time, seconds) {
    return moment(time).add(seconds, 'seconds')
  },
  formatDate(time) {
    if (!time) {
      return ''
    }
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
  },
  formatDay(time) {
    if (!time) {
      return ''
    }
    return moment(time).format('YYYY-MM-DD')
  },
  formatDateRelative(time) {
    return moment(time).fromNow()
  },
  formatShortDay(time) {
    if (!time) {
      return ''
    }
    return moment(time).format('MM-DD')
  }
}
