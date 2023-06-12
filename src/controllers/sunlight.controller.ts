import express from "express";
import { DateTime } from "luxon";
import { SunlightRepository } from "../repository/sunlight.repository.interface";
import { SunlightData } from "../repository/models/sunlight.data";
import * as Joi from "joi";
export class SunlightController {
    private sunlightRepository: SunlightRepository

    constructor(sunlightRepository: SunlightRepository) {
        this.sunlightRepository = sunlightRepository;
    }

    async sunlight (req: express.Request, res: express.Response) {
        const { lat, lng, date } = req.query;
        
        const validationError = this._validateParams(date, lat, lng);
        if (validationError) {
            return res.status(400).send(validationError);
        }

        try {
            const datetime = DateTime.fromISO(date.toString());
            const result = await this.sunlightRepository.getSunlightTime(datetime, parseFloat(lat.toString()), parseFloat(lng.toString()));
            res.status(200).send(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    async sunlightOneYear (req: express.Request, res: express.Response) {
        const { lat, lng, date } = req.query;

        const validationError = this._validateParams(date, lat, lng);
        if (validationError) {
            return res.status(400).send(validationError);
        }

        let sunlightData: SunlightData[] = [];
        try {
            const datetime = DateTime.fromISO(date.toString());
            const currentMonth = datetime.month;

            for (let i = currentMonth; i <= 12; i++) {
                const nextMonth = datetime.plus({ months: i - currentMonth });

                const result = await this.sunlightRepository.getSunlightTime(nextMonth, parseFloat(lat.toString()), parseFloat(lng.toString()));
                sunlightData.push(result);
            }
            res.status(200).send(sunlightData);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    _validateParams (date, lat, lng): string | null {
        const schema = Joi.object({
            date: Joi.date().iso().required(),
            lat: Joi.number().min(-90).max(90).required(),
            lng: Joi.number().min(-180).max(180).required(),
        });
        const validationResult = schema.validate({ date, lat, lng });
        if (validationResult.error) {
            return validationResult.error.details[0].message;
        }
        return null;
    }
}
