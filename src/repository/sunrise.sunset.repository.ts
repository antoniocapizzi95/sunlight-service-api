import axios from "axios";
import { DateTime } from "luxon";
import { SunlightRepository } from "./sunlight.repository.interface";
import { SunlightData } from "./models/sunlight.data";

export class SunriseSunsetRepository implements SunlightRepository {
    async getSunlightTime(datetime: DateTime, lat: number, lng: number): Promise<SunlightData> {
        const response = await axios.get(
            `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${datetime.toFormat(
              "yyyy-MM-dd"
            )}`
          );
          const hours = DateTime.fromISO(response.data.results.day_length);
    
          return {
            date: datetime.toFormat("yyyy-MM-dd"),
            coordinates: {
              latitude: lat,
              longitude: lng,
            },
            total_hours_of_light: hours.toFormat("hh:mm:ss"),
          };
    }
}