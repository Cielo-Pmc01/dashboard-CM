export default function SettingsView() {
  return (
    <div className="view-grid">
      <section className="card">
        <h2 className="card-title">Configuración</h2>
        <div className="settings-group">
          <h3>Conexión Instagram</h3>
          <p className="settings-desc">La conexión real a la Graph API de Instagram está pendiente de implementación. Por ahora el dashboard usa datos mock.</p>
          <button className="settings-btn" disabled>Conectar cuenta Instagram (próximamente)</button>
        </div>
        <div className="settings-group">
          <h3>Equipo</h3>
          <div className="team-list">
            {['Rami', 'Berna', 'Gina', 'Tomi', 'Mateo', 'Agus'].map((m) => (
              <div key={m} className="team-member">
                <span className="team-avatar">{m[0]}</span>
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="settings-group">
          <h3>Quality Bar</h3>
          <p className="settings-desc">Score mínimo para aprobar contenido:</p>
          <div className="settings-row">
            <span>Threshold actual:</span>
            <strong style={{ color: '#d8ff63' }}>75</strong>
          </div>
          <div className="settings-row">
            <span>Score promedio pipeline:</span>
            <strong style={{ color: '#58e6ff' }}>80</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
