import { Request, Response } from "express";
import Device from "../../models/device";

async function readAll(req: Request, res: Response) {
	try {
		const devices = await Device.find();
		return res.status(200).json(devices);
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 01] Can't fetch data: ${error}` });
	}
}

export default readAll;