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

export const deleteEspeces: RequestHandler = async (req, res) => {
    if(!req.auth) {
        return res.status(401).json({
            message: "Erreur d'authentification"
        });
    };

    try {
        const especeId = req.params.id //|| req.query.id;
        if(!especeId) {
            return res.status(400).json({
                message: 'Id requis'
            })
        }

        const espece = await Especes.findById(especeId);
        if(!espece) {
            return res.status(404).json({
                message: 'Espèce non trouvée'
            })
        }

        if(espece.userId && espece.userId.toString() !== req.auth.userId) {
            return res.status(403).json({
                message: 'Accès interdit'
            })
        }

        await Especes.deleteOne({ _id: especeId });

        res.status(200).json({
            message : 'Espece supprimée.'
        }) 
    } catch (error) {
        res.status(500).json({
            message: 'Erreur server',
            error
        })
    }
}

/*

export const deleteThing: RequestHandler = async (req, res) =>{
    if (!req.auth) {
        return res.status(401).json({
            message : "Erreur d'authentification",
        });
    };

    try {
        const thing = await Thing.findOne({ _id: req.params.id});
        if(!thing) {
            return res.status(404).json({
                message: 'Objet non trouvé.'
            });
        };

        if(thing.userId.toString() !== req.auth.userId) {
            return res.status(403).json({
                message : 'Non autorisé.'
            });
        };

        const filename = thing.imageUrl.split('/images/')[1];

        await fs.unlink(`images/${filename}`);
        await Thing.deleteOne({ _id: req.params.id });

        res.status(200).json({
            message : 'objet supprimé.'
        })
    } catch  (error) {
        res.status(500).json({
            message: 'Erreur server',
            error
        })
    }
}
 */