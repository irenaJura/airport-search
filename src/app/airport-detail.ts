export interface AirportDetail {
  meta: {
    count: number
  },
  data: {
    address: {
      cityCode: string,
      cityName: string,
      countryCode: string,
      countryName: string,
      regionCode: string,
      stateCode?: string
    },
    analytics: {
      travelers: {
        score: number
      }
    },
    detailedName: string,
    geoCode: {
      latitude: number,
      longitude: number
    },
    iataCode: string,
    id: string,
    name: string
  }
}
