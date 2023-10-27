# !/bin/sh
set -e

produccion () {
  echo "La aplicacion se ha reiniciado debido a un fallo."
  bun src/app.ts
}

trap produccion EXIT
echo "Iniciando la aplicacion..."
bun src/app.ts
