/**
 * BatTuModule.js
 * Module Bát Tự · Dụng Thần & Quý Nhân
 * Tích hợp: Dụng Thần, Đại Vận, Lưu Niên (trong Đại Vận), Thiên Ất Quý Nhân
 * Phụ thuộc: thư viện lunar-javascript (Solar, Lunar)
 */

/* ========== HẰNG SỐ ========== */
const CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
const CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
const CAN_HAN = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const CHI_HAN = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const NH_CAN = [0,0,1,1,2,2,3,3,4,4];
const NH_CHI = [4,2,0,0,2,1,1,2,3,3,2,4];
const NH_NAME = ['Mộc','Hỏa','Thổ','Kim','Thủy'];
const NH_CSS = ['moc','hoa','tho','kim','thuy'];
const SINH = [1,2,3,4,0];
const KHAC = [2,3,4,0,1];
const LUC_XUNG = [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
const LUC_HAI  = [[0,5],[1,6],[2,7],[3,8],[4,9],[10,11]];
const LUC_HOP  = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];

const QN_TABLE = [[1,7],[0,8],[11,9],[11,9],[1,7],[0,8],[1,7],[6,2],[3,5],[3,5]];
const ORDER_QN = ['hour','day','month','year'];
const TRULBL = { year:'Năm', month:'Tháng', day:'Ngày', hour:'Giờ' };
const STARS = ['☆☆☆☆','★☆☆☆','★★☆☆','★★★☆','★★★★'];

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/Blackhelios9x/Bat-Tu-Quy-Nhan/main/dung-than.txt';

/* ========== DEFAULT SUGGESTIONS ========== */
const DEFAULT_SUGGESTIONS = {
  0: `- Màu sắc: xanh lá cây\n- Trang sức: vòng tay gỗ, đá xanh lục\n- Hướng: Đông, Đông Nam\n- Mẹo: Mặc đồ màu xanh lá, dùng cây cảnh.`,
  1: `- Màu sắc: đỏ, hồng, cam\n- Trang sức: vòng đá mã não đỏ, thạch anh hồng\n- Hướng: Nam\n- Mẹo: Dùng nến, ánh sáng ấm, đồ điện tử.`,
  2: `- Màu sắc: vàng cát, nâu\n- Trang sức: vòng đá mắt hổ, thạch anh vàng\n- Hướng: Đông Bắc, Tây Nam\n- Mẹo: Sử dụng đồ gốm sứ, màu ấm.`,
  3: `- Màu sắc: trắng, xám, bạc\n- Trang sức: vòng bạc, đá trắng, kim loại\n- Hướng: Tây, Tây Bắc\n- Mẹo: Đeo trang sức kim loại, dùng đồ kim khí.`,
  4: `- Màu sắc: xanh dương, đen\n- Trang sức: vòng đá aquamarine, obsidian\n- Hướng: Bắc\n- Mẹo: Dùng hồ cá, tranh nước, màu tối.`
};

/* ========== CLASS BAT TU MODULE ========== */
class BatTuModule {
  constructor() {
    // Dữ liệu tính toán hiện tại
    this._currentBazi = null;
    this._currentDaiVanList = null;
    this._currentDungThanInfo = null;
    this._uploadedSuggestions = null;

    // Tham chiếu DOM (sẽ gán sau khi DOM ready)
    this._dom = {};
  }

  /* ========== INIT DOM REFERENCES ========== */
  initDOM() {
    const ids = [
      'dt-date', 'dt-hour', 'dt-gender', 'dt-err', 'data-source-info',
      'dt-result', 'dt-bz-table', 'dt-nh-ref',
      'dt-daivan-section', 'dt-daivan-grid', 'dv-detail-box',
      'dv-detail-title', 'dv-detail-content',
      'dv-years-container', 'dv-year-detail',
      'dt-luunien-section', 'dt-luunien-grid',
      'ln-detail-box', 'ln-detail-title', 'ln-detail-content',
      'dt-verdict',
      'myDate', 'myTime', 'myErr', 'pInputs', 'qn-results'
    ];
    ids.forEach(id => {
      this._dom[id] = document.getElementById(id);
    });
  }

  /* ========== HELPER ========== */
  _nhCss(nh) { return nh >= 0 ? NH_CSS[nh] : ''; }
  _trungHoacSinh(nhA, nhB) { return nhB === nhA || SINH[nhB] === nhA; }

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

  _parseTime(s) {
    if (!s || !s.trim()) return { h: 0, min: 0 };
    const m = s.trim().match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return null;
    const h = +m[1], min = +m[2];
    if (h < 0 || h > 23 || min < 0 || min > 59) return null;
    return { h, min };
  }

  _parseGZ(gz) {
    const si = CAN_HAN.indexOf(gz[0]), bi = CHI_HAN.indexOf(gz[1]);
    return {
      si, bi,
      can: si >= 0 ? CAN[si] : '?',
      chi: bi >= 0 ? CHI[bi] : '?',
      nhCan: si >= 0 ? NH_CAN[si] : -1,
      nhChi: bi >= 0 ? NH_CHI[bi] : -1
    };
  }

  _getBaZi(y, m, d, h, mi) {
    const solar = Solar.fromYmdHms(y, m, d, h, mi, 0);
    const ec = solar.getLunar().getEightChar();
    return {
      year: this._parseGZ(ec.getYear()),
      month: this._parseGZ(ec.getMonth()),
      day: this._parseGZ(ec.getDay()),
      hour: this._parseGZ(ec.getTime())
    };
  }

  /* ========== FETCH SUGGESTIONS ========== */
  async fetchSuggestions() {
    const infoEl = this._dom['data-source-info'];
    try {
      const response = await fetch(GITHUB_RAW_URL);
      if (!response.ok) throw new Error('Không thể tải file');
      const text = await response.text();
      this._uploadedSuggestions = this._parseSuggestionsFromText(text);
      infoEl.textContent = '✅ Đã tải dữ liệu gợi ý từ GitHub.';
    } catch (error) {
      this._uploadedSuggestions = null;
      infoEl.textContent = 'ℹ️ Sử dụng gợi ý mặc định (không kết nối được GitHub).';
    }
  }

  _parseSuggestionsFromText(text) {
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
    const hanhName = NH_NAME[hanhIndex];
    if (this._uploadedSuggestions && this._uploadedSuggestions.has(hanhName)) {
      return this._uploadedSuggestions.get(hanhName);
    }
    return DEFAULT_SUGGESTIONS[hanhIndex] || 'Không có gợi ý.';
  }

  /* ========== TÍNH ĐẠI VẬN ========== */
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
        si, bi, can: CAN[si], chi: CHI[bi],
        nhCan: NH_CAN[si], nhChi: NH_CHI[bi],
        year: dvYear, age: dvAge
      });
    }
    return { dvList, isThuan, targetJie, diffDays, khoiVanAge, firstDVYear, firstDVAge };
  }

  /* ========== RENDER ĐẠI VẬN ========== */
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
      gridHtml += `<div class="dv-item" data-dvindex="${idx}">
        <div class="dv-age">${dv.age} tuổi<span class="dv-year">${dv.year}</span></div>
        <div class="dv-canchi nh-${this._nhCss(dv.nhCan)}">${dv.can}</div>
        <div class="dv-canchi nh-${this._nhCss(dv.nhChi)}">${dv.chi}</div>
      </div>`;
    });
    this._dom['dt-daivan-grid'].innerHTML = gridHtml;
    this._dom['dt-daivan-section'].style.display = 'block';
    this._dom['dv-detail-box'].style.display = 'none';
    this._currentDaiVanList = dvList;

    // Gắn sự kiện click cho từng đại vận
    this._dom['dt-daivan-grid'].querySelectorAll('.dv-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = +item.dataset.dvindex;
        this._showDaiVanDetail(idx);
      });
    });
  }

  /* ========== HIỂN THỊ CHI TIẾT ĐẠI VẬN + DANH SÁCH 10 NĂM ========== */
  _showDaiVanDetail(index) {
    if (!this._currentDaiVanList || !this._currentBazi || !this._currentDungThanInfo) return;
    const dv = this._currentDaiVanList[index];
    const { bz, dt1, dt2, isWeak, nhCan } = this._currentDungThanInfo;
    const desc = this._generateDaiVanDescription(bz, dv, { dt1, dt2, isWeak, nhCan });

    // Hiển thị luận giải đại vận
    this._dom['dv-detail-title'].innerHTML = `✨ Luận giải Đại Vận ${dv.can} ${dv.chi}`;
    this._dom['dv-detail-content'].innerHTML = desc;
    this._dom['dv-detail-box'].style.display = 'block';

    // Ẩn luận giải năm cũ
    this._dom['dv-year-detail'].style.display = 'none';

    // Gọi hàm hiển thị 10 năm của đại vận (TÍNH NĂNG MỚI)
    this._renderDaiVanYears(index);
  }

  /* ========== TÍNH NĂNG MỚI: HIỂN THỊ 10 NĂM TRONG ĐẠI VẬN ========== */
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
      const solar = Solar.fromYmd(year, 1, 1);
      const lunar = solar.getLunar();
      const ganIdx = lunar.getYearGanIndex();
      const zhiIdx = lunar.getYearZhiIndex();
      const gan = CAN[ganIdx];
      const chi = CHI[zhiIdx];
      const nhGan = NH_CAN[ganIdx];
      const nhChi = NH_CHI[zhiIdx];

      html += `<div class="ln-item" data-year="${year}" data-ganidx="${ganIdx}" data-zhiidx="${zhiIdx}" data-dvindex="${dvIndex}">
        <div class="ln-year">${year}</div>
        <div class="ln-canchi nh-${this._nhCss(nhGan)}">${gan}</div>
        <div class="ln-canchi nh-${this._nhCss(nhChi)}">${chi}</div>
      </div>`;
    }
    html += `</div>`;
    container.innerHTML = html;

    // Gắn sự kiện click cho từng năm
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

  /* ========== TÍNH NĂNG MỚI: HIỂN THỊ LUẬN GIẢI NĂM TRONG ĐẠI VẬN ========== */
  _showDaiVanYearDetail(year, ganIdx, zhiIdx, dv) {
    if (!this._currentBazi || !this._currentDungThanInfo) return;
    const gan = CAN[ganIdx];
    const chi = CHI[zhiIdx];
    const { bz, dt1, dt2, isWeak, nhCan } = this._currentDungThanInfo;
    const desc = this._generateLuuNienDescription(
      bz,
      { year, gan, chi, ganIdx, zhiIdx },
      { dt1, dt2, isWeak, nhCan },
      dv
    );

    const detailBox = this._dom['dv-year-detail'];
    detailBox.innerHTML = `<h4 style="margin-bottom:8px; color:var(--primary-d);">✨ Luận giải năm ${year} (${gan} ${chi})</h4><div class="suggest-content">${desc}</div>`;
    detailBox.style.display = 'block';
    detailBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ========== RENDER LƯU NIÊN (10 năm tới) ========== */
  _renderLuuNien() {
    const currentYear = new Date().getFullYear();
    let html = '';
    for (let i = 0; i < 10; i++) {
      const year = currentYear + i;
      const solar = Solar.fromYmdHms(year, 1, 1, 0, 0, 0);
      const lunar = solar.getLunar();
      const ganIdx = lunar.getYearGanIndex();
      const zhiIdx = lunar.getYearZhiIndex();
      const gan = CAN[ganIdx], chi = CHI[zhiIdx];
      const nhGan = NH_CAN[ganIdx], nhChi = NH_CHI[zhiIdx];
      html += `<div class="ln-item" data-year="${year}">
        <div class="ln-year">${year}</div>
        <div class="ln-canchi nh-${this._nhCss(nhGan)}">${gan}</div>
        <div class="ln-canchi nh-${this._nhCss(nhChi)}">${chi}</div>
      </div>`;
    }
    this._dom['dt-luunien-grid'].innerHTML = html;
    this._dom['dt-luunien-section'].style.display = 'block';
    this._dom['ln-detail-box'].style.display = 'none';

    // Gắn sự kiện click
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
    const solar = Solar.fromYmdHms(year, 1, 1, 0, 0, 0);
    const lunar = solar.getLunar();
    const ganIdx = lunar.getYearGanIndex();
    const zhiIdx = lunar.getYearZhiIndex();
    const gan = CAN[ganIdx], chi = CHI[zhiIdx];
    const currentDV = this._getCurrentDaiVan(year);
    const { bz, dt1, dt2, isWeak, nhCan } = this._currentDungThanInfo;
    const desc = this._generateLuuNienDescription(
      bz,
      { year, gan, chi, ganIdx, zhiIdx },
      { dt1, dt2, isWeak, nhCan },
      currentDV
    );
    this._dom['ln-detail-title'].innerHTML = `✨ Luận giải năm ${year} (${gan} ${chi})`;
    this._dom['ln-detail-content'].innerHTML = desc;
    this._dom['ln-detail-box'].style.display = 'block';
  }

  /* ========== MÔ TẢ ĐẠI VẬN ========== */
  _generateDaiVanDescription(bz, dv, info) {
    const { dt1, dt2 } = info;
    const dungList = [dt1, dt2];
    const kyList = [0,1,2,3,4].filter(i => !dungList.includes(i));
    const canHanh = dv.nhCan, chiHanh = dv.nhChi;

    const xung = (i1, i2) => LUC_XUNG.some(p => (p[0]===i1&&p[1]===i2) || (p[1]===i1&&p[0]===i2));
    const hai = (i1, i2)  => LUC_HAI.some(p  => (p[0]===i1&&p[1]===i2) || (p[1]===i1&&p[0]===i2));
    const hop = (i1, i2)  => LUC_HOP.some(p  => (p[0]===i1&&p[1]===i2) || (p[1]===i1&&p[0]===i2));

    let desc = `【Phân tích Đại vận ${dv.can} ${dv.chi}】<br>`;
    desc += `Thiên Can: ${dv.can} (${NH_NAME[canHanh]}) - `;
    if (dungList.includes(canHanh)) desc += `Dụng thần → Tốt<br>`;
    else if (kyList.includes(canHanh)) desc += `Kỵ thần → Khó khăn<br>`;
    else desc += `Trung tính<br>`;

    desc += `Địa Chi: ${dv.chi} (${NH_NAME[chiHanh]}) - `;
    if (dungList.includes(chiHanh)) desc += `Dụng thần → Tốt<br>`;
    else if (kyList.includes(chiHanh)) desc += `Kỵ thần → Khó khăn<br>`;
    else desc += `Trung tính<br>`;

    desc += `Tương tác với Tứ Trụ:<br>`;
    ['year','month','day','hour'].forEach(t => {
      const c = bz[t].bi;
      if (c === dv.bi) desc += `- Trùng chi ${TRULBL[t]} → củng cố<br>`;
      else if (xung(dv.bi, c)) desc += `- Xung chi ${TRULBL[t]} → biến động<br>`;
      else if (hai(dv.bi, c)) desc += `- Hại chi ${TRULBL[t]} → hao tổn<br>`;
      else if (hop(dv.bi, c)) desc += `- Hợp chi ${TRULBL[t]} → hòa hợp<br>`;
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

  /* ========== MÔ TẢ LƯU NIÊN (DÙNG CHUNG) ========== */
  _generateLuuNienDescription(bz, yearObj, info, dv) {
    const { gan, chi, ganIdx, zhiIdx } = yearObj;
    const { dt1, dt2, nhCan } = info;
    const dungList = [dt1, dt2];
    const kyList = [0,1,2,3,4].filter(i => !dungList.includes(i));
    const canHanh = NH_CAN[ganIdx], chiHanh = NH_CHI[zhiIdx];

    const xung = (i1, i2) => LUC_XUNG.some(p => (p[0]===i1&&p[1]===i2) || (p[1]===i1&&p[0]===i2));
    const hai = (i1, i2)  => LUC_HAI.some(p  => (p[0]===i1&&p[1]===i2) || (p[1]===i1&&p[0]===i2));
    const hop = (i1, i2)  => LUC_HOP.some(p  => (p[0]===i1&&p[1]===i2) || (p[1]===i1&&p[0]===i2));

    let desc = `Năm ${gan} ${chi} (${NH_NAME[canHanh]} - ${NH_NAME[chiHanh]})<br><br>`;
    desc += `【Với Nhật chủ ${bz.day.can}】<br>`;
    if (canHanh === nhCan) desc += `- Thiên can trùng Nhật chủ → năm bản thân chủ động.<br>`;
    else if (SINH[canHanh] === nhCan) desc += `- Thiên can sinh Nhật chủ (Ấn) → có quý nhân, học hành thuận lợi.<br>`;
    else if (SINH[nhCan] === canHanh) desc += `- Nhật chủ sinh Thiên can (Thực Thương) → sáng tạo, đầu tư nhưng hao tổn.<br>`;
    else if (KHAC[canHanh] === nhCan) desc += `- Thiên can khắc Nhật chủ (Quan Sát) → áp lực công việc.<br>`;
    else if (KHAC[nhCan] === canHanh) desc += `- Nhật chủ khắc Thiên can (Tài) → cơ hội kiếm tiền.<br>`;

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

  /* ========== TÍNH DỤNG THẦN (ENTRY POINT CHÍNH) ========== */
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
    const nhSinhA = SINH.indexOf(nhA);
    const nhAsinh = SINH[nhA];
    const nhKhacA = KHAC.indexOf(nhA);

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

    // Đại vận
    const dvData = this._tinhDaiVan(bz, y, m, d, isMale);
    this._renderDaiVan(dvData);

    // Lưu niên (10 năm tới)
    this._renderLuuNien();

    // Kết luận Dụng Thần
    this._renderVerdict(total, isWeak, nhA, dt1, dt2);

    this._dom['dt-result'].style.display = 'block';
    setTimeout(() => this._dom['dt-result'].scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }

  _renderBaZiTable(bz) {
    const COLS = [
      { key: 'hour', lbl: 'Giờ' },
      { key: 'day', lbl: 'Ngày' },
      { key: 'month', lbl: 'Tháng' },
      { key: 'year', lbl: 'Năm' }
    ];
    let html = '';
    COLS.forEach(col => {
      const t = bz[col.key];
      html += `<div class="bz-col"><span class="bz-col-lbl">${col.lbl}</span>
        <div class="bz-cell nh-${this._nhCss(t.nhCan)}">${t.can}</div>
        <div class="bz-cell nh-${this._nhCss(t.nhChi)}">${t.chi}</div></div>`;
    });
    this._dom['dt-bz-table'].innerHTML = html;

    let ref = '<span style="font-size:.75rem;color:var(--muted)">Màu Ngũ Hành:</span>';
    ['moc','hoa','tho','kim','thuy'].forEach(cls => {
      const idx = NH_CSS.indexOf(cls);
      if (idx >= 0) ref += `<span class="nh-tag sm ${cls}">${NH_NAME[idx]}</span>`;
    });
    this._dom['dt-nh-ref'].innerHTML = ref;
  }

  _renderVerdict(total, isWeak, nhA, dt1, dt2) {
    const title = isWeak
      ? `💧 Thân Nhược — Bản mệnh yếu (${total}/3 điểm)`
      : `🔥 Thân Vượng — Bản mệnh mạnh (${total}/3 điểm)`;
    const desc = isWeak
      ? `Ngũ hành ${NH_NAME[dt1]} (Nhật Can) và ${NH_NAME[dt2]} (hành sinh cho nó) đang YẾU. Cần bổ sung.`
      : `Ngũ hành ${NH_NAME[nhA]} quá mạnh. Cần dùng ${NH_NAME[dt1]} (tiết hao) hoặc ${NH_NAME[dt2]} (chế ngự).`;
    const content1 = this._getSuggestionContent(dt1);
    const content2 = this._getSuggestionContent(dt2);
    const sourceLabel = this._uploadedSuggestions ? '(từ GitHub)' : '(mặc định)';

    this._dom['dt-verdict'].innerHTML = `
      <div class="verdict-title">${title}</div>
      <div class="verdict-body">${desc}</div>
      <div class="nh-tags">
        <div class="nh-tag ${this._nhCss(dt1)}">❶ Dụng Thần chính · ${NH_NAME[dt1]}</div>
        <div class="nh-tag ${this._nhCss(dt2)}">❷ Dụng Thần phụ · ${NH_NAME[dt2]}</div>
      </div>
      <div class="suggest-box">
        <div class="suggest-title">✨ Gợi ý chi tiết ${sourceLabel}</div>
        <div class="suggest-grid">
          <div class="suggest-col"><h4>🌿 Dụng Thần chính · ${NH_NAME[dt1]}</h4><div class="suggest-content">${content1.replace(/\n/g, '<br>')}</div></div>
          <div class="suggest-col"><h4>🍂 Dụng Thần phụ · ${NH_NAME[dt2]}</h4><div class="suggest-content">${content2.replace(/\n/g, '<br>')}</div></div>
        </div>
      </div>
    `;
  }

  /* ========== TÍNH QUÝ NHÂN ========== */
  calcQuyNhan() {
    if (typeof Solar === 'undefined') { alert('Thư viện lịch lỗi.'); return; }
    document.querySelectorAll('#panel-qn .errtxt').forEach(e => e.textContent = '');
    document.querySelectorAll('#panel-qn input').forEach(i => i.classList.remove('invalid'));

    const myDate = this._parseDateDMY(this._dom['myDate'].value);
    const myTime = this._parseTime(this._dom['myTime'].value);
    let hasErr = false;
    if (!myDate) {
      this._dom['myDate'].classList.add('invalid');
      this._dom['myErr'].textContent = '⚠ Ngày không hợp lệ';
      hasErr = true;
    }
    if (!myTime) {
      this._dom['myTime'].classList.add('invalid');
      this._dom['myErr'].textContent += ' ⚠ Giờ không hợp lệ';
      hasErr = true;
    }
    if (hasErr) { this._dom['qn-results'].style.display = 'none'; return; }

    let myBZ;
    try { myBZ = this._getBaZi(myDate.y, myDate.m, myDate.d, myTime.h, myTime.min); }
    catch (e) { this._dom['myErr'].textContent = 'Lỗi: ' + e.message; return; }

    const people = [];
    for (let i = 1; i <= 5; i++) {
      const dRaw = document.getElementById(`p${i}d`).value.trim();
      const tRaw = document.getElementById(`p${i}t`).value.trim();
      if (!dRaw) continue;
      const pd = this._parseDateDMY(dRaw);
      if (!pd) {
        document.getElementById(`p${i}d`).classList.add('invalid');
        document.getElementById(`p${i}e`).textContent = '⚠ Ngày không hợp lệ';
        continue;
      }
      const pt = this._parseTime(tRaw);
      if (tRaw && !pt) {
        document.getElementById(`p${i}t`).classList.add('invalid');
        document.getElementById(`p${i}e`).textContent = '⚠ Giờ không hợp lệ';
        continue;
      }
      let pBZ;
      try { pBZ = this._getBaZi(pd.y, pd.m, pd.d, pt ? pt.h : 0, pt ? pt.min : 0); }
      catch (e) { document.getElementById(`p${i}e`).textContent = 'Lỗi: ' + e.message; continue; }
      people.push({ idx: i, bz: pBZ });
    }

    let html = `
      <div class="my-card">
        <h3>⭐ Bát Tự của bạn</h3>
        <div class="bz-row">${this._renderPillarsQN(myBZ)}</div>
        <div style="color:var(--muted);margin-top:4px">${this._baziStrQN(myBZ)}</div>
        <div class="note-card"><strong>Thiên Ất Quý Nhân:</strong> Giáp/Mậu/Canh→Sửu,Mùi · Ất/Kỷ→Tý,Thân · Bính/Đinh→Hợi,Dậu · Tân→Ngọ,Dần · Nhâm/Quý→Mão,Tỵ<br>
        🟡 Vàng = bạn là quý nhân · 🔵 Xanh = người là quý nhân của bạn</div>
      </div>`;

    if (people.length === 0) {
      html += `<div class="card" style="text-align:center;padding:30px">Chưa có thông tin người cần xem.</div>`;
    } else {
      people.forEach(p => {
        const cmp = this._compareQN(myBZ, p.bz);
        html += `
          <div class="pcard">
            <div class="pcard-hd"><span class="badge">Người ${p.idx}</span> ${this._baziStrQN(p.bz)}</div>
            <div class="bz-row">${this._renderPillarsQN(p.bz, cmp.bHit, cmp.aHit)}</div>
            <div class="cmp-grid">
              ${this._renderPctQN(cmp.aPercent, cmp.aCount, '🌟 Quý nhân của <strong>bạn</strong><br>đối với người này', cmp.aHit)}
              ${this._renderPctQN(cmp.bPercent, cmp.bCount, '🌟 Quý nhân của người này<br>đối với <strong>bạn</strong>', cmp.bHit)}
            </div>
            <div class="sum-line">Tổng: <strong>${cmp.aCount + cmp.bCount} chữ</strong> · Bạn→Người: ${cmp.aCount} (${cmp.aPercent}%) · Người→Bạn: ${cmp.bCount} (${cmp.bPercent}%)</div>
          </div>`;
      });
    }
    this._dom['qn-results'].innerHTML = html;
    this._dom['qn-results'].style.display = 'block';
    setTimeout(() => this._dom['qn-results'].scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }

  _compareQN(myBZ, pBZ) {
    const aHit = [], bHit = [];
    ORDER_QN.forEach(p => {
      if (myBZ[p].si >= 0 && QN_TABLE[myBZ[p].si].includes(pBZ[p].bi)) aHit.push(p);
      if (pBZ[p].si >= 0 && QN_TABLE[pBZ[p].si].includes(myBZ[p].bi)) bHit.push(p);
    });
    return {
      aCount: aHit.length, bCount: bHit.length,
      aHit, bHit,
      aPercent: aHit.length * 25, bPercent: bHit.length * 25
    };
  }

  _renderPillarsQN(bz, hitA = [], hitB = []) {
    return ORDER_QN.map(p => {
      const inA = hitA.includes(p), inB = hitB.includes(p);
      return `<div class="pillar"><span class="plbl">${TRULBL[p]}</span><div class="pval ${inA && inB ? 'hit-ab' : inA ? 'hit-a' : inB ? 'hit-b' : ''}"><span class="s">${bz[p].can}</span><span class="b">${bz[p].chi}</span></div></div>`;
    }).join('');
  }

  _baziStrQN(bz) {
    return ORDER_QN.map(p => `${bz[p].can} ${bz[p].chi}`).join(', ');
  }

  _renderPctQN(pct, count, label, hits) {
    return `<div class="pct-box"><div class="pct-lbl">${label}</div><div class="pct-val">${pct}%</div><div class="pct-bar"><div class="pct-fill" style="width:${pct}%"></div></div><div class="pct-stars">${STARS[count]}</div>${hits.length ? `<div class="pct-hits">Khớp: ${hits.map(h => TRULBL[h]).join(', ')}</div>` : ''}</div>`;
  }

  /* ========== SWITCH TAB ========== */
  switchTab(id) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tb-' + id).classList.add('active');
    document.getElementById('panel-' + id).classList.add('active');
  }
}

/* ========== EXPORT MODULE ========== */
export default BatTuModule;
