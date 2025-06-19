#!/bin/bash

set -e

if [ ! -d ".venv" ]; then
    python3 -m venv .venv
fi

. ./.venv/bin/activate

python3 -m pip install -r requirements.txt
python3 src/build/GenerateDatasScraper.py
