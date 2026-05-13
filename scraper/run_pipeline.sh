#!/bin/bash
# ArtMarket Insights — Daily Data Pipeline Runner
# Run via cron: 0 6 * * * /path/to/scraper/run_pipeline.sh

set -e

SCRAPER_DIR="$(cd "$(dirname "$0")" && pwd)"
VENV="$SCRAPER_DIR/venv"
LOG_DIR="$SCRAPER_DIR/logs"
DATA_DIR="$SCRAPER_DIR/data"

mkdir -p "$LOG_DIR" "$DATA_DIR"

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="$LOG_DIR/pipeline_$TIMESTAMP.log"

echo "🎨 ArtMarket Insights Pipeline — $TIMESTAMP" | tee "$LOG_FILE"

# Activate venv
source "$VENV/bin/activate"

# Run data collection
echo "📡 Phase 1: Data Collection..." | tee -a "$LOG_FILE"
python "$SCRAPER_DIR/main.py" --mode collect --output-prefix "artmarket" 2>&1 | tee -a "$LOG_FILE"

# Run scoring
echo "🧮 Phase 2: EPI Scoring..." | tee -a "$LOG_FILE"
python "$SCRAPER_DIR/scoring.py" 2>&1 | tee -a "$LOG_FILE"

# Copy latest data to the Next.js app
echo "📦 Phase 3: Exporting to app..." | tee -a "$LOG_FILE"
LATEST_JSON=$(ls -t "$DATA_DIR"/artmarket_*.json 2>/dev/null | head -1)
if [ -n "$LATEST_JSON" ]; then
    cp "$LATEST_JSON" "$SCRAPER_DIR/../data/artists_latest.json"
    echo "✅ Copied $LATEST_JSON -> data/artists_latest.json" | tee -a "$LOG_FILE"
else
    echo "⚠️ No data files found to export" | tee -a "$LOG_FILE"
fi

echo "✅ Pipeline complete! Log: $LOG_FILE"
