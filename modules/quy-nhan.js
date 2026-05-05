// ========================================================
// MODULE QUÝ NHÂN (đã sửa phần chọn giờ)
// ========================================================
class QuyNhanModule extends HTMLElement {
    constructor() {
        super();
        // Tạo danh sách option giờ
        const hourOptions = ['<option value="">-- Chọn giờ (mặc định 00:00) --</option>'];
        for (let h = 0; h <= 23; h++) {
            const val = String(h).padStart(2, '0') + ':00';
            hourOptions.push(`<option value="${val}">${val}</option>`);
        }

        this.innerHTML = `
            <style>
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
                input.invalid, select.invalid { border-color: var(--err) !important; }
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
                .pnum { width: 30px; height: 30px; border-radius: 50%; background: var(--primary-l); color: white; display: flex; align-items: center; justify-content: center; }
                .prow { margin-bottom: 14px; }
                .my-card { background: #fffaf2; border-radius: 20px; padding: 24px; margin-bottom: 20px; box-shadow: var(--shadow); }
                .pillar { display: flex; flex-direction: column; align-items: center; }
                .pval { background: #f5ede3; border-radius: 14px; padding: 10px 14px; min-width: 78px; }
                .pval .s { color: var(--primary-d); font-weight: 700; }
                .hit-a { border-color: #c9aa71; background: #f9efdf; }
                .hit-b { border-color: #7eb8b0; background: #e1f1ef; }
                .hit-ab { border-color: #d4b87a; background: #f3e9d4; }
                .pcard { background: var(--card2); border-radius: 20px; padding: 22px; margin-bottom: 20px; }
                .cmp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
                .pct-box { background: #f8f2ea; border-radius: 16px; padding: 16px; text-align: center; }
                .pct-val { font-size: 2.2rem; color: var(--primary); }
                .pct-bar { background: #e2d6c8; height: 6px; border-radius: 6px; }
                .pct-fill { background: var(--primary); height: 100%; border-radius: 6px; }
                .pct-lbl { font-size: .8rem; color: var(--muted2); margin-bottom: 6px; }
                .pct-stars { font-size: 1.1rem; margin-top: 6px; }
                .pct-hits { font-size: .75rem; color: var(--primary-d); margin-top: 4px; }
                .note-card { background: #faf3eb; border-left: 5px solid var(--primary); padding: 14px 18px; border-radius: 0 16px 16px 0; }
                .sum-line { font-size: .8rem; color: var(--muted); margin-top: 8px; }
                .badge { background: var(--primary); color: white; border-radius: 20px; padding: 3px 10px; font-size: .8rem; font-weight: 700; }
                .pcard-hd { display: flex; gap: 10px; align-items: center; margin-bottom: 10px; }
                .plbl { font-size: .65rem; color: var(--muted); margin-bottom: 4px; display: block; text-align: center; }
                .pval .s, .pval .b { display: block; font-size: 1.2rem; text-align: center; }
                .bz-row { display: flex; gap: 10px; margin: 12px 0; }
                @media (max-width: 600px) {
                    .cmp-grid { grid-template-columns: 1fr; }
                    .irow { flex-direction: column; align-items: stretch; }
                    .ig { width: 100%; }
                    input, select { width: 100%; }
                }
            </style>
            <div class="card">
                <div class="ctitle">⭐ Thông tin của bạn</div>
                <div class="irow">
                    <div class="ig"><label>Ngày sinh (dd/mm/yyyy)</label><input type="text" id="myDate" placeholder="dd/mm/yyyy" value="15/06/1984" inputmode="numeric" data-mask="date"></div>
                    <div class="ig"><label>Giờ sinh</label><select id="myTime">${hourOptions.join('')}</select></div>
                </div>
                <div id="myErr" class="errtxt"></div>
            </div>
            <div class="card">
                <div class="ctitle">👥 Người cần xem (tối đa 5 người)</div>
                <div id="pInputs"></div>
            </div>
            <button class="btn-main" id="calc-qn-btn">✨ Xem Quý Nhân</button>
            <div id="qn-results" style="display:none"></div>
        `;
    }

    connectedCallback() {
        this._setupInputs();
        this.querySelector('#calc-qn-btn').addEventListener('click', () => this._calcQuyNhan());
    }

    static get CAN() { return ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý']; }
    static get CHI() { return ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi']; }
    static get CAN_HAN() { return ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']; }
    static get CHI_HAN() { return ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']; }
    static get NH_CAN() { return [0,0,1,1,2,2,3,3,4,4]; }
    static get NH_CHI() { return [4,2,0,0,2,1,1,2,3,3,2,4]; }
    static get ORDER_QN() { return ['hour','day','month','year']; }
    static get TRULBL() { return { year:'Năm', month:'Tháng', day:'Ngày', hour:'Giờ' }; }
    static get STARS() { return ['☆☆☆☆','★☆☆☆','★★☆☆','★★★☆','★★★★']; }
    static get QN_TABLE() { return [[1,7],[0,8],[11,9],[11,9],[1,7],[0,8],[1,7],[6,2],[3,5],[3,5]]; }

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

    _parseTime(s) {
        if (!s || !s.trim()) return null; // chuỗi rỗng trả về null
        const m = s.trim().match(/^(\d{1,2}):(\d{2})$/);
        if (!m) return false; // sai định dạng
        const h=+m[1], min=+m[2];
        if (h<0||h>23||min<0||min>59) return false;
        return {h, min};
    }

    _getBaZi(y, m, d, h, mi, useLunarMonth=true) {
        const solar = Solar.fromYmdHms(y, m, d, h, mi, 0);
        const lunar = solar.getLunar();
        const ec = lunar.getEightChar();
        const parseGZ = (gz) => {
            const si = QuyNhanModule.CAN_HAN.indexOf(gz[0]), bi = QuyNhanModule.CHI_HAN.indexOf(gz[1]);
            return { si, bi, can: si>=0?QuyNhanModule.CAN[si]:'?', chi: bi>=0?QuyNhanModule.CHI[bi]:'?', nhCan: si>=0?QuyNhanModule.NH_CAN[si]:-1, nhChi: bi>=0?QuyNhanModule.NH_CHI[bi]:-1 };
        };
        let bz = {
            year:  parseGZ(ec.getYear()),
            month: parseGZ(ec.getMonth()),
            day:   parseGZ(ec.getDay()),
            hour:  parseGZ(ec.getTime())
        };
        if (useLunarMonth) {
            bz.monthTietKhi = { ...bz.month };
            const absMonth = Math.abs(lunar.getMonth());
            const yearGanIndex = lunar.getYearGanIndex();
            const firstMonthGanMap = {0:2,5:2,1:4,6:4,2:6,7:6,3:8,8:8,4:0,9:0};
            const monthGanIndex = (firstMonthGanMap[yearGanIndex] + absMonth - 1) % 10;
            const monthZhiIndex = (absMonth + 1) % 12;
            bz.month = {
                si: monthGanIndex, bi: monthZhiIndex,
                can: QuyNhanModule.CAN[monthGanIndex], chi: QuyNhanModule.CHI[monthZhiIndex],
                nhCan: QuyNhanModule.NH_CAN[monthGanIndex], nhChi: QuyNhanModule.NH_CHI[monthZhiIndex]
            };
        }
        return bz;
    }

    _setupInputs() {
        const cont = this.querySelector('#pInputs');
        // Tạo danh sách option giờ cho từng người
        const personHourOptions = ['<option value="">-- Chọn giờ (mặc định 00:00) --</option>'];
        for (let h = 0; h <= 23; h++) {
            const val = String(h).padStart(2, '0') + ':00';
            personHourOptions.push(`<option value="${val}">${val}</option>`);
        }
        for (let i=1; i<=5; i++) {
            cont.innerHTML += `
                <div class="prow" id="pr${i}">
                    <div class="irow">
                        <div class="pnum">${i}</div>
                        <div class="ig"><label>Ngày sinh (dd/mm/yyyy)</label><input type="text" id="p${i}d" class="w" placeholder="dd/mm/yyyy" inputmode="numeric" data-mask="date"></div>
                        <div class="ig"><label>Giờ sinh</label><select id="p${i}t" class="n">${personHourOptions.join('')}</select></div>
                    </div>
                    <div class="errtxt" id="p${i}e" style="padding-left:44px"></div>
                </div>`;
        }
        this._setupDateInputs();
    }

    _formatDateString(str) {
        const nums = (str||'').replace(/[^0-9]/g,'').substring(0,8);
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

    _calcQuyNhan() {
        if (typeof Solar === 'undefined') { alert('Thư viện lịch lỗi.'); return; }
        this.querySelectorAll('.errtxt').forEach(e=>e.textContent='');
        this.querySelectorAll('input, select').forEach(i=>i.classList.remove('invalid'));
        const myDate = this._parseDateDMY(this.querySelector('#myDate').value);
        const myTimeRaw = this.querySelector('#myTime').value;
        let hasErr = false;
        if (!myDate) { 
            this.querySelector('#myDate').classList.add('invalid'); 
            this.querySelector('#myErr').textContent='⚠ Ngày không hợp lệ'; 
            hasErr=true; 
        }
        let myTime = this._parseTime(myTimeRaw);
        if (myTime === null) {
            // Không chọn giờ => mặc định 00:00
            myTime = {h:0, min:0};
        } else if (myTime === false) {
            // Trường hợp sai định dạng (không thể xảy ra với select)
            this.querySelector('#myTime').classList.add('invalid'); 
            this.querySelector('#myErr').textContent = (this.querySelector('#myErr').textContent + ' ⚠ Giờ không hợp lệ').trim(); 
            hasErr=true;
        }
        if (hasErr) { 
            this.querySelector('#qn-results').style.display='none'; 
            return; 
        }
        let myBZ;
        try { 
            myBZ = this._getBaZi(myDate.y, myDate.m, myDate.d, myTime.h, myTime.min, true); 
        } catch(e) { 
            this.querySelector('#myErr').textContent='Lỗi: '+e.message; 
            return; 
        }
        const people = [];
        for (let i=1;i<=5;i++) {
            const dRaw = this.querySelector(`#p${i}d`).value.trim();
            const tRaw = this.querySelector(`#p${i}t`).value.trim();
            if (!dRaw) continue;
            const pd = this._parseDateDMY(dRaw);
            if (!pd) { 
                this.querySelector(`#p${i}d`).classList.add('invalid'); 
                this.querySelector(`#p${i}e`).textContent='⚠ Ngày không hợp lệ'; 
                continue; 
            }
            let pt;
            if (tRaw === '') {
                // Không chọn => mặc định 00:00
                pt = {h:0, min:0};
            } else {
                pt = this._parseTime(tRaw);
                if (!pt) { 
                    this.querySelector(`#p${i}t`).classList.add('invalid'); 
                    this.querySelector(`#p${i}e`).textContent='⚠ Giờ không hợp lệ'; 
                    continue; 
                }
            }
            let pBZ;
            try { 
                pBZ = this._getBaZi(pd.y, pd.m, pd.d, pt.h, pt.min, true); 
            } catch(e) { 
                this.querySelector(`#p${i}e`).textContent='Lỗi: '+e.message; 
                continue; 
            }
            people.push({idx:i, bz:pBZ});
        }
        let html = `<div class="my-card"><h3>⭐ Bát Tự của bạn</h3><div class="bz-row">${this._renderPillars(myBZ)}</div><div style="color:var(--muted);margin-top:4px">${this._baziStr(myBZ)}</div><div class="note-card"><strong>Thiên Ất Quý Nhân:</strong> Giáp/Mậu/Canh→Sửu,Mùi · Ất/Kỷ→Tý,Thân · Bính/Đinh→Hợi,Dậu · Tân→Ngọ,Dần · Nhâm/Quý→Mão,Tỵ<br>🟡 Vàng = bạn là quý nhân · 🔵 Xanh = người là quý nhân của bạn</div></div>`;
        if (people.length===0) html += `<div class="card" style="text-align:center;padding:30px">Chưa có thông tin người cần xem.</div>`;
        else {
            people.forEach(p => {
                const cmp = this._compareQN(myBZ, p.bz);
                html += `<div class="pcard"><div class="pcard-hd"><span class="badge">Người ${p.idx}</span> ${this._baziStr(p.bz)}</div><div class="bz-row">${this._renderPillars(p.bz, cmp.bHit, cmp.aHit)}</div><div class="cmp-grid">${this._renderPct(cmp.aPercent,cmp.aCount,'🌟 Quý nhân của <strong>bạn</strong><br>đối với người này',cmp.aHit)}${this._renderPct(cmp.bPercent,cmp.bCount,'🌟 Quý nhân của người này<br>đối với <strong>bạn</strong>',cmp.bHit)}</div><div class="sum-line">Tổng: <strong>${cmp.aCount+cmp.bCount} chữ</strong> · Bạn→Người: ${cmp.aCount} (${cmp.aPercent}%) · Người→Bạn: ${cmp.bCount} (${cmp.bPercent}%)</div></div>`;
            });
        }
        this.querySelector('#qn-results').innerHTML = html;
        this.querySelector('#qn-results').style.display = 'block';
        setTimeout(()=> this.querySelector('#qn-results').scrollIntoView({behavior:'smooth',block:'start'}), 80);
    }

    _compareQN(myBZ, pBZ) {
        const aHit=[], bHit=[];
        QuyNhanModule.ORDER_QN.forEach(p => {
            if (myBZ[p].si>=0 && QuyNhanModule.QN_TABLE[myBZ[p].si].includes(pBZ[p].bi)) aHit.push(p);
            if (pBZ[p].si>=0 && QuyNhanModule.QN_TABLE[pBZ[p].si].includes(myBZ[p].bi)) bHit.push(p);
        });
        return { aCount:aHit.length, bCount:bHit.length, aHit, bHit, aPercent:aHit.length*25, bPercent:bHit.length*25 };
    }

    _renderPillars(bz, hitA=[], hitB=[]) {
        return QuyNhanModule.ORDER_QN.map(p => {
            const inA=hitA.includes(p), inB=hitB.includes(p);
            return `<div class="pillar"><span class="plbl">${QuyNhanModule.TRULBL[p]}</span><div class="pval ${inA&&inB?'hit-ab':inA?'hit-a':inB?'hit-b':''}"><span class="s">${bz[p].can}</span><span class="b">${bz[p].chi}</span></div></div>`;
        }).join('');
    }

    _baziStr(bz) {
        return QuyNhanModule.ORDER_QN.map(p=>`${bz[p].can} ${bz[p].chi}`).join(', ');
    }

    _renderPct(pct, count, label, hits) {
        return `<div class="pct-box"><div class="pct-lbl">${label}</div><div class="pct-val">${pct}%</div><div class="pct-bar"><div class="pct-fill" style="width:${pct}%"></div></div><div class="pct-stars">${QuyNhanModule.STARS[count]}</div>${hits.length?`<div class="pct-hits">Khớp: ${hits.map(h=>QuyNhanModule.TRULBL[h]).join(', ')}</div>`:''}</div>`;
    }
}

customElements.define('quy-nhan-module', QuyNhanModule);
