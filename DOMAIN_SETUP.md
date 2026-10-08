# Guía de Configuración de Dominio: touristlens.app

Esta guía detalla paso a paso cómo conectar tu dominio adquirido **`touristlens.app`** al repositorio y alojamiento de la web en **GitHub Pages**.

---

## ⚠️ Nota Importante sobre el TLD `.app` (HSTS Preload)
El dominio `.app` está gestionado por Google Registry y pertenece a la lista **HSTS Preload**. Esto significa que todos los navegadores modernos **obligan** a que la conexión sea exclusivamente mediante **HTTPS**. No funcionará bajo HTTP no seguro; por lo tanto, la emisión del certificado SSL en GitHub Pages es obligatoria y prioritaria.

---

## Paso 1: Archivo CNAME en el repositorio
El archivo `CNAME` ya ha sido creado en la raíz de `touristlens-web` con el contenido:
```
touristlens.app
```
Al hacer `git push` a la rama `main`, GitHub Pages detectará automáticamente este dominio personalizado.

---

## Paso 2: Configuración de Registros DNS (en tu Registrador)
Accede al panel de control donde compraste el dominio (DonDominio, Namecheap, Cloudflare, GoDaddy, Squarespace / Google Domains, Porkbun, etc.) y dirígete a la sección de **Gestión de DNS** o **DNS Records**.

Añade los siguientes registros:

### 1. Registros tipo A (para el dominio principal `@` / `touristlens.app`):
Crea **4 registros A** apuntando a las IPs de los servidores de GitHub Pages:

| Tipo | Nombre / Host | Valor / Dirección IP | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` (o en blanco) | `185.199.108.153` | Automático / 3600 |
| **A** | `@` (o en blanco) | `185.199.109.153` | Automático / 3600 |
| **A** | `@` (o en blanco) | `185.199.110.153` | Automático / 3600 |
| **A** | `@` (o en blanco) | `185.199.111.153` | Automático / 3600 |

### 2. Registros tipo AAAA (Soporte IPv6 — Recomendado):
| Tipo | Nombre / Host | Valor IPv6 | TTL |
| :--- | :--- | :--- | :--- |
| **AAAA** | `@` | `2606:50c0:8000::153` | Automático / 3600 |
| **AAAA** | `@` | `2606:50c0:8001::153` | Automático / 3600 |
| **AAAA** | `@` | `2606:50c0:8002::153` | Automático / 3600 |
| **AAAA** | `@` | `2606:50c0:8003::153` | Automático / 3600 |

### 3. Registro CNAME para el subdominio `www`:
Para que quien escriba `www.touristlens.app` sea redirigido correctamente a la web:

| Tipo | Nombre / Host | Valor / Destino | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `xaxokevin.github.io.` | Automático / 3600 |

*(Nota: Si usas Cloudflare como DNS, asegúrate de poner las nubes en gris (**DNS Only**) durante la verificación del certificado SSL de GitHub).*

---

## Paso 3: Activar en GitHub Pages
1. Ve a tu repositorio en GitHub: [https://github.com/xaxokevin/touristlens-web](https://github.com/xaxokevin/touristlens-web)
2. Entra en **Settings** (Configuración) → pestaña **Pages** en el menú izquierdo.
3. En la sección **Custom domain**, verifica que esté escrito:
   ```
   touristlens.app
   ```
   y pulsa en **Save**.
4. GitHub comprobará los registros DNS (DNS check). Puede tardar de 5 a 30 minutos en propagarse por el mundo.
5. En cuanto el chequeo de DNS sea válido, GitHub generará automáticamente el certificado SSL (Let's Encrypt).
6. Marca la casilla **Enforce HTTPS** (Obligar HTTPS).

---

## Paso 4: Comprobación desde Terminal
Puedes verificar en cualquier momento si los registros DNS ya se han propagado ejecutando en tu terminal:

```bash
dig touristlens.app +noall +answer
```

Deberás ver como respuesta las cuatro IPs `185.199.108.153` a `185.199.111.153`.

---

## Resumen de URLs Canónicas Actualizadas
- **Web Oficial**: [https://touristlens.app/](https://touristlens.app/)
- **Versión en Español**: [https://touristlens.app/index.es.html](https://touristlens.app/index.es.html)
- **Política de Privacidad**: [https://touristlens.app/legal/privacy/en.html](https://touristlens.app/legal/privacy/en.html)
- **Términos y Condiciones**: [https://touristlens.app/legal/terms/en.html](https://touristlens.app/legal/terms/en.html)
