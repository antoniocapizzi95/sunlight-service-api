import { SunlightData } from "./models/sunlight.data";

export interface SunlightRepository {
    getSunlightTime(datetime, lat, lng): Promise<SunlightData>;
}
