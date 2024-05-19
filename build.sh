# Cannot run network apps on colima as network layer seems broken
# colima start
# docker run -p 3000:3000 registry.dallen.io/dallenjs

npm install
npm run build
mkdir -p .next/standalone
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
docker build . -t registry.dallen.io/dallenjs
docker push registry.dallen.io/dallenjs
