export default async function handler(req, res) {
  try {
    const response = await fetch("http://4.180.18.246:3000/analysis");
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error conectando al backend" });
  }
}
