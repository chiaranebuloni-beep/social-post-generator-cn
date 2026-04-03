import { COPY_TEMPLATES, HASHTAG_SETS, IMAGE_STYLES, POST_TYPES } from "../constants/socialData";

export function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

export function generatePost(client, date, platform) {
  const tone = client.tone || "Professionale";
  const templates = COPY_TEMPLATES[tone] || COPY_TEMPLATES.Professionale;
  const sector = client.sector || "Consulenza";
  const hashtags = [...(HASHTAG_SETS[sector] || HASHTAG_SETS.Consulenza)];
  const type = POST_TYPES[Math.floor(Math.random() * POST_TYPES.length)];
  const imgStyle = IMAGE_STYLES[Math.floor(Math.random() * IMAGE_STYLES.length)];
  const opening = templates.openings[Math.floor(Math.random() * templates.openings.length)];
  const cta = templates.ctas[Math.floor(Math.random() * templates.ctas.length)];
  const selectedHashtags = hashtags.sort(() => 0.5 - Math.random()).slice(0, 5 + Math.floor(Math.random() * 4));
  const brandHashtag = `#${client.name.replace(/\s+/g, "").toLowerCase()}`;

  const body =
    platform === "Instagram"
      ? `${opening}\n\n${client.description || "Contenuto personalizzato per il tuo brand."}\n\n${cta}\n\n${[brandHashtag, ...selectedHashtags].join(" ")}`
      : `${opening}\n\n${client.description || "Contenuto personalizzato per il tuo brand."}\n\n👉 ${cta}\n\n${selectedHashtags.slice(0, 4).join(" ")}`;

  return {
    id: generateId(),
    clientId: client.id,
    date,
    platform,
    type,
    body,
    imageStyle: imgStyle,
    imageSuggestion: `${imgStyle} — ${type} in stile ${tone.toLowerCase()} per ${sector.toLowerCase()}. Palette: ${client.palette?.name || "Minimal"}. Soggetto: legato a "${client.name}".`,
    hashtags: [brandHashtag, ...selectedHashtags],
    cta,
    status: "bozza",
  };
}
