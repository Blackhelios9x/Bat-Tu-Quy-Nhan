// ========================================================
// MODULE BÁT TỰ – DỤNG THẦN & ĐẠI VẬN / LƯU NIÊN
// Web Component: <bat-tu-module>
// ========================================================
class BatTuModule extends HTMLElement {
  constructor() {
    super();

    // ========== HẰNG SỐ ==========
    this.CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
    this.CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
    this.CAN_HAN = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
    this.CHI_HAN = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
    this.NH_CAN = [0,0,1,1,2,2,3,3,4,4];
    this.NH_CHI = [4,2,0,0,2,1,1,2,3,3,2,4];
    this.NH_NAME = ['Mộc','Hỏa','Thổ','Kim','Thủy'];
    this.NH_CSS = ['moc','hoa','tho','kim','thuy'];
    this.SINH = [1,2,3,4,0];
    this.KHAC = [2,3,4,0,1];
    this.LUC_XUNG = [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
    this.LUC_HAI  = [[0,5],[1,6],[2,7],[3,8],[4,9],[10,11]];
    this.LUC_HOP  = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];

    this.GITHUB_RAW_URL = 'https://raw.githubusercontent.com/Blackhelios9x/Bat-Tu-Quy-Nhan/main/dung-than.txt';

    // Dữ liệu nội bộ
    this._uploadedSuggestions = null;
    this._currentBazi = null;
    this._currentDaiVanList = null;
    this._currentDungThanInfo = null;

    // Xây dựng toàn bộ HTML/CSS bên trong component
    this.innerHTML = /* html */ `
      <style>
        :host {
          --primary:     #a67c4e;
          --primary-l:   #c8a87c;
          --primary-d:   #5e3e22;
          --accent:      #d4a96a;
          --bg:          #fbf7f0;
          --card:        #ffffffdd;
          --card2:       #fff9f2ee;
          --bor:         #e3d6c5;
          --bor-h:       #c9aa8b;
          --text:        #1f150c;
          --text-light:  #4d3a28;
          --muted:       #7a6048;
          --muted2:      #9c8268;
          --in-bg:       #fefcf8;
          --err:         #b33f3d;
          --shadow:      0 8px 20px rgba(0,0,0,.05);
          --c-kim:    #5c5c5c;
          --bg-kim:   #e0e0e0;
          --c-moc:    #2e7d32;
          --bg-moc:   #e8f5e9;
          --c-thuy:   #ffffff;
          --bg-thuy:  #1976d2;
          --c-hoa:    #c62828;
          --bg-hoa:   #ffebee;
          --c-tho:    #5d4037;
          --bg-tho:   #fbc02d;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .wrap {
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
          background-color: var(--bg);
          color: var(--text);
          min-height: 100vh;
          line-height: 1.6;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px 16px 50px;
        }
        header { text-align: center; padding: 40px 16px 26px; }
        .h-icon { font-size: 48px; margin-bottom: 12px; }
        header h1 { font-size: clamp(1.5rem, 5vw, 2.2rem); color: var(--primary-d); font-weight: 700; }
        header p { color: var(--muted); font-style: italic; font-size: .9rem; }
        .divider { width: 120px; height: 2px; background: linear-gradient(90deg, transparent, var(--primary), transparent); margin: 14px auto; }

        .card {
          background: var(--card); border: 1px solid var(--bor);
          border-radius: 20px; padding: 24px 22px; margin-bottom: 20px;
          backdrop-filter: blur(12px); box-shadow: var(--shadow);
        }
        .ctitle {
          font-size: .95rem; font-weight: 600; color: var(--primary-d);
          margin-bottom: 18px; display: flex; align-items: center; gap: 8px;
        }
        .ctitle::after { content: ''; flex: 1; height: 1px; background: var(--bor); }

        .irow { display: flex; flex-wrap: wrap; gap: 14px; align-items: flex-end; }
        .ig { display: flex; flex-direction: column; gap: 5px; }
        .ig label { font-size: .7rem; color: var(--muted); text-transform: uppercase; }
        input, select {
          background: var(--in-bg); border: 1px solid var(--bor);
          border-radius: 12px; padding: 11px 14px; font-size: .95rem; outline: none;
          width: 100%;
        }
        input:focus, select:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(166,124,78,.15); }
        input.invalid { border-color: var(--err) !important; }
        .errtxt { color: var(--err); font-size: .75rem; margin-top: 5px; }

        .btn-main {
          display: block; width: fit-content; margin: 20px auto 30px;
          padding: 14px 36px; background: var(--primary); color: white;
          border: none; border-radius: 40px; font-size: 1rem; font-weight: 700;
          cursor: pointer; box-shadow: 0 6px 14px rgba(166,124,78,.3);
          text-transform: uppercase;
        }
        .btn-main:hover { background: var(--primary-d); transform: translateY(-2px); }

        .bz-table { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 16px 0; }
        .bz-col { text-align: center; }
        .bz-col-lbl { font-size: .7rem; color: var(--muted); font-weight: 600; }
        .bz-cell {
          padding: 14px 6px; border-radius: 16px; font-size: 1.3rem; font-weight: 700;
          border: 1px solid transparent;
        }
        .nh-kim  { color: var(--c-kim);  background: var(--bg-kim);  border-color: #bdbdbd; }
        .nh-moc  { color: var(--c-moc);  background: var(--bg-moc);  border-color: #a5d6a7; }
        .nh-thuy { color: var(--c-thuy); background: var(--bg-thuy); border-color: #64b5f6; }
        .nh-hoa  { color: var(--c-hoa);  background: var(--bg-hoa);  border-color: #ef9a9a; }
        .nh-tho  { color: var(--c-tho);  background: var(--bg-tho);  border-color: #ffe082; }

        .dv-title, .ln-title {
          font-size: 0.9rem; color: var(--primary-d); margin-bottom: 12px;
          display: flex; align-items: center; gap: 10px;
        }
        .dv-arrow { font-size: 1.2rem; }
        .dv-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 6px; }
        .dv-item { text-align: center; border-radius: 12px; padding: 10px 4px; border: 1px solid var(--bor); cursor: pointer; transition: transform .1s; }
        .dv-item:hover { filter: brightness(0.95); transform: scale(0.98); }
        .dv-age { font-size: 0.65rem; color: var(--muted); margin-top: 5px; }
        .dv-year { font-size: 0.6rem; color: var(--muted2); margin-top: 2px; }
        .dv-canchi { font-weight: 700; font-size: 0.9rem; }
        .dv-note { margin-top: 10px; font-size: 0.75rem; color: var(--muted2); text-align: center; }

        /* Màu nền cho đại vận và lưu niên */
        .dv-item.nh-kim  { background: var(--bg-kim);  border-color: #bdbdbd; }
        .dv-item.nh-moc  { background: var(--bg-moc);  border-color: #a5d6a7; }
        .dv-item.nh-thuy { background: var(--bg-thuy); border-color: #64b5f6; color: #fff; }
        .dv-item.nh-hoa  { background: var(--bg-hoa);  border-color: #ef9a9a; }
        .dv-item.nh-tho  { background: var(--bg-tho);  border-color: #ffe082; }

        .ln-grid { display: flex; overflow-x: auto; gap: 10px; padding: 10px 0; -webkit-overflow-scrolling: touch; }
        .ln-item { flex: 0 0 80px; text-align: center; cursor: pointer; border-radius: 16px; padding: 6px 4px; transition: transform .1s; border: 1px solid var(--bor); }
        .ln-item:hover { filter: brightness(0.95); transform: scale(0.97); }
        .ln-year { font-size: .7rem; color: var(--muted); margin-bottom: 4px; }
        .ln-canchi { font-weight: 700; font-size: .9rem; }
        .ln-item.nh-kim  { background: var(--bg-kim);  border-color: #bdbdbd; }
        .ln-item.nh-moc  { background: var(--bg-moc);  border-color: #a5d6a7; }
        .ln-item.nh-thuy { background: var(--bg-thuy); border-color: #64b5f6; color: #fff; }
        .ln-item.nh-hoa  { background: var(--bg-hoa);  border-color: #ef9a9a; }
        .ln-item.nh-tho  { background: var(--bg-tho);  border-color: #ffe082; }

        .dt-verdict { border-radius: 20px; padding: 22px; background: #fcf9f5; border: 1px solid var(--bor); }
        .verdict-title { font-size: 1.2rem; font-weight: 700; color: var(--primary-d); margin-bottom: 10px; }
        .verdict-body { font-size: .95rem; margin-bottom: 16px; }
        .nh-tags { display: flex; gap: 12px; margin: 16px 0; }
        .nh-tag { padding: 8px 24px; border-radius: 40px; font-weight: 700; border: 2px solid; background: white; }
        .nh-tag.kim  { color: var(--c-kim);  border-color: var(--c-kim); }
        .nh-tag.moc  { color: var(--c-moc);  border-color: var(--c-moc); }
        .nh-tag.thuy { color: #1565c0; border-color: #1976d2; }
        .nh-tag.hoa  { color: var(--c-hoa);  border-color: var(--c-hoa); }
        .nh-tag.tho  { color: #b26a00; border-color: #fbc02d; }
        .nh-tag.sm { padding: 3px 12px; font-size: .8rem; }

        .suggest-box {
          background: #f4efe8; border-radius: 18px; padding: 20px;
          margin-top: 20px; border-left: 6px solid var(--primary);
        }
        .suggest-title { font-weight: 700; color: var(--primary-d); margin-bottom: 16px; font-size: 1.05rem; }
        .suggest-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .suggest-col h4 {
          font-size: 1rem; color: var(--primary-d); margin-bottom: 12px;
          border-bottom: 1px dashed var(--bor-h); padding-bottom: 6px;
        }
        .suggest-content { white-space: pre-wrap; line-height: 1.7; font-size: .9rem; }
        .info-note { font-size: .8rem; color: var(--muted); margin-top: 5px; }

        footer { text-align: center; padding: 30px; color: var(--muted); }

        @media (max-width: 600px) {
          .suggest-grid { grid-template-columns: 1fr; gap: 16px; }
          .irow { flex-direction: column; align-items: stretch; }
          .ig { width: 100%; }
          .dv-grid { display: flex; overflow-x: auto; gap: 6px; }
          .dv-item { flex: 0 0 66px; }
          .ln-item { flex: 0 0 70px; }
        }
      </style>

      <div class="wrap">
        <header>
          <div class="h-icon">☯</div>
          <h1>Bát Tự · Dụng Thần &amp; Đại Vận</h1>
          <div class="divider"></div>
          <p>Tính Dụng Thần · Đại vận · Lưu niên</p>
        </header>

        <div class="card">
          <div class="ctitle">📅 Thông tin ngày giờ sinh</div>
          <div class="irow">
            <div class="ig"><label>Ngày sinh (dd/mm/yyyy)</label><input type="text" id="dt-date" placeholder="__/__/____" value="" inputmode="numeric" data-mask="date"></div>
            <div class="ig"><label>Giờ sinh</label><select id="dt-hour">
              <option value="0">00:00-00:59 · Tý</option><option value="1">01:00-01:59 · Sửu</option><option value="2">02:00-02:59 · Sửu</option><option value="3">03:00-03:59 · Dần</option><option value="4">04:00-04:59 · Dần</option><option value="5">05:00-05:59 · Mão</option><option value="6">06:00-06:59 · Mão</option><option value="7">07:00-07:59 · Thìn</option><option value="8">08:00-08:59 · Thìn</option><option value="9">09:00-09:59 · Tỵ</option><option value="10">10:00-10:59 · Tỵ</option><option value="11">11:00-11:59 · Ngọ</option><option value="12" selected>12:00-12:59 · Ngọ</option><option value="13">13:00-13:59 · Mùi</option><option value="14">14:00-14:59 · Mùi</option><option value="15">15:00-15:59 · Thân</option><option value="16">16:00-16:59 · Thân</option><option value="17">17:00-17:59 · Dậu</option><option value="18">18:00-18:59 · Dậu</option><option value="19">19:00-19:59 · Tuất</option><option value="20">20:00-20:59 · Tuất</option><option value="21">21:00-21:59 · Hợi</option><option value="22">22:00-22:59 · Hợi</option><option value="23">23:00-23:59 · Tý</option>
            </select></div>
            <div class="ig"><label>Giới tính</label><select id="dt-gender"><option value="male" selected>Nam</option><option value="female">Nữ</option></select></div>
          </div>
          <div id="dt-err" class="errtxt"></div>
          <div class="info-note" id="data-source-info">Đang tải dữ liệu gợi ý...</div>
        </div>
        <button class="btn-main" id="calc-dt-btn">🔥 Tìm Dụng Thần</button>

        <div id="dt-result" style="display:none">
          <div class="card">
            <div class="ctitle">📊 Bát Tự của bạn</div>
            <div class="bz-table" id="dt-bz-table"></div>
            <div id="dt-nh-ref"></div>
            <!-- Đại Vận -->
            <div id="dt-daivan-section" style="display:none">
              <div class="dv-title"><span class="dv-arrow">🔮 Đại Vận (8 bước × 10 năm)</span> — <span style="font-weight:400;font-size:.8rem;">Click vào từng vận để xem luận giải</span></div>
              <div class="dv-grid" id="dt-daivan-grid"></div>
              <div id="dv-detail-box" style="display:none;" class="card">
                <div class="ctitle" id="dv-detail-title">✨ Luận giải Đại Vận</div>
                <div class="suggest-content" id="dv-detail-content"></div>
                <!-- Danh sách 10 năm của đại vận -->
                <div id="dv-years-container" style="display:none; margin-top:16px;"></div>
                <!-- Chi tiết luận giải năm được chọn -->
                <div id="dv-year-detail" style="display:none; margin-top:16px; padding:16px; background:#fcf9f5; border-radius:16px;"></div>
              </div>
              <div class="dv-note">Mỗi bước 10 năm. Màu theo Ngũ Hành.</div>
            </div>
            <!-- Lưu Niên (10 năm tới) -->
            <div id="dt-luunien-section" style="display:none">
              <div class="ln-title"><span class="dv-arrow">📅 Lưu Niên (10 năm tới)</span> — <span style="font-weight:400;font-size:.8rem;">Click vào năm để xem luận giải</span></div>
              <div class="ln-grid" id="dt-luunien-grid"></div>
              <div id="ln-detail-box" style="display:none;" class="card">
                <div class="ctitle" id="ln-detail-title">✨ Luận giải Lưu Niên</div>
                <div class="suggest-content" id="ln-detail-content"></div>
              </div>
            </div>
          </div>
          <div id="dt-verdict" class="dt-verdict"></div>
        </div>

        <footer>
          <p>Bát Tự tính theo Tiết Khí · Dụng Thần theo công thức đơn giản hóa</p>
          <p>Chỉ mang tính tham khảo</p>
        </footer>
      </div>
    `;

    // Gán sẵn các phần tử cần dùng
    this._dom = {};
  }

  connectedCallback() {
    // Lưu tham chiếu DOM
    const ids = [
      'dt-date', 'dt-hour', 'dt-gender', 'dt-err', 'data-source-info',
      'dt-result', 'dt-bz-table', 'dt-nh-ref',
      'dt-daivan-section', 'dt-daivan-grid', 'dv-detail-box',
      'dv-detail-title', 'dv-detail-content',
      'dv-years-container', 'dv-year-detail',
      'dt-luunien-section', 'dt-luunien-grid',
      'ln-detail-box', 'ln-detail-title', 'ln-detail-content',
      'dt-verdict', 'calc-dt-btn'
    ];
    ids.forEach(id => {
      this._dom[id] = this.querySelector('#' + id);
    });

    // Gắn sự kiện
    this._dom['calc-dt-btn'].addEventListener('click', () => this.calcDungThan());

    // Thiết lập mask cho ngày sinh
    this._setupDateInputs();

    // Tải dữ liệu gợi ý từ GitHub
    this._fetchSuggestions();
  }

  /* ========== HELPER ========== */
  _nhCss(nh) { return nh >= 0 ? this.NH_CSS[nh] : ''; }
  _trungHoacSinh(nhA, nhB) { return nhB === nhA || this.SINH[nhB] === nhA; }

  _parseDateDMY(str) {
    if (!str) return null;
    const parts = str.trim().split('/');
    if (parts.length !== 3) return null;
    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);
    if (isNaN(d) || isNaN(m) || isNaN(y)) return null;
    if (m < 1 || m > 12 || d < 1 || d > 31 || y < 1900 || y > 2100) return null;
    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
    return { d, m, y };
  }

  _parseGZ(gz) {
    const si = this.CAN_HAN.indexOf(gz[0]), bi = this.CHI_HAN.indexOf(gz[1]);
    return {
      si, bi,
      can: si >= 0 ? this.CAN[si] : '?',
      chi: bi >= 0 ? this.CHI[bi] : '?',
      nhCan: si >= 0 ? this.NH_CAN[si] : -1,
      nhChi: bi >= 0 ? this.NH_CHI[bi] : -1
    };
  }

  _getBaZi(y, m, d, h, mi) {
    const solar = Solar.fromYmdHms(y, m, d, h, mi, 0);
    const ec = solar.getLunar().getEightChar();
    return {
      year:  this._parseGZ(ec.getYear()),
      month: this._parseGZ(ec.getMonth()),
      day:   this._parseGZ(ec.getDay()),
      hour:  this._parseGZ(ec.getTime())
    };
  }

  /* ========== MASK INPUT NGÀY SINH ========== */
  _formatDateString(str) {
    const nums = (str||'').replace(/[^0-9]/g,'').substring(0,8);
    if (!nums) return '__/__/____';
    let r = nums.substring(0,2);
    if (nums.length >= 3) r += '/' + nums.substring(2,4);
    if (nums.length >= 5) r += '/' + nums.substring(4,8);
    // Đảm bảo luôn có 10 ký tự
    while (r.length < 10) r += '_';
    return r;
  }

  _setCaretPosition(input) {
    const val = input.value;
    let pos = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === '/' || val[i] === '_') { pos = i; break; }
    }
    if (!pos) pos = val.length;
    input.setSelectionRange(pos, pos);
  }

  _setupDateInputs() {
    this.querySelectorAll('input[data-mask="date"]').forEach(input => {
      // Khởi tạo giá trị mặc định
      if (!input.value) input.value = '__/__/____';

      input.addEventListener('input', (e) => {
        const raw = input.value.replace(/[^0-9]/g,'').substring(0,8);
        let fmt = '';
        if (raw.length > 0) fmt += raw.substring(0,2);
        if (raw.length >= 3) fmt += '/' + raw.substring(2,4);
        if (raw.length >= 5) fmt += '/' + raw.substring(4,8);
        input.value = fmt ? this._formatDateString(fmt) : '__/__/____';
        this._setCaretPosition(input);
      });

      input.addEventListener('keydown', (e) => {
        const key = e.key, pos = input.selectionStart, val = input.value;
        if (key === 'Backspace' && pos > 0 && (val[pos-1] === '/' || pos === 3 || pos === 6)) {
          e.preventDefault();
          input.setSelectionRange(pos-1, pos-1);
        }
        if (key === 'Delete' && pos < val.length && (val[pos] === '/' || pos === 2 || pos === 5)) {
          e.preventDefault();
          input.setSelectionRange(pos+1, pos+1);
        }
      });

      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasted = (e.clipboardData||window.clipboardData).getData('text');
        const numbers = pasted.replace(/[^0-9]/g,'').substring(0,8);
        let fmt = '';
        if (numbers.length > 0) fmt += numbers.substring(0,2);
        if (numbers.length >= 3) fmt += '/' + numbers.substring(2,4);
        if (numbers.length >= 5) fmt += '/' + numbers.substring(4,8);
        input.value = fmt ? this._formatDateString(fmt) : '__/__/____';
        this._setCaretPosition(input);
      });

      input.addEventListener('drop', (e) => e.preventDefault());
    });
  }

  /* ========== FETCH SUGGESTIONS ========== */
  async _fetchSuggestions() {
    const infoEl = this._dom['data-source-info'];
    try {
      const response = await fetch(this.GITHUB_RAW_URL);
      if (!response.ok) throw new Error('Không thể tải file');
      const text = await response.text();
      this._uploadedSuggestions = this._parseSuggestions(text);
      infoEl.textContent = '✅ Đã tải dữ liệu gợi ý từ GitHub.';
    } catch (error) {
      this._uploadedSuggestions = null;
      infoEl.textContent = 'ℹ️ Sử dụng gợi ý mặc định (không kết nối được GitHub).';
    }
  }

  _parseSuggestions(text) {
    const map = new Map();
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const m = line.match(/^Dụng thần\s+(Mộc|Hỏa|Thổ|Kim|Thủy)\s*$/i);
      if (m) {
        const hanh = m[1];
        let contentLines = [];
        let j = i + 1;
        while (j < lines.length && !lines[j].trim().match(/^Dụng thần\s+(Mộc|Hỏa|Thổ|Kim|Thủy)\s*$/i)) {
          contentLines.push(lines[j]);
          j++;
        }
        const content = contentLines.join('\n').trim();
        if (content) map.set(hanh, content);
        i = j - 1;
      }
    }
    return map;
  }

  _getSuggestionContent(hanhIndex) {
    const hanhName = this.NH_NAME[hanhIndex];
    if (this._uploadedSuggestions && this._uploadedSuggestions.has(hanhName)) {
      return this._uploadedSuggestions.get(hanhName);
    }
    const defaults = [
      `- Màu sắc: xanh lá cây\n- Trang sức: vòng tay gỗ, đá xanh lục\n- Hướng: Đông, Đông Nam\n- Mẹo: Mặc đồ màu xanh lá, dùng cây cảnh.`,
      `- Màu sắc: đỏ, hồng, cam\n- Trang sức: vòng đá mã não đỏ, thạch anh hồng\n- Hướng: Nam\n- Mẹo: Dùng nến, ánh sáng ấm, đồ điện tử.`,
      `- Màu sắc: vàng cát, nâu\n- Trang sức: vòng đá mắt hổ, thạch anh vàng\n- Hướng: Đông Bắc, Tây Nam\n- Mẹo: Sử dụng đồ gốm sứ, màu ấm.`,
      `- Màu sắc: trắng, xám, bạc\n- Trang sức: vòng bạc, đá trắng, kim loại\n- Hướng: Tây, Tây Bắc\n- Mẹo: Đeo trang sức kim loại, dùng đồ kim khí.`,
      `- Màu sắc: xanh dương, đen\n- Trang sức: vòng đá aquamarine, obsidian\n- Hướng: Bắc\n- Mẹo: Dùng hồ cá, tranh nước, màu tối.`
    ];
    return defaults[hanhIndex] || 'Không có gợi ý.';
  }

  /* ========== ĐẠI VẬN ========== */
  _tinhDaiVan(bz, birthY, birthM, birthD, isMale) {
    const isYangYear = bz.year.si % 2 === 0;
    const isThuan = (isMale && isYangYear) || (!isMale && !isYangYear);
    const birthSolar = Solar.fromYmd(birthY, birthM, birthD);
    const lunar = birthSolar.getLunar();
    let targetJie = isThuan ? lunar.getNextJie() : lunar.getPrevJie();
    if (!targetJie) return null;
    const jieSolar = targetJie.getSolar();
    const diffDays = Math.round(Math.abs(jieSolar.getJulianDay() - birthSolar.getJulianDay()));
    const khoiVanAge = Math.floor(diffDays / 3);
    const chineseYear = lunar.getYear();
    const firstDVYear = birthY + khoiVanAge;
    const firstDVAge = firstDVYear - chineseYear;

    const dvList = [];
    const mSi = bz.month.si, mBi = bz.month.bi;
    for (let n = 1; n <= 8; n++) {
      let si, bi;
      if (isThuan) {
        si = (mSi + n) % 10;
        bi = (mBi + n) % 12;
      } else {
        si = ((mSi - n) % 10 + 10) % 10;
        bi = ((mBi - n) % 12 + 12) % 12;
      }
      const dvYear = firstDVYear + (n - 1) * 10;
      const dvAge = dvYear - chineseYear;
      dvList.push({
        si, bi, can: this.CAN[si], chi: this.CHI[bi],
        nhCan: this.NH_CAN[si], nhChi: this.NH_CHI[bi],
        year: dvYear, age: dvAge
      });
    }
    return { dvList, isThuan, targetJie, diffDays, khoiVanAge, firstDVYear, firstDVAge };
  }

  _renderDaiVan(dvData) {
    if (!dvData) {
      this._dom['dt-daivan-section'].style.display = 'none';
      return;
    }
    const { dvList, isThuan, khoiVanAge, firstDVYear } = dvData;
    const titleEl = this._dom['dt-daivan-section'].querySelector('.dv-title');
    titleEl.innerHTML = `<span class="dv-arrow">${isThuan ? '⏩ Thuận' : '⏪ Nghịch'}</span> Đại Vận (8 bước) · Khởi vận ${khoiVanAge} tuổi (năm ${firstDVYear})`;

    let gridHtml = '';
    dvList.forEach((dv, idx) => {
      gridHtml += `<div class="dv-item nh-${this._nhCss(dv.nhCan)}" data-dvindex="${idx}">
        <div class="dv-age">${dv.age} tuổi<span class="dv-year">${dv.year}</span></div>
        <div class="dv-canchi">${dv.can}</div>
        <div class="dv-canchi">${dv.chi}</div>
      </div>`;
    });
    this._dom['dt-daivan-grid'].innerHTML = gridHtml;
    this._dom['dt-daivan-section'].style.display = 'block';
    this._dom['dv-detail-box'].style.display = 'none';
    this._currentDaiVanList = dvList;

    const self = this;
    this._dom['dt-daivan-grid'].querySelectorAll('.dv-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = +item.dataset.dvindex;
        self._showDaiVanDetail(idx);
      });
    });
  }

  _showDaiVanDetail(index) {
    if (!this._currentDaiVanList || !this._currentBazi || !this._currentDungThanInfo) return;
    const dv = this._currentDaiVanList[index];
    const { bz, dt1, dt2, isWeak, nhCan } = this._currentDungThanInfo;
    const desc = this._generateDaiVanDescription(bz, dv, { dt1, dt2, isWeak, nhCan });

    this._dom['dv-detail-title'].innerHTML = `✨ Luận giải Đại Vận ${dv.can} ${dv.chi}`;
    this._dom['dv-detail-content'].innerHTML = desc;
    this._dom['dv-detail-box'].style.display = 'block';
    this._dom['dv-year-detail'].style.display = 'none';

    this._renderDaiVanYears(index);
  }

  _renderDaiVanYears(dvIndex) {
    if (!this._currentDaiVanList) return;
    const dv = this._currentDaiVanList[dvIndex];
    const startYear = dv.year;
    const container = this._dom['dv-years-container'];
    container.style.display = 'block';

    let html = `<div style="font-weight:600; margin-bottom:10px; color:var(--primary-d);">📅 Các năm trong đại vận ${dv.can} ${dv.chi} (${startYear}–${startYear + 9})</div>`;
    html += `<div class="ln-grid" id="dv-years-grid">`;

    for (let i = 0; i < 10; i++) {
      const year = startYear + i;
      // Lấy can chi của năm âm lịch tương ứng, dùng tháng 6 để tránh trước Tết
      const solar = Solar.fromYmd(year, 6, 1);
      const lunar = solar.getLunar();
      const ganIdx = lunar.getYearGanIndex();
      const zhiIdx = lunar.getYearZhiIndex();
      const gan = this.CAN[ganIdx];
      const chi = this.CHI[zhiIdx];
      const nhGan = this.NH_CAN[ganIdx];
      const nhChi = this.NH_CHI[zhiIdx];

      html += `<div class="ln-item nh-${this._nhCss(nhGan)}" data-year="${year}" data-ganidx="${ganIdx}" data-zhiidx="${zhiIdx}" data-dvindex="${dvIndex}">
        <div class="ln-year">${year}</div>
        <div class="ln-canchi">${gan}</div>
        <div class="ln-canchi">${chi}</div>
      </div>`;
    }
    html += `</div>`;
    container.innerHTML = html;

    const self = this;
    container.querySelectorAll('#dv-years-grid .ln-item').forEach(item => {
      item.addEventListener('click', () => {
        const year = +item.dataset.year;
        const ganIdx = +item.dataset.ganidx;
        const zhiIdx = +item.dataset.zhiidx;
        const dvIdx = +item.dataset.dvindex;
        const clickedDv = self._currentDaiVanList[dvIdx];
        self._showDaiVanYearDetail(year, ganIdx, zhiIdx, clickedDv);
      });
    });
  }

  _showDaiVanYearDetail(year, ganIdx, zhiIdx, dv) {
    if (!this._currentBazi || !this._currentDungThanInfo) return;
    const gan = this.CAN[ganIdx];
    const chi = this.CHI[zhiIdx];
    const { bz, dt1, dt2, isWeak, nhCan } = this._currentDungThanInfo;
    const desc = this._generateLuuNienDescription(
      bz, { year, gan, chi, ganIdx, zhiIdx },
      { dt1, dt2, isWeak, nhCan }, dv
    );
    const detailBox = this._dom['dv-year-detail'];
    detailBox.innerHTML = `<h4 style="margin-bottom:8px; color:var(--primary-d);">✨ Luận giải năm ${year} (${gan} ${chi})</h4><div class="suggest-content">${desc}</div>`;
    detailBox.style.display = 'block';
    detailBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  _generateDaiVanDescription(bz, dv, info) {
    const { dt1, dt2 } = info;
    const dungList = [dt1, dt2];
    const kyList = [0,1,2,3,4].filter(i => !dungList.includes(i));
    const canHanh = dv.nhCan, chiHanh = dv.nhChi;
    const xung = (i1,i2) => this.LUC_XUNG.some(p => (p[0]===i1&&p[1]===i2) || (p[1]===i1&&p[0]===i2));
    const hai  = (i1,i2) => this.LUC_HAI.some(p  => (p[0]===i1&&p[1]===i2) || (p[1]===i1&&p[0]===i2));
    const hop  = (i1,i2) => this.LUC_HOP.some(p  => (p[0]===i1&&p[1]===i2) || (p[1]===i1&&p[0]===i2));

    let desc = `【Phân tích Đại vận ${dv.can} ${dv.chi}】<br>`;
    desc += `Thiên Can: ${dv.can} (${this.NH_NAME[canHanh]}) - `;
    if (dungList.includes(canHanh)) desc += `Dụng thần → Tốt<br>`;
    else if (kyList.includes(canHanh)) desc += `Kỵ thần → Khó khăn<br>`;
    else desc += `Trung tính<br>`;

    desc += `Địa Chi: ${dv.chi} (${this.NH_NAME[chiHanh]}) - `;
    if (dungList.includes(chiHanh)) desc += `Dụng thần → Tốt<br>`;
    else if (kyList.includes(chiHanh)) desc += `Kỵ thần → Khó khăn<br>`;
    else desc += `Trung tính<br>`;

    desc += `Tương tác với Tứ Trụ:<br>`;
    ['year','month','day','hour'].forEach(t => {
      const c = bz[t].bi;
      if (c === dv.bi) desc += `- Trùng chi ${t} → củng cố<br>`;
      else if (xung(dv.bi, c)) desc += `- Xung chi ${t} → biến động<br>`;
      else if (hai(dv.bi, c)) desc += `- Hại chi ${t} → hao tổn<br>`;
      else if (hop(dv.bi, c)) desc += `- Hợp chi ${t} → hòa hợp<br>`;
    });

    let good = 0, bad = 0;
    if (dungList.includes(canHanh)) good++;
    if (dungList.includes(chiHanh)) good++;
    if (kyList.includes(canHanh)) bad++;
    if (kyList.includes(chiHanh)) bad++;
    desc += `<br>【Tổng kết】 `;
    if (good >= 2) desc += `Đại vận thuận lợi.`;
    else if (bad >= 2) desc += `Đại vận nhiều thử thách.`;
    else desc += `Đại vận trung bình.`;
    return desc;
  }

  _generateLuuNienDescription(bz, yearObj, info, dv) {
    const { gan, chi, ganIdx, zhiIdx } = yearObj;
    const { dt1, dt2, nhCan } = info;
    const dungList = [dt1, dt2];
    const kyList = [0,1,2,3,4].filter(i => !dungList.includes(i));
    const canHanh = this.NH_CAN[ganIdx], chiHanh = this.NH_CHI[zhiIdx];
    const xung = (i1,i2) => this.LUC_XUNG.some(p => (p[0]===i1&&p[1]===i2) || (p[1]===i1&&p[0]===i2));
    const hai  = (i1,i2) => this.LUC_HAI.some(p  => (p[0]===i1&&p[1]===i2) || (p[1]===i1&&p[0]===i2));
    const hop  = (i1,i2) => this.LUC_HOP.some(p  => (p[0]===i1&&p[1]===i2) || (p[1]===i1&&p[0]===i2));

    let desc = `Năm ${gan} ${chi} (${this.NH_NAME[canHanh]} - ${this.NH_NAME[chiHanh]})<br><br>`;
    desc += `【Với Nhật chủ ${bz.day.can}】<br>`;
    if (canHanh === nhCan) desc += `- Thiên can trùng Nhật chủ → năm bản thân chủ động.<br>`;
    else if (this.SINH[canHanh] === nhCan) desc += `- Thiên can sinh Nhật chủ (Ấn) → có quý nhân, học hành thuận lợi.<br>`;
    else if (this.SINH[nhCan] === canHanh) desc += `- Nhật chủ sinh Thiên can (Thực Thương) → sáng tạo, đầu tư nhưng hao tổn.<br>`;
    else if (this.KHAC[canHanh] === nhCan) desc += `- Thiên can khắc Nhật chủ (Quan Sát) → áp lực công việc.<br>`;
    else if (this.KHAC[nhCan] === canHanh) desc += `- Nhật chủ khắc Thiên can (Tài) → cơ hội kiếm tiền.<br>`;

    desc += `<br>【Tác động Địa chi】<br>`;
    const truKeys = ['year','month','day','hour'];
    const truNames = ['Năm','Tháng','Ngày','Giờ'];
    truKeys.forEach((k, idx) => {
      const cChi = bz[k].bi;
      if (cChi === zhiIdx) desc += `- Trùng chi ${truNames[idx]} → củng cố.<br>`;
      else if (xung(zhiIdx, cChi)) desc += `- Xung chi ${truNames[idx]} → biến động, chuyển nhà, công việc.<br>`;
      else if (hai(zhiIdx, cChi)) desc += `- Hại chi ${truNames[idx]} → hao tổn, thị phi.<br>`;
      else if (hop(zhiIdx, cChi)) desc += `- Hợp chi ${truNames[idx]} → hòa hợp, tin vui.<br>`;
    });

    desc += `<br>【Dụng thần & Kỵ thần】<br>`;
    if (dungList.includes(canHanh)) desc += `- Thiên can năm là Dụng thần → tốt.<br>`;
    else if (kyList.includes(canHanh)) desc += `- Thiên can năm là Kỵ thần → xấu.<br>`;
    if (dungList.includes(chiHanh)) desc += `- Địa chi năm là Dụng thần → môi trường thuận lợi.<br>`;
    else if (kyList.includes(chiHanh)) desc += `- Địa chi năm là Kỵ thần → cẩn trọng.<br>`;

    if (dv) {
      desc += `<br>【Tương tác với Đại vận ${dv.can} ${dv.chi}】<br>`;
      if (dv.si === ganIdx) desc += `- Thiên can trùng Đại vận → vận khí mạnh.<br>`;
      if (xung(zhiIdx, dv.bi)) desc += `- Địa chi năm xung Đại vận → năm biến động so với vận.<br>`;
    }

    let good = 0, bad = 0;
    if (dungList.includes(canHanh)) good++;
    if (dungList.includes(chiHanh)) good++;
    if (kyList.includes(canHanh)) bad++;
    if (kyList.includes(chiHanh)) bad++;
    desc += `<br>【Tổng kết】 `;
    if (good >= 2) desc += `Năm thuận lợi, nhiều cơ hội.`;
    else if (bad >= 2) desc += `Năm nhiều thử thách, nên thận trọng.`;
    else desc += `Năm bình hòa, có thuận có khó.`;

    return desc;
  }

  /* ========== LƯU NIÊN 10 NĂM TỚI ========== */
  _renderLuuNien() {
    const currentYear = new Date().getFullYear();
    let html = '';
    for (let i = 0; i < 10; i++) {
      const year = currentYear + i;
      // Lấy can chi năm âm lịch chính xác, dùng tháng 6
      const solar = Solar.fromYmdHms(year, 6, 1, 0, 0, 0);
      const lunar = solar.getLunar();
      const ganIdx = lunar.getYearGanIndex();
      const zhiIdx = lunar.getYearZhiIndex();
      const gan = this.CAN[ganIdx], chi = this.CHI[zhiIdx];
      const nhGan = this.NH_CAN[ganIdx], nhChi = this.NH_CHI[zhiIdx];
      html += `<div class="ln-item nh-${this._nhCss(nhGan)}" data-year="${year}">
        <div class="ln-year">${year}</div>
        <div class="ln-canchi">${gan}</div>
        <div class="ln-canchi">${chi}</div>
      </div>`;
    }
    this._dom['dt-luunien-grid'].innerHTML = html;
    this._dom['dt-luunien-section'].style.display = 'block';
    this._dom['ln-detail-box'].style.display = 'none';

    const self = this;
    this._dom['dt-luunien-grid'].querySelectorAll('.ln-item').forEach(item => {
      item.addEventListener('click', () => {
        const year = +item.dataset.year;
        self._showLuuNienDetail(year);
      });
    });
  }

  _getCurrentDaiVan(year) {
    if (!this._currentDaiVanList) return null;
    for (let i = this._currentDaiVanList.length - 1; i >= 0; i--) {
      if (year >= this._currentDaiVanList[i].year) return this._currentDaiVanList[i];
    }
    return this._currentDaiVanList[0];
  }

  _showLuuNienDetail(year) {
    if (!this._currentBazi || !this._currentDungThanInfo) return;
    const solar = Solar.fromYmdHms(year, 6, 1, 0, 0, 0);
    const lunar = solar.getLunar();
    const ganIdx = lunar.getYearGanIndex();
    const zhiIdx = lunar.getYearZhiIndex();
    const gan = this.CAN[ganIdx], chi = this.CHI[zhiIdx];
    const currentDV = this._getCurrentDaiVan(year);
    const { bz, dt1, dt2, isWeak, nhCan } = this._currentDungThanInfo;
    const desc = this._generateLuuNienDescription(
      bz, { year, gan, chi, ganIdx, zhiIdx },
      { dt1, dt2, isWeak, nhCan }, currentDV
    );
    this._dom['ln-detail-title'].innerHTML = `✨ Luận giải năm ${year} (${gan} ${chi})`;
    this._dom['ln-detail-content'].innerHTML = desc;
    this._dom['ln-detail-box'].style.display = 'block';
  }

  /* ========== DỤNG THẦN ========== */
  calcDungThan() {
    if (typeof Solar === 'undefined') { alert('Thư viện lịch lỗi.'); return; }
    this._dom['dt-err'].textContent = '';

    const dateStr = this._dom['dt-date'].value.trim();
    const parsed = this._parseDateDMY(dateStr);
    if (!parsed) { this._dom['dt-err'].textContent = '⚠ Ngày không hợp lệ (dd/mm/yyyy)'; return; }
    const { d, m, y } = parsed;
    const h = Number(this._dom['dt-hour'].value);
    const isMale = this._dom['dt-gender'].value === 'male';

    let bz;
    try { bz = this._getBaZi(y, m, d, h, 0); }
    catch (e) { this._dom['dt-err'].textContent = 'Lỗi: ' + e; return; }

    const nhA = bz.day.nhCan;
    const nhSinhA = this.SINH.indexOf(nhA);
    const nhAsinh = this.SINH[nhA];
    const nhKhacA = this.KHAC.indexOf(nhA);

    const score1 = this._trungHoacSinh(nhA, bz.month.nhChi) ? 1 : 0;
    const chi3 = [bz.year.nhChi, bz.day.nhChi, bz.hour.nhChi];
    const chi3hit = chi3.map(nh => this._trungHoacSinh(nhA, nh));
    const score2 = chi3hit.filter(Boolean).length >= 2 ? 1 : 0;
    const can3 = [bz.year.nhCan, bz.month.nhCan, bz.hour.nhCan];
    const can3hit = can3.map(nh => this._trungHoacSinh(nhA, nh));
    const score3 = can3hit.filter(Boolean).length === 3 ? 1 : 0;
    const total = score1 + score2 + score3;

    this._renderBaZiTable(bz);
    const isWeak = total <= 1;
    let dt1, dt2;
    if (isWeak) { dt1 = nhA; dt2 = nhSinhA; }
    else { dt1 = nhAsinh; dt2 = nhKhacA; }

    this._currentBazi = bz;
    this._currentDungThanInfo = { bz, dt1, dt2, isWeak, nhCan: nhA };

    const dvData = this._tinhDaiVan(bz, y, m, d, isMale);
    this._renderDaiVan(dvData);

    this._renderLuuNien();

    this._renderVerdict(total, isWeak, nhA, dt1, dt2);

    this._dom['dt-result'].style.display = 'block';
    setTimeout(() => this._dom['dt-result'].scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }

  _renderBaZiTable(bz) {
    const cols = [
      { key: 'hour', lbl: 'Giờ' },
      { key: 'day', lbl: 'Ngày' },
      { key: 'month', lbl: 'Tháng' },
      { key: 'year', lbl: 'Năm' }
    ];
    let html = '';
    cols.forEach(col => {
      const t = bz[col.key];
      html += `<div class="bz-col"><span class="bz-col-lbl">${col.lbl}</span>
        <div class="bz-cell nh-${this._nhCss(t.nhCan)}">${t.can}</div>
        <div class="bz-cell nh-${this._nhCss(t.nhChi)}">${t.chi}</div></div>`;
    });
    this._dom['dt-bz-table'].innerHTML = html;

    let ref = '<span style="font-size:.75rem;color:var(--muted)">Màu Ngũ Hành:</span>';
    this.NH_CSS.forEach((cls, idx) => {
      ref += `<span class="nh-tag sm ${cls}">${this.NH_NAME[idx]}</span>`;
    });
    this._dom['dt-nh-ref'].innerHTML = ref;
  }

  _renderVerdict(total, isWeak, nhA, dt1, dt2) {
    const title = isWeak
      ? `💧 Thân Nhược — Bản mệnh yếu (${total}/3 điểm)`
      : `🔥 Thân Vượng — Bản mệnh mạnh (${total}/3 điểm)`;
    const desc = isWeak
      ? `Ngũ hành ${this.NH_NAME[dt1]} (Nhật Can) và ${this.NH_NAME[dt2]} (hành sinh cho nó) đang YẾU. Cần bổ sung.`
      : `Ngũ hành ${this.NH_NAME[nhA]} quá mạnh. Cần dùng ${this.NH_NAME[dt1]} (tiết hao) hoặc ${this.NH_NAME[dt2]} (chế ngự).`;
    const content1 = this._getSuggestionContent(dt1);
    const content2 = this._getSuggestionContent(dt2);
    const sourceLabel = this._uploadedSuggestions ? '(từ GitHub)' : '(mặc định)';

    this._dom['dt-verdict'].innerHTML = `
      <div class="verdict-title">${title}</div>
      <div class="verdict-body">${desc}</div>
      <div class="nh-tags">
        <div class="nh-tag ${this._nhCss(dt1)}">❶ Dụng Thần chính · ${this.NH_NAME[dt1]}</div>
        <div class="nh-tag ${this._nhCss(dt2)}">❷ Dụng Thần phụ · ${this.NH_NAME[dt2]}</div>
      </div>
      <div class="suggest-box">
        <div class="suggest-title">✨ Gợi ý chi tiết ${sourceLabel}</div>
        <div class="suggest-grid">
          <div class="suggest-col"><h4>🌿 Dụng Thần chính · ${this.NH_NAME[dt1]}</h4><div class="suggest-content">${content1.replace(/\n/g, '<br>')}</div></div>
          <div class="suggest-col"><h4>🍂 Dụng Thần phụ · ${this.NH_NAME[dt2]}</h4><div class="suggest-content">${content2.replace(/\n/g, '<br>')}</div></div>
        </div>
      </div>
    `;
  }
}

customElements.define('bat-tu-module', BatTuModule);
