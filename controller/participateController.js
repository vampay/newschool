const express = require("express");
const Participate = require("../models/participate");

// Get all participants without populated school data
exports.getParticipate = async (req, res) => {
    try {
        // Fetch all participants without school data
        const participates = await Participate.find();
        res.status(200).json(participates);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch participants', error: error.message });
    }
};

// Get a specific participant by ID without populated school data
exports.getParticipateID = async (req, res) => {
    try {
        const { id } = req.params;
        // Fetch participant by ID without school data
        const participate = await Participate.findById(id);
        if (participate) {
            res.status(200).json(participate);
        } else {
            res.status(404).json({ message: 'Participate not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch participant', error: error.message });
    }
};

// Create a new participant without school_id
exports.postParticipate = async (req, res) => {
    try {
        const { name, surname, major, Boarding_point } = req.body;

        // Validate required fields
        if (!name || !surname || !major || !Boarding_point) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const participate = new Participate({ name, surname, major, Boarding_point });
        const savedParticipate = await participate.save();
        res.status(201).json(savedParticipate);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create participant', error: error.message });
    }
};

// Update a participant without updating school_id
exports.updateParticipate = async (req, res) => {
    try {
        const { id } = req.params;
        const participate = await Participate.findById(id);

        if (!participate) {
            return res.status(404).json({ message: 'Participate not found' });
        }

        const { name, surname, major, Boarding_point } = req.body;

        // Update only the provided fields
        if (name) participate.name = name;
        if (surname) participate.surname = surname;
        if (major) participate.major = major;
        if (Boarding_point) participate.Boarding_point = Boarding_point;

        const updatedParticipate = await participate.save();
        res.status(200).json(updatedParticipate);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update participant', error: error.message });
    }
};

// Delete a participant
exports.deleteParticipate = async (req, res) => {
    try {
        const { id } = req.params;
        const participate = await Participate.findById(id);

        if (!participate) {
            return res.status(404).json({ message: 'Participate not found' });
        }

        await Participate.findByIdAndDelete(id);
        res.status(200).json({ message: 'Participate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete participant', error: error.message });
    }
};
