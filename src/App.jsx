import { useState } from "react";

const MODULOS = [
  {
    id: "compras",
    nombre: "Sistema de Compras",
    descripcion: "Requisiciones, tracker de OC, proveedores y KPIs de compras para las tres empresas del grupo.",
    icono: "🛒",
    status: "activo",
    url: "https://compras-app-beta.vercel.app",
    color: "#235C96",
    tags: ["Parana Logística", "Clean Sea", "Terra Mare"],
  },
  {
    id: "viveres",
    nombre: "Víveres",
    descripcion: "Pedidos de víveres para embarcaciones con control de dieta nutricional y cálculo USD/cabeza/día.",
    icono: "🚢",
    status: "activo",
    url: "https://viveres-app.vercel.app",
    color: "#1A7A6E",
    tags: ["Embarcaciones", "Catering"],
  },
  {
    id: "pipeline",
    nombre: "Pipeline de Oportunidades",
    descripcion: "CRM comercial para seguimiento de licitaciones, propuestas y oportunidades de negocio.",
    icono: "📈",
    status: "proximamente",
    url: null,
    color: "#C05621",
    tags: ["Ventas", "Licitaciones"],
  },
  {
    id: "projects",
    nombre: "Projects",
    descripcion: "Gestión de proyectos con Diagrama de Gantt, camino crítico y seguimiento de tareas.",
    icono: "📋",
    status: "proximamente",
    url: null,
    color: "#6B4FA0",
    tags: ["Gantt", "Camino crítico"],
  },
  {
    id: "tripulaciones",
    nombre: "Optimizador de Tripulaciones",
    descripcion: "Gestión del personal embarcado, rotaciones, documentación y liquidaciones integradas con Xubio.",
    icono: "👥",
    status: "proximamente",
    url: null,
    color: "#B07D0A",
    tags: ["RRHH", "Embarcaciones"],
  },
  {
    id: "mecanica",
    nombre: "Mecánica",
    descripcion: "Mantenimiento preventivo y correctivo de la flota con historial técnico por embarcación.",
    icono: "⚙️",
    status: "proximamente",
    url: null,
    color: "#374151",
    tags: ["Mantenimiento", "Flota"],
  },
  {
    id: "hsqe",
    nombre: "HSQE",
    descripcion: "Control de certificaciones, vencimientos, inspecciones, incidentes y cumplimiento normativo.",
    icono: "🛡️",
    status: "proximamente",
    url: null,
    color: "#C0392B",
    tags: ["Seguridad", "ISO", "Certificaciones"],
  },
  {
    id: "documentos",
    nombre: "Control Documentario",
    descripcion: "Gestión centralizada de documentación técnica, legal y operativa de todas las empresas.",
    icono: "📁",
    status: "proximamente",
    url: null,
    color: "#0E7490",
    tags: ["Documentos", "Compliance"],
  },
  {
    id: "dashboards",
    nombre: "Dashboards",
    descripcion: "Panel ejecutivo con KPIs consolidados de todos los módulos para toma de decisiones.",
    icono: "📊",
    status: "proximamente",
    url: null,
    color: "#213363",
    tags: ["Reportes", "KPIs"],
  },
  {
    id: "crewing",
    nombre: "Terra Mare Crewing",
    descripcion: "Plataforma de servicios de crewing para clientes externos. Gestión de dotaciones y certificaciones.",
    icono: "⚓",
    status: "proximamente",
    url: null,
    color: "#1E7A6E",
    tags: ["Crewing", "Clientes"],
  },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --navy:   #213363;
  --blue:   #235C96;
  --mid:    #6381A7;
  --light:  #A5B5CC;
  --bg:     #EEF2F7;
  --surface:#FFFFFF;
  --border: #D6E0ED;
  --text:   #213363;
  --muted:  #6381A7;
  --sans:   'Montserrat', sans-serif;
  --mono:   'DM Mono', monospace;
}

body {
  font-family: var(--sans);
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
}

.header {
  background: var(--navy);
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  box-shadow: 0 2px 12px rgba(33,51,99,.2);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-brand { display: flex; align-items: center; gap: 14px; }

.header-logo {
  width: 36px; height: 36px;
  background: rgba(255,255,255,.15);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
}

.header-title { display: flex; flex-direction: column; }
.header-main { font-size: 13px; font-weight: 700; color: #fff; letter-spacing: 1.5px; text-transform: uppercase; }
.header-sub { font-size: 9px; color: rgba(255,255,255,.45); letter-spacing: .5px; font-family: var(--mono); margin-top: 1px; }

.header-right { display: flex; align-items: center; gap: 16px; }
.header-empresa { font-size: 10px; font-family: var(--mono); color: rgba(255,255,255,.4); letter-spacing: 1px; }

.header-user {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--blue);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: #fff;
  border: 2px solid rgba(255,255,255,.2);
}

.hero {
  background: linear-gradient(135deg, var(--navy) 0%, #1a2a5e 50%, #0f1d4a 100%);
  padding: 52px 40px 48px;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: ''; position: absolute;
  top: -60px; right: -60px;
  width: 300px; height: 300px; border-radius: 50%;
  background: rgba(35,92,150,.2); pointer-events: none;
}

.hero::after {
  content: ''; position: absolute;
  bottom: -80px; left: 20%;
  width: 200px; height: 200px; border-radius: 50%;
  background: rgba(35,92,150,.1); pointer-events: none;
}

.hero-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; }

.hero-eyebrow {
  font-family: var(--mono); font-size: 10px;
  letter-spacing: 3px; color: rgba(255,255,255,.4);
  text-transform: uppercase; margin-bottom: 10px;
}

.hero-title {
  font-size: 32px; font-weight: 800; color: #fff;
  line-height: 1.15; margin-bottom: 10px; letter-spacing: -.5px;
}
.hero-title span { color: #7EB8E8; }

.hero-desc { font-size: 13px; color: rgba(255,255,255,.5); max-width: 520px; line-height: 1.7; }

.hero-stats { display: flex; gap: 32px; margin-top: 28px; }
.hero-stat { display: flex; flex-direction: column; gap: 2px; }
.hero-stat-n { font-family: var(--mono); font-size: 24px; font-weight: 700; color: #fff; }
.hero-stat-l { font-size: 10px; color: rgba(255,255,255,.4); letter-spacing: .5px; text-transform: uppercase; }

.content { max-width: 1200px; margin: 0 auto; padding: 36px 40px 60px; }

.section-label {
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 2.5px; color: var(--muted);
  text-transform: uppercase; margin-bottom: 16px;
  display: flex; align-items: center; gap: 10px;
}
.section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

.modulos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  margin-bottom: 36px;
}

.modulo-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 22px;
  transition: all .2s;
  position: relative;
  overflow: hidden;
  display: flex; flex-direction: column; gap: 14px;
}

.modulo-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 3px;
  background: var(--card-color, var(--blue));
  opacity: 0; transition: opacity .2s;
}

.modulo-card.activo {
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(33,51,99,.06);
}

.modulo-card.activo:hover {
  border-color: var(--card-color, var(--blue));
  box-shadow: 0 4px 20px rgba(33,51,99,.12);
  transform: translateY(-2px);
}

.modulo-card.activo:hover::before { opacity: 1; }
.modulo-card.proximamente { opacity: .75; }

.card-top { display: flex; align-items: flex-start; justify-content: space-between; }

.card-icono {
  width: 44px; height: 44px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
}

.card-badges { display: flex; gap: 6px; align-items: center; }

.badge-activo {
  font-family: var(--mono); font-size: 8px; font-weight: 700;
  padding: 3px 8px; border-radius: 4px;
  background: #D1FAE5; color: #065F46; border: 1px solid #A7F3D0;
  letter-spacing: .5px; text-transform: uppercase;
}

.badge-prox {
  font-family: var(--mono); font-size: 8px; font-weight: 700;
  padding: 3px 8px; border-radius: 4px;
  background: #F3F4F6; color: #6B7280; border: 1px solid #E5E7EB;
  letter-spacing: .5px; text-transform: uppercase;
}

.card-body { flex: 1; }
.card-nombre { font-size: 15px; font-weight: 700; color: var(--navy); margin-bottom: 6px; line-height: 1.3; }
.card-desc { font-size: 12px; color: var(--muted); line-height: 1.6; }

.card-tags { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 12px; }
.card-tag {
  font-family: var(--mono); font-size: 9px;
  padding: 2px 7px; background: #F0F4F8;
  border: 1px solid var(--border); border-radius: 4px; color: var(--muted);
}

.card-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 12px; border-top: 1px solid var(--border); margin-top: auto;
}

.card-link {
  font-size: 11px; font-weight: 600;
  text-decoration: none;
  display: flex; align-items: center; gap: 4px;
  letter-spacing: .3px; text-transform: uppercase;
}
.card-link:hover { text-decoration: underline; }
.card-link-disabled { font-size: 11px; font-weight: 500; color: var(--muted); letter-spacing: .3px; }

.portal-footer {
  background: var(--navy); padding: 20px 40px;
  display: flex; align-items: center; justify-content: space-between;
}
.footer-left { font-size: 11px; color: rgba(255,255,255,.3); font-family: var(--mono); letter-spacing: .5px; }
.footer-right { font-size: 10px; color: rgba(255,255,255,.2); font-family: var(--mono); }
`;

function ModuloCard({ mod }) {
  const isActivo = mod.status === "activo";
  const handleClick = () => { if (isActivo && mod.url) window.open(mod.url, "_blank"); };

  return (
    <div
      className={`modulo-card ${mod.status}`}
      style={{ "--card-color": mod.color }}
      onClick={handleClick}
    >
      <div className="card-top">
        <div className="card-icono" style={{ background: `${mod.color}18`, border: `1px solid ${mod.color}30` }}>
          {mod.icono}
        </div>
        <div className="card-badges">
          {isActivo ? <span className="badge-activo">● Activo</span> : <span className="badge-prox">Próximamente</span>}
        </div>
      </div>
      <div className="card-body">
        <div className="card-nombre">{mod.nombre}</div>
        <div className="card-desc">{mod.descripcion}</div>
        <div className="card-tags">{mod.tags.map(t => <span key={t} className="card-tag">{t}</span>)}</div>
      </div>
      <div className="card-footer">
        {isActivo
          ? <span className="card-link" style={{ color: mod.color }}>Abrir módulo →</span>
          : <span className="card-link-disabled">En desarrollo</span>
        }
      </div>
    </div>
  );
}

export default function App() {
  const activos = MODULOS.filter(m => m.status === "activo");
  const proximos = MODULOS.filter(m => m.status === "proximamente");

  return (
    <>
      <style>{CSS}</style>
      <header className="header">
        <div className="header-brand">
          <div className="header-logo">⚓</div>
          <div className="header-title">
            <div className="header-main">ERP Grupo Marítimo</div>
            <div className="header-sub">Sistema integrado de gestión</div>
          </div>
        </div>
        <div className="header-right">
          <div className="header-empresa">PARANA LOGÍSTICA · CLEAN SEA · TERRA MARE SERVICES</div>
          <div className="header-user">TM</div>
        </div>
      </header>

      <div className="hero">
        <div className="hero-content" style={{ textAlign: "center" }}>
          <div className="hero-eyebrow">Sistema integrado de gestión</div>
          <h1 className="hero-title">Parana Logística · <span>Clean Sea</span> · Terra Mare Services</h1>
          <p className="hero-desc" style={{ textAlign: "center", margin: "0 auto" }}>Hacemos las cosas una vez... y bien.</p>
          <div className="hero-stats" style={{ justifyContent: "center" }}>
            <div className="hero-stat"><div className="hero-stat-n">{MODULOS.length}</div><div className="hero-stat-l">Módulos</div></div>
            <div className="hero-stat"><div className="hero-stat-n">{activos.length}</div><div className="hero-stat-l">Activos</div></div>
            <div className="hero-stat"><div className="hero-stat-n">3</div><div className="hero-stat-l">Empresas</div></div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="section-label">Módulos activos</div>
        <div className="modulos-grid">
          {activos.map(mod => <ModuloCard key={mod.id} mod={mod} />)}
        </div>
        <div className="section-label" style={{ marginTop: 8 }}>Próximamente</div>
        <div className="modulos-grid">
          {proximos.map(mod => <ModuloCard key={mod.id} mod={mod} />)}
        </div>
      </div>

      <footer className="portal-footer">
        <div className="footer-left">Parana Logística · Clean Sea · Terra Mare Services · Confidencial</div>
        <div className="footer-right">v1.0 — {new Date().getFullYear()}</div>
      </footer>
    </>
  );
}
