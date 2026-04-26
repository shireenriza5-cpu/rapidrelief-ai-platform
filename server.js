/////////////////////////////////////////////
// 🚑 RAPID RELIEF - FINAL SERVER
/////////////////////////////////////////////

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend (IMPORTANT)
app.use(express.static(path.join(__dirname, "public")));

// In-memory database
let reports = [];

/////////////////////////////////////////////
// 📥 POST REPORT
/////////////////////////////////////////////

app.post("/api/report", (req, res) => {
    try {
        const { name, place, type, desc, userLocation } = req.body;

        // 🔴 Validation
        if (!name || !place || !type || !userLocation) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const newReport = {
            id: Date.now(),
            name,
            place,
            type,
            desc: desc || "",
            userLocation,
            status: "pending",   // pending → dispatched → completed
            createdAt: new Date()
        };

        reports.push(newReport);

        res.json({
            success: true,
            message: "Report submitted successfully",
            data: newReport
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

/////////////////////////////////////////////
// 📤 GET ALL REPORTS
/////////////////////////////////////////////

app.get("/api/reports", (req, res) => {
    res.json({
        success: true,
        count: reports.length,
        data: reports
    });
});

/////////////////////////////////////////////
// 🔍 FILTER BY TYPE (VERY USEFUL)
/////////////////////////////////////////////

app.get("/api/reports/:type", (req, res) => {
    const type = req.params.type;

    const filtered = reports.filter(r => r.type === type);

    res.json({
        success: true,
        count: filtered.length,
        data: filtered
    });
});

/////////////////////////////////////////////
// 🚓 UPDATE STATUS (DISPATCH SYSTEM)
/////////////////////////////////////////////

app.put("/api/report/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const report = reports.find(r => r.id === id);

    if (!report) {
        return res.status(404).json({
            success: false,
            message: "Report not found"
        });
    }

    report.status = status;

    res.json({
        success: true,
        message: "Status updated",
        data: report
    });
});

/////////////////////////////////////////////
// ❌ DELETE REPORT (OPTIONAL)
/////////////////////////////////////////////

app.delete("/api/report/:id", (req, res) => {
    const id = parseInt(req.params.id);

    reports = reports.filter(r => r.id !== id);

    res.json({
        success: true,
        message: "Report deleted"
    });
});

/////////////////////////////////////////////
// 🧠 HEALTH CHECK
/////////////////////////////////////////////

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime()
    });
});

/////////////////////////////////////////////
// 🚀 START SERVER
/////////////////////////////////////////////

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
