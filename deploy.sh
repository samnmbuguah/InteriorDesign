#!/bin/bash
set -e

echo "=== 1. Building InteriorDesign Next.js App ==="
npm run build

echo "=== 2. Assembling Production Bundle ==="
rm -rf .production_bundle
mkdir -p .production_bundle

# Copy essential runtime files
cp package.json .production_bundle/
cp package-lock.json .production_bundle/
cp server.js .production_bundle/
cp next.config.ts .production_bundle/
cp -r .next .production_bundle/
cp -r public .production_bundle/
cp -r src .production_bundle/
[ -f .env ] && cp .env .production_bundle/

echo "=== 3. Streaming Production Bundle to Remote Production Server ==="
ssh ethernet "rm -rf /home/treepass/interiordesign.akilinova.co.ke/.next/server/route-cache 2>/dev/null || true"
tar -czf - -C .production_bundle . | ssh ethernet "tar -xzf - -C /home/treepass/interiordesign.akilinova.co.ke/"

echo "=== 4. Activating Environment, Updating Dependencies & Restarting LiteSpeed/NodeJS ==="
ssh ethernet "source /home/treepass/nodevenv/interiordesign.akilinova.co.ke/22/bin/activate && cd /home/treepass/interiordesign.akilinova.co.ke && npm install --omit=dev && cloudlinux-selector restart --json --interpreter nodejs --user treepass --app-root interiordesign.akilinova.co.ke && mkdir -p tmp && touch tmp/restart.txt"

echo "=== 5. Cleaning Local Build Artifacts ==="
rm -rf .production_bundle

echo "=== 6. Validating Live Production Endpoint ==="
sleep 2
curl -sI https://interiordesign.akilinova.co.ke/ | head -n 10

echo "=== Deployment Successful! ==="

