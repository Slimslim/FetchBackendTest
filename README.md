# 🧾 Receipt Processor API

This is a **Receipt Processing Web Service** that assigns points based on receipt details.

## 🚀 Features

-   Accepts receipt submissions via `POST /receipts/process`
-   Retrieves receipt points using `GET /receipts/{id}/points`
-   In-memory storage (no database required)
-   Implements various point calculation rules

---

# 🐳 Running the Receipt Processor API with Docker

This guide provides instructions to build and run the **Receipt Processor API** using Docker.

## 📦 Prerequisites

Ensure you have **Docker** installed on your system. You can download it from [Docker's official website](https://www.docker.com/get-started).

---

## 🚀 Building the Docker Image

Navigate to the **project directory** and run:

```sh
docker build -t receipt-processor .
```

This command will:

-   Use the `Dockerfile` to create an image for the Receipt Processor API.
-   Install all necessary dependencies inside the container.

---

## 🏃 Running the Docker Container

After building the image, start the application with:

```sh
docker run -p 3000:3000 receipt-processor
```

This will:

-   Run the app inside a Docker container.
-   Expose port **3000** to access the API.

The API should now be accessible at: **`http://localhost:3000`**

---

## 📡 Testing the API

After starting the container, you can test it using `curl` or Postman.

### **1️⃣ Submit a Receipt**

```sh
curl -X POST http://localhost:3000/receipts/process -H "Content-Type: application/json" -d '{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    { "shortDescription": "Mountain Dew 12PK", "price": "6.49" }
  ],
  "total": "35.00"
}'
```

#### ✅ Expected Response:

```json
{ "id": "some-uuid-here" }
```

### **2️⃣ Get Points for a Receipt**

```sh
curl -X GET http://localhost:3000/receipts/{id}/points
```

#### ✅ Example Response:

```json
{ "points": 32 }
```

---

## 📂 `.dockerignore` File (Recommended)

To prevent unnecessary files from being copied into the Docker image, ensure you have a `.dockerignore` file with:

```
node_modules
.env
.DS_Store
```

---

## 🛑 Stopping the Container

To stop the running container:

```sh
docker ps  # Find the container ID
docker stop <container_id>
```

---

## 🎯 Summary

| Command                                     | Description                     |
| ------------------------------------------- | ------------------------------- |
| `docker build -t receipt-processor .`       | Builds the Docker image         |
| `docker run -p 3000:3000 receipt-processor` | Runs the app inside a container |
| `docker ps`                                 | Lists running containers        |
| `docker stop <container_id>`                | Stops a running container       |

---

# 📦 Running the Receipt Processor API with Node.js

To run this project **without Docker**, follow these steps:

1️⃣ **Clone the repository:**

```sh
git clone https://github.com/<your-github-username>/FetchBackendTest.git
cd FetchBackendTest/server
```

2️⃣ **Install dependencies:**

```sh
npm install
```

3️⃣ **Start the server:**

```sh
npm run dev
```

📌 **Server runs on:** `http://localhost:3000`

---

# 📡 API Endpoints

### **1️⃣ Submit a Receipt**

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

---

### **2️⃣ Get Points for a Receipt**

**GET** `/receipts/{id}/points`

#### Example Response:

```json
{ "points": 32 }
```

---

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

---

## 🛠 Debugging Routes

For testing purposes, I included additional API routes:

| Method | Route            | Description                              |
| ------ | ---------------- | ---------------------------------------- |
| `GET`  | `/receipts/`     | Fetch all receipts stored in memory      |
| `GET`  | `/receipts/{id}` | Fetch full details of a specific receipt |

These are **not required** by the exercise but can help debug the system. You can ignore or remove them if not needed.

---

## ✅ Final Thoughts

This **Receipt Processor API** is designed to **efficiently process receipts and calculate points based on the defined rules.** The implementation supports **Node.js** and **Docker**, ensuring easy setup and testing.
