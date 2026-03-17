const express = require("express");
const app = express();

app.use(express.json());

const FIREBASE_URL = "https://vending-machine-3a10d-default-rtdb.asia-southeast1.firebasedatabase.app";
app.post("/webhook", async (req, res) => {

    const event = req.body;

    if(event.event === "payment.captured"){

        await fetch(`${FIREBASE_URL}/machine/MACHINE_01.json`, {
            method: "PUT" ,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "PAID" })
        });

        console.log("Payment successful");
    }

    res.send("Webhook received");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
