import express from "express";
import dotenv from "dotenv";
import receiptRoutes from "./routes/receipt.routes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware configuration
app.use(express.json()); // Parse incoming JSON requests

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
});

// Routes
app.use("/receipts", receiptRoutes);

// Root endpoint
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API" });
});

// Start the server only if not in test mode
let server;
if (process.env.NODE_ENV !== "test") {
    server = app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
}

export { app, server };
