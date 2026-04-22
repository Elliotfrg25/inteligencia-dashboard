export default async function handler(req, res) {
  try {
    const response = await fetch("http://4.180.18.246:3000/ai/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Error IA" });
  }
}
