// Web表示を行う
function doGet()
{
  const html = HtmlService.createTemplateFromFile("index").evaluate();
  html.setTitle("ShiftMaxImporter");
  return html;
}

// カレンダー名一覧を取得し、HTMLラジオボタンとして出力
function GetCalenderNameHTML()
{
  const maincalender_name = "メインカレンダー"
  var html ="";
  var calenders = CalendarApp.getAllCalendars();
  for(let i = calenders.length - 1; i >= 0; i--) {
    let calender = calenders[i];
    let id = calender.getId();

    // カレンダー名 = カレンダーIDなら「メインカレンダー」と表示
    let name = calender.getName() == id ? maincalender_name: calender.getName();

    // メインカレンダーにデフォルトでチェック
    let checked = name == maincalender_name ? ' checked="checked"' : "";

    html += '<p><input type="radio" name="calender_id" value="' + id + '"' + checked + ' />' + name + '</p>\n';
  };
  return html;
}

// GoogleCalender処理
// [calender_id] カレンダーID（xxx@gmail.com）
// [google_table] CSV形式テーブル（title,yyyy/mm/dd hh:mm,yyyy/mm/dd hh:mm）
// [alarm_minute] アラーム通知（分）
function ImportGoogleCalender(calender_id, google_table, alarms)
{
  var count = 0; // 登録件数

  // カレンダー取得
  var calender = CalendarApp.getCalendarById(calender_id);
  if (calender != null)
  {
    var rows = google_table.split("\n");
    rows.forEach(row => {
      if (0 < row.length)     // カラのデータは無視
      {
        let cols = row.split(",");
        if (0 < cols.length)
        {
          let title = cols[0];
          let startdate = cols[1];
          let enddate = cols[2];

          // 休日は終日イベントとして登録
          if (title == "法定休日" || title == "所定休日" || title == "希望休" || title == "有給休暇") {
            calender.createAllDayEvent(title, new Date(startdate));
          }
          // それ以外は開始、終了時刻を登録
          else {
            let event = calender.createEvent(title, new Date(startdate), new Date(enddate));

            // アラーム通知の登録
            // 配列で届くので個別に登録
            alarms.forEach(alarm => {
              if (0 < alarm) {
                event.addPopupReminder(alarm);
              }
            });
          }
          count++;
        }
      }
    });
  }
  return count;
}