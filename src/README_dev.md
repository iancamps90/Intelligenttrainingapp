🧩 MEGA PROMPT — AthleteAI Pro (Full Stack v1)

Quiero que generes un proyecto completo basado en este prototipo de Figma:
“AthleteAI Pro” — App de entrenamiento, nutrición y gimnasio con agente de IA.

Objetivo general:
Desarrollar la versión MVP funcional basada en el prototipo Figma (que incluye Dashboard, IA, Entrenamientos, Nutrición y Métricas).
Debe ser responsive (mobile/desktop) y usar modo claro/oscuro, tal como el diseño.

🏗️ Tecnologías base

Frontend:

Next.js 14 + App Router

TailwindCSS + Framer Motion

Shadcn/UI (componentes base)

Zustand (gestión de estado ligera)

Recharts (para gráficos)

Backend:

Supabase (auth, database, storage)

OpenAI API (IA Coach)

Edge Functions (para lógica de análisis/entrenamiento)

📁 Estructura esperada athleteai-pro/
 ├── app/
 │   ├── layout.tsx
 │   ├── page.tsx (Dashboard)
 │   ├── ai/
 │   ├── training/
 │   ├── nutrition/
 │   ├── metrics/
 │   └── settings/
 ├── components/
 │   ├── ui/
 │   ├── charts/
 │   ├── cards/
 │   └── modals/
 ├── lib/
 │   ├── supabaseClient.ts
 │   ├── openai.ts
 │   └── utils.ts
 ├── styles/
 │   └── globals.css
 ├── public/
 └── README.md

⚙️ Funcionalidades iniciales (MVP v1)

Auth con Supabase: registro, login, logout, perfil.

Dashboard dinámico:

Muestra readiness, HRV, estrés, sueño, entrenamientos del día.

Usa datos mock hasta conectar con APIs reales.

Agente IA:

Chat conectado con OpenAI API.

Prompts contextuales (ejemplo: “ajusta mi plan de entrenamiento según mi sueño y HRV”).

Entrenamientos:

Listado semanal (ciclismo/gym).

Detalle con zonas, TSS y tipo de sesión.

Nutrición:

Seguimiento de macros y comidas.

Cálculo automático de calorías diarias.

Métricas:

Gráficos de FTP, HRV, estrés y sueño con Recharts.

🧩 Diseño (tomado del prototipo Figma)

Colores: #007AFF / #FF6A00 (light) — #0A84FF / #FF9F0A (dark)

Tipografía: Inter / System fonts

Border radius: 16px global

Espaciado: 8/12/16/20/24/32px

Animaciones: fade/slide/scale (200–400ms, cubic-bezier)

Gradientes: blue-purple, orange-pink, green-blue

💬 Instrucciones de desarrollo

Crea todos los archivos y componentes necesarios.

Implementa el diseño y flujo como en Figma.

Usa datos mock hasta conectar a Supabase.

Deja funciones y hooks preparados para:

useUserMetrics()

useTrainingPlan()

useNutritionPlan()

useAIAgent()

Documenta con comentarios cada parte.

Genera un README.md técnico explicando dependencias, instalación y variables de entorno.

🧠 Futuro (versión 2.0)

Integración real con Garmin/Strava API.

Planificador adaptativo (ajuste automático con IA).

Sincronización de métricas en tiempo real.

Notificaciones push y Apple Health/Google Fit.

🎯 Objetivo final

Generar el proyecto base AthleteAI Pro MVP v1 completamente funcional, con estructura modular, componentes reutilizables, diseño responsive y conexión básica a Supabase y OpenAI.

🪄 Siguientes pasos después del mega prompt

1️⃣ Pega el prompt completo en Cursor → crea el proyecto automáticamente.

2️⃣ Luego te pedirá enlazar Supabase → usa tu cuenta (gratuita).

3️⃣ Configura .env.local con las claves de Supabase y OpenAI.

4️⃣ Ejecuta npm run dev y tendrás el MVP visible.

5️⃣ A partir de ahí, iteramos módulo por módulo (yo te guío paso a paso).

