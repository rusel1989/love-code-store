import moment from 'moment'
import { Platform } from 'react-native'
import { DATE_FORMAT, DATETIME_FORMAT } from '@n/const'

export const formatPrice = (cents = 0) => {
  return `$${(cents / 100).toFixed(2)}`
}

export const formatDate = (date) => {
  return moment(date).format(DATE_FORMAT)
}

export const formatDatetime = (date) => {
  return moment(date).format(DATETIME_FORMAT)
}
