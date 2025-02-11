import crypto from "crypto";

class Item {
    constructor(shortDescription, price) {
        if (!shortDescription || typeof shortDescription !== "string") {
            throw new Error("Invalid or missing shortDescription");
        }
        if (!/^[\w\s\-]+$/.test(shortDescription.trim())) {
            throw new Error("Invalid shortDescription format");
        }
        if (!price || !/^\d+\.\d{2}$/.test(price)) {
            throw new Error("Invalid or missing price (must be XX.XX)");
        }

        this.shortDescription = shortDescription.trim(); // Remove extra spaces
        this.price = price;
    }
}

class Receipt {
    constructor(retailer, purchaseDate, purchaseTime, items, total) {
        if (!retailer || typeof retailer !== "string") {
            console.log("Retailer name is required");
            throw new Error("Retailer name is required");
        }
        if (!purchaseDate || !/^\d{4}-\d{2}-\d{2}$/.test(purchaseDate)) {
            throw new Error(
                "Invalid or missing purchaseDate (must be YYYY-MM-DD)"
            );
        }
        if (!purchaseTime || !/^\d{2}:\d{2}$/.test(purchaseTime)) {
            throw new Error("Invalid or missing purchaseTime (must be HH:MM)");
        }
        if (!total || !/^\d+\.\d{2}$/.test(total)) {
            throw new Error("Invalid or missing total (must be XX.XX)");
        }
        if (!Array.isArray(items) || items.length < 1) {
            throw new Error("At least 1 irem is required in the items array");
        }

        this.id = crypto.randomUUID();
        this.retailer = retailer;
        this.purchaseDate = purchaseDate;
        this.purchaseTime = purchaseTime;
        this.items = items.map((item) => {
            if (!(item instanceof Item)) {
                return new Item(item.shortDescription, item.price); // Convert plain objects to Item instances
            }
            return item;
        });
        this.total = total;
        this.points = 0;
    }
}

export { Receipt, Item };
