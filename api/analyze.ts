import fetch from "node-fetch";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    res.status(500).json({ error: "Missing API_KEY in environment" });
    return;
  }

  const MODEL_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + API_KEY;

  try {
    // parse body (req.body is available for JSON in @vercel/node if content-type set)
    let body = req.body;
    if (!body || Object.keys(body).length === 0) {
      // fallback: read raw body
      body = await new Promise((resolve, reject) => {
        let data = "";
        req.on("data", chunk => data += chunk);
        req.on("end", () => {
          try { resolve(data ? JSON.parse(data) : {}); } catch(e) { resolve({}); }
        });
        req.on("error", err => reject(err));
      });
    }

    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (err) {
    console.error("Serverless error:", err);
    res.status(500).json({ error: "Serverless function error" });
  }
}
