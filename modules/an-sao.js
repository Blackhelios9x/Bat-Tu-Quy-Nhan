// ========================================================
// MODULE TỬ VI – LÁ SỐ (TỐI ƯU MOBILE LẦN CUỐI)
// ========================================================
class TuViModule extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* html */ `
      <style>
        /* ========== CSS RIÊNG CHO TỬ VI ========== */
        #inputScreen {
          background: #f7ede1;
          border: 6px solid #6b4f32;
          border-radius: 24px;
          box-shadow: 0 20px 30px rgba(0,0,0,0.3);
          padding: 30px 25px;
          max-width: 650px;
          width: 100%;
          margin: 0 auto;
        }
        #inputScreen h2 {
          text-align: center;
          color: #3b281a;
          font-size: 2rem;
          margin-bottom: 20px;
          border-bottom: 3px double #b78c62;
          padding-bottom: 15px;
          font-weight: 700;
        }
        .form-group {
          margin-bottom: 18px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }
        .form-group label {
          width: 130px;
          font-weight: 700;
          color: #4d2f1a;
          font-size: 1.1rem;
        }
        .form-control {
          flex: 1;
          padding: 10px 12px;
          border: 2px solid #b5977a;
          border-radius: 12px;
          font-size: 1rem;
          background: #fffbf5;
          font-family: inherit;
          width: auto;
          box-shadow: none;
        }
        .year-input {
          min-width: 80px;
          width: 100%;
        }
        .radio-group {
          display: flex;
          gap: 25px;
        }
        .radio-group label {
          width: auto;
          font-weight: normal;
        }
        .date-row, .time-row {
          display: flex;
          gap: 8px;
          flex: 1;
        }
        .date-row input, .time-row input {
          width: 100%;
        }
        .btn-xem {
          background: #7a4e2e;
          color: #fcf3e8;
          border: none;
          font-size: 1.4rem;
          font-weight: bold;
          padding: 14px 20px;
          border-radius: 50px;
          width: 100%;
          cursor: pointer;
          margin-top: 25px;
          border-bottom: 5px solid #4a2e1e;
          transition: 0.1s;
          box-shadow: 0 6px 0 #4a2e1e;
          -webkit-tap-highlight-color: transparent;
        }
        .btn-xem:hover {
          background: #8f613f;
          transform: translateY(-2px);
          box-shadow: 0 8px 0 #4a2e1e;
        }
        .btn-xem:active {
          transform: translateY(4px);
          box-shadow: 0 2px 0 #4a2e1e;
        }
        #resultScreen {
          display: none;
          width: 100%;
          max-width: 1050px;
          margin: 0 auto;
        }
        .back-btn {
          background: #dac2a8;
          border: 2px solid #6b4f32;
          color: #2e1e0f;
          font-weight: bold;
          padding: 8px 20px;
          border-radius: 40px;
          font-size: 1rem;
          cursor: pointer;
          margin-bottom: 15px;
          display: inline-block;
          box-shadow: 0 3px 0 #6b4f32;
          -webkit-tap-highlight-color: transparent;
        }
        .back-btn:hover {
          background: #ebd5bf;
        }

        /* Lưới Tử Vi */
        .tử-vi-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: 1.2fr 1.2fr 1.2fr 1.2fr;
          gap: 3px;
          background-color: #4a2e1e;
          border: 4px solid #4a2e1e;
          border-radius: 6px;
          box-shadow: 0 12px 28px rgba(0,0,0,0.5);
          width: 100%;
          aspect-ratio: 1 / 1;
          margin: 0 auto;
          position: relative;
        }
        @supports not (aspect-ratio: 1/1) {
          .tử-vi-grid {
            height: auto;
            min-height: 90vw;
            max-height: 600px;
            width: 100%;
          }
        }
        .cung {
          background: #fdf3e0;
          border: 1px solid #6b4f32;
          border-radius: 4px;
          box-shadow: inset 0 0 0 1px #e9d6bf;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          padding: 4px 2px 2px;
          color: #2e1e0f;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .chi-name {
          position: absolute;
          top: 2px;
          left: 4px;
          font-size: 0.5rem;
          font-weight: 700;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .dai-van-corner {
          position: absolute;
          bottom: 2px;
          right: 4px;
          font-size: 0.55rem;
          font-weight: 700;
          color: #1e3a5f;
          background: rgba(255,255,240,0.6);
          padding: 0 2px;
          border-radius: 3px;
        }
        .cung-ten {
          font-size: 0.6rem;
          font-weight: 700;
          color: #000000;
          text-transform: uppercase;
          margin: 2px 0 0;
          letter-spacing: 0.3px;
        }
        .cung-than {
          font-size: 0.55rem;
          font-weight: 600;
          color: #a05a2c;
          margin-top: -2px;
          margin-bottom: 3px;
        }
        .chinh-tinh {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          margin: 3px 0 1px;
          line-height: 1.3;
        }
        .phu-tinh-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 2px;
          gap: 2px;
        }
        .sao-trai, .sao-phai {
          font-size: 0.6rem;
          font-style: normal;
          text-transform: none;
          line-height: 1.3;
          flex: 1;
          color: #000;
        }
        .sao-trai { text-align: left; padding-left: 2px; }
        .sao-phai { text-align: right; padding-right: 2px; }
        .truong-sinh {
          font-size: 0.55rem;
          font-weight: 600;
          color: #2c3e50;
          text-align: center;
          margin-top: auto;
          border-top: 1px dotted #b5977a;
          padding-top: 2px;
        }
        .trung-tam {
          grid-area: 2 / 2 / 4 / 4;
          background: #fff7e8;
          border: 2px solid #7a5a3a;
          box-shadow: inset 0 0 0 2px #e7cfb0;
          padding: 8px 8px;
          justify-content: flex-start;
          align-items: stretch;
          font-size: 0.75rem;
          overflow-y: auto;
        }
        .info-compact {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .name-row {
          font-size: 1rem;
          font-weight: 800;
          color: #3b281a;
          text-align: center;
          border-bottom: 2px solid #b78c62;
          padding-bottom: 3px;
          margin-bottom: 3px;
        }
        .info-line {
          display: flex;
          align-items: baseline;
          border-bottom: 1px dotted #c9ad91;
          padding-bottom: 2px;
          margin-bottom: 1px;
        }
        .info-line .label { font-weight: 700; color: #5d3f24; width: 36%; font-size: 0.7rem; }
        .info-line .value { color: #1f140a; font-weight: 500; flex: 1; font-size: 0.75rem; }
        .meta-note { margin-top: 4px; font-style: italic; border-top: 1px dashed #b5977a; padding-top: 4px; color: #4a311e; font-size: 0.7rem; text-align: center; }
        .c-1 { grid-area: 1/1/2/2; } .c-2 { grid-area: 1/2/2/3; }
        .c-3 { grid-area: 1/3/2/4; } .c-4 { grid-area: 1/4/2/5; }
        .c-5 { grid-area: 2/4/3/5; } .c-6 { grid-area: 3/4/4/5; }
        .c-7 { grid-area: 4/4/5/5; } .c-8 { grid-area: 4/3/5/4; }
        .c-9 { grid-area: 4/2/5/3; } .c-10 { grid-area: 4/1/5/2; }
        .c-11 { grid-area: 3/1/4/2; } .c-12 { grid-area: 2/1/3/2; }
        .hanh-thuy { color: #000000 !important; }
        .hanh-hoa  { color: #d32f2f !important; }
        .hanh-moc  { color: #2e7d32 !important; }
        .hanh-tho  { color: #b8860b !important; }
        .hanh-kim  { color: #6c757d !important; }
        .tuan-triet-marker {
          position: absolute;
          background: #111;
          color: white;
          font-size: 0.55rem;
          font-weight: bold;
          padding: 2px 4px;
          border-radius: 12px;
          transform: translate(-50%, -50%);
          z-index: 20;
          white-space: nowrap;
          pointer-events: none;
          box-shadow: 0 1px 3px rgba(0,0,0,0.6);
          border: 1px solid #333;
          line-height: 1.2;
        }

        /* ========== ĐIỀU CHỈNH CHO MOBILE ========== */
        @media (max-width: 700px) {
          /* Mở rộng khung kết quả */
          #resultScreen {
            padding: 0 2px;   /* bỏ padding để lưới tràn viền */
          }
          /* Lưới chiếm toàn bộ chiều ngang */
          .tử-vi-grid {
            aspect-ratio: auto;
            width: 100%;
            min-height: 190vw;  /* kéo dài thêm chiều cao */
            gap: 2px;
            border-width: 3px;
          }
          /* Giảm toàn bộ chữ trong ô cung */
          .cung-ten { font-size: 0.45rem; }
          .chi-name { font-size: 0.35rem; }
          .chinh-tinh { font-size: 0.5rem; line-height: 1.2; }
          .sao-trai, .sao-phai { font-size: 0.45rem; }
          .truong-sinh { font-size: 0.4rem; }
          .dai-van-corner { font-size: 0.4rem; }
          .cung-than { font-size: 0.45rem; }
          /* Ô trung tâm */
          .trung-tam { font-size: 0.6rem; padding: 4px; }
          .name-row { font-size: 0.8rem; }
          .info-line .label { font-size: 0.55rem; width: 40%; }
          .info-line .value { font-size: 0.6rem; }
          .meta-note { font-size: 0.6rem; }
          .tuan-triet-marker { font-size: 0.35rem; padding: 1px 2px; }
          /* Form nhập liệu */
          .form-group label { width: 100px; font-size: 1rem; }
          #inputScreen { padding: 20px 15px; }
          .year-input { min-width: 70px; }
        }
        #inputError {
          color: #b33f3d;
          margin-top: 10px;
          font-size: 0.9rem;
          display: none;
        }
      </style>

      <!-- Phần HTML giữ nguyên không đổi -->
      <div id="inputScreen">
        <h2>🌿 LẬP LÁ SỐ TỬ VI</h2>
        <div class="form-group"><label>Họ tên</label><input type="text" id="hoTen" class="form-control" value="Nguyễn Văn A" required></div>
        <div class="form-group"><label>Loại lịch</label><div class="radio-group"><label><input type="radio" name="lich" value="duong" checked> Dương lịch</label><label><input type="radio" name="lich" value="am"> Âm lịch</label></div></div>
        <div class="form-group"><label>Ngày sinh</label><div class="date-row"><input type="number" id="ngaySinh" class="form-control" placeholder="Ngày" min="1" max="31" value="1" required><input type="number" id="thangSinh" class="form-control" placeholder="Tháng" min="1" max="12" value="6" required><input type="text" id="namSinh" class="form-control year-input" placeholder="Năm" inputmode="numeric" value="2025" required></div></div>
        <div class="form-group"><label>Giờ sinh</label><div class="time-row"><input type="number" id="gioSinh" class="form-control" placeholder="Giờ" min="0" max="23" value="4" required><input type="number" id="phutSinh" class="form-control" placeholder="Phút" min="0" max="59" value="0" required></div></div>
        <div class="form-group"><label>Giới tính</label><div class="radio-group"><label><input type="radio" name="gioiTinh" value="Nam"> Nam</label><label><input type="radio" name="gioiTinh" value="Nữ" checked> Nữ</label></div></div>
        <div class="form-group"><label>Năm xem hạn</label><input type="text" id="namXem" class="form-control year-input" placeholder="Năm" inputmode="numeric" value="2026" required></div>
        <button type="button" class="btn-xem" id="btnXemLaSo">🔮 XEM LÁ SỐ</button>
        <div id="inputError"></div>
      </div>

      <div id="resultScreen">
        <button class="back-btn" id="backBtn">← Nhập lại thông tin</button>
        <div class="tử-vi-grid" id="tuViGrid">
          <!-- Các cung giữ nguyên -->
          <div class="cung c-1"  id="cung1"><span class="chi-name" id="cung1Chi">TỴ</span><span class="cung-ten" id="cung1Ten">MỆNH</span><span class="cung-than" id="cung1Than"></span><div class="chinh-tinh" id="c1Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c1Trai"></div><div class="sao-phai" id="c1Phai"></div></div><div class="truong-sinh" id="c1TruongSinh"></div><span class="dai-van-corner" id="dvCorner1"></span></div>
          <div class="cung c-2"  id="cung2"><span class="chi-name" id="cung2Chi">NGỌ</span><span class="cung-ten" id="cung2Ten">PHỤ MẪU</span><span class="cung-than" id="cung2Than"></span><div class="chinh-tinh" id="c2Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c2Trai"></div><div class="sao-phai" id="c2Phai"></div></div><div class="truong-sinh" id="c2TruongSinh"></div><span class="dai-van-corner" id="dvCorner2"></span></div>
          <div class="cung c-3"  id="cung3"><span class="chi-name" id="cung3Chi">MÙI</span><span class="cung-ten" id="cung3Ten">PHÚC ĐỨC</span><span class="cung-than" id="cung3Than"></span><div class="chinh-tinh" id="c3Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c3Trai"></div><div class="sao-phai" id="c3Phai"></div></div><div class="truong-sinh" id="c3TruongSinh"></div><span class="dai-van-corner" id="dvCorner3"></span></div>
          <div class="cung c-4"  id="cung4"><span class="chi-name" id="cung4Chi">THÂN</span><span class="cung-ten" id="cung4Ten">ĐIỀN TRẠCH</span><span class="cung-than" id="cung4Than"></span><div class="chinh-tinh" id="c4Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c4Trai"></div><div class="sao-phai" id="c4Phai"></div></div><div class="truong-sinh" id="c4TruongSinh"></div><span class="dai-van-corner" id="dvCorner4"></span></div>
          <div class="cung c-5"  id="cung5"><span class="chi-name" id="cung5Chi">DẬU</span><span class="cung-ten" id="cung5Ten">QUAN LỘC</span><span class="cung-than" id="cung5Than"></span><div class="chinh-tinh" id="c5Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c5Trai"></div><div class="sao-phai" id="c5Phai"></div></div><div class="truong-sinh" id="c5TruongSinh"></div><span class="dai-van-corner" id="dvCorner5"></span></div>
          <div class="cung c-6"  id="cung6"><span class="chi-name" id="cung6Chi">TUẤT</span><span class="cung-ten" id="cung6Ten">NÔ BỘC</span><span class="cung-than" id="cung6Than"></span><div class="chinh-tinh" id="c6Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c6Trai"></div><div class="sao-phai" id="c6Phai"></div></div><div class="truong-sinh" id="c6TruongSinh"></div><span class="dai-van-corner" id="dvCorner6"></span></div>
          <div class="cung c-7"  id="cung7"><span class="chi-name" id="cung7Chi">HỢI</span><span class="cung-ten" id="cung7Ten">THIÊN DI</span><span class="cung-than" id="cung7Than"></span><div class="chinh-tinh" id="c7Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c7Trai"></div><div class="sao-phai" id="c7Phai"></div></div><div class="truong-sinh" id="c7TruongSinh"></div><span class="dai-van-corner" id="dvCorner7"></span></div>
          <div class="cung c-8"  id="cung8"><span class="chi-name" id="cung8Chi">TÝ</span><span class="cung-ten" id="cung8Ten">TẬT ÁCH</span><span class="cung-than" id="cung8Than"></span><div class="chinh-tinh" id="c8Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c8Trai"></div><div class="sao-phai" id="c8Phai"></div></div><div class="truong-sinh" id="c8TruongSinh"></div><span class="dai-van-corner" id="dvCorner8"></span></div>
          <div class="cung c-9"  id="cung9"><span class="chi-name" id="cung9Chi">SỬU</span><span class="cung-ten" id="cung9Ten">TÀI BẠCH</span><span class="cung-than" id="cung9Than"></span><div class="chinh-tinh" id="c9Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c9Trai"></div><div class="sao-phai" id="c9Phai"></div></div><div class="truong-sinh" id="c9TruongSinh"></div><span class="dai-van-corner" id="dvCorner9"></span></div>
          <div class="cung c-10" id="cung10"><span class="chi-name" id="cung10Chi">DẦN</span><span class="cung-ten" id="cung10Ten">TỬ TỨC</span><span class="cung-than" id="cung10Than"></span><div class="chinh-tinh" id="c10Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c10Trai"></div><div class="sao-phai" id="c10Phai"></div></div><div class="truong-sinh" id="c10TruongSinh"></div><span class="dai-van-corner" id="dvCorner10"></span></div>
          <div class="cung c-11" id="cung11"><span class="chi-name" id="cung11Chi">MÃO</span><span class="cung-ten" id="cung11Ten">PHU THÊ</span><span class="cung-than" id="cung11Than"></span><div class="chinh-tinh" id="c11Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c11Trai"></div><div class="sao-phai" id="c11Phai"></div></div><div class="truong-sinh" id="c11TruongSinh"></div><span class="dai-van-corner" id="dvCorner11"></span></div>
          <div class="cung c-12" id="cung12"><span class="chi-name" id="cung12Chi">THÌN</span><span class="cung-ten" id="cung12Ten">HUYNH ĐỆ</span><span class="cung-than" id="cung12Than"></span><div class="chinh-tinh" id="c12Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c12Trai"></div><div class="sao-phai" id="c12Phai"></div></div><div class="truong-sinh" id="c12TruongSinh"></div><span class="dai-van-corner" id="dvCorner12"></span></div>

          <div class="trung-tam cung">
            <div class="info-compact">
              <div class="name-row" id="tenHoTenDisplay">NGUYỄN VĂN A</div>
              <div class="info-line"><span class="label">Năm:</span><span class="value" id="namInfo">2025 Ất Tỵ</span></div>
              <div class="info-line"><span class="label">Tháng:</span><span class="value" id="thangInfo">5 (5) Nhâm Ngọ</span></div>
              <div class="info-line"><span class="label">Ngày:</span><span class="value" id="ngayInfo">6 (6) Ất Dậu</span></div>
              <div class="info-line"><span class="label">Giờ:</span><span class="value" id="gioInfo">04:00 Mậu Dần</span></div>
              <div class="info-line"><span class="label">Năm xem:</span><span class="value" id="namXemDisplay">2026</span></div>
              <div class="info-line"><span class="label">Tuổi:</span><span class="value" id="tuoiAmDisplay">2 tuổi</span></div>
              <div class="info-line"><span class="label">Âm dương:</span><span class="value" id="amDuongDisplay">Âm Nam</span></div>
              <div class="info-line"><span class="label">Mệnh:</span><span class="value" id="menhDisplay">Phúc Đăng Hỏa</span></div>
              <div class="info-line"><span class="label">Cục:</span><span class="value" id="cucDisplay">Kim Tứ Cục</span></div>
              <div class="info-line"><span class="label">Chủ mệnh:</span><span class="value" id="chuMenh">Liêm Trinh</span></div>
              <div class="info-line"><span class="label">Chủ thân:</span><span class="value" id="chuThan">Thiên Lương</span></div>
              <div class="info-line"><span class="label">Thân cư:</span><span class="value" id="thanCuDisplay">Ngọ</span></div>
              <div class="meta-note">
                <span id="thuanNghichDisplay">Âm Dương nghịch lý</span> ·
                <span id="soSanhDisplay">Mệnh khắc Cục</span>
              </div>
              <div style="font-size:0.6rem; text-align:right; margin-top:3px;" id="ngayLapDisplay"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ========== CÁC PHẦN CÒN LẠI GIỮ NGUYÊN ==========
  // (không thay đổi logic JavaScript, từ connectedCallback đến hết)

  connectedCallback() {
    if (typeof Solar === 'undefined') {
      const errorDiv = this.querySelector('#inputError');
      if (errorDiv) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = 'Đang tải thư viện lịch...';
      }
      let attempts = 0;
      const checkInterval = setInterval(() => {
        if (typeof Solar !== 'undefined') {
          clearInterval(checkInterval);
          if (errorDiv) errorDiv.style.display = 'none';
          this._initEvents();
        } else if (++attempts > 10) {
          clearInterval(checkInterval);
          if (errorDiv) errorDiv.textContent = 'Không thể tải thư viện lịch. Vui lòng tải lại trang.';
        }
      }, 500);
      return;
    }
    this._initEvents();
  }

  _initEvents() {
    this.querySelector('#namXem').value = new Date().getFullYear();
    this.querySelector('#btnXemLaSo').addEventListener('click', () => this._updateLaSo());
    this.querySelector('#backBtn').addEventListener('click', () => this._showInput());
    this._showInput();
  }

  // ... toàn bộ các hàm còn lại (CAN, CHI, _buildDoSangMap, _getBaZi, ... _updateLaSo, ...)
  // (Giữ nguyên không thay đổi, tôi không sao chép lại để tránh quá dài)

  // ...

  _showInput() {
    this.querySelector('#inputScreen').style.display = 'block';
    this.querySelector('#resultScreen').style.display = 'none';
  }
  _showResult() {
    this.querySelector('#inputScreen').style.display = 'none';
    this.querySelector('#resultScreen').style.display = 'block';
  }
}

customElements.define('tu-vi-module', TuViModule);
