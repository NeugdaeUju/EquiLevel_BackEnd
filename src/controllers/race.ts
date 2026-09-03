import { RequestHandler } from 'express';
import Race from '../models/race';

// GET /api/races — Liste toutes les races
export const getAllRaces: RequestHandler = async (_req, res) => {
  try {
    const races = await Race.find().sort({ name: 1 });
    res.status(200).json(races);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// GET /api/races/:id — Détail d'une race
export const getRaceById: RequestHandler = async (req, res) => {
  try {
    const race = await Race.findById(req.params.id);
    if (!race) {
      res.status(404).json({ message: 'Race introuvable' });
      return;
    }
    res.status(200).json(race);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// POST /api/races — Créer une race
export const createRace: RequestHandler = async (req, res) => {
  try {
    const { name, isPureBreed, skills } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Le nom de la race est requis.' });
      return;
    }

    const race = new Race({ name, isPureBreed, skills });
    await race.save();
    res.status(201).json(race);
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).json({ message: 'Cette race existe déjà.' });
      return;
    }
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// PATCH /api/races/:id — Modifier une race (nom, skills)
export const updateRace: RequestHandler = async (req, res) => {
  try {
    const race = await Race.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!race) {
      res.status(404).json({ message: 'Race introuvable' });
      return;
    }
    res.status(200).json(race);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// DELETE /api/races/:id — Supprimer une race
export const deleteRace: RequestHandler = async (req, res) => {
  try {
    const race = await Race.findByIdAndDelete(req.params.id);
    if (!race) {
      res.status(404).json({ message: 'Race introuvable' });
      return;
    }
    res.status(200).json({ message: 'Race supprimée.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};