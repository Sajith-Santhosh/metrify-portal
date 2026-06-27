import { useState, useEffect } from 'react'
import { getCustomer, getMeterExchanges } from '../services/mockApi'

const useMeterData = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [meterExchanges, setMeterExchanges] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerData = await getCustomer('customer-001')
        setCustomer(customerData)

        const results = await Promise.all(
          customerData.properties.map((p) => getMeterExchanges(p.propertyId))
        )

        const allExchanges = results.flatMap((r) =>
          r.meterExchanges.map((mx) => ({
            ...mx,
            propertyAddress: r.property.address,
            propertyId: r.propertyId,
          }))
        )

        setMeterExchanges(allExchanges)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { loading, error, customer, meterExchanges }
}

export default useMeterData