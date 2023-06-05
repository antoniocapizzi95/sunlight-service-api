import express from "express";
import { DateTime } from "luxon";
import { SunlightRepository } from "../repository/sunlight.repository.interface";
import { SunlightData } from "../repository/models/sunlight.data";

export class SunlightController {
    private sunlightRepository: SunlightRepository

    constructor(sunlightRepository: SunlightRepository) {
        this.sunlightRepository = sunlightRepository;
    }

    async sunlight (req: express.Request, res: express.Response) {
        const { lat, lng, date } = req.query;
    
        try {
            const datetime = DateTime.fromISO(date.toString());
            const result = await this.sunlightRepository.getSunlightTime(datetime, lat, lng);
            res.status(200).send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    async sunlightOneYear (req: express.Request, res: express.Response) {
        const { lat, lng, date } = req.query;

        let sunlightData: SunlightData[] = [];
        try {
            const datetime = DateTime.fromISO(date.toString());

            for (let i = 0; i < 12; i++) {
                const nextMonth = datetime.plus({ months: i });

                const result = await this.sunlightRepository.getSunlightTime(nextMonth, lat, lng);
                sunlightData.push(result);
            }
            res.status(200).send(sunlightData);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
}
