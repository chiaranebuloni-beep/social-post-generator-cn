import { ChevronLeft, Clock, Hash, Image, Palette, Target, Trash2, Check, X } from "lucide-react";
import { useState } from "react";
import { Badge, IconBtn } from "./ui";

export function PostDetail({ post, client, onBack, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editBody, setEditBody] = useState(post.body);
  const statusColors = { bozza: "#f59e0b", approvato: "#10b981", pubblicato: "#8b5cf6" };

  return (
    <div>
      <IconBtn icon={ChevronLeft} label="Torna al calendario" onClick={onBack} style={{ marginBottom: 16 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Badge color={post.platform === "Instagram" ? "#e1306c" : "#1877f2"}>{post.platform}</Badge>
              <Badge color="#6366f1">{post.type}</Badge>
              <Badge color={statusColors[post.status]}>{post.status}</Badge>
            </div>
            <IconBtn icon={Trash2} label="Elimina" onClick={onDelete} style={{ color: "#ef4444", border: "1px solid #fecaca" }} />
          </div>
          <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}><Clock size={14} /> {post.date}</div>
          {editing ? (
            <div>
              <textarea value={editBody} onChange={(e) => setEditBody(e.target.value)} style={{ width: "100%", minHeight: 200, padding: 12, borderRadius: 10, border: "1px solid #e2e8f0" }} />
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <IconBtn icon={Check} label="Salva" onClick={() => { onUpdate({ body: editBody }); setEditing(false); }} style={{ background: "#6366f1", color: "#fff", border: "none" }} />
                <IconBtn icon={X} label="Annulla" onClick={() => { setEditBody(post.body); setEditing(false); }} />
              </div>
            </div>
          ) : <div onClick={() => setEditing(true)} style={{ whiteSpace: "pre-wrap", background: "#f8fafc", borderRadius: 12, padding: 20, border: "1px dashed #e2e8f0" }}>{post.body}</div>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}><Image size={16} color="#6366f1" /><h4 style={{ margin: 0 }}>Suggerimento immagine</h4></div>
            <div style={{ background: `linear-gradient(135deg, ${(client?.palette?.colors?.[0] || "#6366f1")}20, ${(client?.palette?.colors?.[1] || "#a855f7")}20)`, borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <Palette size={32} color={client?.palette?.colors?.[0] || "#6366f1"} />
            </div>
            <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>{post.imageSuggestion}</p>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}><Hash size={16} color="#6366f1" /><h4 style={{ margin: 0 }}>Hashtag</h4></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{post.hashtags.map((h) => <Badge key={h}>{h}</Badge>)}</div>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}><Target size={16} color="#10b981" /><h4 style={{ margin: 0 }}>Call to Action</h4></div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#10b981", margin: 0 }}>{post.cta}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
