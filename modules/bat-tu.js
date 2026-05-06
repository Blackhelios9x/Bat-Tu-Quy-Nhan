// ========================================================
// MODULE BÁT TỰ – DỤNG THẦN
// ========================================================
class BatTuModule extends HTMLElement {
    constructor() {
        super();
        const hourSelect = `<select id="dt-hour">
            <option value="0">00:00-00:59 · Tý</option><option value="1">01:00-01:59 · Sửu</option><option value="2">02:00-02:59 · Sửu</option>
            <option value="3">03:00-03:59 · Dần</option><option value="4">04:00-04:59 · Dần</option><option value="5">05:00-05:59 · Mão</option>
            <option value="6">06:00-06:59 · Mão</option><option value="7">07:00-07:59 · Thìn</option><option value="8">08:00-08:59 · Thìn</option>
            <option value="9">09:00-09:59 · Tỵ</option><option value="10">10:00-10:59 · Tỵ</option><option value="11">11:00-11:59 · Ngọ</option>
            <option value="12" selected>12:00-12:59 · Ngọ</option><option value="13">13:00-13:59 · Mùi</option><option value="14">14:00-14:59 · Mùi</option>
            <option value="15">15:00-15:59 · Thân</option><option value="16">16:00-16:59 · Thân</option><option value="17">17:00-17:59 · Dậu</option>
            <option value="18">18:00-18:59 · Dậu</option><option value="19">19:00-19:59 · Tuất</option><option value="20">20:00-20:59 · Tuất</option>
            <option value="21">21:00-21:59 · Hợi</option><option value="22">22:00-22:59 · Hợi</option><option value="23">23:00-23:59 · Tý</option>
        </select>`;

        this.innerHTML = `
            <style>
                :root{--primary:#a67c4e;--primary-l:#c8a87c;--primary-d:#5e3e22;--bg:#fbf7f0;--card:#ffffffdd;--card2:#fff9f2ee;--bor:#e3d6c5;--bor-h:#c9aa8b;--text:#1f150c;--muted:#7a6048;--in-bg:#fefcf8;--err:#b33f3d;--shadow:0 8px 20px rgba(0,0,0,.05);--c-kim:#5c5c5c;--bg-kim:#e0e0e0;--c-moc:#2e7d32;--bg-moc:#e8f5e9;--c-thuy:#ffffff;--bg-thuy:#1976d2;--c-hoa:#c62828;--bg-hoa:#ffebee;--c-tho:#5d4037;--bg-tho:#fbc02d}
                .card{background:var(--card);border:1px solid var(--bor);border-radius:20px;padding:24px 22px;margin-bottom:20px;backdrop-filter:blur(12px);box-shadow:var(--shadow)}
                .ctitle{font-size:.95rem;font-weight:600;color:var(--primary-d);margin-bottom:18px;display:flex;align-items:center;gap:8px}
                .ctitle::after{content:'';flex:1;height:1px;background:var(--bor)}
                .irow{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-end}
                .ig{display:flex;flex-direction:column;gap:5px}
                .ig label{font-size:.7rem;color:var(--muted);text-transform:uppercase}
                input,select{background:var(--in-bg);border:1px solid var(--bor);border-radius:12px;padding:11px 14px;font-size:.95rem;outline:none;width:100%}
                input:focus,select:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(166,124,78,.15)}
                .errtxt{color:var(--err);font-size:.75rem;margin-top:5px}
                .btn-main{display:block;width:fit-content;margin:20px auto 30px;padding:14px 36px;background:var(--primary);color:white;border:none;border-radius:40px;font-size:1rem;font-weight:700;cursor:pointer;box-shadow:0 6px 14px rgba(166,124,78,.3);text-transform:uppercase}
                .btn-main:hover{background:var(--primary-d);transform:translateY(-2px)}
                .nh-kim{color:var(--c-kim);background:var(--bg-kim);border-color:#bdbdbd}
                .nh-moc{color:var(--c-moc);background:var(--bg-moc);border-color:#a5d6a7}
                .nh-thuy{color:var(--c-thuy);background:var(--bg-thuy);border-color:#64b5f6}
                .nh-hoa{color:var(--c-hoa);background:var(--bg-hoa);border-color:#ef9a9a}
                .nh-tho{color:var(--c-tho);background:var(--bg-tho);border-color:#ffe082}
                .bz-table{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:16px 0}
                .bz-col{text-align:center}
                .bz-cell{padding:14px 6px;border-radius:16px;font-size:1.3rem;font-weight:700;border:1px solid transparent}
                .dv-title,.ln-title{font-size:.9rem;color:var(--primary-d);margin-bottom:12px;display:flex;align-items:center;gap:10px}
                .dv-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:6px}
                .dv-item{text-align:center;background:var(--in-bg);border-radius:12px;padding:10px 4px;border:1px solid var(--bor);cursor:pointer}
                .dv-item:hover{background:rgba(166,124,78,.08)}
                .ln-grid{display:flex;overflow-x:auto;gap:10px;padding:10px 0}
                .ln-item{flex:0 0 80px;text-align:center;background:var(--in-bg);border-radius:16px;padding:6px 4px;border:1px solid var(--bor);cursor:pointer}
                .ln-item:hover{background:rgba(166,124,78,.08)}
                .nh-tag{padding:8px 24px;border-radius:40px;font-weight:700;border:2px solid;background:white}
                .suggest-box{background:#f4efe8;border-radius:18px;padding:20px;margin-top:20px;border-left:6px solid var(--primary)}
                .suggest-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
                @media(max-width:600px){.suggest-grid{grid-template-columns:1fr}.dv-grid{display:flex;overflow-x:auto;gap:6px}.dv-item{flex:0 0 66px}}
            </style>
            <div class="card">
                <div class="ctitle">📅 Thông tin ngày giờ sinh</div>
                <div class="irow">
                    <div class="ig"><label>Ngày sinh (dd/mm/yyyy)</label><input type="text" id="dt-date" placeholder="dd/mm/yyyy" value="15/01/1990" data-mask="date"></div>
                    <div class="ig"><label>Giờ sinh</label>${hourSelect}</div>
                    <div class="ig"><label>Giới tính</label><select id="dt-gender"><option value="male" selected>Nam</option><option value="female">Nữ</option></select></div>
                </div>
                <div id="dt-err" class="errtxt"></div>
            </div>
            <button class="btn-main" id="calc-dt-btn">🔥 Tìm Dụng Thần</button>
            <div id="dt-result" style="display:none">
                <div class="card"><div class="ctitle">📊 Bát Tự của bạn</div><div class="bz-table" id="dt-bz-table"></div><div id="dt-daivan-section"></div><div id="dt-luunien-section"></div></div>
                <div id="dt-verdict"></div>
            </div>
        `;
    }

    connectedCallback() {
        if (typeof Solar === 'undefined') { alert('Thư viện lịch lỗi.'); return; }
        this.querySelector('#calc-dt-btn').addEventListener('click', () => this._calcDungThan());
    }

    // ========== HẰNG SỐ ==========
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
    static get LUC_XUNG() { return [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]]; }
    static get LUC_HAI()  { return [[0,5],[1,6],[2,7],[3,8],[4,9],[10,11]]; }
    static get LUC_HOP()  { return [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]]; }

    _nhCss(nh){ return nh>=0 ? BatTuModule.NH_CSS[nh] : ''; }
    _trungHoacSinh(nhA, nhB){ return nhB===nhA || BatTuModule.SINH[nhB]===nhA; }
    _parseDateDMY(str) {
        const parts = str.trim().split('/');
        if (parts.length!==3) return null;
        const d=+parts[0], m=+parts[1], y=+parts[2];
        if (m<1||m>12||d<1||d>31||y<1900||y>2100) return null;
        return {d,m,y};
    }
    _getBaZi(y,m,d,h,mi){
        const solar = Solar.fromYmdHms(y,m,d,h,mi,0);
        const ec = solar.getLunar().getEightChar();
        const parse = gz => {
            const si = BatTuModule.CAN_HAN.indexOf(gz[0]), bi = BatTuModule.CHI_HAN.indexOf(gz[1]);
            return {si,bi, can: BatTuModule.CAN[si], chi: BatTuModule.CHI[bi], nhCan: BatTuModule.NH_CAN[si], nhChi: BatTuModule.NH_CHI[bi]};
        };
        return { year: parse(ec.getYear()), month: parse(ec.getMonth()), day: parse(ec.getDay()), hour: parse(ec.getTime()) };
    }
    _renderBaZiTable(bz) {
        const cols = [{k:'hour',l:'Giờ'},{k:'day',l:'Ngày'},{k:'month',l:'Tháng'},{k:'year',l:'Năm'}];
        this.querySelector('#dt-bz-table').innerHTML = cols.map(c => {
            const t = bz[c.k];
            return `<div class="bz-col"><span style="font-size:.7rem;color:var(--muted)">${c.l}</span><div class="bz-cell nh-${this._nhCss(t.nhCan)}">${t.can}</div><div class="bz-cell nh-${this._nhCss(t.nhChi)}">${t.chi}</div></div>`;
        }).join('');
    }
    _calcDungThan() {
        const parsed = this._parseDateDMY(this.querySelector('#dt-date').value);
        if (!parsed) return;
        const {d,m,y} = parsed;
        const h = +this.querySelector('#dt-hour').value;
        const isMale = this.querySelector('#dt-gender').value === 'male';
        const bz = this._getBaZi(y,m,d,h,0);
        const nhA = bz.day.nhCan;
        const nhSinhA = BatTuModule.SINH.indexOf(nhA);
        const nhAsinh = BatTuModule.SINH[nhA];
        const nhKhacA = BatTuModule.KHAC.indexOf(nhA);
        const score1 = this._trungHoacSinh(nhA, bz.month.nhChi)?1:0;
        const chi3 = [bz.year.nhChi, bz.day.nhChi, bz.hour.nhChi];
        const score2 = chi3.filter(nh=>this._trungHoacSinh(nhA,nh)).length>=2?1:0;
        const can3 = [bz.year.nhCan, bz.month.nhCan, bz.hour.nhCan];
        const score3 = can3.filter(nh=>this._trungHoacSinh(nhA,nh)).length===3?1:0;
        const total = score1+score2+score3;
        const isWeak = total <= 1;
        const dt1 = isWeak ? nhA : nhAsinh;
        const dt2 = isWeak ? nhSinhA : nhKhacA;
        this._renderBaZiTable(bz);
        // Hiển thị kết luận Dụng Thần
        const verdictEl = this.querySelector('#dt-verdict');
        verdictEl.innerHTML = `
            <div style="font-weight:700;font-size:1.2rem;color:var(--primary-d);margin-bottom:10px">${isWeak ? '💧 Thân Nhược' : '🔥 Thân Vượng'} (${total}/3 điểm)</div>
            <div>Dụng thần: ${BatTuModule.NH_NAME[dt1]} và ${BatTuModule.NH_NAME[dt2]}</div>
            <div class="suggest-box"><div class="suggest-title">Gợi ý</div><div class="suggest-grid">
                <div>Dụng thần 1 – ${BatTuModule.NH_NAME[dt1]}</div>
                <div>Dụng thần 2 – ${BatTuModule.NH_NAME[dt2]}</div>
            </div></div>
        `;
        this.querySelector('#dt-result').style.display = 'block';
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
        });
    }
    _formatDateString(str) {
        const nums = str.replace(/[^0-9]/g,'').substring(0,8);
        if (!nums) return '__/__/____';
        let r = nums.substring(0,2);
        if (nums.length>=3) r += '/' + nums.substring(2,4);
        if (nums.length>=5) r += '/' + nums.substring(4,8);
        return r;
    }
    _setCaretPosition(input) {
        const val = input.value; let pos = 0;
        for (let i=0;i<val.length;i++) if (val[i]==='/'||val[i]==='_') { pos=i; break; }
        if (!pos) pos = val.length; input.setSelectionRange(pos,pos);
    }
}

customElements.define('bat-tu-module', BatTuModule);
