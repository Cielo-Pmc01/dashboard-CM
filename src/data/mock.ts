import type { ContentItem, Source, IGMetric, EngagementEntry, FormatReachEntry, RetentionEntry, FunnelEntry, HeatCell } from '@/types';

export const STATUSES = ['Idea', 'Guion', 'Grabado', 'Editado', 'Aprobado', 'Programado'] as const;
export const DAYS     = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'] as const;

export const PALETTE: [string, string][] = [
  ['#58e6ff', '#9b7cff'],
  ['#d8ff63', '#58e6ff'],
  ['#ff77bc', '#ffc857'],
  ['#ff6f61', '#9b7cff'],
  ['#80ffb5', '#ffc857'],
  ['#9b7cff', '#58e6ff'],
];

export const content: ContentItem[] = [
  { format:'Reel',     status:'Aprobado',   owner:'Rami',  day:'Lun', time:'10:00', objective:'DM',              hook:'Tu contenido no vende porque esta educando demasiado.',        summary:'Pieza piedra contra contenido tibio que explica mucho y no genera deseo.',              cta:'Comentá SISTEMA',      score:94 },
  { format:'Carrusel', status:'Guion',       owner:'Berna', day:'Lun', time:'13:30', objective:'Agenda',          hook:'Si dependes de referidos, no tenes negocio: tenes suerte.',    summary:'Carrusel de 8 slides para romper dependencia y empujar sistema.',                      cta:'Mandá ESCALA',         score:82 },
  { format:'Stories',  status:'Programado',  owner:'Gina',  day:'Mar', time:'18:00', objective:'DM',              hook:'Queres que te diga por que tu perfil no agenda?',              summary:'Secuencia de 6 stories con encuesta, prueba social y CTA a conversación.',             cta:'Responder PERFIL',     score:88 },
  { format:'Ad',       status:'Idea',        owner:'Tomi',  day:'Mar', time:'21:00', objective:'Tráfico a perfil',hook:'No te falta alcance. Te falta un motivo para que te sigan.',  summary:'Script paid con hook visual simple y perfil como activo comercial.',                    cta:'Ir al perfil',         score:61 },
  { format:'Reel',     status:'Grabado',     owner:'Mateo', day:'Mie', time:'09:30', objective:'Venta',           hook:'El lead que te dice \'lo pienso\' ya decidió algo.',           summary:'Mini historia de objeción y como convertirla en contenido.',                           cta:'Mandá LLAMADA',        score:78 },
  { format:'Carrusel', status:'Editado',     owner:'Agus',  day:'Mie', time:'15:00', objective:'Registro',        hook:'7 señales de que tu ManyChat esta decorando, no vendiendo.',  summary:'Checklist con errores de automatización sin conversación real.',                       cta:'Guardalo y auditá tu flujo', score:89 },
  { format:'Reel',     status:'Guion',       owner:'Rami',  day:'Jue', time:'11:00', objective:'DM',              hook:'Tu VSL no esta rota por larga. Esta rota por cobarde.',        summary:'Ataque a VSLs que no nombran dolor ni tensionan decisión.',                           cta:'Comentá VSL',          score:96 },
  { format:'Stories',  status:'Idea',        owner:'Gina',  day:'Jue', time:'19:30', objective:'Agenda',          hook:'La diferencia entre contenido lindo y contenido que agenda.',  summary:'Stories comparando pieza tibia vs pieza con tensión y CTA claro.',                    cta:'Responder AGENDA',     score:57 },
  { format:'Ad',       status:'Aprobado',    owner:'Berna', day:'Vie', time:'12:00', objective:'Registro',        hook:'Si tu solución para vender más es postear más, estás perdido.',summary:'Ad corto contra volumen sin sistema de demanda.',                                      cta:'Registrate',           score:84 },
  { format:'Reel',     status:'Editado',     owner:'Mateo', day:'Vie', time:'17:00', objective:'DM',              hook:'No estas vendiendo caro. Estas explicando barato.',            summary:'Respuesta a objeción de precio con reframe de percepción de valor.',                   cta:'Mandá PRECIO',         score:87 },
  { format:'Carrusel', status:'Programado',  owner:'Agus',  day:'Sab', time:'11:30', objective:'Tráfico a perfil',hook:'El algoritmo no te odia. La gente te ignora.',                summary:'Separar problema de distribución vs problema de mensaje.',                             cta:'Revisá tu perfil',     score:90 },
  { format:'Stories',  status:'Grabado',     owner:'Rami',  day:'Dom', time:'20:00', objective:'Venta',           hook:'Si seguis esperando claridad, se te pasa el mercado.',         summary:'Secuencia de cierre para mover leads tibios a DM.',                                   cta:'Responder CLARIDAD',   score:74 },
];

export const sources: Source[] = [
  { name:'YouTube Rami',       type:'58 transcripciones',   summary:'Material largo para extraer piedras, historias, frameworks y objeciones.',          tags:['marca personal','ventas','Instagram','ManyChat'] },
  { name:'ManyChat DMs',       type:'Export simulado',      summary:'Preguntas repetidas, objeciones y lenguaje literal de leads.',                      tags:['objeciones','DM','urgencia','frases reales'] },
  { name:'Llamadas de venta',  type:'Transcripciones mock', summary:'Dolores profundos, vergüenzas y objeciones antes del cierre.',                      tags:['precio','confianza','decisión','cierre'] },
  { name:'Comentarios IG',     type:'Placeholder',          summary:'Preparado para cuando exista conexión autorizada a Instagram.',                     tags:['offline','webhooks','Graph API'] },
  { name:'Banco de ángulos',   type:'Curado',               summary:'Referidos, ads mal usados, VSL rota, setters, CTA agresivo.',                       tags:['piedras','ads','VSL','referidos'] },
  { name:'Quality Bar',        type:'Reglas',               summary:'Hook, tensión, creencia rota, utilidad, CTA y grababilidad.',                        tags:['score','gate','aprobación'] },
];

export const insights: [string, string, string][] = [
  ['Dolor dominante',    'La audiencia confunde volumen de posteos con sistema de demanda.', '#58e6ff'],
  ['Objeción caliente',  'No quieren vender agresivo, pero tampoco quieren seguir invisibles.', '#ff6f61'],
  ['Frase reusable',     'No me falta contenido, me falta que alguien me responda los DMs.', '#d8ff63'],
  ['Creencia a romper',  'Postear más no arregla un mensaje que no hace elegir.', '#ff77bc'],
];

export const igMetrics: IGMetric[] = [
  { label:'Vistas',        value:'3.8M',    delta:'+31%',   detail:'Reels + stories en 30d',      color:'#58e6ff' },
  { label:'Reach',         value:'1.42M',   delta:'+18%',   detail:'Cuentas alcanzadas',           color:'#d8ff63' },
  { label:'Seguidores',    value:'187.4K',  delta:'+4.8K',  detail:'Crecimiento neto',             color:'#80ffb5' },
  { label:'Interaccion',   value:'8.7%',    delta:'+2.1pp', detail:'ER promedio',                  color:'#ff77bc' },
  { label:'Comentarios',   value:'18.2K',   delta:'+44%',   detail:'Señal de conversación',        color:'#ffc857' },
  { label:'Retencion',     value:'42%',     delta:'+7pp',   detail:'Reels completion avg',         color:'#9b7cff' },
  { label:'CTR bio',       value:'3.9%',    delta:'+0.8pp', detail:'Clicks desde perfil',          color:'#ff6f61' },
  { label:'Saves',         value:'31.6K',   delta:'+26%',   detail:'Contenido de alta utilidad',   color:'#58e6ff' },
  { label:'Shares',        value:'12.9K',   delta:'+19%',   detail:'Contenido reenviable',         color:'#d8ff63' },
  { label:'DMs',           value:'2.184',   delta:'+38%',   detail:'Conversaciones iniciadas',     color:'#80ffb5' },
  { label:'Profile visits',value:'96.7K',   delta:'+22%',   detail:'Tráfico al perfil',            color:'#ff77bc' },
  { label:'Frecuencia',    value:'3.1x',    delta:'-0.4',   detail:'Exposición por cuenta',        color:'#ffc857' },
];

export const growthData = [42,46,51,49,58,61,64,70,68,76,81,78,86,93,91,96,104,112,108,118,124,132,129,141,148,153,161,170,178,186];

export const reachByFormat: FormatReachEntry[] = [
  { label:'Reels',    value:92, color:'#58e6ff' },
  { label:'Carr.',    value:63, color:'#d8ff63' },
  { label:'Stories',  value:48, color:'#ff77bc' },
  { label:'Ads',      value:36, color:'#ffc857' },
  { label:'Lives',    value:24, color:'#80ffb5' },
];

export const engagementMix: EngagementEntry[] = [
  { label:'Likes',       value:'54%', color:'#58e6ff' },
  { label:'Comentarios', value:'19%', color:'#d8ff63' },
  { label:'Saves',       value:'14%', color:'#ff77bc' },
  { label:'Shares',      value:'8%',  color:'#ffc857' },
  { label:'DMs',         value:'5%',  color:'#ff6f61' },
];

export const retention: RetentionEntry[] = [
  { label:'0-3s',   value:100, color:'#58e6ff' },
  { label:'3-8s',   value:78,  color:'#80ffb5' },
  { label:'8-15s',  value:57,  color:'#d8ff63' },
  { label:'15-30s', value:42,  color:'#ffc857' },
  { label:'Final',  value:31,  color:'#ff6f61' },
];

export const funnel: FunnelEntry[] = [
  { label:'Reach',         value:'1.42M', pct:100, color:'#58e6ff' },
  { label:'Profile visits',value:'96.7K', pct:68,  color:'#d8ff63' },
  { label:'Bio clicks',    value:'3.772', pct:42,  color:'#ffc857' },
  { label:'DM starts',     value:'2.184', pct:31,  color:'#ff77bc' },
  { label:'Agendas',       value:'248',   pct:18,  color:'#80ffb5' },
];

export const heatmap: HeatCell[] = [
  { day:'Lun', hour:'10h', heat:78 }, { day:'Mar', hour:'12h', heat:64 }, { day:'Mie', hour:'15h', heat:86 },
  { day:'Jue', hour:'11h', heat:92 }, { day:'Vie', hour:'17h', heat:74 }, { day:'Sab', hour:'20h', heat:58 },
  { day:'Dom', hour:'19h', heat:69 }, { day:'Lun', hour:'18h', heat:71 }, { day:'Mar', hour:'21h', heat:52 },
  { day:'Mie', hour:'09h', heat:66 }, { day:'Jue', hour:'19h', heat:81 }, { day:'Vie', hour:'12h', heat:88 },
  { day:'Sab', hour:'11h', heat:62 }, { day:'Dom', hour:'20h', heat:73 },
];
