import { RequestHandler } from "express";
import Especes from '../models/especes';
// import fs from 'fs/promises';

export const createEspece: RequestHandler = async (req, res) => {
    if (!req.auth) {
        return res.status(401).json({
            message: "Erreur d'authentification",
        })
    };

    const { name } = req.body;

    if (!name || typeof name !== "string") {
        return res.status(400).json({
            message: "Le nom de l'espèce est requis",
        })
    }

    try {
        const espece = new Especes({
            name,
            userId: req.auth.userId,
        });
        await espece.save()
        res.status(201).json({
            message : 'Espèce Créée !',
            espece,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Il y a une erreur !',
            error,
        });
    };
};

export const getAllEspeces: RequestHandler = async (req, res) => {
    try {
        const especes = await Especes.find();
        res.status(200).json({
            message: "La lisete des espèces",
            especes
        });
    } catch (error) {
        res.status(500).json({
            message: 'Il y a eu une erreur !',
            error
        })
    }
}