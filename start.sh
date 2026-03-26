#!/bin/bash
# Chatwork ルーム設計デモツール 起動スクリプト
cd "$(dirname "$0")"
echo "Chatwork ルーム設計デモツールを起動します..."
echo "ブラウザで開きます: http://localhost:8080"
echo "終了するには Ctrl+C を押してください"
python3 -m http.server 8080 &
SERVER_PID=$!
sleep 1
open "http://localhost:8080"
wait $SERVER_PID
