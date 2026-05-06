// ========================================================
// MODULE BÁT TỰ – DỤNG THẦN
// ========================================================
class BatTuModule extends HTMLElement {
    constructor() {
        super();
        // Định nghĩa HTML & CSS bên trong component
        this.innerHTML = `
            <style>
                /* ========== CSS RIÊNG CHO BÁT TỰ ========== */
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
                .info-note { font-size: .8rem; color: var(--muted); margin-top: 5px; }

                /* Ngũ Hành */
                :root {
                    --c-kim:    #5c5c5c; --bg-kim:   #e0e0e0;
                    --c-moc:    #2e7d32; --bg-moc:   #e8f5e9;
                    --c-thuy:   #ffffff; --bg-thuy:  #1976d2;
                    --c-hoa:    #c62828; --bg-hoa:   #ffebee;
                    --c-tho:    #5d4037; --bg-tho:   #fbc02d;
                }
                .nh-kim  { color: var(--c-kim);  background: var(--bg-kim);  border-color: #bdbdbd; }
                .nh-moc  { color: var(--c-moc);  background: var(--bg-moc);  border-color: #a5d6a7; }
                .nh-thuy { color: var(--c-thuy); background: var(--bg-thuy); border-color: #64b5f6; }
                .nh-hoa  { color: var(--c-hoa);  background: var(--bg-hoa);  border-color: #ef9a9a; }
                .nh-tho  { color: var(--c-tho);  background: var(--bg-tho);  border-color: #ffe082; }

                .bz-table { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 16px 0; }
                .bz-col { text-align: center; }
                .bz-col-lbl { font-size: .7rem; color: var(--muted); font-weight: 600; }
                .bz-cell {
                    padding: 14px 6px; border-radius: 16px; font-size: 1.3rem; font-weight: 700;
                    border: 1px solid transparent;
                }
                .nh-tags { display: flex; gap: 12px; margin: 16px 0; }
                .nh-tag {
                    padding: 8px 24px; border-radius: 40px; font-weight: 700; border: 2px solid; background: white;
                }
                .nh-tag.kim  { color: var(--c-kim);  border-color: var(--c-kim); }
                .nh-tag.moc  { color: var(--c-moc);  border-color: var(--c-moc); }
                .nh-tag.thuy { color: #1565c0; border-color: #1976d2; }
                .nh-tag.hoa  { color: var(--c-hoa);  border-color: var(--c-hoa); }
                .nh-tag.tho  { color: #b26a00; border-color: #fbc02d; }
                .nh-tag.sm { padding: 3px 12px; font-size: .8rem; }
                .dt-verdict { border-radius: 20px; padding: 22px; background: #fcf9f5; border: 1px solid var(--bor); }
                .verdict-title { font-size: 1.2rem; font-weight: 700; color: var(--primary-d); margin-bottom: 10px; }
                .verdict-body { font-size: .95rem; margin-bottom: 16px; }
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
                .menhcuc-box {
                    background: #fcf9f5; border-radius: 20px; padding: 22px;
                    border: 1px solid var(--bor); margin: 20px 0;
                }
                .menhcuc-title {
                    font-size: 1.1rem; font-weight: 700; color: var(--primary-d);
                    margin-bottom: 18px; display: flex; align-items: center; gap: 8px;
                }
                .menhcuc-content { line-height: 1.8; }
                .menhcuc-content strong { color: var(--primary-d); }
                .daivan-section { margin-top: 18px; padding-top: 16px; border-top: 1px dashed var(--bor-h); }
                .daivan-hd {
                    font-size: .88rem; font-weight: 700; color: var(--primary-d);
                    margin-bottom: 8px; display: flex; align-items: center; gap: 8px;
                }
                .daivan-hd::after { content: ''; flex: 1; height: 1px; background: var(--bor); }
                .daivan-meta {
                    font-size: .76rem; color: var(--muted); background: #f7f0e6;
                    border-radius: 10px; padding: 8px 14px; margin-bottom: 12px;
                    display: flex; flex-wrap: wrap; gap: 6px; align-items: center;
                }
                .daivan-meta strong { color: var(--primary-d); }
                .daivan-row { display: grid; grid-template-columns: repeat(8, 1fr); gap: 8px; }
                .dv-item {
                    text-align: center; cursor: pointer; transition: transform 0.1s ease;
                    border-radius: 16px; padding: 4px 2px;
                }
                .dv-item:hover { background: rgba(166,124,78,.08); transform: scale(0.98); }
                .dv-age {
                    font-size: .62rem; font-weight: 700; color: var(--muted);
                    background: #f0e8da; border-radius: 6px; padding: 4px 2px;
                    margin-bottom: 4px; line-height: 1.4;
                }
                .dv-age .dv-year { font-size: .58rem; color: var(--primary); display: block; }
                .dv-can, .dv-chi {
                    padding: 10px 3px; border-radius: 12px; font-size: 1.05rem; font-weight: 700;
                    border: 1px solid transparent; margin-bottom: 3px;
                }
                .dv-detail-box {
                    margin-top: 22px; padding: 20px 22px; background: #f5efe7;
                    border-radius: 24px; border-left: 8px solid var(--primary); box-shadow: var(--shadow);
                }
                .dv-detail-title { font-weight: 700; color: var(--primary-d); font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; }
                .dv-detail-content { color: var(--text); line-height: 1.8; white-space: pre-wrap; }
                .dv-detail-content strong { color: var(--primary-d); }
                .gender-row { display: flex; background: var(--in-bg); border: 1px solid var(--bor); border-radius: 12px; overflow: hidden; }
                .gender-opt { flex: 1; }
                .gender-opt input[type=radio] { display: none; }
                .gender-opt label {
                    display: block; width: 100%; padding: 11px 8px; text-align: center;
                    cursor: pointer; font-size: .95rem; font-weight: 500;
                    color: var(--muted); border-radius: 0; text-transform: none !important;
                    transition: all .18s;
                }
                .gender-opt:first-child label { border-radius: 11px 0 0 11px; }
                .gender-opt:last-child  label { border-radius: 0 11px 11px 0; }
                .gender-opt input[type=radio]:checked + label { background: var(--primary); color: white; font-weight: 700; }

                @media (max-width: 600px) {
                    .suggest-grid { grid-template-columns: 1fr; gap: 16px; }
                    .irow { flex-direction: column; align-items: stretch; }
                    .ig { width: 100%; }
                    input, select { width: 100%; }
                    .bz-table { gap: 6px; }
                    .bz-cell { font-size: 1rem; padding: 10px 2px; }
                    .daivan-row { display: flex; overflow-x: auto; -webkit-overflow-scrolling: touch; gap: 8px; }
                    .dv-item { flex: 0 0 66px; }
                    .dv-can, .dv-chi { font-size: .92rem; padding: 8px 2px; }
                }
            </style>
            <div class="card">
                <div class="ctitle">📅 Thông tin ngày giờ sinh</div>
                <div class="irow">
                    <div class="ig">
                        <label>Ngày sinh (dd/mm/yyyy)</label>
                        <input type="text" id="dt-date" placeholder="dd/mm/yyyy" value="15/01/1990" inputmode="numeric" data-mask="date">
                    </div>
                    <div class="ig">
                        <label>Giờ sinh</label>
                        <select id="dt-hour">
                            <option value="0">00:00-00:59 · Tý</option><option value="1">01:00-01:59 · Sửu</option><option value="2">02:00-02:59 · Sửu</option><option value="3">03:00-03:59 · Dần</option><option value="4">04:00-04:59 · Dần</option><option value="5">05:00-05:59 · Mão</option><option value="6">06:00-06:59 · Mão</option><option value="7">07:00-07:59 · Thìn</option><option value="8">08:00-08:59 · Thìn</option><option value="9">09:00-09:59 · Tỵ</option><option value="10">10:00-10:59 · Tỵ</option><option value="11">11:00-11:59 · Ngọ</option><option value="12" selected>12:00-12:59 · Ngọ</option><option value="13">13:00-13:59 · Mùi</option><option value="14">14:00-14:59 · Mùi</option><option value="15">15:00-15:59 · Thân</option><option value="16">16:00-16:59 · Thân</option><option value="17">17:00-17:59 · Dậu</option><option value="18">18:00-18:59 · Dậu</option><option value="19">19:00-19:59 · Tuất</option><option value="20">20:00-20:59 · Tuất</option><option value="21">21:00-21:59 · Hợi</option><option value="22">22:00-22:59 · Hợi</option><option value="23">23:00-23:59 · Tý</option>
                        </select>
                    </div>
                    <div class="ig">
                        <label>Giới tính</label>
                        <div class="gender-row">
                            <div class="gender-opt"><input type="radio" name="dt-gender" id="g-male" value="male" checked><label for="g-male">♂ Nam</label></div>
                            <div class="gender-opt"><input type="radio" name="dt-gender" id="g-female" value="female"><label for="g-female">♀ Nữ</label></div>
                        </div>
                    </div>
                </div>
                <div id="dt-err" class="errtxt"></div>
                <div class="info-note" id="data-source-info">Đang tải dữ liệu gợi ý...</div>
            </div>

            <button class="btn-main" id="calc-dt-btn">🔥 Tìm Dụng Thần</button>

            <div id="dt-result" style="display:none">
                <div class="card">
                    <div class="ctitle">📊 Bát Tự của bạn</div>
                    <div class="bz-table" id="dt-bz-table"></div>
                    <div class="nh-ref" id="dt-nh-ref"></div>
                    <div class="daivan-section" id="dt-daivan-section" style="display:none">
                        <div class="daivan-hd">🔮 Đại Vận (8 bước × 10 năm) — <span style="font-weight:400;font-size:.8rem;">Click vào từng vận để xem luận giải chi tiết</span></div>
                        <div class="daivan-meta" id="dt-daivan-meta"></div>
                        <div class="daivan-row" id="dt-daivan-row"></div>
                        <div id="dv-detail-container" style="display:none;">
                            <div class="dv-detail-box" id="dv-detail-box">
                                <div class="dv-detail-title" id="dv-detail-title">✨ Luận giải Đại Vận</div>
                                <div class="dv-detail-content" id="dv-detail-content"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="dt-menhcuc" class="menhcuc-box" style="display:none;"></div>
                <div id="dt-verdict" class="dt-verdict"></div>
            </div>
        `;

        this._uploadedSuggestions = null;
        this._currentDungThanData = null;
        this._currentDaiVanList = null;
    }

    connectedCallback() {
        this._setupDateInputs();
        this._fetchSuggestionsFromGitHub();
        this.querySelector('#calc-dt-btn').addEventListener('click', () => this._calcDungThan());
    }

    // ─── HẰNG SỐ ────────────────────────────────────────────────────
    static get CAN() { return ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý']; }
    static get CHI() { return ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi']; }
    static get CAN_HAN() { return ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']; }
    static get CHI_HAN() { return ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']; }
    static get NH_CAN() { return [0,0,1,1,2,2,3,3,4,4]; }
    static get NH_CHI() { return [4,2,0,0,2,1,1,2,3,3,2,4]; }
    static get NH_NAME() { return ['Mộc','Hỏa','Thổ','Kim','Thủy']; }
    static get NH_CSS() { return ['moc','hoa','tho','kim','thuy']; }
    static get SINH() { return [1,2,3,4,0]; }
    static get KHAC() { return [2,3,4,0,1]; }
    static get TRULBL() { return { year:'Năm', month:'Tháng', day:'Ngày', hour:'Giờ' }; }
    static get LUC_XUNG() { return [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]]; }
    static get LUC_HAI()  { return [[0,5],[1,6],[2,7],[3,8],[4,9],[10,11]]; }
    static get LUC_HOP()  { return [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]]; }
    static get DEFAULT_SUGGESTIONS() {
        return {
            0: `- Màu sắc: xanh lá cây\n- Trang sức: vòng tay gỗ, đá xanh lục\n- Hướng: Đông, Đông Nam\n- Mẹo: Mặc đồ màu xanh lá, dùng cây cảnh.`,
            1: `- Màu sắc: đỏ, hồng, cam\n- Trang sức: vòng đá mã não đỏ, thạch anh hồng\n- Hướng: Nam\n- Mẹo: Dùng nến, ánh sáng ấm, đồ điện tử.`,
            2: `- Màu sắc: vàng cát, nâu\n- Trang sức: vòng đá mắt hổ, thạch anh vàng\n- Hướng: Đông Bắc, Tây Nam\n- Mẹo: Sử dụng đồ gốm sứ, màu ấm.`,
            3: `- Màu sắc: trắng, xám, bạc\n- Trang sức: vòng bạc, đá trắng, kim loại\n- Hướng: Tây, Tây Bắc\n- Mẹo: Đeo trang sức kim loại, dùng đồ kim khí.`,
            4: `- Màu sắc: xanh dương, đen\n- Trang sức: vòng đá aquamarine, obsidian\n- Hướng: Bắc\n- Mẹo: Dùng hồ cá, tranh nước, màu tối.`
        };
    }

    // ─── HELPERS ────────────────────────────────────────────────────
    _nhCss(nh) { return nh>=0 ? BatTuModule.NH_CSS[nh] : ''; }
    _trungHoacSinh(nhA, nhB) { return nhB===nhA || BatTuModule.SINH[nhB]===nhA; }

    _getLunarMonthGanIndex(yearGan, month) {
        const first = {0:2,5:2, 1:4,6:4, 2:6,7:6, 3:8,8:8, 4:0,9:0};
        return (first[yearGan] + month - 1) % 10;
    }

    _getBaZi(y, m, d, h, mi, useLunarMonth=true) {
        const solar = Solar.fromYmdHms(y, m, d, h, mi, 0);
        const lunar = solar.getLunar();
        const ec = lunar.getEightChar();
        let bz = {
            year:  this._parseGZ(ec.getYear()),
            month: this._parseGZ(ec.getMonth()),
            day:   this._parseGZ(ec.getDay()),
            hour:  this._parseGZ(ec.getTime())
        };
        if (useLunarMonth) {
            bz.monthTietKhi = { ...bz.month };
            const absMonth = Math.abs(lunar.getMonth());
            const yearGanIndex = lunar.getYearGanIndex();
            const monthGanIndex = this._getLunarMonthGanIndex(yearGanIndex, absMonth);
            const monthZhiIndex = (absMonth + 1) % 12;
            bz.month = {
                si: monthGanIndex, bi: monthZhiIndex,
                can: BatTuModule.CAN[monthGanIndex], chi: BatTuModule.CHI[monthZhiIndex],
                nhCan: BatTuModule.NH_CAN[monthGanIndex], nhChi: BatTuModule.NH_CHI[monthZhiIndex]
            };
        }
        return bz;
    }

    _parseGZ(gz) {
        const si = BatTuModule.CAN_HAN.indexOf(gz[0]), bi = BatTuModule.CHI_HAN.indexOf(gz[1]);
        return {
            si, bi,
            can: si>=0 ? BatTuModule.CAN[si] : '?',
            chi: bi>=0 ? BatTuModule.CHI[bi] : '?',
            nhCan: si>=0 ? BatTuModule.NH_CAN[si] : -1,
            nhChi: bi>=0 ? BatTuModule.NH_CHI[bi] : -1
        };
    }

    _parseDateDMY(str) {
        if (!str) return null;
        const cleaned = str.replace(/[^0-9]/g, '');
        if (cleaned.length !== 8) return null;
        const d = +cleaned.substring(0,2), m = +cleaned.substring(2,4), y = +cleaned.substring(4,8);
        if (isNaN(d)||isNaN(m)||isNaN(y)||m<1||m>12||d<1||d>31||y<1900||y>2100) return null;
        const date = new Date(y, m-1, d);
        if (date.getFullYear()!==y || date.getMonth()!==m-1 || date.getDate()!==d) return null;
        return {d,m,y};
    }

    _formatDateString(str) {
        const nums = str.replace(/[^0-9]/g, '').substring(0,8);
        if (!nums) return '__/__/____';
        let r = nums.substring(0,2);
        if (nums.length >= 3) r += '/' + nums.substring(2,4);
        if (nums.length >= 5) r += '/' + nums.substring(4,8);
        return r;
    }

    _setCaretPosition(input) {
        const val = input.value;
        let pos = 0;
        for (let i=0;i<val.length;i++) if (val[i]==='/'||val[i]==='_') { pos=i; break; }
        if (!pos) pos = val.length;
        input.setSelectionRange(pos, pos);
    }

    _setupDateInputs() {
        this.querySelectorAll('input[data-mask="date"]').forEach(input => {
            if (!input.value) input.value = '__/__/____';
            else input.value = this._formatDateString(input.value);

            input.addEventListener('input', e => {
                const raw = input.value.replace(/[^0-9]/g,'').substring(0,8);
                let fmt = '';
                if (raw.length>0) fmt += raw.substring(0,2);
                if (raw.length>=3) fmt += '/' + raw.substring(2,4);
                if (raw.length>=5) fmt += '/' + raw.substring(4,8);
                input.value = fmt || '__/__/____';
                let cp = input.selectionStart;
                if (input.value[cp]==='/') cp++;
                input.setSelectionRange(cp, cp);
            });

            input.addEventListener('keydown', e => {
                const key = e.key, pos = input.selectionStart, val = input.value;
                if (key==='Backspace' && pos>0 && (val[pos-1]==='/' || pos===3 || pos===6)) {
                    e.preventDefault(); input.setSelectionRange(pos-1,pos-1);
                }
                if (key==='Delete' && pos<val.length && (val[pos]==='/' || pos===2 || pos===5)) {
                    e.preventDefault(); input.setSelectionRange(pos+1,pos+1);
                }
            });
            input.addEventListener('paste', e => {
                e.preventDefault();
                const pasted = (e.clipboardData||window.clipboardData).getData('text');
                const numbers = pasted.replace(/[^0-9]/g,'').substring(0,8);
                let fmt = '';
                if (numbers.length>0) fmt += numbers.substring(0,2);
                if (numbers.length>=3) fmt += '/' + numbers.substring(2,4);
                if (numbers.length>=5) fmt += '/' + numbers.substring(4,8);
                input.value = fmt || '__/__/____';
                this._setCaretPosition(input);
            });
            input.addEventListener('drop', e => e.preventDefault());
        });
    }

    // ─── GỢI Ý TỪ GITHUB ───────────────────────────────────────────
    async _fetchSuggestionsFromGitHub() {
        const info = this.querySelector('#data-source-info');
        try {
            const resp = await fetch('https://raw.githubusercontent.com/Blackhelios9x/Bat-Tu-Quy-Nhan/main/dung-than.txt');
            if (!resp.ok) throw new Error();
            const text = await resp.text();
            this._uploadedSuggestions = this._parseSuggestionsFromText(text);
            info.textContent = '✅ Đã tải dữ liệu gợi ý từ GitHub.';
        } catch(e) {
            this._uploadedSuggestions = null;
            info.textContent = 'ℹ️ Sử dụng gợi ý mặc định.';
        }
    }

    _parseSuggestionsFromText(text) {
        const map = new Map();
        const lines = text.split('\n');
        for (let i=0; i<lines.length; i++) {
            const line = lines[i].trim();
            const m = line.match(/^Dụng thần\s+(Mộc|Hỏa|Thổ|Kim|Thủy)\s*$/i);
            if (m) {
                const hanh = m[1]; let j = i+1, content=[];
                while (j<lines.length && !lines[j].trim().match(/^Dụng thần\s+(Mộc|Hỏa|Thổ|Kim|Thủy)\s*$/i)) content.push(lines[j++]);
                const c = content.join('\n').trim();
                if (c) map.set(hanh, c);
                i = j-1;
            }
        }
        return map;
    }

    _getSuggestionContent(hanhIndex) {
        const name = BatTuModule.NH_NAME[hanhIndex];
        if (this._uploadedSuggestions && this._uploadedSuggestions.has(name)) return this._uploadedSuggestions.get(name);
        return BatTuModule.DEFAULT_SUGGESTIONS[hanhIndex] || '';
    }

    // ─── TÍNH TOÁN & HIỂN THỊ ──────────────────────────────────────
    _calcDungThan() {
        if (typeof Solar === 'undefined') { alert('Thư viện lịch lỗi.'); return; }
        this.querySelector('#dt-err').textContent = '';
        const dateStr = this.querySelector('#dt-date').value.trim();
        const parsed = this._parseDateDMY(dateStr);
        if (!parsed) { this.querySelector('#dt-err').textContent = '⚠ Ngày không hợp lệ (dd/mm/yyyy)'; return; }
        const {d,m,y} = parsed;
        const h = +this.querySelector('#dt-hour').value;
        let bz;
        try { bz = this._getBaZi(y,m,d,h,0,true); }
        catch(e) { this.querySelector('#dt-err').textContent = 'Lỗi: '+e; return; }

        const nhA = bz.day.nhCan;
        const nhSinhA = BatTuModule.SINH.indexOf(nhA);
        const nhAsinh = BatTuModule.SINH[nhA];
        const nhKhacA = BatTuModule.KHAC.indexOf(nhA);

        const score1 = this._trungHoacSinh(nhA, bz.month.nhChi) ? 1 : 0;
        const chi3 = [bz.year.nhChi, bz.day.nhChi, bz.hour.nhChi];
        const chi3hit = chi3.map(nh=>this._trungHoacSinh(nhA,nh));
        const score2 = chi3hit.filter(Boolean).length>=2 ? 1 : 0;
        const can3 = [bz.year.nhCan, bz.month.nhCan, bz.hour.nhCan];
        const can3hit = can3.map(nh=>this._trungHoacSinh(nhA,nh));
        const score3 = can3hit.filter(Boolean).length===3 ? 1 : 0;
        const total = score1+score2+score3;

        this._renderBaZiTable(bz);
        const isMale = this.querySelector('input[name="dt-gender"]:checked').value === 'male';
        const isWeak = total <= 1;
        let dt1, dt2;
        if (isWeak) { dt1 = nhA; dt2 = nhSinhA; }
        else { dt1 = nhAsinh; dt2 = nhKhacA; }

        this._currentDungThanData = { bz, dt1, dt2, isWeak, nhCan: nhA };
        this._renderDaiVan(bz, y, m, d, isMale);

        const menhcucHtml = this._generateMenhCucAnalysis(bz, { dt1, dt2, isWeak, nhCan: nhA });
        const menhcucDiv = this.querySelector('#dt-menhcuc');
        menhcucDiv.innerHTML = menhcucHtml;
        menhcucDiv.style.display = 'block';

        const verdictEl = this.querySelector('#dt-verdict');
        const title = isWeak ? `💧 Thân Nhược — Bản mệnh yếu (${total}/3 điểm)` : `🔥 Thân Vượng — Bản mệnh mạnh (${total}/3 điểm)`;
        const desc = isWeak
            ? `Ngũ hành ${BatTuModule.NH_NAME[dt1]} (Nhật Can) và ${BatTuModule.NH_NAME[dt2]} (hành sinh cho nó) đang YẾU. Cần bổ sung.`
            : `Ngũ hành ${BatTuModule.NH_NAME[nhA]} quá mạnh. Cần dùng ${BatTuModule.NH_NAME[dt1]} (tiết hao) hoặc ${BatTuModule.NH_NAME[dt2]} (chế ngự).`;
        const content1 = this._getSuggestionContent(dt1);
        const content2 = this._getSuggestionContent(dt2);
        verdictEl.innerHTML = `
            <div class="verdict-title">${title}</div>
            <div class="verdict-body">${desc}</div>
            <div class="nh-tags">
                <div class="nh-tag ${this._nhCss(dt1)}">❶ Dụng Thần chính · ${BatTuModule.NH_NAME[dt1]}</div>
                <div class="nh-tag ${this._nhCss(dt2)}">❷ Dụng Thần phụ · ${BatTuModule.NH_NAME[dt2]}</div>
            </div>
            <div class="suggest-box">
                <div class="suggest-title">✨ Gợi ý chi tiết ${this._uploadedSuggestions ? '(từ GitHub)' : '(mặc định)'}</div>
                <div class="suggest-grid">
                    <div class="suggest-col"><h4>🌿 Dụng Thần chính · ${BatTuModule.NH_NAME[dt1]}</h4><div class="suggest-content">${content1.replace(/\n/g,'<br>')}</div></div>
                    <div class="suggest-col"><h4>🍂 Dụng Thần phụ · ${BatTuModule.NH_NAME[dt2]}</h4><div class="suggest-content">${content2.replace(/\n/g,'<br>')}</div></div>
                </div>
            </div>
        `;
        this.querySelector('#dt-result').style.display = 'block';
        setTimeout(()=> this.querySelector('#dt-result').scrollIntoView({behavior:'smooth',block:'start'}), 80);
    }

    _renderBaZiTable(bz) {
        const COLS = [{key:'hour',lbl:'Giờ'},{key:'day',lbl:'Ngày'},{key:'month',lbl:'Tháng'},{key:'year',lbl:'Năm'}];
        let html = '';
        COLS.forEach(col => {
            const t = bz[col.key];
            html += `<div class="bz-col"><span class="bz-col-lbl">${col.lbl}</span>
                <div class="bz-cell nh-${this._nhCss(t.nhCan)}">${t.can}</div>
                <div class="bz-cell nh-${this._nhCss(t.nhChi)}">${t.chi}</div></div>`;
        });
        this.querySelector('#dt-bz-table').innerHTML = html;
        let ref = '<span style="font-size:.75rem;color:var(--muted)">Màu Ngũ Hành:</span>';
        BatTuModule.NH_CSS.forEach((cls,idx) => ref += `<span class="nh-tag sm ${cls}">${BatTuModule.NH_NAME[idx]}</span>`);
        this.querySelector('#dt-nh-ref').innerHTML = ref;
    }

    // ─── ĐẠI VẬN ───────────────────────────────────────────────────
    _ganzhi60pos(si,bi){ for(let k=0;k<60;k++) if(k%10===si && k%12===bi) return k; return 0; }
    _getChineseBirthYear(si, bi, birthY) {
        const pos = this._ganzhi60pos(si, bi); let year = 1984 + pos;
        while (year > birthY) year -= 60; while (year + 60 <= birthY) year += 60; return year;
    }
    _renderDaiVan(bz, birthY, birthM, birthD, isMale) {
        const dvSection = this.querySelector('#dt-daivan-section');
        try {
            const monthForDaivan = bz.monthTietKhi || bz.month;
            const isYangYear = bz.year.si % 2 === 0;
            const isThuanVan = (isMale && isYangYear) || (!isMale && !isYangYear);
            const chineseBirthYear = this._getChineseBirthYear(bz.year.si, bz.year.bi, birthY);
            const birthSolar = Solar.fromYmd(birthY, birthM, birthD);
            const lunar = birthSolar.getLunar();
            let targetJie = isThuanVan ? lunar.getNextJie() : lunar.getPrevJie();
            if (!targetJie) { dvSection.style.display = 'none'; return; }
            const jieSolar = targetJie.getSolar();
            const d1 = new Date(birthY, birthM-1, birthD);
            const d2 = new Date(jieSolar.getYear(), jieSolar.getMonth()-1, jieSolar.getDay());
            const diffDays = Math.round(Math.abs(d2 - d1) / 86400000);
            const khoiVanYears = Math.floor(diffDays / 3);
            const khoiVanMonths = (diffDays % 3) * 4;
            const firstDVYear = birthY + khoiVanYears;
            const firstDVAge = firstDVYear - chineseBirthYear;
            const mSi = monthForDaivan.si, mBi = monthForDaivan.bi;
            const dvList = [];
            for (let n=1; n<=8; n++) {
                let si, bi;
                if (isThuanVan) { si = (mSi + n) % 10; bi = (mBi + n) % 12; }
                else { si = ((mSi - n) % 10 + 10) % 10; bi = ((mBi - n) % 12 + 12) % 12; }
                const dvYear = firstDVYear + (n-1)*10, dvAge = dvYear - chineseBirthYear;
                dvList.push({ si, bi, can: BatTuModule.CAN[si], chi: BatTuModule.CHI[bi], nhCan: BatTuModule.NH_CAN[si], nhChi: BatTuModule.NH_CHI[bi], year: dvYear, age: dvAge });
            }
            this.querySelector('#dt-daivan-meta').innerHTML = `
                <strong>Vận ${isThuanVan?'Thuận':'Nghịch'}</strong> · Can năm: ${bz.year.can} (${isYangYear?'Dương':'Âm'}) ·
                Tiết: ${targetJie.getName()} · ${diffDays} ngày → khởi ${khoiVanYears} tuổi ${khoiVanMonths?' '+khoiVanMonths+' tháng':''} ·
                Năm ${firstDVYear} (${firstDVAge} tuổi)
            `;
            let rowHtml = '';
            dvList.forEach((dv,idx) => {
                rowHtml += `<div class="dv-item" data-dv-index="${idx}">
                    <div class="dv-age">${dv.age} tuổi<span class="dv-year">${dv.year}</span></div>
                    <div class="dv-can nh-${this._nhCss(dv.nhCan)}">${dv.can}</div>
                    <div class="dv-chi nh-${this._nhCss(dv.nhChi)}">${dv.chi}</div>
                </div>`;
            });
            this.querySelector('#dt-daivan-row').innerHTML = rowHtml;
            this.querySelector('#dt-daivan-row').querySelectorAll('.dv-item').forEach(el => {
                el.addEventListener('click', () => this._showDaiVanDetail(+el.dataset.dvIndex));
            });
            dvSection.style.display = 'block';
            this.querySelector('#dv-detail-container').style.display = 'none';
            this._currentDaiVanList = dvList;
        } catch(err) { console.error(err); dvSection.style.display = 'none'; }
    }

    _showDaiVanDetail(index) {
        const data = this._currentDungThanData;
        const dvList = this._currentDaiVanList;
        if (!data || !dvList || index >= dvList.length) return;
        const dv = dvList[index];
        const { bz, dt1, dt2, isWeak, nhCan } = data;
        const desc = this._generateDaiVanDescription(bz, dv, { dt1, dt2, isWeak, nhCan });
        this.querySelector('#dv-detail-title').innerHTML = `✨ Luận giải Đại Vận ${dv.can} ${dv.chi}`;
        this.querySelector('#dv-detail-content').innerHTML = desc;
        this.querySelector('#dv-detail-container').style.display = 'block';
    }

    _generateDaiVanDescription(bz, dv, dungThanInfo) {
        const { dt1, dt2, isWeak, nhCan } = dungThanInfo;
        const nhName = BatTuModule.NH_NAME[nhCan];
        const dungList = [dt1, dt2];
        const kyList = [0,1,2,3,4].filter(i => !dungList.includes(i));
        const canHanh = dv.nhCan, chiHanh = dv.nhChi;
        function isXung(i1,i2){ return BatTuModule.LUC_XUNG.some(p=>(p[0]===i1&&p[1]===i2)||(p[1]===i1&&p[0]===i2)); }
        function isHai(i1,i2){ return BatTuModule.LUC_HAI.some(p=>(p[0]===i1&&p[1]===i2)||(p[1]===i1&&p[0]===i2)); }
        function isHop(i1,i2){ return BatTuModule.LUC_HOP.some(p=>(p[0]===i1&&p[1]===i2)||(p[1]===i1&&p[0]===i2)); }
        let desc = `【Lá số Tứ Trụ】\n\nNăm: ${bz.year.can} ${bz.year.chi}\nTháng: ${bz.month.can} ${bz.month.chi}\nNgày: ${bz.day.can} ${bz.day.chi}\nGiờ: ${bz.hour.can} ${bz.hour.chi}\n\nĐại vận: ${dv.can} ${dv.chi}\n\n`;
        desc += `【Tóm tắt Mệnh cục】\nNhật chủ: ${bz.day.can} (hành ${BatTuModule.NH_NAME[bz.day.nhCan]}). ${isWeak?'Thân Nhược':'Thân Vượng'}. Dụng thần: ${BatTuModule.NH_NAME[dt1]}, ${BatTuModule.NH_NAME[dt2]}. Kỵ thần: ${kyList.map(i=>BatTuModule.NH_NAME[i]).join(', ')}.\n\n`;
        desc += `【Phân tích Đại vận ${dv.can} ${dv.chi}】\n1. Tác dụng Thiên Can: ${dv.can} (${BatTuModule.NH_NAME[canHanh]})\n`;
        if (dungList.includes(canHanh)) desc += `   ✅ Là Dụng thần.\n`; else if (kyList.includes(canHanh)) desc += `   ❌ Là Kỵ thần.\n`;
        desc += `2. Tác dụng Địa Chi: ${dv.chi} (${BatTuModule.NH_NAME[chiHanh]})\n`;
        if (dungList.includes(chiHanh)) desc += `   ✅ Là Dụng thần.\n`; else if (kyList.includes(chiHanh)) desc += `   ❌ Là Kỵ thần.\n`;
        const chiIdx = dv.bi;
        ['year','month','day','hour'].forEach(t=>{
            const c = bz[t].bi;
            if (c===chiIdx) desc += `   - Trùng với chi ${BatTuModule.TRULBL[t]}.\n`;
            else if (isXung(chiIdx,c)) desc += `   - Xung với chi ${BatTuModule.TRULBL[t]} (biến động).\n`;
            else if (isHai(chiIdx,c)) desc += `   - Hại với chi ${BatTuModule.TRULBL[t]} (hao tổn).\n`;
            else if (isHop(chiIdx,c)) desc += `   - Lục Hợp với chi ${BatTuModule.TRULBL[t]} (hòa hợp).\n`;
        });
        const good = (dungList.includes(canHanh)?1:0)+(dungList.includes(chiHanh)?1:0);
        const bad = (kyList.includes(canHanh)?1:0)+(kyList.includes(chiHanh)?1:0);
        desc += `\n【Kết luận】 `;
        if (good>=2) desc += `Đại vận tốt, thuận lợi.`;
        else if (bad>=2) desc += `Đại vận xấu, nhiều khó khăn.`;
        else desc += `Đại vận trung bình, hỗn tạp.`;
        return desc.replace(/\n/g,'<br>');
    }

    _generateMenhCucAnalysis(bz, dungThanInfo) {
        const { dt1, dt2, isWeak, nhCan } = dungThanInfo;
        const nhName = BatTuModule.NH_NAME[nhCan];
        const dungList = [dt1, dt2];
        const kyList = [0,1,2,3,4].filter(i => !dungList.includes(i));
        let html = `<div class="menhcuc-title">📖 Phân tích Mệnh cục</div>`;
        html += `<div class="menhcuc-content">`;
        html += `<strong>1. Nhật chủ vượng suy và Cách cục</strong><br>`;
        html += `Nhật chủ <strong>${bz.day.can} (hành ${nhName})</strong>, sinh tháng ${bz.month.chi} (${BatTuModule.NH_NAME[bz.month.nhChi]} đương lệnh). `;
        if (isWeak) {
            html += `Thân nhược, ${BatTuModule.NH_NAME[bz.month.nhChi]} khắc nhập. `;
            html += `Toàn cục Quan Sát (Kim) vượng, áp lực lớn. `;
        } else {
            html += `Thân vượng, cần tiết hao. `;
        }
        html += `<br><br>`;
        html += `<strong>Hỷ Dụng Thần:</strong> ${dungList.map(i=>BatTuModule.NH_NAME[i]).join(', ')}. `;
        if (isWeak) html += `(cần sinh phù, hóa giải sát khí). `;
        else html += `(cần tiết hao, chế ngự). `;
        html += `<br><strong>Kỵ Thần:</strong> ${kyList.map(i=>BatTuModule.NH_NAME[i]).join(', ')}.<br><br>`;
        html += `<strong>2. Thông tin then chốt trong nguyên cục</strong><br>`;
        const year = bz.year, month = bz.month, day = bz.day, hour = bz.hour;
        if (year.nhCan === BatTuModule.SINH[month.nhCan]) html += `• <strong>Quan Ấn tương sinh:</strong> Niên can ${year.can} (${BatTuModule.NH_NAME[year.nhCan]}) sinh cho Nguyệt can ${month.can}. Tốt cho học vấn, quý nhân.<br>`;
        else if (BatTuModule.SINH[year.nhCan] === month.nhCan) html += `• <strong>Ấn sinh Quan:</strong> Niên can ${year.can} sinh Nguyệt can ${month.can}. Có lợi cho sự nghiệp.<br>`;
        if (BatTuModule.SINH[year.nhCan] === nhCan && BatTuModule.KHAC[hour.nhCan] === year.nhCan) html += `• <strong>Tài phá Ấn:</strong> Thời can ${hour.can} (${BatTuModule.NH_NAME[hour.nhCan]}) khắc Niên can ${year.can} (Ấn tinh). Dễ vì tiền bạc mà tổn hại danh dự, học hành.<br>`;
        if (hour.bi === 5 && month.bi === 9) html += `• <strong>Thương Quan kiến Quan:</strong> Chi giờ Tỵ (tàng Bính Hỏa) xung với Nguyệt chi Dậu (Chính Quan). Bản tính ngang ngạnh, không thích gò bó.<br>`;
        if (isWeak && kyList.includes(3)) html += `• Kim (Quan Sát) quá vượng, cần Thủy hóa giải hoặc Mộc trợ thân.<br>`;
        if (!isWeak && kyList.includes(0)) html += `• Mộc quá vượng, cần Kim khắc chế hoặc Hỏa tiết hao.<br>`;
        html += `</div>`;
        return html;
    }
}

customElements.define('bat-tu-module', BatTuModule);
