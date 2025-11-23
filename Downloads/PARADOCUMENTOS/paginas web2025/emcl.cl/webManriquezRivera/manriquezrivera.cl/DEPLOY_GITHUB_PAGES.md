# 🚀 Deploy a GitHub Pages - Guía Paso a Paso

## ✅ Archivos ya configurados:
- `.github/workflows/deploy.yml` - GitHub Actions para deploy automático
- `astro.config.mjs` - Configurado para GitHub Pages
- `public/.nojekyll` - Para que GitHub Pages funcione con Astro

## 📋 Pasos para hacer la prueba:

### 1. Crear repositorio en GitHub

1. Ve a: https://github.com/new
2. Nombre del repositorio: `manriquezrivera.cl`
3. Público o Privado (como prefieras)
4. **NO** inicialices con README
5. Clic en "Create repository"

### 2. Subir tu proyecto a GitHub

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
# Inicializar git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - Manríquez Rivera website"

# Conectar con GitHub (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/manriquezrivera.cl.git

# Cambiar a rama main
git branch -M main

# Subir a GitHub
git push -u origin main
```

### 3. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Clic en **Settings** (Configuración)
3. En el menú lateral: **Pages**
4. En "Source": Selecciona **GitHub Actions**
5. Guarda los cambios

### 4. Agregar la variable de entorno

1. En tu repositorio, ve a: **Settings > Secrets and variables > Actions**
2. Clic en **New repository secret**
3. Name: `PUBLIC_WP_URL`
4. Value: `http://localhost:10128` (o la URL de tu WordPress en producción)
5. Clic en **Add secret**

### 5. Activar el deploy

El deploy se activará automáticamente cuando hagas push. Para ver el progreso:

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el workflow "Deploy to GitHub Pages" ejecutándose
3. Espera 2-3 minutos

### 6. Ver tu sitio publicado

Una vez completado el deploy, tu sitio estará en:

```
https://TU-USUARIO.github.io/manriquezrivera.cl/
```

## 🔄 Actualizaciones automáticas

El sitio se actualizará automáticamente:

- ✅ Cada vez que hagas `git push`
- ✅ Cada 6 horas (para obtener cambios de WordPress)
- ✅ Manualmente desde la pestaña Actions

## 🌐 Configurar dominio personalizado (Opcional)

### Para usar tu dominio real (manriquezrivera.cl):

1. En GitHub Pages Settings, en "Custom domain" pon: `manriquezrivera.cl`
2. En tu DNS (cPanel Zone Editor), agrega:

```dns
# Registros A para GitHub Pages
@    A    185.199.108.153
@    A    185.199.109.153
@    A    185.199.110.153
@    A    185.199.111.153

# CNAME para www
www  CNAME  TU-USUARIO.github.io
```

3. Actualiza `astro.config.mjs`:

```js
export default defineConfig({
  output: 'static',
  site: 'https://manriquezrivera.cl',
  // Elimina la línea "base" cuando uses dominio propio
  vite: {
    plugins: [tailwindcss()]
  }
});
```

## 🎯 Workflow completo:

1. **Cliente publica en WordPress** → Contenido nuevo
2. **GitHub Actions** → Rebuild automático cada 6 horas
3. **GitHub Pages** → Sitio actualizado

O si quieres actualizar inmediatamente:

1. Ve a **Actions** en GitHub
2. Clic en "Deploy to GitHub Pages"
3. Clic en "Run workflow"
4. Espera 2-3 minutos

## 💡 Ventajas de esta configuración:

- ✅ Totalmente gratis
- ✅ HTTPS automático
- ✅ Deploy automático
- ✅ CDN global (rápido en todo el mundo)
- ✅ Sin límite de visitas (para sitios normales)
- ✅ Versionado con Git

## 🆘 Solución de problemas:

### Si el sitio no carga correctamente:
- Verifica que el workflow se haya ejecutado sin errores
- Revisa que la variable `PUBLIC_WP_URL` esté configurada
- Espera unos minutos, a veces tarda en propagarse

### Si las imágenes no cargan:
- Asegúrate de que las rutas sean relativas
- Verifica que las imágenes estén en la carpeta `public/`

### Si WordPress no se conecta:
- Verifica que la URL de WordPress sea accesible públicamente
- Revisa que el CORS esté habilitado en WordPress
