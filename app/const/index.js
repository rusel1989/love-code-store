import { Platform } from 'react-native'

export const messageTypes = {
  PERSON_ADDED: 'person_added',
  PERSON_REMOVED: 'person_removed'
}

export const DATE_FORMAT = 'DD.MM.YYYY'
export const DATETIME_FORMAT = `${DATE_FORMAT}, HH:mm`

export const MONOSPACE_FONT = Platform.OS === 'ios' ? 'Courier' : 'monospace'
