const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json()); // Allows JSON requests

// ✅ PostgreSQL Database Connection
const pool = new Pool({
    user: "postgres",          // PostgreSQL username
    host: "45.55.161.209",     // DigitalOcean Droplet's IP
    database: "weed_reviews",  // Database name
    password: "prevost8",      // PostgreSQL password
    port: 5432,                // Default PostgreSQL port
});

// ✅ GET route (fetch all reviews)
app.get("/reviews", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM weed_reviews ORDER BY review_date DESC");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Database query failed" });
    }
});

// ✅ POST route (save new review)
app.post("/reviews", async (req, res) => {
    try {
        console.log("Received data from frontend:", req.body); // ✅ Log received data

        const {
            strain, weedType, grower, growStyle, location, smokingDevice, thc,
            terpenes, terpenePercent, flowerColor, breakStyle, looks, taste, smell, overall,
            throatHitter, chestPuncher, headFeel, bodyFeel, tastedTerpsInhale, tastedTerpsExhale,
            notes, grandChampion, reviewedBy, date, previousRating
        } = req.body;

        const insertQuery = `
            INSERT INTO weed_reviews (
                strain, weed_type, grower, grow_style, location, smoking_instrument, 
                thc, known_terps, terps_percent, flower_color, break_style, 
                looks, taste_rating, smell_rating, overall_score, throat_hitter, chest_punch, head_feel, body_feel, 
                inhale_terps, exhale_terps, notes, grand_champ, reviewed_by, review_date, previous_rating
            ) VALUES (
                $1, $2, $3, $4, $5, $6, 
                $7, $8, $9, $10, $11, 
                $12, $13, $14, $15, $16, $17, $18, $19, 
                $20, $21, $22, $23, $24, $25, $26
            ) RETURNING *;
        `;

        const values = [
            strain, weedType, grower, JSON.stringify(growStyle), location, smokingDevice,
            thc, JSON.stringify(terpenes), terpenePercent, JSON.stringify(flowerColor), breakStyle,
            looks, taste, smell, overall, throatHitter, chestPuncher, headFeel, bodyFeel,
            JSON.stringify(tastedTerpsInhale), JSON.stringify(tastedTerpsExhale), notes, grandChampion,
            reviewedBy, date, previousRating
        ];

        const result = await pool.query(insertQuery, values);
        res.status(201).json({ message: "Review submitted!", review: result.rows[0] });

    } catch (err) {
        console.error("Database Insert Error:", err);
        res.status(500).json({ error: "Failed to save review" });
    }
});

// ✅ Start the server on port 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://45.55.161.209:${PORT}`);
});
