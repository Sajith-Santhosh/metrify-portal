import customerData from '../data/metrify-mfh-mock-data-customer-properties.json'
import property123 from '../data/metrify-mfh-mock-data-property-123.json'
import property456 from '../data/metrify-mfh-mock-data-property-456.json'
import property789 from '../data/metrify-mfh-mock-data-property-789.json'

const propertyMap = {
  'property-123': property123,
  'property-456': property456,
  'property-789': property789,
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const getCustomer = async (customerId) => {
  await delay(500)
  if (customerId !== 'customer-001') {
    throw new Error(`Customer ${customerId} not found`)
  }
  return customerData
}

export const getMeterExchanges = async (propertyId) => {
  await delay(500)
  const data = propertyMap[propertyId]
  if (!data) throw new Error(`Property ${propertyId} not found`)
  return data
}