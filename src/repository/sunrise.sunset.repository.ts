import axios from "axios";
import { DateTime } from "luxon";
import { SunlightRepository } from "./sunlight.repository.interface";
import { SunlightData } from "./models/sunlight.data";

export class SunriseSunsetRepository implements SunlightRepository {
  async getSunlightTime(datetime: DateTime, lat: number, lng: number): Promise<SunlightData> {
    const datetimeFmt = datetime.toFormat("yyyy-MM-dd")
    const queryParams = {
      date: datetimeFmt,
      lat: lat,
      lng: lng,
    };
    const response = await axios.get('https://api.sunrise-sunset.org/json', { params: queryParams });
  
    return {
      date: datetimeFmt,
      coordinates: {
        latitude: lat,
        longitude: lng,
      },
      total_hours_of_light: response.data.results.day_length,
    };
  }
}