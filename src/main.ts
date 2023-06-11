import * as express from "express";
import * as cors from "cors";
import * as dotenv from 'dotenv';
import { SunlightController } from "./controllers/sunlight.controller";
import { SunriseSunsetRepository } from "./repository/sunrise.sunset.repository";

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

const sunriseSunsetUrl = process.env.SUNRISE_SUNSET_URL;
if (!sunriseSunsetUrl) {
  throw new Error('SUNRISE_SUNSET_URL env variable is missing');
}
const sunlightController = new SunlightController(
  new SunriseSunsetRepository(sunriseSunsetUrl)
);

app.get("/sunlight", async (req, res) => {
    return sunlightController.sunlight(req, res);
});

app.get("/sunlight-one-year", async (req, res) => {
    return sunlightController.sunlightOneYear(req, res);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});