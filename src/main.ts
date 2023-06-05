import * as express from "express";
import { SunlightController } from "./controllers/sunlight.controller";
import { SunriseSunsetRepository } from "./repository/sunrise.sunset.repository";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const sunlightController = new SunlightController(new SunriseSunsetRepository())

app.get("/sunlight", async (req, res) => {
    return sunlightController.sunlight(req, res);
});

app.get("/sunlight-one-year", async (req, res) => {
    return sunlightController.sunlightOneYear(req, res);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});