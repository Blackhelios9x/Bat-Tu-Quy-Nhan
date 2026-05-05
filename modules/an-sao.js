// ========================================================
// MODULE TỬ VI – LÁ SỐ (ĐÃ TỐI ƯU MOBILE)
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
          .cung-ten { font-size: 0.5rem; }
          .chi-name { font-size: 0.4rem; }
          .chinh-tinh { font-size: 0.55rem; }
          .sao-trai, .sao-phai { font-size: 0.5rem; }
          .truong-sinh { font-size: 0.45rem; }
          .dai-van-corner { font-size: 0.45rem; }
          .trung-tam { font-size: 0.65rem; padding: 4px; }
          .tuan-triet-marker { font-size: 0.4rem; padding: 1px 3px; }
          .form-group label { width: 100px; font-size: 1rem; }
          #inputScreen { padding: 20px 15px; }
          .year-input { min-width: 70px; }

          /* Kéo dài lá số, thêm chiều cao cho ô */
          .tử-vi-grid {
            aspect-ratio: auto;
            min-height: 140vw;
          }

          /* Giảm cỡ chữ trong ô trung tâm */
          .name-row { font-size: 0.9rem; }
          .info-line .label { font-size: 0.6rem; }
          .info-line .value { font-size: 0.65rem; }
        }
        #inputError {
          color: #b33f3d;
          margin-top: 10px;
          font-size: 0.9rem;
          display: none;
        }
      </style>

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

  // ========== HẰNG SỐ TĨNH (giữ nguyên) ==========
  static get CAN() { return ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý']; }
  static get CHI() { return ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi']; }
  static get CAN_HAN() { return ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']; }
  static get CHI_HAN() { return ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']; }
  static get CUNG_NAMES() { return ['MỆNH','PHỤ MẪU','PHÚC ĐỨC','ĐIỀN TRẠCH','QUAN LỘC','NÔ BỘC','THIÊN DI','TẬT ÁCH','TÀI BẠCH','TỬ TỨC','PHU THÊ','HUYNH ĐỆ']; }
  static get posToChi() { return {1:'Tỵ',2:'Ngọ',3:'Mùi',4:'Thân',5:'Dậu',6:'Tuất',7:'Hợi',8:'Tý',9:'Sửu',10:'Dần',11:'Mão',12:'Thìn'}; }
  static get chiToPos() { const map={}; for(let p in TuViModule.posToChi) map[TuViModule.posToChi[p]]=parseInt(p); return map; }
  static get STAR_PRIORITY() { return ['Hóa Lộc','Hóa Quyền','Hóa Khoa','Hóa Kỵ','Thiên Không','Địa Kiếp','Kình Dương','Đà La','Linh Tinh','Hỏa Tinh','Văn Xương','Văn Khúc','Tả Phù','Hữu Bật','Lộc Tồn','Thiên Khôi','Thiên Việt']; }
  static get HANH_MAP() {
    return {
      'Thiên Đồng':'thuy','Hóa Kỵ':'thuy','Thiên Hỷ':'thuy','Thái Âm':'thuy','Thiêu Diêu':'thuy','Tham Lang':'thuy',
      'Cự Môn':'thuy','Văn Khúc':'thuy','Thiên Tướng':'thuy','Thanh Long':'thuy','Thiên Hư':'thuy','Hồng Loan':'thuy',
      'Lưu Hà':'thuy','Hữu Bật':'thuy','Phá Quân':'thuy',
      'THIÊN ĐỒNG':'thuy','THÁI ÂM':'thuy','THAM LANG':'thuy','CỰ MÔN':'thuy','THIÊN TƯỚNG':'thuy','PHÁ QUÂN':'thuy',
      'Linh Tinh':'hoa','Đại Hao':'hoa','Thiếu Dương':'hoa','Thiên Việt':'hoa','Thiên Không':'hoa','Phục Binh':'hoa',
      'Hỏa Tinh':'hoa','Quan Phù':'hoa','Trực Phù':'hoa','Tiểu Hao':'hoa','Thái Tuế':'hoa',
      'Thiên Mã':'hoa','Lực Sỹ':'hoa','Nguyệt Đức':'hoa','Tuế Phá':'hoa','Thiên Khôi':'hoa','Địa Kiếp':'hoa',
      'Thiên Hình':'hoa','Hỷ Thần':'hoa','Phi Liêm':'hoa','Thiên Đức':'hoa','Điếu Khách':'hoa',
      'Thái Dương':'hoa','Liêm Trinh':'hoa',
      'THÁI DƯƠNG':'hoa','LIÊM TRINH':'hoa',
      'Hóa Quyền':'moc','Đường Phù':'moc','Đào Hoa':'moc','Ân Quang':'moc','Tướng Quân':'moc',
      'Bát Tọa':'moc','Tang Môn':'moc','Hóa Lộc':'moc','Phượng Các':'moc','Hóa Khoa':'moc',
      'Thiên Cơ':'moc','Thiên Lương':'moc',
      'THIÊN CƠ':'moc','THIÊN LƯƠNG':'moc',
      'Bệnh Phù':'tho','Phúc Đức':'tho','Phong Cáo':'tho','Quả Tú':'tho','Quốc Ấn':'tho','Thiên Thương':'tho',
      'Tả Phù':'tho','Cô Thần':'tho','Lộc Tồn':'tho',
      'Tử Vi':'tho','Thiên Phủ':'tho',
      'TỬ VI':'tho','THIÊN PHỦ':'tho',
      'Văn Xương':'kim','Đà La':'kim','Kình Dương':'kim',
      'Thất Sát':'kim','Vũ Khúc':'kim','LN Văn Tinh':'kim',
      'THẤT SÁT':'kim','VŨ KHÚC':'kim'
    };
  }

  // ========== TOÀN BỘ LOGIC AN SAO (GIỮ NGUYÊN) ==========
  _buildDoSangMap() {
    const rawData = {
      'Tý': { M: ['thiên cơ', 'thiên phủ', 'thái âm', 'thiên tướng', 'thiên lương', 'phá quân', 'lộc tồn'], V: ['vũ khúc', 'thiên đồng', 'cự môn', 'tham lang', 'thái dương'], D: ['văn xương', 'văn khúc'], B: ['tử vi', 'liêm trinh'], H: ['thái dương', 'kình dương', 'hỏa tinh', 'linh tinh'] },
      'Sửu': { M: ['tử vi', 'vũ khúc', 'thiên phủ', 'thái âm', 'tham lang', 'thiên tướng', 'thất sát', 'văn khúc', 'văn xương', 'kình dương', 'đà la'], V: ['thiên lương', 'phá quân'], D: ['hỏa tinh', 'linh tinh'], B: [], H: ['thiên cơ'] },
      'Dần': { M: ['liêm trinh', 'thiên phủ', 'cự môn', 'thiên tướng', 'thiên lương', 'thất sát', 'lộc tồn', 'hỏa tinh', 'linh tinh'], V: ['tử vi', 'thái dương', 'thái âm'], D: ['thiên cơ', 'vũ khúc', 'phá quân'], B: ['tham lang', 'văn khúc'], H: ['văn xương', 'đà la'] },
      'Mão': { M: ['thái dương', 'cự môn', 'thiên đồng', 'thiên lương', 'lộc tồn'], V: ['tử vi', 'thiên cơ', 'thất sát', 'văn khúc'], D: ['thiên phủ'], B: ['liêm trinh'], H: ['thái âm', 'thiên tướng', 'phá quân'] },
      'Thìn': { M: ['vũ khúc', 'thiên phủ', 'tham lang', 'thiên lương', 'thất sát', 'kình dương', 'đà la'], V: ['thái dương', 'phá quân'], D: ['tử vi', 'thiên tướng', 'văn xương', 'văn khúc'], B: ['thiên đồng'], H: ['thái âm', 'cự môn', 'hỏa tinh', 'linh tinh'] },
      'Tỵ': { M: ['thiên đồng', 'văn xương', 'văn khúc', 'lộc tồn'], V: ['tử vi', 'thái dương', 'cự môn'], D: ['thiên phủ', 'thiên tướng', 'hỏa tinh', 'linh tinh'], B: ['thiên cơ', 'vũ khúc', 'phá quân', 'thất sát'], H: ['liêm trinh', 'thái âm', 'tham lang', 'thiên lương', 'đà la'] },
      'Ngọ': { M: ['tử vi', 'thiên cơ', 'thiên tướng', 'thiên lương', 'phá quân', 'lộc tồn', 'hỏa tinh', 'linh tinh'], V: ['thái dương', 'vũ khúc', 'thiên phủ', 'tham lang', 'cự môn', 'thất sát'], D: [], B: ['liêm trinh'], H: ['thiên đồng', 'văn xương', 'văn khúc'] },
      'Mùi': { M: ['tử vi', 'vũ khúc', 'thiên phủ', 'tham lang', 'thái âm', 'thất sát', 'kình dương', 'đà la'], V: ['thiên lương', 'phá quân', 'văn khúc'], D: ['thái dương', 'thiên tướng'], B: [], H: ['thiên cơ'] },
      'Thân': { M: ['liêm trinh', 'cự môn', 'thiên tướng', 'thất sát', 'lộc tồn'], V: ['tử vi', 'thiên phủ', 'thái âm', 'thiên đồng'], D: ['thiên phủ', 'thiên cơ', 'hỏa tinh', 'linh tinh'], B: ['thái dương'], H: ['thiên lương', 'phá quân'] },
      'Dậu': { M: ['cự môn', 'văn xương', 'thái âm', 'văn khúc', 'lộc tồn'], V: ['tử vi', 'thiên cơ', 'thiên phủ', 'thất sát'], D: ['thiên lương', 'hỏa tinh', 'linh tinh'], B: ['thiên đồng', 'liêm trinh'], H: ['thái dương', 'thiên tướng', 'phá quân'] },
      'Tuất': { M: ['vũ khúc', 'thiên phủ', 'tham lang', 'thiên lương', 'thất sát', 'kình dương', 'đà la'], V: ['thái âm', 'phá quân'], D: ['tử vi', 'thiên tướng'], B: ['thiên đồng'], H: ['cự môn', 'văn xương', 'văn khúc'] },
      'Hợi': { M: ['thiên đồng', 'thái âm', 'lộc tồn'], V: ['tử vi', 'cự môn', 'văn khúc'], D: ['thiên phủ', 'thiên tướng'], B: ['thiên cơ', 'vũ khúc', 'thất sát', 'phá quân'], H: ['thái dương', 'liêm trinh', 'tham lang', 'thiên lương', 'đà la'] }
    };
    const map = {};
    for (let chi in rawData) {
      const data = rawData[chi];
      for (let level in data) {
        const stars = data[level];
        let suffix = '';
        if (level === 'M') suffix = ' (M)';
        else if (level === 'V') suffix = ' (V)';
        else if (level === 'D') suffix = ' (Đ)';
        else if (level === 'B') suffix = ' (B)';
        else if (level === 'H') suffix = ' (H)';
        stars.forEach(rawName => {
          const normalized = rawName.toUpperCase();
          if (!map[normalized]) map[normalized] = {};
          map[normalized][chi] = suffix;
        });
      }
    }
    return map;
  }
  _getStarDisplayName(starName, chi) {
    const suffix = this._buildDoSangMap()[starName]?.[chi] || '';
    return starName + suffix;
  }
  _getStarHanhClass(starName) {
    const hanh = TuViModule.HANH_MAP[starName];
    return hanh ? `hanh-${hanh}` : '';
  }
  _formatStarWithColor(starName, chi) {
    const displayName = this._getStarDisplayName(starName, chi);
    const cls = this._getStarHanhClass(starName);
    return cls ? `<span class="${cls}">${displayName}</span>` : displayName;
  }
  _sortStars(stars) {
    return stars.sort((a, b) => {
      let idxA = TuViModule.STAR_PRIORITY.indexOf(a);
      let idxB = TuViModule.STAR_PRIORITY.indexOf(b);
      if (idxA === -1 && idxB === -1) return a.localeCompare(b);
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });
  }
  _parseGZ(gz) {
    const si = TuViModule.CAN_HAN.indexOf(gz[0]);
    const bi = TuViModule.CHI_HAN.indexOf(gz[1]);
    return { si, bi, can: si>=0?TuViModule.CAN[si]:'?', chi: bi>=0?TuViModule.CHI[bi]:'?' };
  }
  _getBaZi(y, m, d, h, min) {
    const solar = Solar.fromYmdHms(y, m, d, h, min, 0);
    const lunar = solar.getLunar();
    const ec = lunar.getEightChar();
    return {
      year:  this._parseGZ(ec.getYear()),
      month: this._parseGZ(ec.getMonth()),
      day:   this._parseGZ(ec.getDay()),
      hour:  this._parseGZ(ec.getTime()),
      lunar, solar
    };
  }
  _getLunarInfoFromSolar(y, m, d) {
    const solar = Solar.fromYmd(y, m, d);
    const lunar = solar.getLunar();
    return { day: lunar.getDay(), month: lunar.getMonth(), year: lunar.getYear() };
  }
  _convertLunarToSolar(ly, lm, ld) {
    try {
      const lunar = Lunar.fromYmd(ly, lm, ld);
      const solar = lunar.getSolar();
      return { y: solar.getYear(), m: solar.getMonth(), d: solar.getDay() };
    } catch { return null; }
  }
  _getMenhNapAm(canChiYear) {
    const map = {
      'Giáp Tý':'Hải Trung Kim','Ất Sửu':'Hải Trung Kim','Bính Dần':'Lư Trung Hỏa','Đinh Mão':'Lư Trung Hỏa',
      'Mậu Thìn':'Đại Lâm Mộc','Kỷ Tỵ':'Đại Lâm Mộc','Canh Ngọ':'Lộ Bàng Thổ','Tân Mùi':'Lộ Bàng Thổ',
      'Nhâm Thân':'Kiếm Phong Kim','Quý Dậu':'Kiếm Phong Kim','Giáp Tuất':'Sơn Đầu Hỏa','Ất Hợi':'Sơn Đầu Hỏa',
      'Bính Tý':'Giản Hạ Thủy','Đinh Sửu':'Giản Hạ Thủy','Mậu Dần':'Thành Đầu Thổ','Kỷ Mão':'Thành Đầu Thổ',
      'Canh Thìn':'Bạch Lạp Kim','Tân Tỵ':'Bạch Lạp Kim','Nhâm Ngọ':'Dương Liễu Mộc','Quý Mùi':'Dương Liễu Mộc',
      'Giáp Thân':'Tuyền Trung Thủy','Ất Dậu':'Tuyền Trung Thủy','Bính Tuất':'Ốc Thượng Thổ','Đinh Hợi':'Ốc Thượng Thổ',
      'Mậu Tý':'Tích Lịch Hỏa','Kỷ Sửu':'Tích Lịch Hỏa','Canh Dần':'Tùng Bách Mộc','Tân Mão':'Tùng Bách Mộc',
      'Nhâm Thìn':'Trường Lưu Thủy','Quý Tỵ':'Trường Lưu Thủy','Giáp Ngọ':'Sa Trung Kim','Ất Mùi':'Sa Trung Kim',
      'Bính Thân':'Sơn Hạ Hỏa','Đinh Dậu':'Sơn Hạ Hỏa','Mậu Tuất':'Bình Địa Mộc','Kỷ Hợi':'Bình Địa Mộc',
      'Canh Tý':'Bích Thượng Thổ','Tân Sửu':'Bích Thượng Thổ','Nhâm Dần':'Kim Bạch Kim','Quý Mão':'Kim Bạch Kim',
      'Giáp Thìn':'Phúc Đăng Hỏa','Ất Tỵ':'Phúc Đăng Hỏa','Bính Ngọ':'Thiên Hà Thủy','Đinh Mùi':'Thiên Hà Thủy',
      'Mậu Thân':'Đại Dịch Thổ','Kỷ Dậu':'Đại Dịch Thổ','Canh Tuất':'Thoa Xuyến Kim','Tân Hợi':'Thoa Xuyến Kim',
      'Nhâm Tý':'Tang Đố Mộc','Quý Sửu':'Tang Đố Mộc','Giáp Dần':'Đại Khê Thủy','Ất Mão':'Đại Khê Thủy',
      'Bính Thìn':'Sa Trung Thổ','Đinh Tỵ':'Sa Trung Thổ','Mậu Ngọ':'Thiên Thượng Hỏa','Kỷ Mùi':'Thiên Thượng Hỏa',
      'Canh Thân':'Thạch Lựu Mộc','Tân Dậu':'Thạch Lựu Mộc','Nhâm Tuất':'Đại Hải Thủy','Quý Hợi':'Đại Hải Thủy'
    };
    return map[canChiYear] || 'Chưa xác định';
  }
  _tinhCucByMenh(menhCan, menhChi) {
    const canGroup = menhCan;
    const chi = menhChi;
    const isGroup1 = ['Tý','Sửu','Ngọ','Mùi'].includes(chi);
    const isGroup2 = ['Dần','Mão','Thân','Dậu'].includes(chi);
    const isGroup3 = ['Thìn','Tỵ','Tuất','Hợi'].includes(chi);
    if (canGroup === 'Giáp' || canGroup === 'Ất') {
      if (isGroup1) return 'Kim Tứ Cục'; if (isGroup2) return 'Thủy Nhị Cục'; if (isGroup3) return 'Hỏa Lục Cục';
    } else if (canGroup === 'Bính' || canGroup === 'Đinh') {
      if (isGroup1) return 'Thủy Nhị Cục'; if (isGroup2) return 'Hỏa Lục Cục'; if (isGroup3) return 'Thổ Ngũ Cục';
    } else if (canGroup === 'Mậu' || canGroup === 'Kỷ') {
      if (isGroup1) return 'Hỏa Lục Cục'; if (isGroup2) return 'Thổ Ngũ Cục'; if (isGroup3) return 'Mộc Tam Cục';
    } else if (canGroup === 'Canh' || canGroup === 'Tân') {
      if (isGroup1) return 'Thổ Ngũ Cục'; if (isGroup2) return 'Mộc Tam Cục'; if (isGroup3) return 'Kim Tứ Cục';
    } else if (canGroup === 'Nhâm' || canGroup === 'Quý') {
      if (isGroup1) return 'Mộc Tam Cục'; if (isGroup2) return 'Kim Tứ Cục'; if (isGroup3) return 'Thủy Nhị Cục';
    }
    return 'Thổ Ngũ Cục';
  }
  _getCucNumber(cucName) {
    if (cucName.includes('Nhị')) return 2; if (cucName.includes('Tam')) return 3;
    if (cucName.includes('Tứ')) return 4; if (cucName.includes('Ngũ')) return 5;
    if (cucName.includes('Lục')) return 6; return 2;
  }
  _soSanhMenhCuc(menh, cuc) {
    const hanhMenh = menh.includes('Kim')?'Kim':menh.includes('Mộc')?'Mộc':menh.includes('Thủy')?'Thủy':menh.includes('Hỏa')?'Hỏa':'Thổ';
    const hanhCuc = cuc.includes('Kim')?'Kim':cuc.includes('Mộc')?'Mộc':cuc.includes('Thủy')?'Thủy':cuc.includes('Hỏa')?'Hỏa':'Thổ';
    const tuongSinh = {'Kim':'Thủy','Thủy':'Mộc','Mộc':'Hỏa','Hỏa':'Thổ','Thổ':'Kim'};
    const tuongKhac = {'Kim':'Mộc','Mộc':'Thổ','Thổ':'Thủy','Thủy':'Hỏa','Hỏa':'Kim'};
    if (tuongSinh[hanhCuc]===hanhMenh) return 'Cục sinh Mệnh';
    if (tuongSinh[hanhMenh]===hanhCuc) return 'Mệnh sinh Cục';
    if (tuongKhac[hanhCuc]===hanhMenh) return 'Cục khắc Mệnh';
    if (tuongKhac[hanhMenh]===hanhCuc) return 'Mệnh khắc Cục';
    return 'Bình hòa';
  }
  _getAmDuong(namCanChi, gioiTinh) {
    const can = namCanChi.charAt(0);
    const amDuong = ['Giáp','Bính','Mậu','Canh','Nhâm'].includes(can) ? 'Dương' : 'Âm';
    return amDuong + ' ' + gioiTinh;
  }
  _getThuanNghich(amDuongStr) {
    return (amDuongStr.includes('Dương Nam') || amDuongStr.includes('Âm Nữ')) ? 'Âm Dương thuận lý' : 'Âm Dương nghịch lý';
  }
  _getChuTinh() { return { menh: 'Liêm Trinh', than: 'Thiên Lương' }; }
  _anMenhThan(amThang, gio) {
    function forward(startPos, steps) { let pos = startPos; for (let i=0;i<steps;i++) pos=(pos%12)+1; return pos; }
    function backward(startPos, steps) { let pos = startPos; for (let i=0;i<steps;i++) { pos=pos-1; if(pos<1) pos=12; } return pos; }
    const thangStartPos = TuViModule.chiToPos['Dần'];
    const thangPos = forward(thangStartPos, amThang - 1);
    const chiGioIndex = Math.floor((gio + 1) / 2) % 12;
    const menhPos = backward(thangPos, chiGioIndex);
    const thanPos = forward(thangPos, chiGioIndex);
    return { menhChi: TuViModule.posToChi[menhPos], menhPos, thanChi: TuViModule.posToChi[thanPos], thanPos };
  }
  _assignCungNames(menhPos) {
    const cungNamesByPos = {};
    for (let i=0;i<12;i++) {
      let pos = ((menhPos-1+i)%12)+1;
      cungNamesByPos[pos] = TuViModule.CUNG_NAMES[i];
    }
    return cungNamesByPos;
  }
  _computeCungCanChi(yearCan) {
    const canDầnMap = {'Giáp':'Bính','Kỷ':'Bính','Ất':'Mậu','Canh':'Mậu','Bính':'Canh','Tân':'Canh','Đinh':'Nhâm','Nhâm':'Nhâm','Mậu':'Giáp','Quý':'Giáp'};
    const startCan = canDầnMap[yearCan] || 'Giáp';
    const startCanIndex = TuViModule.CAN.indexOf(startCan);
    const chiOrder = ['Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi','Tý','Sửu'];
    const result = {};
    chiOrder.forEach((chi,idx) => {
      const canIndex = (startCanIndex+idx)%10;
      result[chi] = TuViModule.CAN[canIndex] + ' ' + chi;
    });
    return result;
  }
  _computeDaiVanValues(menhPos, isThuan, startNum) {
    const dvValues = Array(12).fill('');
    let currentPos = menhPos, currentVal = startNum;
    for (let i=0;i<12;i++) {
      dvValues[currentPos-1] = currentVal;
      if (isThuan) currentPos=(currentPos%12)+1;
      else { currentPos=currentPos-1; if(currentPos<1) currentPos=12; }
      currentVal += 10;
    }
    return dvValues;
  }
  _anTuVi(amNgay, cucNumber) {
    const startPos = TuViModule.chiToPos['Dần'];
    function forward(pos, steps) { for(let i=0;i<steps;i++) pos=(pos%12)+1; return pos; }
    function backward(pos, steps) { for(let i=0;i<steps;i++){pos=pos-1;if(pos<1)pos=12;} return pos; }
    const remainder = amNgay % cucNumber;
    if (remainder === 0) {
      const thuong = amNgay / cucNumber;
      return forward(startPos, thuong - 1);
    } else {
      const add = cucNumber - remainder;
      const thuong = (amNgay + add) / cucNumber;
      if (add % 2 === 1) {
        return backward(forward(startPos, thuong - 1), add);
      } else {
        return forward(startPos, thuong + add - 1);
      }
    }
  }
  _forwardSteps(pos, steps) { for(let i=0;i<steps;i++) pos=(pos%12)+1; return pos; }
  _backwardSteps(pos, steps) { for(let i=0;i<steps;i++){pos=pos-1;if(pos<1)pos=12;} return pos; }
  _computeAllStars(tuViPos) {
    const thienCo = this._backwardSteps(tuViPos, 1);
    const thaiDuong = this._backwardSteps(thienCo, 2);
    const vuKhuc = this._backwardSteps(thaiDuong, 1);
    const thienDong = this._backwardSteps(vuKhuc, 1);
    const liemTrinh = this._backwardSteps(thienDong, 3);
    const chiTuVi = TuViModule.posToChi[tuViPos];
    let thienPhu;
    if (chiTuVi === 'Dần' || chiTuVi === 'Thân') {
      thienPhu = tuViPos;
    } else {
      const doiXung = {'Sửu':'Mão','Mão':'Sửu','Thìn':'Tý','Tý':'Thìn','Tỵ':'Hợi','Hợi':'Tỵ','Ngọ':'Tuất','Tuất':'Ngọ','Mùi':'Dậu','Dậu':'Mùi'};
      thienPhu = TuViModule.chiToPos[doiXung[chiTuVi]];
    }
    const thaiAm = this._forwardSteps(thienPhu, 1);
    const thamLang = this._forwardSteps(thaiAm, 1);
    const cuMon = this._forwardSteps(thamLang, 1);
    const thienTuong = this._forwardSteps(cuMon, 1);
    const thienLuong = this._forwardSteps(thienTuong, 1);
    const thatSat = this._forwardSteps(thienLuong, 1);
    const phaQuan = this._forwardSteps(thatSat, 4);
    return {
      'TỬ VI': tuViPos, 'THIÊN CƠ': thienCo, 'THÁI DƯƠNG': thaiDuong,
      'VŨ KHÚC': vuKhuc, 'THIÊN ĐỒNG': thienDong, 'LIÊM TRINH': liemTrinh,
      'THIÊN PHỦ': thienPhu, 'THÁI ÂM': thaiAm, 'THAM LANG': thamLang,
      'CỰ MÔN': cuMon, 'THIÊN TƯỚNG': thienTuong, 'THIÊN LƯƠNG': thienLuong,
      'THẤT SÁT': thatSat, 'PHÁ QUÂN': phaQuan
    };
  }
  _computeThaiTuePositions(yearChi) {
    const thaiTueList = ['Thái Tuế','Thiếu Dương','Tang Môn','Thiếu Âm','Quan Phù','Tử Phù','Tuế Phá','Long Đức','Bạch Hổ','Phúc Đức','Điếu Khách','Trực Phù'];
    const startPos = TuViModule.chiToPos[yearChi];
    const positions = {};
    let pos = startPos;
    for (let sao of thaiTueList) { positions[pos] = sao; pos = (pos % 12) + 1; }
    return positions;
  }
  _computeLocTonStartPos(yearCan) {
    const locTonStartMap = {'Giáp':'Dần','Ất':'Mão','Bính':'Tỵ','Đinh':'Ngọ','Mậu':'Tỵ','Kỷ':'Ngọ','Canh':'Thân','Tân':'Dậu','Nhâm':'Hợi','Quý':'Tý'};
    return TuViModule.chiToPos[locTonStartMap[yearCan]||'Dần'];
  }
  _computeLocTonPositions(yearCan, isThuan) {
    const startPos = this._computeLocTonStartPos(yearCan);
    const vongSao = ['Lộc Tồn','Lực Sỹ','Thanh Long','Tiểu Hao','Tướng Quân','Tấu Thư','Phi Liêm','Hỷ Thần','Bệnh Phù','Đại Hao','Phục Binh','Quan Phù'];
    const positions = {};
    let pos = startPos;
    for (let sao of vongSao) {
      positions[pos] = sao;
      if (isThuan) pos = (pos % 12) + 1;
      else { pos = pos - 1; if (pos < 1) pos = 12; }
    }
    return positions;
  }
  _computeKinhDaPositions(locTonStartPos) {
    let kinhPos = (locTonStartPos % 12) + 1;
    let daPos = locTonStartPos - 1;
    if (daPos < 1) daPos = 12;
    return { kinh: kinhPos, da: daPos };
  }
  _getHoaLinhPositions(yearChi, gio, isThuan) {
    let hoaStart, linhStart;
    if (['Dần','Ngọ','Tuất'].includes(yearChi)) { hoaStart = TuViModule.chiToPos['Sửu']; linhStart = TuViModule.chiToPos['Mão']; }
    else if (['Thân','Tý','Thìn'].includes(yearChi)) { hoaStart = TuViModule.chiToPos['Dần']; linhStart = TuViModule.chiToPos['Tuất']; }
    else if (['Tỵ','Dậu','Sửu'].includes(yearChi)) { hoaStart = TuViModule.chiToPos['Mão']; linhStart = TuViModule.chiToPos['Tuất']; }
    else { hoaStart = TuViModule.chiToPos['Dần']; linhStart = TuViModule.chiToPos['Tuất']; }
    const chiGioIndex = Math.floor((gio + 1) / 2) % 12;
    let hoaPos, linhPos;
    if (isThuan) {
      hoaPos = this._forwardSteps(hoaStart, chiGioIndex);
      linhPos = this._backwardSteps(linhStart, chiGioIndex);
    } else {
      hoaPos = this._backwardSteps(hoaStart, chiGioIndex);
      linhPos = this._forwardSteps(linhStart, chiGioIndex);
    }
    return { hoa: hoaPos, linh: linhPos };
  }
  _computeTaHuuPositions(amThang) {
    return {
      ta: this._forwardSteps(TuViModule.chiToPos['Thìn'], amThang - 1),
      huu: this._backwardSteps(TuViModule.chiToPos['Tuất'], amThang - 1)
    };
  }
  _computeLongPhuongPositions(yearChi) {
    const chiIndex = TuViModule.CHI.indexOf(yearChi);
    return {
      long: this._forwardSteps(TuViModule.chiToPos['Thìn'], chiIndex),
      phuong: this._backwardSteps(TuViModule.chiToPos['Tuất'], chiIndex)
    };
  }
  _computeKhoiVietPositions(yearCan) {
    const map = { 'Giáp':{khoi:'Sửu',viet:'Mùi'},'Mậu':{khoi:'Sửu',viet:'Mùi'},'Canh':{khoi:'Sửu',viet:'Mùi'},
                   'Ất':{khoi:'Tý',viet:'Thân'},'Kỷ':{khoi:'Tý',viet:'Thân'},
                   'Bính':{khoi:'Hợi',viet:'Dậu'},'Đinh':{khoi:'Hợi',viet:'Dậu'},
                   'Tân':{khoi:'Ngọ',viet:'Dần'},'Nhâm':{khoi:'Mão',viet:'Tỵ'},'Quý':{khoi:'Mão',viet:'Tỵ'} };
    const entry = map[yearCan] || { khoi: 'Sửu', viet: 'Mùi' };
    return { khoi: TuViModule.chiToPos[entry.khoi], viet: TuViModule.chiToPos[entry.viet] };
  }
  _computeTruongSinhPositions(cuc, isThuan) {
    const startMap = { 'Thủy Nhị Cục':'Thân','Mộc Tam Cục':'Hợi','Kim Tứ Cục':'Tỵ','Thổ Ngũ Cục':'Thân','Hỏa Lục Cục':'Dần' };
    let cucKey = 'Thổ Ngũ Cục';
    if (cuc.includes('Thủy')) cucKey = 'Thủy Nhị Cục';
    else if (cuc.includes('Mộc')) cucKey = 'Mộc Tam Cục';
    else if (cuc.includes('Kim')) cucKey = 'Kim Tứ Cục';
    else if (cuc.includes('Hỏa')) cucKey = 'Hỏa Lục Cục';
    else if (cuc.includes('Thổ')) cucKey = 'Thổ Ngũ Cục';
    const startPos = TuViModule.chiToPos[startMap[cucKey] || 'Thân'];
    const vongSao = ['Trường Sinh','Mộc Dục','Quan Đới','Lâm Quan','Đế Vượng','Suy','Bệnh','Tử','Mộ','Tuyệt','Thai','Dưỡng'];
    const positions = {};
    let pos = startPos;
    for (let sao of vongSao) {
      positions[pos] = sao;
      if (isThuan) pos = (pos % 12) + 1;
      else { pos = pos - 1; if (pos < 1) pos = 12; }
    }
    return positions;
  }
  _computeThienKhocHu(yearChi) {
    const chiIndex = TuViModule.CHI.indexOf(yearChi);
    return {
      khoc: this._backwardSteps(TuViModule.chiToPos['Ngọ'], chiIndex),
      hu: this._forwardSteps(TuViModule.chiToPos['Ngọ'], chiIndex)
    };
  }
  _computeTamThaiBatToa(taPos, huuPos, amNgay) {
    return {
      tamThai: this._forwardSteps(taPos, amNgay - 1),
      batToa: this._backwardSteps(huuPos, amNgay - 1)
    };
  }
  _computeAnQuangThienQuy(vanXuongPos, vanKhucPos, amNgay) {
    return {
      anQuang: this._backwardSteps(this._forwardSteps(vanXuongPos, amNgay - 1), 1),
      thienQuy: this._backwardSteps(this._backwardSteps(vanKhucPos, amNgay - 1), 1)
    };
  }
  _computeThienNguyetDuc(yearChi) {
    const chiIndex = TuViModule.CHI.indexOf(yearChi);
    return {
      thienDuc: this._forwardSteps(TuViModule.chiToPos['Dậu'], chiIndex),
      nguyetDuc: this._forwardSteps(TuViModule.chiToPos['Tỵ'], chiIndex)
    };
  }
  _computeThienHinhThieuDieu(amThang) {
    return {
      thienHinh: this._forwardSteps(TuViModule.chiToPos['Dậu'], amThang - 1),
      thieuDieu: this._forwardSteps(TuViModule.chiToPos['Sửu'], amThang - 1)
    };
  }
  _computeHongLoanThienHy(yearChi) {
    const chiIndex = TuViModule.CHI.indexOf(yearChi);
    const hongLoanPos = this._forwardSteps(TuViModule.chiToPos['Mão'], chiIndex);
    let thienHyPos = ((hongLoanPos - 1 + 6) % 12) + 1;
    return { hongLoan: hongLoanPos, thienHy: thienHyPos };
  }
  _computeQuocAnDuongPhu(locTonStartPos) {
    return {
      quocAn: this._forwardSteps(locTonStartPos, 8),
      duongPhu: this._backwardSteps(locTonStartPos, 7)
    };
  }
  _computeThaiPhuPhongCao(gio) {
    const chiGioIndex = Math.floor((gio + 1) / 2) % 12;
    return {
      thaiPhu: this._forwardSteps(TuViModule.chiToPos['Ngọ'], chiGioIndex),
      phongCao: this._forwardSteps(TuViModule.chiToPos['Dần'], chiGioIndex)
    };
  }
  _computeCoThanQuaTu(yearChi) {
    if (['Hợi','Tý','Sửu'].includes(yearChi)) return { coThan: TuViModule.chiToPos['Dần'], quaTu: TuViModule.chiToPos['Tuất'] };
    if (['Dần','Mão','Thìn'].includes(yearChi)) return { coThan: TuViModule.chiToPos['Tỵ'], quaTu: TuViModule.chiToPos['Sửu'] };
    if (['Tỵ','Ngọ','Mùi'].includes(yearChi)) return { coThan: TuViModule.chiToPos['Thân'], quaTu: TuViModule.chiToPos['Thìn'] };
    return { coThan: TuViModule.chiToPos['Hợi'], quaTu: TuViModule.chiToPos['Mùi'] };
  }
  _computeDaoHoaThienMaHoaCai(yearChi) {
    if (['Thân','Tý','Thìn'].includes(yearChi)) return { daoHoa: TuViModule.chiToPos['Dậu'], thienMa: TuViModule.chiToPos['Dần'], hoaCai: TuViModule.chiToPos['Thìn'] };
    else if (['Dần','Ngọ','Tuất'].includes(yearChi)) return { daoHoa: TuViModule.chiToPos['Mão'], thienMa: TuViModule.chiToPos['Thân'], hoaCai: TuViModule.chiToPos['Tuất'] };
    else if (['Tỵ','Dậu','Sửu'].includes(yearChi)) return { daoHoa: TuViModule.chiToPos['Ngọ'], thienMa: TuViModule.chiToPos['Hợi'], hoaCai: TuViModule.chiToPos['Sửu'] };
    else return { daoHoa: TuViModule.chiToPos['Tý'], thienMa: TuViModule.chiToPos['Tỵ'], hoaCai: TuViModule.chiToPos['Mùi'] };
  }
  _computeLuuHa(yearCan) {
    const map = { 'Giáp':'Dậu','Ất':'Tuất','Bính':'Mùi','Đinh':'Thìn','Mậu':'Tỵ','Kỷ':'Ngọ','Canh':'Thân','Tân':'Mão','Nhâm':'Hợi','Quý':'Dần' };
    return TuViModule.chiToPos[map[yearCan]] || 1;
  }
  _computeLongVanTinh(yearCan) {
    const map = { 'Giáp':'Tỵ','Ất':'Ngọ','Bính':'Thân','Đinh':'Dậu','Mậu':'Thân','Kỷ':'Dậu','Canh':'Hợi','Tân':'Tý','Nhâm':'Dần','Quý':'Mão' };
    return TuViModule.chiToPos[map[yearCan]] || 1;
  }
  _getTuHoaPositions(yearCan, starPositions) {
    const hoaLocMap = { 'Giáp':'LIÊM TRINH','Ất':'THIÊN CƠ','Bính':'THIÊN ĐỒNG','Đinh':'THÁI ÂM','Mậu':'THAM LANG','Kỷ':'VŨ KHÚC','Canh':'THÁI DƯƠNG','Tân':'CỰ MÔN','Nhâm':'THIÊN LƯƠNG','Quý':'PHÁ QUÂN' };
    const hoaQuyenMap = { 'Giáp':'PHÁ QUÂN','Ất':'THIÊN LƯƠNG','Bính':'THIÊN CƠ','Đinh':'THIÊN ĐỒNG','Mậu':'THÁI ÂM','Kỷ':'THAM LANG','Canh':'VŨ KHÚC','Tân':'THIÊN LƯƠNG','Nhâm':'TỬ VI','Quý':'CỰ MÔN' };
    const hoaKhoaMap = { 'Giáp':'VŨ KHÚC','Ất':'TỬ VI','Bính':'Văn Xương','Đinh':'THIÊN CƠ','Mậu':'Hữu Bật','Kỷ':'THIÊN LƯƠNG','Canh':'THÁI ÂM','Tân':'Văn Khúc','Nhâm':'Tả Phù','Quý':'THÁI ÂM' };
    const hoaKyMap = { 'Giáp':'THÁI DƯƠNG','Ất':'THÁI ÂM','Bính':'LIÊM TRINH','Đinh':'CỰ MÔN','Mậu':'THIÊN CƠ','Kỷ':'Văn Khúc','Canh':'THIÊN ĐỒNG','Tân':'Văn Xương','Nhâm':'VŨ KHÚC','Quý':'THAM LANG' };
    const getPos = (starName) => {
      if (['Văn Xương','Văn Khúc','Tả Phù','Hữu Bật'].includes(starName)) return null;
      return starPositions[starName] || null;
    };
    return {
      hoaLoc: getPos(hoaLocMap[yearCan]),
      hoaQuyen: getPos(hoaQuyenMap[yearCan]),
      hoaKhoa: getPos(hoaKhoaMap[yearCan]),
      hoaKy: getPos(hoaKyMap[yearCan])
    };
  }
  _getTrietPair(yearCan) {
    const map = { 'Giáp':['Thân','Dậu'],'Ất':['Ngọ','Mùi'],'Bính':['Thìn','Tỵ'],'Đinh':['Dần','Mão'],'Mậu':['Tý','Sửu'],'Kỷ':['Thân','Dậu'],'Canh':['Ngọ','Mùi'],'Tân':['Thìn','Tỵ'],'Nhâm':['Dần','Mão'],'Quý':['Tý','Sửu'] };
    return map[yearCan] || ['Thân','Dậu'];
  }
  _getTuanPair(namAm) {
    const solar = Solar.fromYmd(namAm, 1, 1); const lunar = solar.getLunar();
    const yearGan = TuViModule.CAN[lunar.getYearGanIndex()]; const ganIndex = TuViModule.CAN.indexOf(yearGan);
    let diff = ganIndex; let tuanYear = namAm - diff;
    const tuanSolar = Solar.fromYmd(tuanYear, 1, 1); const tuanLunar = tuanSolar.getLunar();
    const tuanZhi = TuViModule.CHI[tuanLunar.getYearZhiIndex()];
    const pairMap = { 'Tý':['Tuất','Hợi'],'Sửu':['Tuất','Hợi'],'Dần':['Tý','Sửu'],'Mão':['Tý','Sửu'],'Thìn':['Dần','Mão'],'Tỵ':['Dần','Mão'],'Ngọ':['Thìn','Tỵ'],'Mùi':['Thìn','Tỵ'],'Thân':['Ngọ','Mùi'],'Dậu':['Ngọ','Mùi'],'Tuất':['Thân','Dậu'],'Hợi':['Thân','Dậu'] };
    return pairMap[tuanZhi] || ['Thân','Dậu'];
  }
  _updateTuanTrietMarkers(tuanPair, trietPair) {
    const grid = this.querySelector('#tuViGrid');
    grid.querySelectorAll('.tuan-triet-marker').forEach(m => m.remove());
    if (!tuanPair && !trietPair) return;
    const positions = {
      'Tỵ':{row:1,col:1},'Ngọ':{row:1,col:2},'Mùi':{row:1,col:3},'Thân':{row:1,col:4},
      'Dậu':{row:2,col:4},'Tuất':{row:3,col:4},'Hợi':{row:4,col:4},'Tý':{row:4,col:3},
      'Sửu':{row:4,col:2},'Dần':{row:4,col:1},'Mão':{row:3,col:1},'Thìn':{row:2,col:1}
    };
    function addMarker(pair, text) {
      if (!pair || pair.length !== 2) return;
      const c1 = positions[pair[0]], c2 = positions[pair[1]];
      if (!c1 || !c2) return;
      const isHorizontal = c1.row === c2.row;
      const isVertical = c1.col === c2.col;
      if (!isHorizontal && !isVertical) return;
      const colStart = Math.min(c1.col, c2.col);
      const rowStart = Math.min(c1.row, c2.row);
      let leftPercent, topPercent;
      if (isHorizontal) { leftPercent = (colStart / 4) * 100; topPercent = ((rowStart - 0.5) / 4) * 100; }
      else { leftPercent = ((colStart - 0.5) / 4) * 100; topPercent = (rowStart / 4) * 100; }
      const marker = document.createElement('div');
      marker.className = 'tuan-triet-marker';
      marker.textContent = text;
      marker.style.left = leftPercent + '%';
      marker.style.top = topPercent + '%';
      grid.appendChild(marker);
    }
    const tuanKey = tuanPair ? tuanPair.sort().join('-') : null;
    const trietKey = trietPair ? trietPair.sort().join('-') : null;
    if (tuanKey && trietKey && tuanKey === trietKey) { addMarker(tuanPair, 'Tuần / Triệt'); }
    else { if (tuanPair) addMarker(tuanPair, 'Tuần'); if (trietPair) addMarker(trietPair, 'Triệt'); }
  }

  // ========== XỬ LÝ LÁ SỐ CHÍNH ==========
  _extractLaSoData() {
    const cung = {};
    for (let i = 1; i <= 12; i++) {
      const chiEl = this.querySelector(`#cung${i}Chi`);
      if (!chiEl) continue;
      const chi = chiEl.innerText.trim().split(/\s+/).pop();
      const idx = TuViModule.CHI.indexOf(chi);
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
    return { cung, normalize: (name) => this._normalizeSao(name) };
  }
  _normalizeSao(name) {
    let n = name.replace(/\s*\(.*?\)\s*/g, '').trim().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/\s+/g, ' ').trim();
    n = n.replace(/hy/g, 'hi');
    const simple = { 'nhat':'thai duong', 'nguyet':'thai am' };
    return simple[n] ?? n;
  }

  _updateLaSo() {
    const errorDiv = this.querySelector('#inputError');
    errorDiv.style.display = 'none';

    const hoTen = this.querySelector('#hoTen').value.trim() || 'Nguyễn Văn A';
    const loaiLich = this.querySelector('input[name="lich"]:checked').value;
    let ngay = parseInt(this.querySelector('#ngaySinh').value);
    let thang = parseInt(this.querySelector('#thangSinh').value);
    let namSinh = parseInt(this.querySelector('#namSinh').value);
    const gio = parseInt(this.querySelector('#gioSinh').value);
    const phut = parseInt(this.querySelector('#phutSinh').value);
    const gioiTinh = this.querySelector('input[name="gioiTinh"]:checked').value;
    const namXem = parseInt(this.querySelector('#namXem').value);

    if (isNaN(ngay) || isNaN(thang) || isNaN(namSinh) || isNaN(gio) || isNaN(phut) || isNaN(namXem)) {
      errorDiv.textContent = '⚠ Vui lòng nhập đầy đủ và đúng định dạng ngày, giờ, năm.';
      errorDiv.style.display = 'block';
      return;
    }
    if (thang < 1 || thang > 12 || ngay < 1 || ngay > 31 || namSinh < 1900 || namXem < 1900) {
      errorDiv.textContent = '⚠ Ngày tháng không hợp lệ.';
      errorDiv.style.display = 'block';
      return;
    }

    let ngayDuong = ngay, thangDuong = thang, namDuong = namSinh;
    let amNgay = ngay, amThang = thang, amNam = namSinh;
    if (loaiLich === 'duong') {
      const lunarInfo = this._getLunarInfoFromSolar(namSinh, thang, ngay);
      amNgay = lunarInfo.day; amThang = lunarInfo.month; amNam = lunarInfo.year;
    } else {
      const solarDate = this._convertLunarToSolar(namSinh, thang, ngay);
      if (solarDate) { namDuong = solarDate.y; thangDuong = solarDate.m; ngayDuong = solarDate.d; }
      else { errorDiv.textContent = '⚠ Ngày âm không hợp lệ.'; errorDiv.style.display = 'block'; return; }
    }

    const bz = this._getBaZi(namDuong, thangDuong, ngayDuong, gio, phut);
    const canChiNam = `${bz.year.can} ${bz.year.chi}`;
    const canChiNgay = `${bz.day.can} ${bz.day.chi}`;
    const canChiGio = `${bz.hour.can} ${bz.hour.chi}`;

    const { menhChi, menhPos, thanChi, thanPos } = this._anMenhThan(amThang, gio);
    const cungNamesMap = this._assignCungNames(menhPos);
    const cungCanChi = this._computeCungCanChi(bz.year.can);
    const chiOrderThangAm = ['Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi','Tý','Sửu'];
    const lunarMonthChi = chiOrderThangAm[amThang - 1];
    const canChiThang = cungCanChi[lunarMonthChi] || `${bz.month.can} ${bz.month.chi}`;
    const menhCanFull = cungCanChi[menhChi];
    const menhCan = menhCanFull.split(' ')[0];

    const cuc = this._tinhCucByMenh(menhCan, menhChi);
    const cucNumber = this._getCucNumber(cuc);
    const startNum = cucNumber;
    const amDuongFull = this._getAmDuong(canChiNam, gioiTinh);
    const isThuan = (amDuongFull.includes('Dương Nam') || amDuongFull.includes('Âm Nữ'));
    const dvValues = this._computeDaiVanValues(menhPos, isThuan, startNum);

    const tuViPos = this._anTuVi(amNgay, cucNumber);
    const starPositions = this._computeAllStars(tuViPos);
    const locTonStartPos = this._computeLocTonStartPos(bz.year.can);
    const thaiTuePositions = this._computeThaiTuePositions(bz.year.chi);
    const locTonPositions = this._computeLocTonPositions(bz.year.can, isThuan);
    const kinhDa = this._computeKinhDaPositions(locTonStartPos);
    const hoaLinh = this._getHoaLinhPositions(bz.year.chi, gio, isThuan);
    const taHuu = this._computeTaHuuPositions(amThang);
    const longPhuong = this._computeLongPhuongPositions(bz.year.chi);
    const khoiViet = this._computeKhoiVietPositions(bz.year.can);
    const truongSinhPositions = this._computeTruongSinhPositions(cuc, isThuan);
    const thienKhocHu = this._computeThienKhocHu(bz.year.chi);
    const tamThaiBatToa = this._computeTamThaiBatToa(taHuu.ta, taHuu.huu, amNgay);
    const chiGioIndex = Math.floor((gio + 1) / 2) % 12;
    const vanXuongPos = this._backwardSteps(TuViModule.chiToPos['Tuất'], chiGioIndex);
    const vanKhucPos = this._forwardSteps(TuViModule.chiToPos['Thìn'], chiGioIndex);
    const anQuangThienQuy = this._computeAnQuangThienQuy(vanXuongPos, vanKhucPos, amNgay);
    const thienNguyetDuc = this._computeThienNguyetDuc(bz.year.chi);
    const thienHinhThieuDieu = this._computeThienHinhThieuDieu(amThang);
    const hongLoanThienHy = this._computeHongLoanThienHy(bz.year.chi);
    const quocAnDuongPhu = this._computeQuocAnDuongPhu(locTonStartPos);
    const thaiPhuPhongCao = this._computeThaiPhuPhongCao(gio);
    const coThanQuaTu = this._computeCoThanQuaTu(bz.year.chi);
    const daoHoaThienMaHoaCai = this._computeDaoHoaThienMaHoaCai(bz.year.chi);
    const luuHaPos = this._computeLuuHa(bz.year.can);
    const longVanTinhPos = this._computeLongVanTinh(bz.year.can);

    const noBocPos = Object.keys(cungNamesMap).find(k => cungNamesMap[k] === 'NÔ BỘC');
    const tatAchPos = Object.keys(cungNamesMap).find(k => cungNamesMap[k] === 'TẬT ÁCH');
    const thinPos = TuViModule.chiToPos['Thìn'];
    const tuatPos = TuViModule.chiToPos['Tuất'];
    const diaKiepPos = this._forwardSteps(TuViModule.chiToPos['Hợi'], chiGioIndex);
    const thienKhongPos = this._backwardSteps(TuViModule.chiToPos['Hợi'], chiGioIndex);
    const tuHoa = this._getTuHoaPositions(bz.year.can, starPositions);

    let hoaKhoaPos = tuHoa.hoaKhoa;
    let hoaKyPos = tuHoa.hoaKy;
    if (!hoaKhoaPos) {
      const sn = { 'Giáp':'VŨ KHÚC','Ất':'TỬ VI','Bính':'Văn Xương','Đinh':'THIÊN CƠ','Mậu':'Hữu Bật','Kỷ':'THIÊN LƯƠNG','Canh':'THÁI ÂM','Tân':'Văn Khúc','Nhâm':'Tả Phù','Quý':'THÁI ÂM' }[bz.year.can];
      hoaKhoaPos = (sn === 'Văn Xương') ? vanXuongPos : (sn === 'Văn Khúc') ? vanKhucPos : (sn === 'Tả Phù') ? taHuu.ta : (sn === 'Hữu Bật') ? taHuu.huu : starPositions[sn];
    }
    if (!hoaKyPos) {
      const sn = { 'Giáp':'THÁI DƯƠNG','Ất':'THÁI ÂM','Bính':'LIÊM TRINH','Đinh':'CỰ MÔN','Mậu':'THIÊN CƠ','Kỷ':'Văn Khúc','Canh':'THIÊN ĐỒNG','Tân':'Văn Xương','Nhâm':'VŨ KHÚC','Quý':'THAM LANG' }[bz.year.can];
      hoaKyPos = (sn === 'Văn Xương') ? vanXuongPos : (sn === 'Văn Khúc') ? vanKhucPos : starPositions[sn];
    }

    const phuSao = {};
    const addLeft = (pos, name) => { if (pos) phuSao[name] = { pos, side: 'trai' }; };
    const addRight = (pos, name) => { if (pos) phuSao[name] = { pos, side: 'phai' }; };
    addLeft(vanXuongPos, 'Văn Xương'); addLeft(vanKhucPos, 'Văn Khúc'); addLeft(taHuu.ta, 'Tả Phù'); addLeft(taHuu.huu, 'Hữu Bật');
    addLeft(longPhuong.long, 'Long Trì'); addLeft(longPhuong.phuong, 'Phượng Các'); addLeft(khoiViet.khoi, 'Thiên Khôi'); addLeft(khoiViet.viet, 'Thiên Việt');
    addLeft(tamThaiBatToa.tamThai, 'Tam Thai'); addLeft(tamThaiBatToa.batToa, 'Bát Tọa'); addLeft(anQuangThienQuy.anQuang, 'Ân Quang'); addLeft(anQuangThienQuy.thienQuy, 'Thiên Quý');
    addLeft(thienNguyetDuc.thienDuc, 'Thiên Đức'); addLeft(thienNguyetDuc.nguyetDuc, 'Nguyệt Đức'); addLeft(hongLoanThienHy.hongLoan, 'Hồng Loan'); addLeft(hongLoanThienHy.thienHy, 'Thiên Hỷ');
    addLeft(quocAnDuongPhu.quocAn, 'Quốc Ấn'); addLeft(quocAnDuongPhu.duongPhu, 'Đường Phù'); addLeft(thaiPhuPhongCao.thaiPhu, 'Thai Phụ'); addLeft(thaiPhuPhongCao.phongCao, 'Phong Cáo');
    addLeft(daoHoaThienMaHoaCai.daoHoa, 'Đào Hoa'); addRight(daoHoaThienMaHoaCai.thienMa, 'Thiên Mã'); addLeft(daoHoaThienMaHoaCai.hoaCai, 'Hoa Cái');
    addLeft(longVanTinhPos, 'LN Văn Tinh'); addLeft(locTonStartPos, 'Bác Sỹ'); addLeft(tuHoa.hoaLoc, 'Hóa Lộc'); addLeft(tuHoa.hoaQuyen, 'Hóa Quyền'); addLeft(hoaKhoaPos, 'Hóa Khoa');
    addRight(diaKiepPos, 'Địa Kiếp'); addRight(thienKhongPos, 'Thiên Không'); addRight(hoaLinh.hoa, 'Hỏa Tinh'); addRight(hoaLinh.linh, 'Linh Tinh'); addRight(kinhDa.kinh, 'Kình Dương'); addRight(kinhDa.da, 'Đà La');
    addRight(thienKhocHu.khoc, 'Thiên Khốc'); addRight(thienKhocHu.hu, 'Thiên Hư'); addRight(thienHinhThieuDieu.thienHinh, 'Thiên Hình'); addRight(thienHinhThieuDieu.thieuDieu, 'Thiêu Diêu');
    addRight(parseInt(noBocPos), 'Thiên Thương'); addRight(parseInt(tatAchPos), 'Thiên Sứ'); addRight(thinPos, 'Thiên La'); addRight(tuatPos, 'Địa Võng');
    addRight(coThanQuaTu.coThan, 'Cô Thần'); addRight(coThanQuaTu.quaTu, 'Quả Tú'); addRight(luuHaPos, 'Lưu Hà'); addRight(hoaKyPos, 'Hóa Kỵ');
    for (let pos in thaiTuePositions) {
      const sao = thaiTuePositions[pos];
      if (['Phúc Đức','Thiếu Dương','Thiếu Âm'].includes(sao)) addLeft(parseInt(pos), sao);
      else addRight(parseInt(pos), sao);
    }
    for (let pos in locTonPositions) {
      const sao = locTonPositions[pos];
      if (['Lộc Tồn','Lực Sỹ','Thanh Long','Hỷ Thần'].includes(sao)) addLeft(parseInt(pos), sao);
      else addRight(parseInt(pos), sao);
    }

    for (let i = 1; i <= 12; i++) {
      this.querySelector(`#c${i}Chinh`).innerHTML = '';
      this.querySelector(`#c${i}Trai`).innerHTML = '';
      this.querySelector(`#c${i}Phai`).innerHTML = '';
      this.querySelector(`#c${i}TruongSinh`).textContent = '';
    }

    const starsByPos = {};
    for (let [star, pos] of Object.entries(starPositions)) {
      if (!starsByPos[pos]) starsByPos[pos] = [];
      starsByPos[pos].push(star);
    }
    for (let pos in starsByPos) {
      const el = this.querySelector(`#c${pos}Chinh`);
      if (el) el.innerHTML = starsByPos[pos].map(s => this._formatStarWithColor(s, TuViModule.posToChi[pos])).join('<br>');
    }

    const traiByPos = {}, phaiByPos = {};
    for (let [name, info] of Object.entries(phuSao)) {
      if (info.side === 'trai') {
        if (!traiByPos[info.pos]) traiByPos[info.pos] = [];
        traiByPos[info.pos].push(name);
      } else {
        if (!phaiByPos[info.pos]) phaiByPos[info.pos] = [];
        phaiByPos[info.pos].push(name);
      }
    }
    for (let pos in traiByPos) {
      traiByPos[pos] = this._sortStars(traiByPos[pos]);
      this.querySelector(`#c${pos}Trai`).innerHTML = traiByPos[pos].map(s => this._formatStarWithColor(s, TuViModule.posToChi[pos])).join('<br>');
    }
    for (let pos in phaiByPos) {
      phaiByPos[pos] = this._sortStars(phaiByPos[pos]);
      this.querySelector(`#c${pos}Phai`).innerHTML = phaiByPos[pos].map(s => this._formatStarWithColor(s, TuViModule.posToChi[pos])).join('<br>');
    }
    for (let pos in truongSinhPositions) this.querySelector(`#c${pos}TruongSinh`).textContent = truongSinhPositions[pos];

    for (let i = 1; i <= 12; i++) {
      const chi = TuViModule.posToChi[i];
      const tenCungEl = this.querySelector(`#cung${i}Ten`);
      tenCungEl.textContent = cungNamesMap[i];
      tenCungEl.className = 'cung-ten';
      const chiEl = this.querySelector(`#cung${i}Chi`);
      chiEl.textContent = cungCanChi[chi] || chi;
      const hanhClass = (chi === 'Tý'||chi==='Hợi')?'hanh-thuy':(chi==='Tỵ'||chi==='Ngọ')?'hanh-hoa':(chi==='Dần'||chi==='Mão')?'hanh-moc':(chi==='Thân'||chi==='Dậu')?'hanh-kim':'hanh-tho';
      chiEl.className = `chi-name ${hanhClass}`;
      this.querySelector(`#cung${i}Than`).textContent = (i === thanPos) ? '(Thân)' : '';
      this.querySelector(`#dvCorner${i}`).textContent = dvValues[i-1] !== '' ? dvValues[i-1] : '';
    }

    const menh = this._getMenhNapAm(canChiNam);
    const tuoiAm = namXem - namSinh + 1;
    const thuanNghich = this._getThuanNghich(amDuongFull);
    const soSanh = this._soSanhMenhCuc(menh, cuc);
    const chuTinh = this._getChuTinh();

    this.querySelector('#tenHoTenDisplay').innerText = hoTen.toUpperCase();
    this.querySelector('#namInfo').innerText = `${namSinh} ${canChiNam}`;
    this.querySelector('#thangInfo').innerHTML = `${thangDuong} (${amThang}) ${canChiThang}`;
    this.querySelector('#ngayInfo').innerHTML = `${ngayDuong} (${amNgay}) ${canChiNgay}`;
    this.querySelector('#gioInfo').innerHTML = `${gio.toString().padStart(2,'0')}:${phut.toString().padStart(2,'0')} ${canChiGio}`;
    const solarXem = Solar.fromYmd(namXem, 1, 1);
    const lunarXem = solarXem.getLunar();
    const canChiNamXem = `${TuViModule.CAN[lunarXem.getYearGanIndex()]} ${TuViModule.CHI[lunarXem.getYearZhiIndex()]}`;
    this.querySelector('#namXemDisplay').innerText = `${namXem} ${canChiNamXem}`;
    this.querySelector('#tuoiAmDisplay').innerText = `${tuoiAm} tuổi`;
    this.querySelector('#amDuongDisplay').innerText = amDuongFull;
    this.querySelector('#menhDisplay').innerText = menh;
    this.querySelector('#cucDisplay').innerText = cuc;
    this.querySelector('#chuMenh').innerText = chuTinh.menh;
    this.querySelector('#chuThan').innerText = chuTinh.than;
    const thanCungName = cungNamesMap[thanPos];
    let thanCuText;
    if (thanPos === menhPos) thanCuText = 'Thân Mệnh đồng cung';
    else {
      const cungNameFmt = thanCungName.charAt(0) + thanCungName.slice(1).toLowerCase();
      thanCuText = 'Thân cư ' + cungNameFmt;
    }
    this.querySelector('#thanCuDisplay').innerText = thanCuText;
    this.querySelector('#thuanNghichDisplay').innerText = thuanNghich;
    this.querySelector('#soSanhDisplay').innerText = soSanh;
    this.querySelector('#ngayLapDisplay').innerHTML = `⚲ Lập: ${new Date().toLocaleString('vi-VN')}`;

    const trietPair = this._getTrietPair(bz.year.can);
    const tuanPair = this._getTuanPair(amNam);
    this._updateTuanTrietMarkers(tuanPair, trietPair);

    const laSoData = this._extractLaSoData();
    this.dispatchEvent(new CustomEvent('laso-ready', {
      detail: { laSoData },
      bubbles: true,
      composed: true
    }));

    this._showResult();
  }

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
