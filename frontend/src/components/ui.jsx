export function Badge({ children, color = "#6366f1", onClick, style }) {
  return (
    <span
      onClick={onClick}
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        background: `${color}18`,
        color,
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function IconBtn({ icon: Icon, label, onClick, active, size = 18, style }) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 8,
        border: `1px solid ${active ? "#6366f1" : "#e2e8f0"}`,
        background: active ? "#6366f1" : "#fff",
        color: active ? "#fff" : "#475569",
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        transition: "all .15s",
        ...style,
      }}
    >
      {Icon && <Icon size={size} />} {label}
    </button>
  );
}

export function ColorDot({ color, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: color,
        border: selected ? "3px solid #6366f1" : "2px solid #e2e8f0",
        cursor: "pointer",
      }}
    />
  );
}

export const labelStyle = { display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6 };
export const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 16 };
