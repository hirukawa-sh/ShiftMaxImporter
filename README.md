# ShiftMaxImporter
## 概要
KYODOU株式会社製シフト管理ツール[ShiftMax](https://shiftmax.co.jp/)で作成されたシフト表を、Googleカレンダーに取り込むツールです。
## URL
https://script.google.com/macros/s/AKfycbwyrZjEpauddee6ttSV0o5L_FsxNaOFeU1yIQm6dRIeKuC0aT32ANU3pehW--CUMKXL7Q/exec
## 使用した技術、言語
+ Google App Script
+ JavaScript - JQuery
+ HTML/CSS
## 開発のきっかけ
+ 前職にて、勤怠管理ツールとして利用されていたが、シフトのエクスポート機能が搭載されておらず、
都度、アプリを開いてシフトを確認する必要があった。
+ 自身は、スケジュールをスマートフォンのカレンダーアプリで管理していた為、
Googleカレンダー経由で取り込みができるツールが必要だった。
## 要件
+ スマートフォンとPCの両方で利用できること。
+ GoogleカレンダーAPIを利用したかった為、Google App Scriptを採用。
## 問題点
シフト表はHTMLで出力されており、また外部APIも提供されておらず、取り込み方法が不明。
## 解決策
ひとまず、テーブルを手動でコピー＆ペーストし、テキストを解析する形で取り込みに成功。
自動化するためにはスクレイピング技術が必要だが、身についていない為、断念。
