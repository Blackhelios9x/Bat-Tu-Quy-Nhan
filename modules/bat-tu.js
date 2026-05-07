// ========================================================
// MODULE BÁT TỰ
// Chức năng: Dụng Thần · Đại Vận · Tiểu Vận · Lưu Niên
// Cấu trúc: Custom Element (giống TuViModule trong an-sao.js)
// Yêu cầu : thư viện lunar-javascript phải được load trước
// Đăng ký : <bat-tu-module></bat-tu-module>
// Sự kiện : phát 'batu-ready' sau khi tính xong
// ========================================================

class BatTuModule extends HTMLElement {

  constructor() {
    super();

    // ── Trạng thái nội bộ ──
    this._currentBazi         = null;  // Bát Tự {year,month,day,hour}
    this._currentDungThanInfo = null;  // {bz, dt1, dt2, isWeak, nhCan}
    this._currentDaiVanList   = null;  // Array 8 đại vận
    this._uploadedSuggestions = null;  // Map từ GitHub

    // ── Toàn bộ UI nằm trong innerHTML ──
    this.innerHTML = /* html */`
      <style>
        /* ──────────────────────────────────────────
           BIẾN CSS – dùng :host để đóng gói
        ────────────────────────────────────────── */
        :host {
          /* Màu nền / khung */
          --bt-primary : #a67c4e;
          --bt-pri-l   : #c8a87c;
          --bt-pri-d   : #5e3e22;
          --bt-bg      : #fbf7f0;
          --bt-card    : #ffffffdd;
          --bt-bor     : #e3d6c5;
          --bt-bor-h   : #c9aa8b;
          --bt-text    : #1f150c;
          --bt-text-l  : #4d3a28;
          --bt-muted   : #7a6048;
          --bt-muted2  : #9c8268;
          --bt-in-bg   : #fefcf8;
          --bt-err     : #b33f3d;
          --bt-shadow  : 0 8px 20px rgba(0,0,0,.05);
          /* Ngũ Hành */
          --c-kim:#5c5c5c; --bg-kim:#e0e0e0;
          --c-moc:#2e7d32; --bg-moc:#e8f5e9;
          --c-thuy:#ffffff; --bg-thuy:#1976d2;
          --c-hoa:#c62828; --bg-hoa:#ffebee;
          --c-tho:#5d4037; --bg-tho:#fbc02d;

          display: block;
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
          color: var(--bt-text);
        }

        /* ── Reset ── */
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        .bt-wrap {
          width:100%; max-width:1000px;
          margin:0 auto; padding:0 4px 40px;
        }

        /* ─────────────── CARD ─────────────── */
        .bt-card {
          background:var(--bt-card); border:1px solid var(--bt-bor);
          border-radius:18px; padding:22px 20px; margin-bottom:18px;
          box-shadow:var(--bt-shadow);
        }
        .bt-ctitle {
          font-size:.9rem; font-weight:700; color:var(--bt-pri-d);
          margin-bottom:16px; display:flex; align-items:center; gap:8px;
        }
        .bt-ctitle::after { content:''; flex:1; height:1px; background:var(--bt-bor); }

        /* ─────────────── FORM ─────────────── */
        .bt-irow { display:flex; flex-wrap:wrap; gap:12px; align-items:flex-end; }
        .bt-ig   { display:flex; flex-direction:column; gap:4px; }
        .bt-ig label {
          font-size:.68rem; color:var(--bt-muted);
          text-transform:uppercase; letter-spacing:.4px;
        }
        .bt-input, .bt-select {
          background:var(--bt-in-bg); border:1px solid var(--bt-bor);
          border-radius:10px; padding:10px 12px; font-size:.93rem;
          font-family:inherit; color:var(--bt-text); outline:none;
          transition:border-color .18s;
        }
        .bt-input:focus, .bt-select:focus {
          border-color:var(--bt-primary);
          box-shadow:0 0 0 3px rgba(166,124,78,.13);
        }
        .bt-input.invalid { border-color:var(--bt-err) !important; }
        .bt-select { cursor:pointer; }
        .bt-select option { background:#fffbf5; }
        .bt-errtxt   { color:var(--bt-err);   font-size:.73rem; margin-top:4px; }
        .bt-info-note{ color:var(--bt-muted2); font-size:.75rem; margin-top:5px; }

        /* ── Giới tính toggle ── */
        .bt-gender-row {
          display:flex; background:var(--bt-in-bg); border:1px solid var(--bt-bor);
          border-radius:10px; overflow:hidden; min-width:130px;
        }
        .bt-gender-opt { flex:1; }
        .bt-gender-opt input[type=radio] { display:none; }
        .bt-gender-opt label {
          display:block; width:100%; padding:10px 8px; text-align:center;
          cursor:pointer; font-size:.93rem; font-weight:500;
          color:var(--bt-muted); transition:all .18s;
        }
        .bt-gender-opt:first-child label { border-radius:9px 0 0 9px; }
        .bt-gender-opt:last-child  label { border-radius:0 9px 9px 0; }
        .bt-gender-opt input[type=radio]:checked + label {
          background:var(--bt-primary); color:white; font-weight:700;
        }

        /* ─────────────── NÚT CHÍNH ─────────────── */
        .bt-btn-main {
          display:block; margin:18px auto 22px; padding:13px 36px;
          background:var(--bt-primary); color:white;
          border:none; border-radius:40px; font-size:.97rem; font-weight:700;
          cursor:pointer; text-transform:uppercase; font-family:inherit;
          box-shadow:0 6px 14px rgba(166,124,78,.28);
          transition:background .18s, transform .15s;
        }
        .bt-btn-main:hover  { background:var(--bt-pri-d); transform:translateY(-2px); }
        .bt-btn-main:active { transform:none; }

        /* ─────────────── BÁT TỰ ─────────────── */
        .bt-bz-table {
          display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin:12px 0;
        }
        .bt-bz-col  { text-align:center; }
        .bt-bz-lbl  {
          display:block; font-size:.66rem; color:var(--bt-muted);
          font-weight:600; margin-bottom:5px;
        }
        .bt-bz-cell {
          padding:13px 4px; border-radius:14px; font-size:1.25rem; font-weight:700;
          border:1px solid transparent; margin-bottom:4px;
        }
        /* Màu Ngũ Hành */
        .nh-kim  { color:var(--c-kim);  background:var(--bg-kim);  border-color:#bdbdbd; }
        .nh-moc  { color:var(--c-moc);  background:var(--bg-moc);  border-color:#a5d6a7; }
        .nh-thuy { color:var(--c-thuy); background:var(--bg-thuy); border-color:#64b5f6; }
        .nh-hoa  { color:var(--c-hoa);  background:var(--bg-hoa);  border-color:#ef9a9a; }
        .nh-tho  { color:var(--c-tho);  background:var(--bg-tho);  border-color:#ffe082; }

        .bt-nh-ref { display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin-top:6px; }
        .bt-nh-tag {
          padding:7px 18px; border-radius:40px; font-weight:700;
          border:2px solid; background:white; font-size:.88rem;
        }
        .bt-nh-tag.sm { padding:2px 10px; font-size:.74rem; border-width:1px; border-radius:14px; }
        .bt-nh-tag.kim  { color:var(--c-kim);  border-color:var(--c-kim);  }
        .bt-nh-tag.moc  { color:var(--c-moc);  border-color:var(--c-moc);  }
        .bt-nh-tag.thuy { color:#1565c0;        border-color:#1976d2;       }
        .bt-nh-tag.hoa  { color:var(--c-hoa);  border-color:var(--c-hoa);  }
        .bt-nh-tag.tho  { color:#b26a00;        border-color:#fbc02d;       }

        /* ─────────────── ĐẠI VẬN ─────────────── */
        .bt-sub-section {
          margin-top:18px; padding-top:16px;
          border-top:1px dashed var(--bt-bor-h);
        }
        .bt-sub-title {
          font-size:.86rem; font-weight:700; color:var(--bt-pri-d);
          margin-bottom:8px; display:flex; align-items:center; gap:8px;
        }
        .bt-sub-title::after { content:''; flex:1; height:1px; background:var(--bt-bor); }

        /* Lưới 8 ô đại vận – cuộn ngang trên mobile */
        .bt-dv-grid {
          display:grid; grid-template-columns:repeat(8,1fr); gap:7px;
        }
        .bt-dv-item {
          text-align:center; background:var(--bt-in-bg); border:1px solid var(--bt-bor);
          border-radius:12px; padding:9px 3px; cursor:pointer;
          transition:transform .1s, background .15s, border-color .15s;
        }
        .bt-dv-item:hover  { background:rgba(166,124,78,.08); transform:scale(.97); }
        .bt-dv-item.active { background:rgba(166,124,78,.18); border-color:var(--bt-primary); }
        .bt-dv-age  { font-size:.59rem; color:var(--bt-muted); line-height:1.35; }
        .bt-dv-year { display:block; font-size:.55rem; color:var(--bt-muted2); }
        .bt-dv-gz   { font-size:.95rem; font-weight:700; margin-top:2px; }

        .bt-dv-meta {
          font-size:.72rem; color:var(--bt-muted); background:#f7f0e6;
          border-radius:9px; padding:7px 12px; margin-bottom:10px; line-height:1.6;
        }
        .bt-dv-meta strong { color:var(--bt-pri-d); }

        /* ─────────────── TIỂU VẬN ─────────────── */
        /* Lưới Tiểu Vận – ít ô hơn, flex để cuộn ngang */
        .bt-tv-grid {
          display:flex; flex-wrap:wrap; gap:8px;
        }
        .bt-tv-item {
          flex:0 0 auto; min-width:68px; text-align:center;
          background:var(--bt-in-bg); border:1px solid var(--bt-bor);
          border-radius:12px; padding:8px 4px; cursor:pointer;
          transition:transform .1s, background .15s, border-color .15s;
        }
        .bt-tv-item:hover  { background:rgba(166,124,78,.08); transform:scale(.97); }
        .bt-tv-item.active { background:rgba(166,124,78,.18); border-color:var(--bt-primary); }
        .bt-tv-age  { font-size:.59rem; color:var(--bt-muted); line-height:1.35; }
        .bt-tv-year { display:block; font-size:.55rem; color:var(--bt-muted2); }
        .bt-tv-gz   { font-size:.95rem; font-weight:700; margin-top:2px; }

        /* Nhãn "Không có Tiểu Vận" */
        .bt-tv-empty {
          font-size:.8rem; color:var(--bt-muted2); font-style:italic; padding:4px 0;
        }

        /* ─────────────── DETAIL BOX (chung) ─────────────── */
        .bt-detail-box {
          margin-top:14px; background:#fcf9f5; border:1px solid var(--bt-bor);
          border-radius:16px; padding:18px;
        }
        .bt-detail-title {
          font-size:.93rem; font-weight:700; color:var(--bt-pri-d); margin-bottom:10px;
        }
        .bt-detail-content { font-size:.84rem; line-height:1.82; }

        /* ─────────────── LƯU NIÊN ─────────────── */
        .bt-ln-title {
          font-size:.82rem; font-weight:700; color:var(--bt-pri-d);
          margin-bottom:8px;
        }
        .bt-ln-grid {
          display:flex; overflow-x:auto; gap:8px;
          padding:4px 0 10px; -webkit-overflow-scrolling:touch;
          scrollbar-width:thin;
        }
        .bt-ln-item {
          flex:0 0 72px; text-align:center; cursor:pointer;
          border-radius:12px; padding:7px 3px; border:1px solid var(--bt-bor);
          background:var(--bt-in-bg); transition:transform .1s, background .15s;
        }
        .bt-ln-item:hover  { background:rgba(166,124,78,.08); transform:scale(.97); }
        .bt-ln-item.active { background:rgba(166,124,78,.18); border-color:var(--bt-primary); }
        .bt-ln-year   { font-size:.64rem; color:var(--bt-muted); margin-bottom:3px; }
        .bt-ln-canchi { font-size:.93rem; font-weight:700; }

        /* Chi tiết lưu niên */
        .bt-ln-detail {
          margin-top:12px; background:#f4efe8; border-radius:14px;
          padding:14px 16px; border-left:4px solid var(--bt-primary);
        }
        .bt-ln-detail-title   { font-weight:700; color:var(--bt-pri-d); margin-bottom:8px; font-size:.87rem; }
        .bt-ln-detail-content { font-size:.82rem; line-height:1.82; }

        /* ─────────────── KẾT LUẬN DỤNG THẦN ─────────────── */
        .bt-verdict { border-radius:18px; padding:22px; background:#fcf9f5; border:1px solid var(--bt-bor); }
        .bt-verdict-title { font-size:1.15rem; font-weight:700; color:var(--bt-pri-d); margin-bottom:8px; }
        .bt-verdict-body  { font-size:.93rem; margin-bottom:14px; line-height:1.7; }
        .bt-nh-tags { display:flex; flex-wrap:wrap; gap:10px; margin:14px 0; }

        /* GỢI Ý */
        .bt-suggest-box {
          background:#f4efe8; border-radius:16px; padding:18px;
          margin-top:16px; border-left:5px solid var(--bt-primary);
        }
        .bt-suggest-title { font-weight:700; color:var(--bt-pri-d); margin-bottom:14px; font-size:.98rem; }
        .bt-suggest-grid  { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .bt-suggest-col h4 {
          font-size:.93rem; color:var(--bt-pri-d); margin-bottom:9px;
          border-bottom:1px dashed var(--bt-bor-h); padding-bottom:5px;
        }
        .bt-suggest-content { white-space:pre-wrap; line-height:1.72; font-size:.86rem; }

        /* ─────────────── RESPONSIVE ─────────────── */
        @media (max-width:600px) {
          .bt-suggest-grid { grid-template-columns:1fr; gap:14px; }
          .bt-irow  { flex-direction:column; align-items:stretch; }
          .bt-ig    { width:100%; }
          .bt-dv-grid {
            display:flex; overflow-x:auto; gap:6px;
          }
          .bt-dv-item { flex:0 0 64px; }
          .bt-tv-item { min-width:62px; }
        }
      </style>

      <div class="bt-wrap">

        <!-- ═══════════════════════════════
             FORM NHẬP LIỆU
        ═══════════════════════════════ -->
        <div class="bt-card">
          <div class="bt-ctitle">📅 Thông tin ngày giờ sinh</div>
          <div class="bt-irow">

            <!-- Ngày sinh -->
            <div class="bt-ig">
              <label>Ngày sinh (dd/mm/yyyy)</label>
              <input type="text" class="bt-input" id="bt-dt-date"
                     placeholder="15/01/1990" value="15/01/1990"
                     inputmode="numeric" style="width:175px">
            </div>

            <!-- Giờ sinh -->
            <div class="bt-ig">
              <label>Giờ sinh</label>
              <select class="bt-select" id="bt-dt-hour" style="width:190px">
                <option value="0" >00:00–00:59 · Tý</option>
                <option value="1" >01:00–01:59 · Sửu</option>
                <option value="2" >02:00–02:59 · Sửu</option>
                <option value="3" >03:00–03:59 · Dần</option>
                <option value="4" >04:00–04:59 · Dần</option>
                <option value="5" >05:00–05:59 · Mão</option>
                <option value="6" >06:00–06:59 · Mão</option>
                <option value="7" >07:00–07:59 · Thìn</option>
                <option value="8" >08:00–08:59 · Thìn</option>
                <option value="9" >09:00–09:59 · Tỵ</option>
                <option value="10">10:00–10:59 · Tỵ</option>
                <option value="11">11:00–11:59 · Ngọ</option>
                <option value="12" selected>12:00–12:59 · Ngọ</option>
                <option value="13">13:00–13:59 · Mùi</option>
                <option value="14">14:00–14:59 · Mùi</option>
                <option value="15">15:00–15:59 · Thân</option>
                <option value="16">16:00–16:59 · Thân</option>
                <option value="17">17:00–17:59 · Dậu</option>
                <option value="18">18:00–18:59 · Dậu</option>
                <option value="19">19:00–19:59 · Tuất</option>
                <option value="20">20:00–20:59 · Tuất</option>
                <option value="21">21:00–21:59 · Hợi</option>
                <option value="22">22:00–22:59 · Hợi</option>
                <option value="23">23:00–23:59 · Tý</option>
              </select>
            </div>

            <!-- Giới tính -->
            <div class="bt-ig">
              <label>Giới tính</label>
              <div class="bt-gender-row">
                <div class="bt-gender-opt">
                  <input type="radio" name="bt-gender" id="bt-g-male" value="male" checked>
                  <label for="bt-g-male">♂ Nam</label>
                </div>
                <div class="bt-gender-opt">
                  <input type="radio" name="bt-gender" id="bt-g-female" value="female">
                  <label for="bt-g-female">♀ Nữ</label>
                </div>
              </div>
            </div>

          </div><!-- /.bt-irow -->
          <div class="bt-errtxt"    id="bt-dt-err"></div>
          <div class="bt-info-note" id="bt-data-info">Đang tải dữ liệu gợi ý…</div>
        </div><!-- /.bt-card -->

        <button class="bt-btn-main" id="bt-btn-calc">🔥 Tìm Dụng Thần</button>

        <!-- ═══════════════════════════════
             KHU VỰC KẾT QUẢ
        ═══════════════════════════════ -->
        <div id="bt-dt-result" style="display:none">

          <!-- ── Bát Tự + Tiểu Vận + Đại Vận ── -->
          <div class="bt-card">
            <div class="bt-ctitle">📊 Bát Tự của bạn</div>

            <!-- Bảng 4 trụ -->
            <div class="bt-bz-table" id="bt-bz-table"></div>
            <div class="bt-nh-ref"   id="bt-nh-ref"></div>

            <!-- ── TIỂU VẬN ── -->
            <div class="bt-sub-section" id="bt-tv-section" style="display:none">
              <div class="bt-sub-title">🌱 Tiểu Vận (trước khi Đại Vận bắt đầu)</div>
              <div class="bt-dv-meta" id="bt-tv-meta"></div>
              <div class="bt-tv-grid" id="bt-tv-grid"></div>

              <!-- Chi tiết tiểu vận năm được click -->
              <div class="bt-detail-box" id="bt-tv-detail" style="display:none">
                <div class="bt-detail-title"   id="bt-tv-detail-title">✨ Luận giải Tiểu Vận</div>
                <div class="bt-detail-content" id="bt-tv-detail-content"></div>
              </div>
            </div><!-- /#bt-tv-section -->

            <!-- ── ĐẠI VẬN ── -->
            <div class="bt-sub-section" id="bt-dv-section" style="display:none">
              <div class="bt-sub-title" id="bt-dv-title">🔮 Đại Vận</div>
              <div class="bt-dv-meta"   id="bt-dv-meta"></div>
              <div class="bt-dv-grid"   id="bt-dv-grid"></div>

              <!-- Chi tiết đại vận + lưu niên bên trong -->
              <div class="bt-detail-box" id="bt-dv-detail" style="display:none">
                <div class="bt-detail-title"   id="bt-dv-detail-title">✨ Luận giải Đại Vận</div>
                <div class="bt-detail-content" id="bt-dv-detail-content"></div>

                <!-- Lưu Niên 10 năm của đại vận đang xem -->
                <div class="bt-sub-section" id="bt-ln-section" style="display:none">
                  <div class="bt-ln-title" id="bt-ln-title">📅 Lưu Niên</div>
                  <div class="bt-ln-grid"  id="bt-ln-grid"></div>
                  <!-- Chi tiết năm -->
                  <div class="bt-ln-detail" id="bt-ln-detail" style="display:none">
                    <div class="bt-ln-detail-title"   id="bt-ln-detail-title">✨ Luận giải năm</div>
                    <div class="bt-ln-detail-content" id="bt-ln-detail-content"></div>
                  </div>
                </div><!-- /#bt-ln-section -->
              </div><!-- /#bt-dv-detail -->

            </div><!-- /#bt-dv-section -->
          </div><!-- /.bt-card -->

          <!-- ── Kết luận Dụng Thần ── -->
          <div class="bt-verdict" id="bt-verdict"></div>

        </div><!-- /#bt-dt-result -->

      </div><!-- /.bt-wrap -->
    `;
  }

  // ══════════════════════════════════════════════════════
  //   VÒNG ĐỜI WEB COMPONENT
  // ══════════════════════════════════════════════════════
  connectedCallback() {
    if (typeof Solar === 'undefined') {
      console.error('BatTuModule: lunar-javascript chưa được load.');
      return;
    }
    this.querySelector('#bt-btn-calc')
        .addEventListener('click', () => this._calcDungThan());
    this._fetchSuggestions();
  }

  // ══════════════════════════════════════════════════════
  //   HẰNG SỐ TĨNH
  //   (giống pattern TuViModule trong an-sao.js — static get)
  // ══════════════════════════════════════════════════════

  /** Thiên Can */
  static get CAN()     { return ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý']; }
  /** Địa Chi */
  static get CHI()     { return ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi']; }
  /** Can Hán tự (để parse từ lunar-javascript) */
  static get CAN_HAN() { return ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']; }
  /** Chi Hán tự */
  static get CHI_HAN() { return ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']; }
  /** Tên Ngũ Hành: 0=Mộc 1=Hỏa 2=Thổ 3=Kim 4=Thủy */
  static get NH_NAME() { return ['Mộc','Hỏa','Thổ','Kim','Thủy']; }
  /** CSS class Ngũ Hành */
  static get NH_CSS()  { return ['moc','hoa','tho','kim','thuy']; }
  /** Ngũ Hành Thiên Can (index 0-9) */
  static get NH_CAN()  { return [0,0,1,1,2,2,3,3,4,4]; }
  /** Ngũ Hành Địa Chi (index 0-11) */
  static get NH_CHI()  { return [4,2,0,0,2,1,1,2,3,3,2,4]; }
  /** Tương sinh: SINH[x]=y → x sinh y (Mộc→Hỏa→Thổ→Kim→Thủy→Mộc) */
  static get SINH()    { return [1,2,3,4,0]; }
  /** Tương khắc: KHAC[x]=y → x khắc y */
  static get KHAC()    { return [2,3,4,0,1]; }
  /** Lục xung (6 cặp địa chi đối nhau) */
  static get LUC_XUNG(){ return [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]]; }
  /** Lục hại */
  static get LUC_HAI() { return [[0,5],[1,6],[2,7],[3,8],[4,9],[10,11]]; }
  /** Lục hợp */
  static get LUC_HOP() { return [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]]; }

  /** URL file gợi ý trên GitHub */
  static get GITHUB_URL() {
    return 'https://raw.githubusercontent.com/Blackhelios9x/Bat-Tu-Quy-Nhan/main/dung-than.txt';
  }

  /** Gợi ý mặc định (fallback khi không tải được GitHub) */
  static get DEFAULT_SUGGESTIONS() {
    return {
      0:'- Màu sắc: xanh lá cây\n- Trang sức: vòng tay gỗ, đá xanh lục\n- Hướng: Đông, Đông Nam\n- Mẹo: Mặc đồ màu xanh lá, dùng cây cảnh.',
      1:'- Màu sắc: đỏ, hồng, cam\n- Trang sức: vòng đá mã não đỏ, thạch anh hồng\n- Hướng: Nam\n- Mẹo: Dùng nến, ánh sáng ấm, đồ điện tử.',
      2:'- Màu sắc: vàng cát, nâu\n- Trang sức: vòng đá mắt hổ, thạch anh vàng\n- Hướng: Đông Bắc, Tây Nam\n- Mẹo: Sử dụng đồ gốm sứ, màu ấm.',
      3:'- Màu sắc: trắng, xám, bạc\n- Trang sức: vòng bạc, đá trắng, kim loại\n- Hướng: Tây, Tây Bắc\n- Mẹo: Đeo trang sức kim loại, dùng đồ kim khí.',
      4:'- Màu sắc: xanh dương, đen\n- Trang sức: vòng đá aquamarine, obsidian\n- Hướng: Bắc\n- Mẹo: Dùng hồ cá, tranh nước, màu tối.',
    };
  }

  // ══════════════════════════════════════════════════════
  //   HELPER — NGŨ HÀNH
  // ══════════════════════════════════════════════════════

  _nhCss(nh)  { return nh >= 0 ? BatTuModule.NH_CSS[nh] : ''; }

  _nhTag(nh, sm = false) {
    return `<span class="bt-nh-tag${sm?' sm':''} ${this._nhCss(nh)}">${BatTuModule.NH_NAME[nh]}</span>`;
  }

  _trungHoacSinh(nhA, nhB) {
    return nhB === nhA || BatTuModule.SINH[nhB] === nhA;
  }

  _xung(i1, i2) {
    return BatTuModule.LUC_XUNG.some(p => (p[0]===i1&&p[1]===i2)||(p[1]===i1&&p[0]===i2));
  }
  _hai(i1, i2) {
    return BatTuModule.LUC_HAI.some(p  => (p[0]===i1&&p[1]===i2)||(p[1]===i1&&p[0]===i2));
  }
  _hop(i1, i2) {
    return BatTuModule.LUC_HOP.some(p  => (p[0]===i1&&p[1]===i2)||(p[1]===i1&&p[0]===i2));
  }

  // ══════════════════════════════════════════════════════
  //   PARSE ĐẦU VÀO
  // ══════════════════════════════════════════════════════

  _parseDateDMY(str) {
    if (!str) return null;
    const p = str.trim().split('/');
    if (p.length !== 3) return null;
    const d = parseInt(p[0],10), m = parseInt(p[1],10), y = parseInt(p[2],10);
    if (isNaN(d)||isNaN(m)||isNaN(y)) return null;
    if (m<1||m>12||d<1||d>31||y<1900||y>2100) return null;
    const dt = new Date(y,m-1,d);
    if (dt.getFullYear()!==y||dt.getMonth()!==m-1||dt.getDate()!==d) return null;
    return {d, m, y};
  }

  // ══════════════════════════════════════════════════════
  //   BÁT TỰ (lunar-javascript — đúng tiết khí)
  // ══════════════════════════════════════════════════════

  _getBaZi(y, m, d, h, mi) {
    const solar = Solar.fromYmdHms(y, m, d, h, mi, 0);
    const ec    = solar.getLunar().getEightChar();
    return {
      year:  this._parseGZ(ec.getYear()),
      month: this._parseGZ(ec.getMonth()),
      day:   this._parseGZ(ec.getDay()),
      hour:  this._parseGZ(ec.getTime()),
    };
  }

  _parseGZ(gz) {
    const si = BatTuModule.CAN_HAN.indexOf(gz[0]);
    const bi = BatTuModule.CHI_HAN.indexOf(gz[1]);
    return {
      si, bi,
      can:   si >= 0 ? BatTuModule.CAN[si] : '?',
      chi:   bi >= 0 ? BatTuModule.CHI[bi] : '?',
      nhCan: si >= 0 ? BatTuModule.NH_CAN[si] : -1,
      nhChi: bi >= 0 ? BatTuModule.NH_CHI[bi] : -1,
    };
  }

  // ══════════════════════════════════════════════════════
  //   GỢI Ý TỪ GITHUB
  // ══════════════════════════════════════════════════════

  async _fetchSuggestions() {
    const el = this.querySelector('#bt-data-info');
    try {
      const res = await fetch(BatTuModule.GITHUB_URL);
      if (!res.ok) throw new Error();
      this._uploadedSuggestions = this._parseSuggestions(await res.text());
      el.textContent = '✅ Đã tải dữ liệu gợi ý từ GitHub.';
    } catch (_) {
      this._uploadedSuggestions = null;
      el.textContent = 'ℹ️ Sử dụng gợi ý mặc định.';
    }
  }

  _parseSuggestions(text) {
    const map = new Map();
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].trim().match(/^Dụng thần\s+(Mộc|Hỏa|Thổ|Kim|Thủy)\s*$/i);
      if (m) {
        const hanh = m[1]; const buf = []; let j = i + 1;
        while (j < lines.length && !lines[j].match(/^Dụng thần\s+(Mộc|Hỏa|Thổ|Kim|Thủy)\s*$/i)) {
          buf.push(lines[j]); j++;
        }
        if (buf.join('').trim()) map.set(hanh, buf.join('\n').trim());
        i = j - 1;
      }
    }
    return map;
  }

  _getSuggestion(nhIdx) {
    const name = BatTuModule.NH_NAME[nhIdx];
    if (this._uploadedSuggestions?.has(name)) return this._uploadedSuggestions.get(name);
    return BatTuModule.DEFAULT_SUGGESTIONS[nhIdx] || '';
  }

  // ══════════════════════════════════════════════════════
  //   RENDER BÁT TỰ — BẢNG 4 TRỤ (màu Ngũ Hành)
  // ══════════════════════════════════════════════════════

  _renderBaZiTable(bz) {
    const COLS = [
      {key:'hour',  lbl:'Giờ'},
      {key:'day',   lbl:'Ngày'},
      {key:'month', lbl:'Tháng'},
      {key:'year',  lbl:'Năm'},
    ];
    let html = '';
    COLS.forEach(col => {
      const t = bz[col.key];
      html += `<div class="bt-bz-col">
        <span class="bt-bz-lbl">${col.lbl}</span>
        <div class="bt-bz-cell nh-${this._nhCss(t.nhCan)}" title="Thiên Can · ${BatTuModule.NH_NAME[t.nhCan]}">${t.can}</div>
        <div class="bt-bz-cell nh-${this._nhCss(t.nhChi)}" title="Địa Chi · ${BatTuModule.NH_NAME[t.nhChi]}">${t.chi}</div>
      </div>`;
    });
    this.querySelector('#bt-bz-table').innerHTML = html;

    let ref = '<span style="font-size:.72rem;color:var(--bt-muted)">Màu Ngũ Hành:</span>';
    BatTuModule.NH_CSS.forEach((cls, i) => {
      ref += `<span class="bt-nh-tag sm ${cls}">${BatTuModule.NH_NAME[i]}</span>`;
    });
    this.querySelector('#bt-nh-ref').innerHTML = ref;
  }

  // ══════════════════════════════════════════════════════
  //   HELPER VÒNG 60 (tính năm âm lịch can-chi từ năm DL)
  // ══════════════════════════════════════════════════════

  _gz60pos(si, bi) {
    for (let k = 0; k < 60; k++) {
      if (k % 10 === si && k % 12 === bi) return k;
    }
    return 0;
  }

  /** Trả về năm âm lịch can-chi gần nhất ≤ birthY */
  _chineseBirthYear(si, bi, birthY) {
    const pos60 = this._gz60pos(si, bi);
    let y = 1984 + pos60;                 // 1984 = Giáp Tý (gốc)
    while (y > birthY)        y -= 60;
    while (y + 60 <= birthY)  y += 60;
    return y;
  }

  // ══════════════════════════════════════════════════════
  //   ĐẠI VẬN — TÍNH TOÁN
  //   -------------------------------------------------------
  //   • Can năm chẵn (Giáp/Bính/Mậu/Canh/Nhâm) = Dương năm
  //   • Thuận: Nam-Dương || Nữ-Âm   → đếm đến tiết sau
  //   • Nghịch: Nam-Âm  || Nữ-Dương → đếm đến tiết trước
  //   • diffDays ÷ 3 = khởi vận (năm)
  //   • tuổi ĐV = năm ĐV − năm sinh âm lịch can-chi
  // ══════════════════════════════════════════════════════

  _tinhDaiVan(bz, birthY, birthM, birthD, isMale) {
    const isYangYear = bz.year.si % 2 === 0;
    const isThuan    = (isMale && isYangYear) || (!isMale && !isYangYear);

    const chineseBY  = this._chineseBirthYear(bz.year.si, bz.year.bi, birthY);
    const birthSolar = Solar.fromYmd(birthY, birthM, birthD);
    const lunar      = birthSolar.getLunar();

    let targetJie;
    try { targetJie = isThuan ? lunar.getNextJie() : lunar.getPrevJie(); }
    catch (_) { targetJie = null; }
    if (!targetJie) return null;

    const jieSolar  = targetJie.getSolar();
    const diffDays  = Math.round(Math.abs(
      jieSolar.getJulianDay() - birthSolar.getJulianDay()
    ));
    const khoiVanY  = Math.floor(diffDays / 3);
    const remDays   = diffDays % 3;
    const khoiVanM  = remDays * 4;       // 0, 4 hoặc 8 tháng dư
    const firstDVY  = birthY + khoiVanY;
    const firstDVAge= firstDVY - chineseBY;

    const mSi = bz.month.si, mBi = bz.month.bi;
    const dvList = [];
    for (let n = 1; n <= 8; n++) {
      const si = isThuan ? (mSi+n)%10  : ((mSi-n)%10+10)%10;
      const bi = isThuan ? (mBi+n)%12  : ((mBi-n)%12+12)%12;
      dvList.push({
        si, bi,
        can: BatTuModule.CAN[si], chi: BatTuModule.CHI[bi],
        nhCan: BatTuModule.NH_CAN[si], nhChi: BatTuModule.NH_CHI[bi],
        year:  firstDVY + (n-1)*10,
        age:   firstDVAge + (n-1)*10,
      });
    }

    return {
      dvList, isThuan, targetJie, jieSolar, diffDays,
      khoiVanY, khoiVanM, firstDVY, firstDVAge, chineseBY,
    };
  }

  // ══════════════════════════════════════════════════════
  //   TIỂU VẬN — TÍNH TOÁN
  //   -------------------------------------------------------
  //   Tiểu Vận áp dụng từ tuổi 1 đến trước khi Đại Vận bắt đầu.
  //   Số năm Tiểu Vận = khoiVanY (= số năm đến ĐV đầu tiên).
  //
  //   Quy tắc lấy can-chi:
  //   • Xuất phát từ can-chi trụ Giờ (hour pillar)
  //   • Thuận vận → đi thuận mỗi năm 1 bước
  //   • Nghịch vận → đi nghịch mỗi năm 1 bước
  //   • Năm Tiểu Vận 1 (tuổi 1) = bước kế tiếp (không dùng chính giờ)
  //     vì trụ Giờ đã là bản thân năm đó rồi.
  //
  //   Ví dụ: 15/01/1990, Nam, nghịch vận, khoiVanY = 3
  //     → 3 năm Tiểu Vận: 1990 (t1), 1991 (t2), 1992 (t3)
  //     → trụ Giờ = Nhâm Ngọ (si=8,bi=6), nghịch nên:
  //       t1 (tuổi 1): si=7(Tân), bi=5(Tỵ)  → Tân Tỵ
  //       t2 (tuổi 2): si=6(Canh), bi=4(Thìn) → Canh Thìn
  //       t3 (tuổi 3): si=5(Kỷ), bi=3(Mão) → Kỷ Mão
  // ══════════════════════════════════════════════════════

  _tinhTieuVan(bz, dvData, birthY, birthM) {
    const { khoiVanY, isThuan, chineseBY } = dvData;

    // Nếu khởi vận ngay từ nhỏ (khoiVanY = 0): không có Tiểu Vận
    if (khoiVanY <= 0) return [];

    const hSi = bz.hour.si, hBi = bz.hour.bi;   // can-chi trụ Giờ
    const tvList = [];

    for (let n = 1; n <= khoiVanY; n++) {
      // n bước từ trụ Giờ (thuận hoặc nghịch)
      const si = isThuan ? (hSi + n) % 10  : ((hSi - n) % 10 + 10) % 10;
      const bi = isThuan ? (hBi + n) % 12  : ((hBi - n) % 12 + 12) % 12;
      const year = birthY + n - 1;   // năm dương lịch tương ứng (tuổi n = năm sinh + n-1)
      const age  = year - chineseBY; // tuổi tính theo năm can-chi
      tvList.push({
        si, bi,
        can: BatTuModule.CAN[si], chi: BatTuModule.CHI[bi],
        nhCan: BatTuModule.NH_CAN[si], nhChi: BatTuModule.NH_CHI[bi],
        year, age,
      });
    }
    return tvList;
  }

  // ══════════════════════════════════════════════════════
  //   RENDER ĐẠI VẬN
  // ══════════════════════════════════════════════════════

  _renderDaiVan(dvData) {
    if (!dvData) { this.querySelector('#bt-dv-section').style.display = 'none'; return; }
    const { dvList, isThuan, jieSolar, diffDays,
            khoiVanY, khoiVanM, firstDVY, firstDVAge, targetJie } = dvData;

    const dir      = isThuan ? '⏩ Thuận' : '⏪ Nghịch';
    const jieName  = targetJie.getName ? targetJie.getName() : '';
    const jieDate  = `${jieSolar.getDay()}/${jieSolar.getMonth()}/${jieSolar.getYear()}`;
    const ageTxt   = khoiVanY + ' tuổi' + (khoiVanM ? ` ${khoiVanM} tháng` : '');

    this.querySelector('#bt-dv-title').textContent =
      `${dir} · Đại Vận (8 bước × 10 năm) — click để xem luận giải`;
    this.querySelector('#bt-dv-meta').innerHTML =
      `<strong>Khởi vận:</strong> ${ageTxt} (năm ${firstDVY}, ${firstDVAge} tuổi) · `+
      `Tiết: <strong>${jieName}</strong> (${jieDate}) · `+
      `${diffDays} ngày ÷ 3 = ${khoiVanY} năm`;

    // 8 ô
    let html = '';
    dvList.forEach((dv, idx) => {
      html += `<div class="bt-dv-item" data-dv-idx="${idx}">
        <div class="bt-dv-age">${dv.age} tuổi<span class="bt-dv-year">${dv.year}</span></div>
        <div class="bt-dv-gz nh-${this._nhCss(dv.nhCan)}">${dv.can}</div>
        <div class="bt-dv-gz nh-${this._nhCss(dv.nhChi)}">${dv.chi}</div>
      </div>`;
    });
    const grid = this.querySelector('#bt-dv-grid');
    grid.innerHTML = html;

    grid.querySelectorAll('.bt-dv-item').forEach(item => {
      item.addEventListener('click', () => {
        grid.querySelectorAll('.bt-dv-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        this._showDaiVanDetail(+item.dataset.dvIdx);
      });
    });

    this.querySelector('#bt-dv-section').style.display = 'block';
    this.querySelector('#bt-dv-detail').style.display  = 'none';
  }

  // ══════════════════════════════════════════════════════
  //   RENDER TIỂU VẬN
  // ══════════════════════════════════════════════════════

  _renderTieuVan(tvList, dvData) {
    const section = this.querySelector('#bt-tv-section');
    if (!tvList || tvList.length === 0) {
      section.style.display = 'none';
      return;
    }

    const { khoiVanY, khoiVanM, isThuan } = dvData;
    const dir    = isThuan ? 'thuận' : 'nghịch';
    const ageTxt = khoiVanY + ' tuổi' + (khoiVanM ? ` ${khoiVanM} tháng` : '');

    this.querySelector('#bt-tv-meta').innerHTML =
      `<strong>${tvList.length} năm Tiểu Vận</strong> (tuổi 1 → ${ageTxt}) · `+
      `Sắp <strong>${dir}</strong> từ trụ Giờ · click vào năm để xem luận giải`;

    let html = '';
    tvList.forEach((tv, idx) => {
      html += `<div class="bt-tv-item" data-tv-idx="${idx}">
        <div class="bt-tv-age">${tv.age} tuổi<span class="bt-tv-year">${tv.year}</span></div>
        <div class="bt-tv-gz nh-${this._nhCss(tv.nhCan)}">${tv.can}</div>
        <div class="bt-tv-gz nh-${this._nhCss(tv.nhChi)}">${tv.chi}</div>
      </div>`;
    });

    const grid = this.querySelector('#bt-tv-grid');
    grid.innerHTML = html;

    grid.querySelectorAll('.bt-tv-item').forEach(item => {
      item.addEventListener('click', () => {
        grid.querySelectorAll('.bt-tv-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        this._showTieuVanDetail(+item.dataset.tvIdx, tvList);
      });
    });

    section.style.display = 'block';
    this.querySelector('#bt-tv-detail').style.display = 'none';
  }

  // ══════════════════════════════════════════════════════
  //   TIỂU VẬN — LUẬN GIẢI NĂM ĐƯỢC CLICK
  // ══════════════════════════════════════════════════════

  _showTieuVanDetail(idx, tvList) {
    if (!this._currentBazi || !this._currentDungThanInfo) return;
    const tv   = tvList[idx];
    const bz   = this._currentBazi;
    const info = this._currentDungThanInfo;
    const desc = this._generateVanDescription(
      bz, { can: tv.can, chi: tv.chi, si: tv.si, bi: tv.bi,
             nhCan: tv.nhCan, nhChi: tv.nhChi },
      info,
      /* dv= */ null,
      /* isTV= */ true
    );

    this.querySelector('#bt-tv-detail-title').innerHTML =
      `✨ Luận giải Tiểu Vận ${tv.age} tuổi — `+
      `<span class="nh-${this._nhCss(tv.nhCan)}">${tv.can}</span> `+
      `<span class="nh-${this._nhCss(tv.nhChi)}">${tv.chi}</span> (${tv.year})`;
    this.querySelector('#bt-tv-detail-content').innerHTML = desc;
    this.querySelector('#bt-tv-detail').style.display = 'block';
    setTimeout(() => this.querySelector('#bt-tv-detail')
      .scrollIntoView({ behavior:'smooth', block:'nearest' }), 60);
  }

  // ══════════════════════════════════════════════════════
  //   ĐẠI VẬN — LUẬN GIẢI
  // ══════════════════════════════════════════════════════

  _showDaiVanDetail(idx) {
    if (!this._currentDaiVanList || !this._currentBazi || !this._currentDungThanInfo) return;
    const dv   = this._currentDaiVanList[idx];
    const bz   = this._currentBazi;
    const info = this._currentDungThanInfo;
    const desc = this._generateVanDescription(
      bz, { can: dv.can, chi: dv.chi, si: dv.si, bi: dv.bi,
             nhCan: dv.nhCan, nhChi: dv.nhChi },
      info, /* dv= */ null, /* isTV= */ false
    );

    this.querySelector('#bt-dv-detail-title').textContent =
      `✨ Luận giải Đại Vận ${dv.can} ${dv.chi} (${dv.year}–${dv.year+9})`;
    this.querySelector('#bt-dv-detail-content').innerHTML = desc;
    this.querySelector('#bt-dv-detail').style.display = 'block';
    this.querySelector('#bt-ln-detail').style.display = 'none';

    this._renderLuuNien(idx);

    setTimeout(() => this.querySelector('#bt-dv-detail')
      .scrollIntoView({ behavior:'smooth', block:'nearest' }), 80);
  }

  // ══════════════════════════════════════════════════════
  //   HÀM LUẬN GIẢI CHUNG (dùng cho Tiểu Vận, Đại Vận, Lưu Niên)
  //   van = { can, chi, si, bi, nhCan, nhChi }
  //   dv  = đại vận đang đi (chỉ dùng trong Lưu Niên)
  //   isTV= true khi là Tiểu Vận (bỏ phần tương tác với ĐV)
  // ══════════════════════════════════════════════════════

  _generateVanDescription(bz, van, info, dv = null, isTV = false) {
    const { dt1, dt2, nhCan } = info;
    const dungList = [dt1, dt2];
    const kyList   = [0,1,2,3,4].filter(i => !dungList.includes(i));
    const canH = van.nhCan, chiH = van.nhChi;

    let d = '';

    // 1. Với Nhật Chủ
    d += `【Với Nhật Chủ ${bz.day.can} — ${BatTuModule.NH_NAME[nhCan]}】<br>`;
    if      (canH === nhCan)                    d += `- Thiên can trùng Nhật Chủ → bản thân chủ động, dễ có quyết định riêng.<br>`;
    else if (BatTuModule.SINH[canH] === nhCan)  d += `- Thiên can sinh Nhật Chủ (Ấn Thụ) → quý nhân phù trợ, học hành thuận.<br>`;
    else if (BatTuModule.SINH[nhCan] === canH)  d += `- Nhật Chủ sinh Thiên can (Thực Thương) → sáng tạo, đầu tư, dễ hao tổn.<br>`;
    else if (BatTuModule.KHAC[canH] === nhCan)  d += `- Thiên can khắc Nhật Chủ (Quan Sát) → áp lực công việc, cạnh tranh.<br>`;
    else if (BatTuModule.KHAC[nhCan] === canH)  d += `- Nhật Chủ khắc Thiên can (Tài) → cơ hội kiếm tiền, tài vận khá.<br>`;

    // 2. Địa Chi tác động Tứ Trụ
    d += `<br>【Địa Chi tác động Tứ Trụ】<br>`;
    const TRUL = {year:'Năm', month:'Tháng', day:'Ngày', hour:'Giờ'};
    let hasInteraction = false;
    ['year','month','day','hour'].forEach(k => {
      const c = bz[k].bi;
      if      (c === van.bi)         { d += `- Trùng Chi ${TRUL[k]} → năm củng cố, ổn định.<br>`; hasInteraction=true; }
      else if (this._xung(van.bi,c)) { d += `- Xung Chi ${TRUL[k]} → biến động, chuyển đổi lớn.<br>`; hasInteraction=true; }
      else if (this._hai(van.bi,c))  { d += `- Hại Chi ${TRUL[k]} → hao tổn, thị phi.<br>`; hasInteraction=true; }
      else if (this._hop(van.bi,c))  { d += `- Hợp Chi ${TRUL[k]} → hòa hợp, tin vui.<br>`; hasInteraction=true; }
    });
    if (!hasInteraction) d += `- Không có tương tác đặc biệt với Tứ Trụ.<br>`;

    // 3. Dụng / Kỵ thần
    d += `<br>【Dụng Thần & Kỵ Thần】<br>`;
    if      (dungList.includes(canH)) d += `- Thiên can là Dụng thần → lợi cho bản thân.<br>`;
    else if (kyList.includes(canH))   d += `- Thiên can là Kỵ thần → bất lợi, cần cẩn trọng.<br>`;
    else                              d += `- Thiên can trung tính.<br>`;

    if      (dungList.includes(chiH)) d += `- Địa chi là Dụng thần → môi trường xung quanh thuận lợi.<br>`;
    else if (kyList.includes(chiH))   d += `- Địa chi là Kỵ thần → môi trường không thuận.<br>`;
    else                              d += `- Địa chi trung tính.<br>`;

    // 4. Tương tác với Đại Vận (chỉ khi là Lưu Niên)
    if (dv) {
      d += `<br>【Tương tác với Đại Vận ${dv.can} ${dv.chi}】<br>`;
      if      (dv.si === van.si)             d += `- Thiên can trùng Đại Vận → vận khí được củng cố.<br>`;
      if      (this._xung(van.bi, dv.bi))   d += `- Địa chi xung Đại Vận → năm biến động so với vận.<br>`;
      else if (this._hop(van.bi, dv.bi))    d += `- Địa chi hợp Đại Vận → năm hòa thuận với vận.<br>`;
      else if (this._hai(van.bi, dv.bi))    d += `- Địa chi hại Đại Vận → có trở ngại trong vận trình.<br>`;
    }

    // 5. Tổng kết
    let good = 0, bad = 0;
    if (dungList.includes(canH)) good++; if (dungList.includes(chiH)) good++;
    if (kyList.includes(canH))   bad++;  if (kyList.includes(chiH))   bad++;
    d += `<br>【Tổng kết】 `;
    if      (good >= 2 && bad === 0) d += `✅ <strong>Rất thuận lợi</strong> — cả can lẫn chi đều là Dụng thần.`;
    else if (good >= 1 && bad === 0) d += `✅ <strong>Tương đối thuận</strong> — có một yếu tố Dụng thần hỗ trợ.`;
    else if (bad  >= 2 && good === 0)d += `⚠️ <strong>Nhiều thử thách</strong> — cả can lẫn chi đều là Kỵ thần.`;
    else if (bad  >= 1 && good === 0)d += `⚠️ <strong>Có khó khăn</strong> — yếu tố Kỵ thần át Dụng thần.`;
    else                             d += `⚖️ <strong>Trung bình</strong> — vừa có thuận, vừa có khó.`;
    return d;
  }

  // ══════════════════════════════════════════════════════
  //   LƯU NIÊN — RENDER 10 NĂM CỦA ĐẠI VẬN
  // ══════════════════════════════════════════════════════

  _renderLuuNien(dvIdx) {
    if (!this._currentDaiVanList) return;
    const dv        = this._currentDaiVanList[dvIdx];
    const startYear = dv.year;

    this.querySelector('#bt-ln-title').innerHTML =
      `📅 Lưu Niên của Đại Vận ${dv.can} ${dv.chi} (${startYear}–${startYear+9})`+
      `<span style="font-weight:400;font-size:.76rem;margin-left:6px">— click năm để xem luận giải</span>`;

    let html = '';
    for (let i = 0; i < 10; i++) {
      const year = startYear + i;
      let ganIdx, zhiIdx;
      try {
        const lunar = Solar.fromYmdHms(year, 2, 5, 0, 0, 0).getLunar();
        ganIdx = lunar.getYearGanIndex();
        zhiIdx = lunar.getYearZhiIndex();
      } catch (_) {
        ganIdx = ((year-1984)%10+10)%10;
        zhiIdx = ((year-1984)%12+12)%12;
      }
      const gan   = BatTuModule.CAN[ganIdx], chi = BatTuModule.CHI[zhiIdx];
      const nhGan = BatTuModule.NH_CAN[ganIdx], nhChi = BatTuModule.NH_CHI[zhiIdx];
      html += `<div class="bt-ln-item" data-year="${year}" data-gan="${ganIdx}" data-zhi="${zhiIdx}" data-dv="${dvIdx}">
        <div class="bt-ln-year">${year}</div>
        <div class="bt-ln-canchi nh-${this._nhCss(nhGan)}">${gan}</div>
        <div class="bt-ln-canchi nh-${this._nhCss(nhChi)}">${chi}</div>
      </div>`;
    }

    const grid = this.querySelector('#bt-ln-grid');
    grid.innerHTML = html;

    grid.querySelectorAll('.bt-ln-item').forEach(item => {
      item.addEventListener('click', () => {
        grid.querySelectorAll('.bt-ln-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        this._showLuuNienDetail(
          +item.dataset.year, +item.dataset.gan,
          +item.dataset.zhi,  +item.dataset.dv
        );
      });
    });

    this.querySelector('#bt-ln-section').style.display = 'block';
    this.querySelector('#bt-ln-detail').style.display  = 'none';
  }

  // ══════════════════════════════════════════════════════
  //   LƯU NIÊN — LUẬN GIẢI NĂM ĐƯỢC CLICK
  // ══════════════════════════════════════════════════════

  _showLuuNienDetail(year, ganIdx, zhiIdx, dvIdx) {
    if (!this._currentBazi || !this._currentDungThanInfo) return;
    const dv    = this._currentDaiVanList[dvIdx];
    const gan   = BatTuModule.CAN[ganIdx], chi = BatTuModule.CHI[zhiIdx];
    const nhCan = BatTuModule.NH_CAN[ganIdx], nhChi = BatTuModule.NH_CHI[zhiIdx];
    const desc  = this._generateVanDescription(
      this._currentBazi,
      { can:gan, chi:chi, si:ganIdx, bi:zhiIdx, nhCan, nhChi },
      this._currentDungThanInfo,
      dv,      // truyền đại vận hiện tại để xét tương tác
      false
    );

    this.querySelector('#bt-ln-detail-title').innerHTML =
      `✨ Luận giải năm `+
      `<span class="nh-${this._nhCss(nhCan)}">${gan}</span> `+
      `<span class="nh-${this._nhCss(nhChi)}">${chi}</span> `+
      `${year} <span style="font-size:.74rem;font-weight:400;color:var(--bt-muted)">(ĐV ${dv.can} ${dv.chi})</span>`;
    this.querySelector('#bt-ln-detail-content').innerHTML = desc;
    this.querySelector('#bt-ln-detail').style.display = 'block';
    setTimeout(() => this.querySelector('#bt-ln-detail')
      .scrollIntoView({ behavior:'smooth', block:'nearest' }), 60);
  }

  // ══════════════════════════════════════════════════════
  //   DỤNG THẦN — TÍNH TOÁN CHÍNH
  // ══════════════════════════════════════════════════════

  _calcDungThan() {
    if (typeof Solar === 'undefined') { alert('Thư viện lịch chưa tải!'); return; }
    const errEl = this.querySelector('#bt-dt-err');
    errEl.textContent = '';

    // Parse ngày sinh
    const parsed = this._parseDateDMY(
      this.querySelector('#bt-dt-date').value.trim()
    );
    if (!parsed) {
      errEl.textContent = '⚠ Ngày không hợp lệ — định dạng dd/mm/yyyy';
      this.querySelector('#bt-dt-date').classList.add('invalid');
      return;
    }
    this.querySelector('#bt-dt-date').classList.remove('invalid');
    const { d, m, y }  = parsed;
    const h      = Number(this.querySelector('#bt-dt-hour').value);
    const isMale = this.querySelector('input[name="bt-gender"]:checked').value === 'male';

    // Tính Bát Tự
    let bz;
    try { bz = this._getBaZi(y, m, d, h, 0); }
    catch (e) { errEl.textContent = 'Lỗi tính lịch: ' + e.message; return; }

    // ── Xác định Ngũ Hành Nhật Can (Hành A) ──
    const nhA     = bz.day.nhCan;
    const nhSinhA = BatTuModule.SINH.indexOf(nhA);   // Hành sinh ra A  → dt2 khi Thân Nhược
    const nhAsinh = BatTuModule.SINH[nhA];            // A sinh ra       → dt1 khi Thân Vượng
    const nhKhacA = BatTuModule.KHAC.indexOf(nhA);   // Hành khắc A    → dt2 khi Thân Vượng

    // ── 3 Điểm Vượng/Nhược ──
    const score1 = this._trungHoacSinh(nhA, bz.month.nhChi) ? 1 : 0;
    const chi3   = [bz.year.nhChi, bz.day.nhChi, bz.hour.nhChi];
    const score2 = chi3.filter(nh => this._trungHoacSinh(nhA, nh)).length >= 2 ? 1 : 0;
    const can3   = [bz.year.nhCan, bz.month.nhCan, bz.hour.nhCan];
    const score3 = can3.filter(nh => this._trungHoacSinh(nhA, nh)).length === 3 ? 1 : 0;
    const total  = score1 + score2 + score3;

    const isWeak = total <= 1;
    const dt1    = isWeak ? nhA     : nhAsinh;
    const dt2    = isWeak ? nhSinhA : nhKhacA;

    // ── Lưu trạng thái (dùng cho luận giải vận) ──
    this._currentBazi         = bz;
    this._currentDungThanInfo = { bz, dt1, dt2, isWeak, nhCan: nhA };

    // ── Tính Đại Vận & Tiểu Vận ──
    const dvData = this._tinhDaiVan(bz, y, m, d, isMale);
    this._currentDaiVanList   = dvData ? dvData.dvList : null;
    const tvList = dvData ? this._tinhTieuVan(bz, dvData, y, m) : [];

    // ── Render Bát Tự ──
    this._renderBaZiTable(bz);

    // ── Render Tiểu Vận ──
    this._renderTieuVan(tvList, dvData);

    // ── Render Đại Vận ──
    this._renderDaiVan(dvData);

    // ── Kết luận Dụng Thần ──
    const title = isWeak
      ? `💧 Thân Nhược — Bản mệnh yếu (${total}/3 điểm)`
      : `🔥 Thân Vượng — Bản mệnh mạnh (${total}/3 điểm)`;
    const body = isWeak
      ? `Ngũ hành <strong>${BatTuModule.NH_NAME[dt1]}</strong> (Nhật Can) và `+
        `<strong>${BatTuModule.NH_NAME[dt2]}</strong> (hành sinh cho nó) đang YẾU. Cần bổ sung.`
      : `Ngũ hành <strong>${BatTuModule.NH_NAME[nhA]}</strong> quá mạnh. Cần dùng `+
        `<strong>${BatTuModule.NH_NAME[dt1]}</strong> (tiết hao) hoặc `+
        `<strong>${BatTuModule.NH_NAME[dt2]}</strong> (chế ngự).`;
    const sgSrc = this._uploadedSuggestions ? '(từ GitHub)' : '(mặc định)';

    this.querySelector('#bt-verdict').innerHTML = `
      <div class="bt-verdict-title">${title}</div>
      <div class="bt-verdict-body">${body}</div>
      <div class="bt-nh-tags">
        <div class="bt-nh-tag ${this._nhCss(dt1)}">❶ Dụng Thần chính · ${BatTuModule.NH_NAME[dt1]}</div>
        <div class="bt-nh-tag ${this._nhCss(dt2)}">❷ Dụng Thần phụ  · ${BatTuModule.NH_NAME[dt2]}</div>
      </div>
      <div class="bt-suggest-box">
        <div class="bt-suggest-title">✨ Gợi ý chi tiết ${sgSrc}</div>
        <div class="bt-suggest-grid">
          <div class="bt-suggest-col">
            <h4>🌿 Dụng Thần chính · ${BatTuModule.NH_NAME[dt1]}</h4>
            <div class="bt-suggest-content">${this._getSuggestion(dt1).replace(/\n/g,'<br>')}</div>
          </div>
          <div class="bt-suggest-col">
            <h4>🍂 Dụng Thần phụ · ${BatTuModule.NH_NAME[dt2]}</h4>
            <div class="bt-suggest-content">${this._getSuggestion(dt2).replace(/\n/g,'<br>')}</div>
          </div>
        </div>
      </div>`;

    // ── Hiển thị khu vực kết quả ──
    this.querySelector('#bt-dt-result').style.display = 'block';
    setTimeout(() => this.querySelector('#bt-dt-result')
      .scrollIntoView({ behavior:'smooth', block:'start' }), 80);

    // ── Dispatch sự kiện để module khác tích hợp ──
    this.dispatchEvent(new CustomEvent('batu-ready', {
      detail: {
        bz, dt1, dt2, isWeak, nhA,
        score: total,
        dvList: this._currentDaiVanList,
        tvList,
      },
      bubbles:  true,
      composed: true,
    }));
  }
}

// ══════════════════════════════════════════════════════
//   ĐĂNG KÝ CUSTOM ELEMENT
// ══════════════════════════════════════════════════════
customElements.define('bat-tu-module', BatTuModule);
