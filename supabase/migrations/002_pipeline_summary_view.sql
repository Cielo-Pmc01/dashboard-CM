-- =============================================================================
-- Migración 002 — Vista curada de resumen para SP + restringir content_pipeline
-- =============================================================================
-- SP (rol viewer) no debe ver el copy/texto real de las piezas de CM, solo un
-- resumen numérico (piezas por estado y por marca). Se resuelve con una vista
-- de solo agregados (sin columnas sensibles) y se restringe la tabla completa
-- a cm/admin únicamente.
--
-- Aplicada directo vía Supabase MCP execute_sql el 2026-07-16.
-- =============================================================================

create or replace function platform.is_cm_or_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from platform.users
    where id = auth.uid() and role in ('cm'::platform.user_role, 'admin'::platform.user_role)
  );
$$;

drop policy if exists content_pipeline_read_authenticated on crm_cm.content_pipeline;
create policy content_pipeline_read_cm_admin on crm_cm.content_pipeline
  for select using (platform.is_cm_or_admin());

-- Misma restricción para UPDATE: la política anterior dejaba pasar a
-- cualquier `authenticated`, incluido un futuro viewer que llamara la API
-- directo (la UI ya no le muestra los botones, pero eso no es el límite
-- de seguridad real).
drop policy if exists content_pipeline_update_authenticated on crm_cm.content_pipeline;
create policy content_pipeline_update_cm_admin on crm_cm.content_pipeline
  for update using (platform.is_cm_or_admin()) with check (platform.is_cm_or_admin());

create or replace view crm_cm.pipeline_summary as
select marca, estado, count(*) as total
from crm_cm.content_pipeline
group by marca, estado;

grant select on crm_cm.pipeline_summary to authenticated;
