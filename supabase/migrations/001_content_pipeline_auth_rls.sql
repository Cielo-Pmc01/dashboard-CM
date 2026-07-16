-- =============================================================================
-- Migración 001 — Restringir content_pipeline a usuarios autenticados
-- =============================================================================
-- Las policies content_pipeline_read_anon / content_pipeline_update_anon se
-- crearon en la Fase 1 (13/07/2026) como parche temporal porque crm-cm no
-- tenía login todavía — quedaron abiertas a rol `anon` sin ninguna restricción
-- (qual: true). Documentado explícitamente como "revisar cuando se le sume
-- autenticación" en planes/2026-07-13-motor-contenido-cm-plan-fase2-frontend.md.
--
-- Ahora que crm-cm tiene login real (Supabase Auth + platform.users), se
-- retira el acceso `anon` y queda solo `authenticated`.
--
-- excursion_catalog_read_all NO se toca — sigue pública porque no tiene datos
-- sensibles y n8n la lee sin sesión de usuario (vía service_role, que además
-- bypassea RLS).
--
-- Aplicada directo vía Supabase MCP execute_sql el 2026-07-16.
-- =============================================================================

drop policy if exists content_pipeline_read_anon on crm_cm.content_pipeline;
drop policy if exists content_pipeline_update_anon on crm_cm.content_pipeline;

create policy content_pipeline_read_authenticated on crm_cm.content_pipeline
  for select to authenticated using (true);

create policy content_pipeline_update_authenticated on crm_cm.content_pipeline
  for update to authenticated using (true) with check (true);
