// ========================================================
// MODULE TỬ VI – LÁ SỐ (CHỈ AN SAO, HIỂN THỊ 12 CUNG)
// ========================================================
class TuViLaSo extends HTMLElement {
  constructor() {
    super();
    // Giữ nguyên toàn bộ HTML/CSS của phần input và result screen,
    // chỉ bỏ nút "Luận giải" và vùng output (nút và div id luanGiaiOutput)
    this.innerHTML = /* html */ `
      <style>
        /* Toàn bộ CSS như cũ, copy từ tu-vi.js, giữ lại hết */
      </style>

      <div id="inputScreen">
        <h2>🌿 LẬP LÁ SỐ TỬ VI</h2>
        <div class="form-group">
          <label>Họ tên</label>
          <input type="text" id="hoTen" class="form-control" value="Nguyễn Văn A" required>
        </div>
        <div class="form-group">
          <label>Loại lịch</label>
          <div class="radio-group">
            <label><input type="radio" name="lich" value="duong" checked> Dương lịch</label>
            <label><input type="radio" name="lich" value="am"> Âm lịch</label>
          </div>
        </div>
        <div class="form-group">
          <label>Ngày sinh</label>
          <div class="date-row">
            <input type="number" id="ngaySinh" class="form-control" placeholder="Ngày" min="1" max="31" value="1" required>
            <input type="number" id="thangSinh" class="form-control" placeholder="Tháng" min="1" max="12" value="6" required>
            <input type="number" id="namSinh" class="form-control" placeholder="Năm" min="1900" max="2100" value="2025" required>
          </div>
        </div>
        <div class="form-group">
          <label>Giờ sinh</label>
          <div class="time-row">
            <input type="number" id="gioSinh" class="form-control" placeholder="Giờ" min="0" max="23" value="4" required>
            <input type="number" id="phutSinh" class="form-control" placeholder="Phút" min="0" max="59" value="0" required>
          </div>
        </div>
        <div class="form-group">
          <label>Giới tính</label>
          <div class="radio-group">
            <label><input type="radio" name="gioiTinh" value="Nam"> Nam</label>
            <label><input type="radio" name="gioiTinh" value="Nữ" checked> Nữ</label>
          </div>
        </div>
        <div class="form-group">
          <label>Năm xem hạn</label>
          <input type="number" id="namXem" class="form-control" value="2026" min="1900" max="2100" required>
        </div>
        <button type="button" class="btn-xem" id="btnXemLaSo">🔮 XEM LÁ SỐ</button>
      </div>

      <div id="resultScreen">
        <button class="back-btn" id="backBtn">← Nhập lại thông tin</button>
        <div class="tử-vi-grid" id="tuViGrid">
          <!-- 12 cung giữ nguyên như cũ -->
          <div class="cung c-1" id="cung1"><span class="chi-name" id="cung1Chi">TỴ</span><span class="cung-ten" id="cung1Ten">MỆNH</span><span class="cung-than" id="cung1Than"></span><div class="chinh-tinh" id="c1Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c1Trai"></div><div class="sao-phai" id="c1Phai"></div></div><div class="truong-sinh" id="c1TruongSinh"></div><span class="dai-van-corner" id="dvCorner1"></span></div>
          <!-- ... copy hết 12 cung giống tu-vi.js ... -->
          <!-- Trung tâm -->
          <div class="trung-tam cung">
            <div class="info-compact">
              <div class="name-row" id="tenHoTenDisplay">NGUYỄN VĂN A</div>
              <!-- các info-line như cũ -->
            </div>
          </div>
        </div>
        <!-- KHÔNG có nút Luận giải và khung output ở đây -->
      </div>
    `;
  }

  connectedCallback() {
    // Khởi tạo giá trị năm xem
    this.querySelector('#namXem').value = new Date().getFullYear();
    this.querySelector('#btnXemLaSo').addEventListener('click', () => this._updateLaSo());
    this.querySelector('#backBtn').addEventListener('click', () => this._showInput());

    // Hiển thị input screen ban đầu
    this._showInput();
  }

  // ───── HẰNG SỐ VÀ CÁC HÀM AN SAO ─────
  // Copy toàn bộ static getter, helper functions (CAN, CHI, posToChi, chiToPos, ...)
  // và tất cả hàm _updateLaSo, _computeAllStars, _computeLocTonPositions, ... từ tu-vi.js
  // Chỉ bỏ các hàm liên quan đến luận giải (_fetchRules, _parseRules, _matchRule, _thucHienLuanGiai)
  // Đảm bảo sau khi _updateLaSo() chạy xong, bạn sẽ gọi một sự kiện để báo dữ liệu lá số đã sẵn sàng.

  _updateLaSo() {
    // ... toàn bộ logic an sao như cũ, giống hệt trong tu-vi.js ...
    // Sau khi cập nhật xong DOM, lấy dữ liệu sao và kích hoạt sự kiện

    const laSoData = this._extractLaSoData(); // Hàm trích xuất dữ liệu (mảng 12 cung)
    this.dispatchEvent(new CustomEvent('laso-ready', {
      detail: { laSoData },
      bubbles: true,  // cho phép sự kiện nổi lên để luan-giai-module có thể nghe
      composed: true  // vượt qua shadow DOM nếu có (ở đây không dùng shadow)
    }));

    this._showResult();
  }

  _extractLaSoData() {
    const cung = {};
    for (let i = 1; i <= 12; i++) {
      const chiEl = this.querySelector(`#cung${i}Chi`);
      if (!chiEl) continue;
      const chi = chiEl.innerText.trim().split(/\s+/).pop();
      const idx = TuViLaSo.CHI.indexOf(chi); // cần static CHI
      if (idx === -1) continue;
      const stars = [];
      ['Chinh', 'Trai', 'Phai'].forEach(loai => {
        const el = this.querySelector(`#c${i}${loai}`);
        if (el && el.innerHTML) {
          el.innerHTML.split(/<br\s*\/?>\s*/i).forEach(line => {
            const tmp = document.createElement('div');
            tmp.innerHTML = line;
            const txt = tmp.textContent.trim();
            if (txt) {
              const clean = txt.replace(/\s*\(.*?\)\s*/g, '').trim();
              if (clean) stars.push(clean);
            }
          });
        }
      });
      cung[idx] = stars;
    }
    return { cung, normalize: (name) => { /* code giống _normalizeSao cũ */ } };
  }

  _showInput() {
    this.querySelector('#inputScreen').style.display = 'block';
    this.querySelector('#resultScreen').style.display = 'none';
  }

  _showResult() {
    this.querySelector('#inputScreen').style.display = 'none';
    this.querySelector('#resultScreen').style.display = 'block';
  }

  // ... Các static getter và helper functions còn lại ...
}

customElements.define('tu-vi-la-so', TuViLaSo);
