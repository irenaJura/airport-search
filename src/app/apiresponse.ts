import { Airport } from "./airport";

export interface ApiResponse {
  meta: {
    count: number
  },
  data: Airport[]
}
