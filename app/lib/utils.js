import I18n from 'react-native-i18n'
import moment from 'moment'
import { NativeModules, Platform } from 'react-native'
import { DATE_FORMAT, DATETIME_FORMAT } from '@n/const'

const NativeUtils = NativeModules.Maxipokladna

export const translateOptions = (options, prefix = '') => {
  return options.map((option) => ({ payload: option, text: I18n.t(`${prefix}${option}`) }))
}

export const accountDataToReceiptHeader = (data = {}) => {
  return [
    data.company,
    `${data.zip || ''} ${data.city || ''}`,
    `${I18n.t('identification_number', { locale: 'cs' })}: ${data.ICO || ''}`,
    `${I18n.t('vat_number', { locale: 'cs' })}: ${data.DIC || ''}`
  ].join('\n')
}

export const parseCertificate = NativeUtils.parseCertificate

export const sign = NativeUtils.signMessage

export const selectFile = () => {
  if (Platform.OS === 'android') {
    return NativeUtils.selectFile(I18n.t('select_file'))
  } else {
    return Promise.resolve()
  }
}

export const formatDate = (date) => {
  return moment(date).format(DATE_FORMAT)
}

export const formatDatetime = (date) => {
  return moment(date).format(DATETIME_FORMAT)
}
