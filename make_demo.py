# -*- coding: utf-8 -*-
"""index.html から demo.html を再生成する（index.html 更新後に実行）"""
import io, os
D = os.path.dirname(os.path.abspath(__file__))
s = io.open(os.path.join(D, 'index.html'), encoding='utf-8').read()
s = s.replace("'tt_", "'ttdemo_")
s = s.replace("<title>チームタスクボード</title>", "<title>チームタスクボード（デモ）</title>")
s = s.replace("👥 チームタスク</span>", "👥 チームタスク（デモ）</span>")
s = s.replace('<button onclick="openSettings()">設定</button>',
              '<button onclick="openSettings()">設定</button>\n  <button onclick="resetDemo()">デモをリセット</button>')
s = s.replace("</body>", '<script src="demo-seed.js"></script>\n</body>')
io.open(os.path.join(D, 'demo.html'), 'w', encoding='utf-8', newline='\n').write(s)
print('demo.html regenerated', len(s))
