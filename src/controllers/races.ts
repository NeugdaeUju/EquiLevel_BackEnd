import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Races from '../models/races';
import Especes from '../models/especes';

export const createRace: RequestHandler = async (req, res) => {
    if (!req.auth) {
        return res.status(401).json({
            message: "Erreur d'authentification",
        })
    };

    const { name, especeId } = req.body;

    if (!name || typeof name !== "string") {
        return res.status(400).json({
            message: "Le nom de la race est requis",
        })
    }
    if(!especeId || !Types.ObjectId.isValid(especeId)) {
        return res.status(400).json({
            message: "L'espèce est invalide",
        })
    }

    const especeExists = await Especes.findById(especeId)
    if (!especeExists) {
        return res.status(404).json({
            message: "L'espece n'existe pas",
        })
    }

    try {
        const race = new Races({
            name,
            userId: req.auth.userId,
            especeId,
        });
        await race.save()
        res.status(201).json({
            message : 'Race Créée !',
            race,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Il y a une erreur !',
            error,
        });
    };
};


export const getAllRaces: RequestHandler = async (req, res) => {
    try {
        const races = await Races.find();
        res.status(200).json({
            message: "La lisete des espèces",
            races
        });
    } catch (error) {
        res.status(500).json({
            message: 'Il y a eu une erreur !',
            error
        })
    }
}
