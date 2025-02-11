# 🧾 Receipt Processor API

This is a **Receipt Processing Web Service** that assigns points based on receipt details.

## 🚀 Features

-   Accepts receipt submissions via a `POST /receipts/process` endpoint.
-   Retrieves receipt points using `GET /receipts/{id}/points`.
-   In-memory storage (no database required).
-   Implements various point calculation rules.

## 📦 Installation & Setup

To run this project locally:

1. Clone the repository:

    ```sh
    git clone https://github.com/<your-github-username>/FetchBackendTest.git
    cd FetchBackendTest
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    npm run dev
    ```

Server runs on **`http://localhost:3000`**.

## 📡 API Endpoints

### 1️⃣ **Submit a Receipt**

**POST** `/receipts/process`

#### Example Request Body:

```json
{
    "retailer": "Target",
    "purchaseDate": "2022-01-01",
    "purchaseTime": "13:01",
    "items": [
        { "shortDescription": "Mountain Dew 12PK", "price": "6.49" },
        { "shortDescription": "Emils Cheese Pizza", "price": "12.25" }
    ],
    "total": "35.00"
}
```

#### Example Response:

```json
{ "id": "7fb1377b-b223-49d9-a31a-5a02701dd310" }
```

### 2️⃣ **Get Points for a Receipt**

**GET** `/receipts/{id}/points`

#### Example Response:

```json
{ "points": 32 }
```

## 🔢 How Points Are Calculated

| Rule                                                                | Points Awarded |
| ------------------------------------------------------------------- | -------------- |
| 1 point per alphanumeric character in the retailer name             | ✅             |
| 50 points if `total` is a round dollar amount                       | ✅             |
| 25 points if `total` is a multiple of `0.25`                        | ✅             |
| 5 points for every two items                                        | ✅             |
| Item description length is a multiple of 3 → `(price * 0.2)` points | ✅             |
| 6 points if the purchase date is **odd**                            | ✅             |
| 10 points if purchase time is **between 2:00PM - 4:00PM**           | ✅             |

## 🛠 Debugging Routes

For testing purposes, I included additional API routes:

| Method | Route            | Description                              |
| ------ | ---------------- | ---------------------------------------- |
| `GET`  | `/receipts/`     | Fetch all receipts stored in memory      |
| `GET`  | `/receipts/{id}` | Fetch full details of a specific receipt |

These are **not required** by the exercise but can help debug the system. You can ignore or remove them if not needed.
