import { Check, X } from "lucide-react";
import { COLOR_PALETTES, SECTORS, TONES } from "../constants/socialData";
import { ColorDot, IconBtn, inputStyle, labelStyle } from "./ui";

export function NewClientForm({ onSave, onCancel, form, setForm }) {
  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0", marginBottom: 20 }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 700, color: "#1e293b" }}>Nuovo cliente</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
        <div><label style={labelStyle}>Nome brand *</label><input style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} /></div>
        <div><label style={labelStyle}>Settore</label><select style={inputStyle} value={form.sector} onChange={(e) => set("sector", e.target.value)}>{SECTORS.map((s) => <option key={s}>{s}</option>)}</select></div>
        <div><label style={labelStyle}>Tono di voce</label><select style={inputStyle} value={form.tone} onChange={(e) => set("tone", e.target.value)}>{TONES.map((t) => <option key={t}>{t}</option>)}</select></div>
        <div><label style={labelStyle}>Target</label><input style={inputStyle} value={form.target} onChange={(e) => set("target", e.target.value)} /></div>
        <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Descrizione</label><textarea style={{ ...inputStyle, height: 70 }} value={form.description} onChange={(e) => set("description", e.target.value)} /></div>
        <div><label style={labelStyle}>Instagram</label><input style={inputStyle} value={form.instagram} onChange={(e) => set("instagram", e.target.value)} /></div>
        <div><label style={labelStyle}>Facebook</label><input style={inputStyle} value={form.facebook} onChange={(e) => set("facebook", e.target.value)} /></div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Palette colori</label>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            {COLOR_PALETTES.map((pal) => (
              <div key={pal.name} onClick={() => set("palette", pal)} style={{ cursor: "pointer", padding: 8, borderRadius: 10, border: form.palette.name === pal.name ? "2px solid #6366f1" : "2px solid transparent", background: form.palette.name === pal.name ? "#eef2ff" : "#f8fafc" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>{pal.colors.map((c) => <ColorDot key={c} color={c} selected={false} />)}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textAlign: "center" }}>{pal.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <IconBtn icon={X} label="Annulla" onClick={onCancel} />
        <IconBtn icon={Check} label="Salva cliente" onClick={() => form.name.trim() && onSave(form)} style={{ background: "#6366f1", color: "#fff", border: "none", opacity: form.name.trim() ? 1 : 0.5 }} />
      </div>
    </div>
  );
}
