import { SunlightData } from "./models/sunlight.data";
import { DateTime } from "luxon";

export interface SunlightRepository {
    getSunlightTime(datetime: DateTime, lat: number, lng: number): Promise<SunlightData>;
}
