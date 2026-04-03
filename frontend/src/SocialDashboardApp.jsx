import { useMemo, useState } from "react";
import { BarChart3, Calendar, ChevronLeft, ChevronRight, Facebook, Instagram, Plus, Sparkles, Users, Edit3, Check } from "lucide-react";
import { ClientCard } from "./components/ClientCard";
import { NewClientForm } from "./components/NewClientForm";
import { PostDetail } from "./components/PostDetail";
import { IconBtn } from "./components/ui";
import { DAYS_IT, MONTHS_IT, PLATFORMS, COLOR_PALETTES, TONES, SECTORS } from "./constants/socialData";
import { generateId, generatePost, getDaysInMonth, getFirstDayOfMonth } from "./utils/postUtils";

const emptyClient = { name: "", sector: SECTORS[0], tone: TONES[0], target: "", description: "", palette: COLOR_PALETTES[0], instagram: "", facebook: "" };

export function SocialDashboardApp() {
  const [clients, setClients] = useState([]);
  const [activeClientId, setActiveClientId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("clients");
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [selectedPost, setSelectedPost] = useState(null);
  const [showNewClient, setShowNewClient] = useState(false);
  const [form, setForm] = useState(emptyClient);
  const [genConfig, setGenConfig] = useState({ days: 7, platforms: ["Instagram", "Facebook"], postsPerDay: 1 });
  const activeClient = clients.find((c) => c.id === activeClientId);

  const addClient = (client) => {
    const newClient = { ...client, id: generateId() };
    setClients((prev) => [...prev, newClient]);
    setActiveClientId(newClient.id);
    setShowNewClient(false);
    setForm(emptyClient);
    setView("calendar");
  };

  const deleteClient = (id) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    setPosts((prev) => prev.filter((p) => p.clientId !== id));
    if (activeClientId === id) setView("clients");
  };

  const generatePosts = () => {
    if (!activeClient) return;
    const newPosts = [];
    const startDate = new Date();
    for (let d = 0; d < genConfig.days; d += 1) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + d);
      const dateStr = date.toISOString().split("T")[0];
      for (let p = 0; p < genConfig.postsPerDay; p += 1) {
        genConfig.platforms.forEach((plat) => newPosts.push(generatePost(activeClient, dateStr, plat)));
      }
    }
    setPosts((prev) => [...prev.filter((p) => p.clientId !== activeClient.id), ...newPosts]);
    setView("calendar");
  };

  const updatePost = (postId, updates) => setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, ...updates } : p)));
  const deletePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    if (selectedPost?.id === postId) setSelectedPost(null);
  };

  const clientPosts = useMemo(() => posts.filter((p) => p.clientId === activeClientId), [posts, activeClientId]);
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(calYear, calMonth);
    const firstDay = getFirstDayOfMonth(calYear, calMonth);
    const days = [];
    for (let i = 0; i < firstDay; i += 1) days.push(null);
    for (let d = 1; d <= daysInMonth; d += 1) {
      const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      days.push({ day: d, posts: clientPosts.filter((p) => p.date === dateStr) });
    }
    return days;
  }, [calYear, calMonth, clientPosts]);

  const stats = useMemo(() => ({
    total: clientPosts.length,
    ig: clientPosts.filter((p) => p.platform === "Instagram").length,
    fb: clientPosts.filter((p) => p.platform === "Facebook").length,
    bozze: clientPosts.filter((p) => p.status === "bozza").length,
    approvati: clientPosts.filter((p) => p.status === "approvato").length,
    pubblicati: clientPosts.filter((p) => p.status === "pubblicato").length,
  }), [clientPosts]);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#f0f4ff 0%,#faf5ff 50%,#fff1f2 100%)", fontFamily: "Inter,-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <header style={{ background: "rgba(255,255,255,.85)", borderBottom: "1px solid #e2e8f0", padding: "12px 24px", display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}><Sparkles size={20} color="#6366f1" /><h1 style={{ margin: 0, fontSize: 18 }}>Social Post Generator</h1></div>
        <div style={{ display: "flex", gap: 8 }}>
          <IconBtn icon={Users} label="Clienti" onClick={() => setView("clients")} active={view === "clients"} />
          {activeClient && <IconBtn icon={Calendar} label="Calendario" onClick={() => setView("calendar")} active={view === "calendar"} />}
          {activeClient && <IconBtn icon={Sparkles} label="Genera" onClick={() => setView("generate")} active={view === "generate"} />}
        </div>
      </header>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
        {view === "clients" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ margin: 0 }}>I tuoi clienti</h2>
              <IconBtn icon={Plus} label="Nuovo cliente" onClick={() => setShowNewClient(true)} style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "#fff", border: "none" }} />
            </div>
            {showNewClient && <NewClientForm onSave={addClient} onCancel={() => setShowNewClient(false)} form={form} setForm={setForm} />}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 16 }}>
              {clients.map((client) => <ClientCard key={client.id} client={client} active={client.id === activeClientId} postCount={posts.filter((p) => p.clientId === client.id).length} onSelect={() => { setActiveClientId(client.id); setView("calendar"); }} onDelete={() => deleteClient(client.id)} />)}
            </div>
          </>
        )}

        {view === "calendar" && activeClient && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ margin: 0 }}>Calendario - {activeClient.name}</h2>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <IconBtn icon={ChevronLeft} onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } else setCalMonth(calMonth - 1); }} />
                <span style={{ minWidth: 140, textAlign: "center" }}>{MONTHS_IT[calMonth]} {calYear}</span>
                <IconBtn icon={ChevronRight} onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } else setCalMonth(calMonth + 1); }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12, marginBottom: 20 }}>
              {[{ label: "Totale", value: stats.total, color: "#6366f1", icon: BarChart3 }, { label: "Instagram", value: stats.ig, color: "#e1306c", icon: Instagram }, { label: "Facebook", value: stats.fb, color: "#1877f2", icon: Facebook }, { label: "Bozze", value: stats.bozze, color: "#f59e0b", icon: Edit3 }, { label: "Approvati", value: stats.approvati, color: "#10b981", icon: Check }, { label: "Pubblicati", value: stats.pubblicati, color: "#8b5cf6", icon: Sparkles }].map((s) => (
                <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 10 }}>
                  <s.icon size={18} color={s.color} />
                  <div><div>{s.value}</div><div style={{ fontSize: 11, color: "#94a3b8" }}>{s.label}</div></div>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
                {DAYS_IT.map((d) => <div key={d} style={{ padding: "10px 8px", textAlign: "center", fontSize: 12, borderBottom: "1px solid #f1f5f9" }}>{d}</div>)}
                {calendarDays.map((cell, i) => (
                  <div key={`${cell?.day || "x"}-${i}`} style={{ minHeight: 90, padding: 6, borderBottom: "1px solid #f8fafc", borderRight: i % 7 !== 6 ? "1px solid #f8fafc" : "none" }}>
                    {cell && <>
                      <div style={{ fontSize: 12, marginBottom: 4 }}>{cell.day}</div>
                      {cell.posts.map((post) => <div key={post.id} onClick={() => { setSelectedPost(post); setView("post-detail"); }} style={{ padding: "3px 6px", marginBottom: 2, borderRadius: 4, fontSize: 10, cursor: "pointer", background: post.platform === "Instagram" ? "#fce7f3" : "#dbeafe" }}>{post.platform === "Instagram" ? "📸" : "📘"} {post.type}</div>)}
                    </>}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {view === "generate" && activeClient && (
          <div style={{ maxWidth: 560, margin: "0 auto", background: "#fff", borderRadius: 16, padding: 32 }}>
            <h2>Genera post per {activeClient.name}</h2>
            <label>Quanti giorni?</label>
            <input type="range" min={1} max={30} value={genConfig.days} onChange={(e) => setGenConfig({ ...genConfig, days: +e.target.value })} style={{ width: "100%" }} />
            <label>Post per giorno</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>{[1, 2, 3].map((n) => <IconBtn key={n} label={`${n}`} onClick={() => setGenConfig({ ...genConfig, postsPerDay: n })} active={genConfig.postsPerDay === n} />)}</div>
            <label>Piattaforme</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>{PLATFORMS.map((p) => <IconBtn key={p} icon={p === "Instagram" ? Instagram : Facebook} label={p} active={genConfig.platforms.includes(p)} onClick={() => setGenConfig((prev) => ({ ...prev, platforms: prev.platforms.includes(p) ? prev.platforms.filter((x) => x !== p) : [...prev.platforms, p] }))} />)}</div>
            <button onClick={generatePosts} style={{ width: "100%", padding: "14px 0", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "#fff", fontWeight: 700 }}>Genera tutti i post</button>
          </div>
        )}

        {view === "post-detail" && selectedPost && <PostDetail post={selectedPost} client={activeClient} onBack={() => setView("calendar")} onUpdate={(updates) => { updatePost(selectedPost.id, updates); setSelectedPost({ ...selectedPost, ...updates }); }} onDelete={() => { deletePost(selectedPost.id); setView("calendar"); }} />}
      </div>
    </div>
  );
}
