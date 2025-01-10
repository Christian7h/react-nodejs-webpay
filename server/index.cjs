//src/index.cjs
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {
  Options,
  WebpayPlus,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  Environment,
} = require("transbank-sdk");

dotenv.config();

const app = express();
app.use(cors({
  origin: '*',
}));
app.use(express.json());

// Configura la transacción con el entorno adecuado de integración
const tx = new WebpayPlus.Transaction(
  new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  )
);

app.post("/api/create-transaction", async (req, res) => {
  try {
    const {amount}  = req.body;
    const buyOrder = Date.now().toString();
    const sessionId = Date.now().toString();
    const returnUrl = "https://react-nodejs-webpay.netlify.app/success"; // Asegúrate de que esta URL esté registrada en el portal de Transbank

    console.log("Creating transaction with:", {
      buyOrder,
      sessionId,
      amount,
      returnUrl,
    });

const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
console.log('Transbank response:', response);

if (response.url) {
  res.json({ url: response.url, token: response.token });
} else {
  throw new Error('No redirection URL received from Webpay');
}
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Error creating transaction" });
  }
});

app.post("/api/confirm-transaction", async (req, res) => {
  try {
    const { token } = req.body;
    const response = await tx.commit(token);
    res.json(response);
  } catch (error) {
    console.error("Error confirming transaction:", error);
    res.status(500).json({ error: "Error confirming transaction" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
