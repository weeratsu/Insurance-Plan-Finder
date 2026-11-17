/**
 * Insurance Plan Finder — Customers API (Nov 16 2026). Google Apps Script Web App.
 * Sheet tab "Customers": row 1 = header, 1 row per customer. pages = JSON list of linked page ids.
 * Setup: new Google Sheet "IPF Customers" > Extensions > Apps Script > paste > Run setup() once (log shows TOKEN)
 *        > Deploy > New deployment > Web app (Execute as: Me, Access: Anyone) > copy URL.
 * POST (text/plain) JSON {token, action:'get'} | {token, action:'save', rows:[...]}
 * Safety: 'save' with 0 rows is refused if the sheet has data; every save keeps the previous copy in tab "History".
 */
var COLS = ['id', 'name', 'sex', 'age', 'dob', 'icon', 'pages', 'note', 'updated_at', 'bought'];
function setup() {
  var ss = SpreadsheetApp.getActive();
  ['Customers', 'History'].forEach(function (n) { if (!ss.getSheetByName(n)) ss.insertSheet(n); });
  ss.getSheetByName('Customers').getRange(1, 1, 1, COLS.length).setValues([COLS]).setFontWeight('bold');
  ss.getSheetByName('History').getRange(1, 1, 1, 2).setValues([['ts', 'json']]).setFontWeight('bold');
  var p = PropertiesService.getScriptProperties();
  if (!p.getProperty('TOKEN')) p.setProperty('TOKEN', Utilities.getUuid().replace(/-/g, ''));
  Logger.log('TOKEN = ' + p.getProperty('TOKEN'));
}
function doGet() { return out_({ ok: true, app: 'IPF Customers API' }); }
function doPost(e) {
  var r; try { r = JSON.parse(e.postData.contents || '{}'); } catch (x) { return out_({ ok: false, error: 'bad json' }); }
  if (r.token !== PropertiesService.getScriptProperties().getProperty('TOKEN')) return out_({ ok: false, error: 'unauthorized' });
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var sh = SpreadsheetApp.getActive().getSheetByName('Customers'); if (!sh) { setup(); sh = SpreadsheetApp.getActive().getSheetByName('Customers'); }
    var cur = read_(sh);
    if (r.action === 'get') return out_({ ok: true, rows: cur });
    if (r.action === 'save') {
      var rows = r.rows || [];
      if (!rows.length && cur.length) return out_({ ok: false, error: 'refusing to save 0 rows over ' + cur.length + ' existing' });
      var h = SpreadsheetApp.getActive().getSheetByName('History');
      h.appendRow([new Date().toISOString(), JSON.stringify(cur)]);
      if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, COLS.length).clearContent();
      var now = new Date().toISOString();
      var vals = rows.map(function (o) { return COLS.map(function (c) { var v = c === 'updated_at' ? (o[c] || now) : o[c]; return v == null ? '' : (typeof v === 'object' ? JSON.stringify(v) : v); }); });
      if (vals.length) sh.getRange(2, 1, vals.length, COLS.length).setValues(vals);
      return out_({ ok: true, rows: vals.length });
    }
    return out_({ ok: false, error: 'unknown action' });
  } catch (x) { return out_({ ok: false, error: String(x) }); } finally { try { lock.releaseLock(); } catch (x) { } }
}
function read_(sh) {
  var n = sh.getLastRow() - 1; if (n < 1) return [];
  return sh.getRange(2, 1, n, COLS.length).getValues().filter(function (r) { return r[0] !== ''; }).map(function (r) {
    var o = {}; COLS.forEach(function (c, i) { o[c] = r[i] instanceof Date ? Utilities.formatDate(r[i], 'Asia/Bangkok', 'yyyy-MM-dd') : r[i]; });
    try { o.pages = o.pages ? JSON.parse(o.pages) : []; } catch (e) { o.pages = []; }
    try { o.bought = o.bought ? JSON.parse(o.bought) : null; } catch (e) { o.bought = null; }
    return o;
  });
}
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
