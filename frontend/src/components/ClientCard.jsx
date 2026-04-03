import { Trash2 } from "lucide-react";
import { Badge } from "./ui";

export function ClientCard({ client, active, postCount, onSelect, onDelete }) {
  return (
    <div onClick={onSelect} style={{ background: "#fff", borderRadius: 14, padding: 20, border: active ? "2px solid #6366f1" : "1px solid #e2e8f0", cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{client.name}</h3>
          <p style={{ margin: "4px 0 8px", fontSize: 12, color: "#94a3b8" }}>{client.sector}</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#cbd5e1" }}><Trash2 size={16} /></button>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        <Badge color="#6366f1">{client.tone}</Badge>
        {client.target && <Badge color="#10b981">{client.target.split(",")[0].trim().substring(0, 20)}</Badge>}
      </div>
      <div style={{ display: "flex", gap: 4 }}>{client.palette?.colors.map((c) => <div key={c} style={{ width: 16, height: 16, borderRadius: 4, background: c }} />)}</div>
      <div style={{ marginTop: 10, fontSize: 12, color: "#94a3b8" }}>{postCount} post generati</div>
    </div>
  );
}
