import { RequestHandler } from 'express';
import Horse from '../models/horse';
import Race from '../models/race';

// GET /api/horses — Tous les chevaux de l'utilisateur connecté
export const getAllHorses: RequestHandler = async (req, res) => {
  try {
    const horses = await Horse.find({ owner: req.auth!.userId })
      .populate('race', 'name isPureBreed skills')
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: horses.length,
      horses,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// GET /api/horses/:id — Détail d'un cheval (appartenant à l'utilisateur)
export const getHorseById: RequestHandler = async (req, res) => {
  try {
    const horse = await Horse.findOne({
      _id: req.params.id,
      owner: req.auth!.userId,
    }).populate('race', 'name isPureBreed skills');

    if (!horse) {
      res.status(404).json({ message: 'Cheval introuvable.' });
      return;
    }
    res.status(200).json(horse);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// POST /api/horses — Ajouter un cheval
export const createHorse: RequestHandler = async (req, res) => {
  try {
    const { name, sex, raceId, step, blup } = req.body;

    if (!name || !sex || !raceId) {
      res.status(400).json({ message: 'Nom, sexe et race sont requis.' });
      return;
    }

    // Vérifier que la race existe
    const race = await Race.findById(raceId);
    if (!race) {
      res.status(404).json({ message: 'Race introuvable.' });
      return;
    }

    const horse = new Horse({
      name,
      sex,
      race: raceId,
      step: step ?? 'Naissance',
      blup: blup ?? 0,
      owner: req.auth!.userId,
    });

    await horse.save();
    await horse.populate('race', 'name isPureBreed skills');

    res.status(201).json(horse);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// PATCH /api/horses/:id — Modifier un cheval (nom, étape, BLUP, etc.)
export const updateHorse: RequestHandler = async (req, res) => {
  try {
    const horse = await Horse.findOneAndUpdate(
      { _id: req.params.id, owner: req.auth!.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('race', 'name isPureBreed skills');

    if (!horse) {
      res.status(404).json({ message: 'Cheval introuvable.' });
      return;
    }
    res.status(200).json(horse);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// DELETE /api/horses/:id — Supprimer un cheval
export const deleteHorse: RequestHandler = async (req, res) => {
  try {
    const horse = await Horse.findOneAndDelete({
      _id: req.params.id,
      owner: req.auth!.userId,
    });

    if (!horse) {
      res.status(404).json({ message: 'Cheval introuvable.' });
      return;
    }
    res.status(200).json({ message: 'Cheval supprimé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};