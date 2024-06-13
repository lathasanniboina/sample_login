const express = require('express');
const router = express.Router();
const Creds = require('../models/cred');

// Read Request
router.get('/read-request', async (req, res) => {
    try {
        const creds = await Creds.find({});
        res.status(200).json(creds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Insert Request
router.post('/insert-request', async (req, res) => {
    const { email, password } = req.body;
    try {
        const newCred = new Creds({ email, password });
        newCred.save();
        res.status(201).json(newCred);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update Request
router.put('/update-request', async (req, res) => {
    const { email, password } = req.body;
    try {
        const updatedCred = await Creds.findOneAndUpdate({ email }, { password }, { new: true });
        if (updatedCred) {
            res.status(200).json(updatedCred);
        } else {
            res.status(404).json({ error: 'Email not found' });
        }
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ error: err.message });

    }
});

// Clear Request
router.delete('/clear-request', async (req, res) => {
    try {
        await Creds.deleteMany({});
        res.status(200).json({ message: 'All records deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Request
router.delete('/delete-request', async (req, res) => {
    const { email } = req.body;
    try {
        const deletedCred = await Creds.findOneAndDelete({ email });
        if (deletedCred) {
            res.status(200).json({ message: 'Record deleted' });
        } else {
            res.status(404).json({ error: 'Email not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read Filter Request
router.get('/readfilter-request', async (req, res) => {
    const filter = {};
    const { wordstart, wordend } = req.body; // Destructure the properties from req.body
    const filterlist = []; // Initialize filterlist
    console.log(wordstart)
    console.log(wordend)
    try {
        const creds = await Creds.find(filter);
        console.log("creds done")
        for (const doc of creds) {
            
            // Check if both wordstart and wordend are provided
            if (wordstart && wordend) {
                if (doc.email.startsWith(wordstart) && doc.email.endsWith(wordend)) {
                    console.log('Email starts with:', wordstart, 'and ends with:', wordend);
                    filterlist.push(doc); // Add to the list if both conditions are met
                    console.log(filterlist)
                }
            } else if (wordstart) { // Check if only wordstart is provided
                if (doc.email.startsWith(wordstart)) {
                    console.log('Email starts with:', wordstart);
                    filterlist.push(doc.password); // Add to the list if condition is met
                }
            } else if (wordend) { // Check if only wordend is provided
                if (doc.email.endsWith(wordend)) {
                    console.log('Email ends with:', wordend);
                    filterlist.push(doc.password); // Add to the list if condition is met
                }
            } else { // If neither wordstart nor wordend is provided, add all documents
                filterlist.push(doc);
            }
        }
        console.log("end")
        console.log(filterlist)
        res.status(200).json(filterlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
