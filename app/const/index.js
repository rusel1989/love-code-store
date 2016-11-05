import { Platform } from 'react-native'

export const discountTypes = {
  PERCENTAGE: 'percentage',
  AMOUNT: 'amount'
}

export const saleTypes = {
  QUICK: 'quick',
  REGULAR: 'regular'
}

export const currencies = {
  CZK: 'CZK',
  EUR: 'EUR'
}

export const units = {
  PC: 'ks',
  KG: 'kg',
  L: 'l'
}

export const transactionStates = {
  NEW: 'new',
  OPEN: 'open',
  CANCELED: 'canceled',
  PAID: 'paid',
  REFUNDED: 'refunded',
  CLOSED: 'closed'
}

export const eetStatus = {
  EET_SUBMITTED: 'eet_submitted',
  EET_NOT_SUBMITTED: 'eet_not_submitted',
  WITHOUT_EET: 'without_eet'
}

export const paymentTypes = {
  CASH: 'cash',
  FOOD_COUPON: 'food_coupon',
  CREDIT_CARD: 'credit_card',
  CHEQUE: 'cheque'
}

export const receiptActionTypes = {
  PRINT: 'print',
  SEND_MAIL: 'send_mail',
  NO_ACTION: 'no_action'
}

export const articleAdditionModes = {
  ONE: 'one',
  COUNT: 'count'
}

export const subscriptionPlans = {
  FREE: 'free_plan',
  PAID: 'paid_plan'
}

export const DATE_FORMAT = 'DD.MM.YYYY'
export const DATETIME_FORMAT = `${DATE_FORMAT}, HH:mm`

export const PRIVACY_POLICY_URL = 'http://ipokladna.com/zasady-ochrany-soukromi.html'
export const SUPPORT_EMAIL = 'mailto:maxipokladna@amaxsro.com'
export const SUPPORT_PHONE = 'tel:+420543213776'
export const MONOSPACE_FONT = Platform.OS === 'ios' ? 'Courier' : 'monospace'
