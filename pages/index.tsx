// @ts-nocheck
import { useEffect, useState } from "react";

export default function Home() {
  const [intelligence, setIntelligence] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
    
  const API = "/api";
  useEffect(() => {
    fetch(`${API}/intelligence`)
      .then(res => res.json())
      .then(data => setIntelligence(data))
      .catch(err => console.error(err));
  }, []);

  async function handleQuery() {
    try {
      const res = await fetch(`${API}/ai/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Error consultando la IA");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🧠 Centro de Inteligencia Medellín</h1>

      <div style={{ marginBottom: 30 }}>
        <h2>🔍 Consulta</h2>

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ej: ¿Qué está pasando en Medellín?"
          style={{ width: "70%", padding: 10 }}
        />

        <button onClick={handleQuery} style={{ padding: 10 }}>
          Consultar
        </button>

        <pre style={{ marginTop: 10 }}>{answer}</pre>
      </div>

      <div>
        <h2>🚨 Alertas recientes</h2>

        {intelligence.slice(0, 10).map((item: any, i: number) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10
            }}
          >
            <h3>{item.titulo}</h3>
            <p>{item.contenido}</p>
            <small>{item.categoria}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
