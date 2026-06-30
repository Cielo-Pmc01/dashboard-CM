interface Props { active: boolean; }

export default function SettingsView({ active }: Props) {
  return (
    <section className={`view${active ? ' active' : ''}`} id="settings">
      <div className="settings-grid">
        <section className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Instagram connector</p>
              <h2>Preparado, no conectado</h2>
            </div>
          </div>
          <div className="locked">
            <strong>OFFLINE MOCK</strong>
            <p>
              Esta versión no consulta Meta, no pide token y no usa IP/cuenta para APIs externas.
              El módulo solo muestra la estructura futura de conexión.
            </p>
          </div>
          <div className="form-grid">
            <label>IG Business Account ID<input disabled defaultValue="mock_ig_business_account_id" /></label>
            <label>Meta App ID<input disabled defaultValue="mock_meta_app_id" /></label>
            <label>Publish queue<input disabled defaultValue="disabled_until_credentials_are_added" /></label>
            <button className="button" disabled>Conectar IG más adelante</button>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Checklist técnico</p>
              <h2>Para conexión futura</h2>
            </div>
          </div>
          <div className="checklist">
            <div><span className="check">✓</span>Adapter InstagramPublisher aislado</div>
            <div><span className="check">✓</span>Cola de publicación modelada</div>
            <div><span className="check">✓</span>Estados de error preparados</div>
            <div><span className="empty" />Token real cargado</div>
            <div><span className="empty" />Permisos Meta aprobados</div>
            <div><span className="empty" />Webhooks activos</div>
          </div>
        </section>
      </div>
    </section>
  );
}
