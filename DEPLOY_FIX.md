# 🔧 Fix: Deploy en Vercel

## Problema: Vercel no hace deploy

Si Vercel detecta el proyecto pero no hace deploy automáticamente, sigue estos pasos:

## Solución 1: Configurar Root Directory en Vercel Dashboard

1. Ve a tu proyecto en **Vercel Dashboard**
2. Click en **Settings** (Configuración)
3. Ve a la sección **General**
4. Busca **Root Directory**
5. Escribe: `athleteai-pro`
6. Click en **Save**
7. Ve a **Deployments** y haz click en **Redeploy** (los 3 puntos → Redeploy)

## Solución 2: Hacer Deploy Manual

1. En Vercel Dashboard, ve a **Deployments**
2. Click en el botón **"..."** (tres puntos) del último deployment
3. Selecciona **Redeploy**
4. O crea un nuevo deployment desde **Deployments** → **Create Deployment**

## Solución 3: Verificar Variables de Entorno

Asegúrate de tener estas variables configuradas:

1. Ve a **Settings** → **Environment Variables**
2. Verifica que tengas:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (puede ser temporalmente `http://localhost:3000`)

3. Para cada variable, asegúrate de seleccionar:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

## Solución 4: Verificar Build Logs

1. Ve a **Deployments**
2. Click en el deployment que falló
3. Revisa los **Build Logs**
4. Busca errores específicos y compártelos

## Solución 5: Forzar Nuevo Deploy desde GitHub

```bash
# Hacer un cambio pequeño para forzar nuevo deploy
cd athleteai-pro
echo "# Deploy fix" >> README.md
git add .
git commit -m "chore: Trigger Vercel deploy"
git push
```

## Configuración Recomendada en Vercel

### Settings → General:
- **Framework Preset**: Next.js (debería detectarse automáticamente)
- **Root Directory**: `athleteai-pro`
- **Build Command**: `npm run build` (o dejar vacío para auto-detect)
- **Output Directory**: `.next` (o dejar vacío para auto-detect)
- **Install Command**: `npm install` (o dejar vacío para auto-detect)

### Settings → Git:
- **Production Branch**: `main`
- **Auto-deploy**: ✅ Enabled

## Si Nada Funciona

1. **Elimina el proyecto en Vercel** (Settings → Delete Project)
2. **Vuelve a importar** desde GitHub:
   - Click en "Add New Project"
   - Selecciona tu repositorio
   - En "Configure Project":
     - **Root Directory**: `athleteai-pro`
     - Agrega las variables de entorno
   - Click en "Deploy"

## Verificar que Funciona

Después del deploy exitoso, deberías ver:
- ✅ Build completado
- ✅ Deployment URL (ej: `https://intelligenttrainingapp.vercel.app`)
- ✅ Status: Ready

Si ves errores, comparte los logs y te ayudo a solucionarlos.

