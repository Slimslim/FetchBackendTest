import { Receipt, Item } from "../model/receipt.model.js";
import { calculateTotalPoints } from "../services/receipt.services.js";

const receipts = new Map(); // Temporary in-memory storage

const submitReceipt = async (req, res) => {
    // Example request body:
    // {
    //     "retailer": "Target",
    //     "purchaseDate": "2022-01-02",
    //     "purchaseTime": "13:13",
    //     "total": "1.25",
    //     "items": [
    //         {"shortDescription": "Pepsi - 12-oz", "price": "1.25"}
    //         {"shortDescription": "Dasani", "price": "1.40"}
    //     ]
    // }

    const { retailer, purchaseDate, purchaseTime, total, items } = req.body;
    try {
        const arrayOfItems = [];

        for (const item of items) {
            if (!item.shortDescription || !item.price) {
                return res.status(400).json({ message: "Invalid item format" });
            }
            arrayOfItems.push(new Item(item.shortDescription, item.price));
        }

        const receipt = new Receipt(
            retailer,
            purchaseDate,
            purchaseTime,
            arrayOfItems,
            total
        );

        // Calculate points
        receipt.points = calculateTotalPoints(receipt);

        receipts.set(receipt.id, receipt);

        // console.log(receipt);
        // console.log("All receipts saved: ", receipts);
        return res.status(200).json({ id: receipt.id });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getAllReceipts = async (req, res) => {
    try {
        return res.status(200).json(receipts);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getReceiptById = async (req, res) => {
    try {
        const receiptId = req.params.id;
        const receipt = receipts.get(receiptId);

        // console.log("Id received: ", receiptId);
        // console.log("Receipt: ", receipt);

        if (!receipt) {
            return res.status(404).json({ message: "Receipt not found" });
        }

        return res.status(200).json(receipt);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getPointsId = async (req, res) => {
    try {
        const receiptId = req.params.id;
        const receipt = receipts.get(receiptId);
        return res.status(200).json({ points: receipt.points });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export { submitReceipt, getAllReceipts, getReceiptById, getPointsId };
