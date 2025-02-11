export const calculateTotalPoints = (receipt) => {
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
    let points = 0;
    const { retailer, purchaseDate, purchaseTime, total, items } = receipt;

    if (retailer !== "") {
        // console.log(
        //     "Calculating points for receipt for receipt id: ",
        //     receipt.id
        // );
        // One point for every alphanumeric character in the retailer name.
        // console.log("Retailer: ", retailer.split(""));
        retailer.split("").forEach((char) => {
            // console.log("Char: ", char);
            if (/^[a-z0-9]+$/i.test(char)) {
                points++;
            }
        });
    }

    // console.log("Retailer points: ", points);

    // 50 points if the total is a round dollar amount with no cents.
    if (Number(total) % 1 === 0) points += 50;
    // console.log("Round Dollar amount: ", points);

    // 25 points if the total is a multiple of 0.25.
    if (Number(total) % 0.25 === 0) points += 25;
    //console.log("Multiple of 0.25: ", points);

    // 5 points for every two items on the receipt.
    points += Math.floor(items.length / 2) * 5;
    //console.log("Items points: ", points);

    // If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
    for (const item of items) {
        if (item.shortDescription.trim().split("").length % 3 === 0) {
            points += Math.ceil(Number(item.price * 0.2));
            //console.log("Item description points: ", points);
        }
    }
    // 6 points if the day in the purchase date is odd.
    // avoid time zone issue by splitting the date string and converting to number
    if (Number(purchaseDate.split("-")[2]) % 2 !== 0) points += 6;
    //console.log("Date points: ", points);

    // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
    // Convert to minutes for easier comparison
    const [hours, minutes] = purchaseTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    if (totalMinutes > 840 && totalMinutes < 960) points += 10;
    //console.log("Time points: ", points);

    return points;
};
