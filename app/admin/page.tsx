"use client";

import { useEffect, useState } from "react";

type Sections =
  | "profile"
  | "about"
  | "experiences"
  | "projects"
  | "skills"
  | "education"
  | "certifications"
  | "contact";

type Content = Awaited<ReturnType<typeof fetchContent>>;

async function fetchContent() {
  const r = await fetch("/api/content");
  return r.json();
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [setupSecret, setSetupSecret] = useState("");
  const [isSetup, setIsSetup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [content, setContent] = useState<Content | null>(null);
  const [active, setActive] = useState<Sections>("profile");
  const [savedToast, setSavedToast] = useState("");
  const [draft, setDraft] = useState<any>(null);

  useEffect(() => {
    const t = document.cookie
      .split("; ")
      .find((c) => c.startsWith("admin_token="))
      ?.split("=")[1];
    if (t) setToken(t);
    fetchContent().then((c) => {
      setContent(c);
      setDraft(JSON.parse(JSON.stringify({
        profile: c.profile,
        about: c.about,
        experiences: c.experiences,
        projects: c.projects,
        skillGroups: c.skillGroups,
        education: c.education,
        certifications: c.certifications,
        contact: c.contact,
      })));
      setLoading(false);
    });
  }, []);

  const saveDraft = (updater: (d: any) => any) => {
    setDraft((prev: any) => {
      const next = updater(JSON.parse(JSON.stringify(prev)));
      return next;
    });
  };

  const handleSubmitAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const url = isSetup ? "/api/admin/setup" : "/api/admin/login";
    const body: any = isSetup
      ? { username, password, secret: setupSecret || undefined }
      : { username, password };
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await r.json();
    if (!json.ok) {
      setLoginError(json.error || "Erreur");
      return;
    }
    setToken(json.token);
  };

  const logout = () => {
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setToken(null);
  };

  const save = async (section: string, data: any) => {
    const r = await fetch("/api/admin/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ section, data }),
    });
    const json = await r.json();
    if (!json.ok) {
      setSavedToast("❌ Erreur : " + (json.error || "inconnue"));
    } else {
      setSavedToast(`✅ Section "${section}" sauvegardée`);
      setContent(await fetchContent());
    }
    setTimeout(() => setSavedToast(""), 2500);
  };

  if (loading || !content || !draft) {
    return <div className="admin-shell"><div className="admin-card">Chargement…</div></div>;
  }

  if (!token) {
    return (
      <div className="admin-shell">
        <div className="admin-card admin-auth">
          <h1>{isSetup ? "Créer un compte admin" : "Connexion Admin"}</h1>
          <form onSubmit={handleSubmitAuth}>
            <label>Identifiant
              <input value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="admin" />
            </label>
            <label>Mot de passe
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </label>
            {isSetup && (
              <label>Secret de setup (ADMIN_SETUP_SECRET, optionnel si 1er admin)
                <input value={setupSecret} onChange={(e) => setSetupSecret(e.target.value)} placeholder="laisser vide si premier admin" />
              </label>
            )}
            {loginError && <div className="admin-err">{loginError}</div>}
            <button type="submit" className="admin-btn-primary">
              {isSetup ? "Créer & se connecter" : "Se connecter"}
            </button>
            <button
              type="button"
              className="admin-btn-ghost"
              onClick={() => { setIsSetup(!isSetup); setLoginError(""); }}
            >
              {isSetup ? "← Retour connexion" : "Première utilisation ? Créer un admin"}
            </button>
            <a className="admin-home-link" href="/">← Retour au portfolio</a>
          </form>
        </div>
        <style>{adminStyles}</style>
      </div>
    );
  }

  const sections: { id: Sections; label: string }[] = [
    { id: "profile", label: "Identité" },
    { id: "about", label: "À propos" },
    { id: "experiences", label: "Expériences" },
    { id: "projects", label: "Projets" },
    { id: "skills", label: "Compétences" },
    { id: "education", label: "Formation" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="admin-side-header">
          <div className="admin-logo">YL<span>ADMIN</span></div>
          <button className="admin-logout" onClick={logout}>Déconnexion</button>
        </div>
        <nav className="admin-nav">
          {sections.map((s) => (
            <button key={s.id}
              className={active === s.id ? "is-active" : ""}
              onClick={() => setActive(s.id)}>{s.label}</button>
          ))}
        </nav>
        <a href="/" className="admin-back">← Voir le site</a>
      </aside>

      <main className="admin-main">
        <header className="admin-main-header">
          <h2>{sections.find((s) => s.id === active)?.label}</h2>
          {savedToast && <div className="admin-toast">{savedToast}</div>}
        </header>

        <section className="admin-panel">
          {active === "profile" && (
            <Section save={() => save("profile", draft.profile)}>
              <Field label="Nom complet">
                <input value={draft.profile.name}
                  onChange={(e) => saveDraft((d: any) => { d.profile.name = e.target.value; return d; })} />
              </Field>
              <Field label="Avatar (chemin /xxx.jpg)">
                <input value={draft.profile.avatar}
                  onChange={(e) => saveDraft((d: any) => { d.profile.avatar = e.target.value; return d; })} />
              </Field>
              <Field label="Résumé (sous le titre)">
                <textarea rows={3} value={draft.profile.summary}
                  onChange={(e) => saveDraft((d: any) => { d.profile.summary = e.target.value; return d; })} />
              </Field>
              <Field label="Email">
                <input value={draft.profile.email}
                  onChange={(e) => saveDraft((d: any) => { d.profile.email = e.target.value; return d; })} />
              </Field>
              <Field label="LinkedIn URL">
                <input value={draft.profile.linkedin}
                  onChange={(e) => saveDraft((d: any) => { d.profile.linkedin = e.target.value; return d; })} />
              </Field>
              <Field label="GitHub URL">
                <input value={draft.profile.github}
                  onChange={(e) => saveDraft((d: any) => { d.profile.github = e.target.value; return d; })} />
              </Field>
              <Field label={`Rôles (rotatifs) — ${draft.profile.roles.length} éléments`}>
                <textarea
                  value={draft.profile.roles.join("\n")}
                  onChange={(e) =>
                    saveDraft((d: any) => {
                      d.profile.roles = e.target.value.split("\n").map((s: string) => s.trim()).filter(Boolean);
                      return d;
                    })
                  }
                  placeholder={"Un rôle par ligne\nex: AI Engineer\nBackend Developer"}
                />
              </Field>
            </Section>
          )}

          {active === "about" && (
            <Section save={() => save("about", draft.about)}>
              <Field label="Paragraphes (un par saut de ligne, accepte du HTML comme <strong>)">
                <textarea rows={10} value={draft.about.paragraphs.join("\n\n")}
                  onChange={(e) => saveDraft((d: any) => {
                    d.about.paragraphs = e.target.value.split(/\n\n+/).map((s: string) => s.trim()).filter(Boolean);
                    return d;
                  })} />
              </Field>
            </Section>
          )}

          {active === "experiences" && (
            <ListEditor
              items={draft.experiences}
              onUpdate={(next: any[]) => saveDraft((d: any) => { d.experiences = next; return d; })}
              save={() => save("experiences", draft.experiences)}
              renderItem={(item, setItem, _i, del) => (
                <>
                  <MiniField label="Date">
                    <input value={item.time} onChange={(e) => setItem({ ...item, time: e.target.value })} />
                  </MiniField>
                  <MiniField label="Titre">
                    <input value={item.title} onChange={(e) => setItem({ ...item, title: e.target.value })} />
                  </MiniField>
                  <MiniField label="Entreprise / Lieu">
                    <input value={item.company} onChange={(e) => setItem({ ...item, company: e.target.value })} />
                  </MiniField>
                  <MiniField label="Points (un par ligne)">
                    <textarea rows={5} value={(item.bullets || []).join("\n")}
                      onChange={(e) => setItem({ ...item, bullets: e.target.value.split("\n").map((s: string) => s.trim()).filter(Boolean) })} />
                  </MiniField>
                  {del}
                </>
              )}
            />
          )}

          {active === "projects" && (
            <ListEditor
              items={draft.projects}
              onUpdate={(next: any[]) => saveDraft((d: any) => { d.projects = next; return d; })}
              save={() => save("projects", draft.projects)}
              renderItem={(item, setItem, _i, del) => (
                <>
                  <MiniField label="Titre">
                    <input value={item.title} onChange={(e) => setItem({ ...item, title: e.target.value })} />
                  </MiniField>
                  <MiniField label="Description">
                    <textarea rows={4} value={item.body} onChange={(e) => setItem({ ...item, body: e.target.value })} />
                  </MiniField>
                  <MiniField label="Tags (séparés par des virgules)">
                    <input value={(item.tags || []).join(", ")}
                      onChange={(e) => setItem({ ...item, tags: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })} />
                  </MiniField>
                  <MiniField label="Note (type 'Projet · 2025')">
                    <input value={item.note} onChange={(e) => setItem({ ...item, note: e.target.value })} />
                  </MiniField>
                  {del}
                </>
              )}
            />
          )}

          {active === "skills" && (
            <ListEditor
              items={draft.skillGroups}
              onUpdate={(next: any[]) => saveDraft((d: any) => { d.skillGroups = next; return d; })}
              save={() => save("skill_groups", draft.skillGroups)}
              renderItem={(item, setItem, _i, del) => (
                <>
                  <MiniField label="Nom du groupe (en majuscules)">
                    <input value={item.label} onChange={(e) => setItem({ ...item, label: e.target.value })} />
                  </MiniField>
                  <MiniField label="Compétences (séparées par des virgules)">
                    <input value={(item.tags || []).join(", ")}
                      onChange={(e) => setItem({ ...item, tags: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })} />
                  </MiniField>
                  {del}
                </>
              )}
            />
          )}

          {active === "education" && (
            <ListEditor
              items={draft.education}
              onUpdate={(next: any[]) => saveDraft((d: any) => { d.education = next; return d; })}
              save={() => save("education", draft.education)}
              renderItem={(item, setItem, _i, del) => (
                <>
                  <MiniField label="Diplôme">
                    <input value={item.title} onChange={(e) => setItem({ ...item, title: e.target.value })} />
                  </MiniField>
                  <MiniField label="Lieu / École">
                    <input value={item.place} onChange={(e) => setItem({ ...item, place: e.target.value })} />
                  </MiniField>
                  <MiniField label="Dates">
                    <input value={item.time} onChange={(e) => setItem({ ...item, time: e.target.value })} />
                  </MiniField>
                  {del}
                </>
              )}
            />
          )}

          {active === "certifications" && (
            <ListEditor
              items={draft.certifications}
              onUpdate={(next: any[]) => saveDraft((d: any) => { d.certifications = next; return d; })}
              save={() => save("certifications", draft.certifications)}
              renderItem={(item, setItem, _i, del) => (
                <>
                  <MiniField label="Nom de la certification">
                    <input value={item.title} onChange={(e) => setItem({ ...item, title: e.target.value })} />
                  </MiniField>
                  <MiniField label="Organisme">
                    <input value={item.place} onChange={(e) => setItem({ ...item, place: e.target.value })} />
                  </MiniField>
                  <MiniField label="Année">
                    <input value={item.time} onChange={(e) => setItem({ ...item, time: e.target.value })} />
                  </MiniField>
                  {del}
                </>
              )}
            />
          )}

          {active === "contact" && (
            <Section save={() => save("contact", draft.contact)}>
              <Field label="Texte d'accroche">
                <textarea rows={3} value={draft.contact.intro}
                  onChange={(e) => saveDraft((d: any) => { d.contact.intro = e.target.value; return d; })} />
              </Field>
              <Field label="Placeholder de l'input email">
                <input value={draft.contact.placeholder}
                  onChange={(e) => saveDraft((d: any) => { d.contact.placeholder = e.target.value; return d; })} />
              </Field>
              <Field label="Texte du bouton">
                <input value={draft.contact.button}
                  onChange={(e) => saveDraft((d: any) => { d.contact.button = e.target.value; return d; })} />
              </Field>
              <Field label="Message de succès après envoi">
                <textarea rows={3} value={draft.contact.success}
                  onChange={(e) => saveDraft((d: any) => { d.contact.success = e.target.value; return d; })} />
              </Field>
            </Section>
          )}
        </section>
      </main>
      <style>{adminStyles}</style>
    </div>
  );
}

function Section({ children, save }: { children: React.ReactNode; save: () => void }) {
  return (
    <div className="admin-section-form">
      {children}
      <div className="admin-actions">
        <button className="admin-btn-primary" onClick={save}>💾 Sauvegarder cette section</button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="admin-field"><span>{label}</span>{children}</label>;
}

function MiniField({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="admin-mini"><span>{label}</span>{children}</label>;
}

function ListEditor({
  items,
  onUpdate,
  save,
  renderItem,
}: {
  items: any[];
  onUpdate: (next: any[]) => void;
  save: () => void;
  renderItem: (item: any, setItem: (v: any) => void, index: number, delBtn: React.ReactNode) => React.ReactNode;
}) {
  const setItem = (i: number, v: any) => {
    const next = [...items];
    next[i] = v;
    next.forEach((x, k) => (x.sort = k));
    onUpdate(next);
  };
  const add = () => {
    const base = Object.keys(items[0] || {}).reduce((acc: any, k) => {
      if (k === "sort") return acc;
      acc[k] = Array.isArray((items[0] || {})[k]) ? [] : "";
      return acc;
    }, {});
    const next = [...items, { ...base, sort: items.length }];
    onUpdate(next);
  };
  const del = (i: number) => {
    const next = items.filter((_, k) => k !== i);
    next.forEach((x, k) => (x.sort = k));
    onUpdate(next);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    next.forEach((x, k) => (x.sort = k));
    onUpdate(next);
  };
  return (
    <div>
      <div className="admin-list">
        {items.map((item, i) => (
          <div key={item.id || i} className="admin-list-item">
            <div className="admin-list-head">
              <strong>#{i + 1}</strong>
              <div className="admin-list-move">
                <button className="admin-btn-ghost" onClick={() => move(i, -1)}>↑</button>
                <button className="admin-btn-ghost" onClick={() => move(i, 1)}>↓</button>
              </div>
            </div>
            {renderItem(
              item,
              (v) => setItem(i, v),
              i,
              <div className="admin-list-del">
                <button className="admin-btn-danger" onClick={() => del(i)}>🗑️ Supprimer</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="admin-actions">
        <button className="admin-btn-ghost" onClick={add}>+ Ajouter un élément</button>
        <button className="admin-btn-primary" onClick={save}>💾 Sauvegarder cette liste</button>
      </div>
    </div>
  );
}

const adminStyles = `
.admin-shell{min-height:100vh;background:#0b1522;color:#dfe7f0;font-family:Manrope,system-ui,sans-serif;display:grid;grid-template-columns:240px 1fr}
.admin-auth{max-width:440px;margin:8vh auto;padding:32px;border-radius:12px;background:#102033;border:1px solid #1e3149}
.admin-auth h1{margin:0 0 20px;font-size:20px;color:#8ab0dc}
.admin-auth form{display:flex;flex-direction:column;gap:14px}
.admin-auth label{display:flex;flex-direction:column;gap:6px;font-size:12px;color:#8fa3b8}
.admin-auth input,.admin-field input,.admin-field textarea,.admin-mini input,.admin-mini textarea{background:#07121d;border:1px solid #1e3149;border-radius:6px;color:#e8edf1;padding:8px 10px;font-size:13px;font-family:inherit;outline:none}
.admin-auth input:focus,.admin-field input:focus,.admin-field textarea:focus,.admin-mini input:focus,.admin-mini textarea:focus{border-color:#5a7fb5}
.admin-btn-primary{background:#5a7fb5;color:#07151e;border:0;border-radius:6px;padding:10px 14px;font-weight:700;cursor:pointer;font-size:13px}
.admin-btn-primary:hover{background:#6a95cf}
.admin-btn-ghost{background:transparent;color:#8ab0dc;border:1px solid #2f4f7a;border-radius:6px;padding:8px 12px;cursor:pointer;font-size:12px;font-weight:600}
.admin-btn-ghost:hover{background:#15263e;border-color:#6a95cf;color:#fff}
.admin-btn-danger{background:#3a1e1e;color:#f2a7a7;border:1px solid #6a2f2f;border-radius:6px;padding:6px 10px;cursor:pointer;font-size:11px;font-weight:700}
.admin-btn-danger:hover{background:#4b2525}
.admin-err{background:#3a1e1e;color:#f2a7a7;border:1px solid #6a2f2f;border-radius:6px;padding:8px 10px;font-size:12px}
.admin-home-link{color:#8ab0dc;font-size:12px;text-align:center;text-decoration:none;margin-top:8px}
.admin-side{background:#0d1b2d;border-right:1px solid #1e3149;padding:20px 0;position:sticky;top:0;height:100vh}
.admin-side-header{padding:0 18px 18px;border-bottom:1px solid #1e3149;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between}
.admin-logo{font-weight:800;color:#eaf3ff;letter-spacing:-.02em;font-size:13px}
.admin-logo span{margin-left:6px;color:#5a7fb5;font-size:10px;border:1px solid #2f4f7a;padding:2px 6px;border-radius:4px}
.admin-logout{background:transparent;color:#8ab0dc;border:1px solid #2f4f7a;border-radius:5px;padding:5px 8px;font-size:11px;cursor:pointer}
.admin-logout:hover{border-color:#6a95cf;color:#fff}
.admin-nav{display:flex;flex-direction:column}
.admin-nav button{text-align:left;padding:11px 18px;border:0;background:transparent;color:#9fb3c9;border-left:3px solid transparent;cursor:pointer;font-size:12px;font-weight:600}
.admin-nav button:hover{color:#eaf3ff;background:#112238}
.admin-nav button.is-active{color:#eaf3ff;background:#112238;border-left-color:#5a7fb5}
.admin-back{display:block;padding:14px 18px;color:#8ab0dc;font-size:11px;text-decoration:none;border-top:1px solid #1e3149;margin-top:18px}
.admin-back:hover{color:#fff}
.admin-main{padding:28px 40px 60px}
.admin-main-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
.admin-main-header h2{margin:0;color:#eaf3ff;font-size:22px;font-family:'Libre Baskerville',Georgia,serif}
.admin-toast{background:#123328;border:1px solid #2d6a4c;color:#9ee6c4;padding:8px 14px;border-radius:6px;font-size:12px}
.admin-panel{background:#102033;border:1px solid #1e3149;border-radius:10px;padding:24px}
.admin-section-form{display:flex;flex-direction:column;gap:16px}
.admin-field{display:flex;flex-direction:column;gap:6px;font-size:12px;color:#8fa3b8}
.admin-field span{font-weight:700;color:#c7d4e3}
.admin-field textarea,.admin-mini textarea{resize:vertical;min-height:80px}
.admin-actions{display:flex;gap:10px;align-items:center;margin-top:16px;padding-top:16px;border-top:1px solid #1e3149}
.admin-list{display:grid;grid-template-columns:1fr;gap:14px}
.admin-list-item{background:#0c1a2b;border:1px solid #1e3149;border-radius:8px;padding:16px;display:flex;flex-direction:column;gap:10px}
.admin-list-head{display:flex;align-items:center;justify-content:space-between;color:#8ab0dc;font-size:11px;font-weight:800;padding-bottom:8px;border-bottom:1px solid #1e3149}
.admin-list-move{display:flex;gap:6px}
.admin-list-move button{padding:3px 9px}
.admin-mini{display:flex;flex-direction:column;gap:5px;font-size:11px;color:#8fa3b8}
.admin-mini span{font-weight:700;color:#c7d4e3}
.admin-list-del{display:flex;justify-content:flex-end}
@media(max-width:900px){.admin-shell{grid-template-columns:1fr}.admin-side{position:static;height:auto}}
`;
