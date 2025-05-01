#!/bin/sh

API_URL=${API_URL}

cat <<EOF > /usr/src/app/src/app/services/appconfig.ts
export var appConfig = {
  apiURL: '$BACKEND_URL/api/',
};
EOF

# Start Angular dev server
ng serve --host 0.0.0.0