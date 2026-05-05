// ========================================================
// MODULE TỬ VI – LÁ SỐ (MOBILE FULL WIDTH, Ô RỘNG HƠN)
// ========================================================
class TuViModule extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* html */ `
      <style>
        /* ========== CSS CHUNG ========== */
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
        .year-input { min-width: 80px; width: 100%; }
        .radio-group { display: flex; gap: 25px; }
        .radio-group label { width: auto; font-weight: normal; }
        .date-row, .time-row { display: flex; gap: 8px; flex: 1; }
        .date-row input, .time-row input { width: 100%; }
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
          touch-action: manipulation;
        }
        .btn-xem:hover { background: #8f613f; transform: translateY(-2px); box-shadow: 0 8px 0 #4a2e1e; }
        .btn-xem:active { transform: translateY(4px); box-shadow: 0 2px 0 #4a2e1e; }
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
        .back-btn:hover { background: #ebd5bf; }

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
          .tử-vi-grid { height: auto; min-height: 90vw; max-height: 600px; width: 100%; }
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
          top: 2px; left: 4px;
          font-size: 0.5rem; font-weight: 700; text-transform: uppercase; white-space: nowrap;
        }
        .dai-van-corner {
          position: absolute;
          bottom: 2px; right: 4px;
          font-size: 0.55rem; font-weight: 700; color: #1e3a5f;
          background: rgba(255,255,240,0.6); padding: 0 2px; border-radius: 3px;
        }
        .cung-ten { font-size: 0.6rem; font-weight: 700; color: #000; text-transform: uppercase; margin: 2px 0 0; letter-spacing: 0.3px; }
        .cung-than { font-size: 0.55rem; font-weight: 600; color: #a05a2c; margin-top: -2px; margin-bottom: 3px; }
        .chinh-tinh { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin: 3px 0 1px; line-height: 1.3; }
        .phu-tinh-row { display: flex; justify-content: space-between; align-items: flex-start; margin-top: 2px; gap: 2px; }
        .sao-trai, .sao-phai { font-size: 0.6rem; font-style: normal; text-transform: none; line-height: 1.3; flex: 1; color: #000; }
        .sao-trai { text-align: left; padding-left: 2px; }
        .sao-phai { text-align: right; padding-right: 2px; }
        .truong-sinh { font-size: 0.55rem; font-weight: 600; color: #2c3e50; text-align: center; margin-top: auto; border-top: 1px dotted #b5977a; padding-top: 2px; }
        .trung-tam {
          grid-area: 2 / 2 / 4 / 4;
          background: #fff7e8; border: 2px solid #7a5a3a; box-shadow: inset 0 0 0 2px #e7cfb0;
          padding: 8px 8px; justify-content: flex-start; align-items: stretch; font-size: 0.75rem; overflow-y: auto;
        }
        .info-compact { display: flex; flex-direction: column; gap: 3px; }
        .name-row {
          font-size: 1rem; font-weight: 800; color: #3b281a; text-align: center;
          border-bottom: 2px solid #b78c62; padding-bottom: 3px; margin-bottom: 3px;
        }
        .info-line { display: flex; align-items: baseline; border-bottom: 1px dotted #c9ad91; padding-bottom: 2px; margin-bottom: 1px; }
        .info-line .label { font-weight: 700; color: #5d3f24; width: 36%; font-size: 0.7rem; }
        .info-line .value { color: #1f140a; font-weight: 500; flex: 1; font-size: 0.75rem; }
        .meta-note { margin-top: 4px; font-style: italic; border-top: 1px dashed #b5977a; padding-top: 4px; color: #4a311e; font-size: 0.7rem; text-align: center; }
        .c-1 { grid-area: 1/1/2/2; } .c-2 { grid-area: 1/2/2/3; } .c-3 { grid-area: 1/3/2/4; } .c-4 { grid-area: 1/4/2/5; }
        .c-5 { grid-area: 2/4/3/5; } .c-6 { grid-area: 3/4/4/5; } .c-7 { grid-area: 4/4/5/5; } .c-8 { grid-area: 4/3/5/4; }
        .c-9 { grid-area: 4/2/5/3; } .c-10 { grid-area: 4/1/5/2; } .c-11 { grid-area: 3/1/4/2; } .c-12 { grid-area: 2/1/3/2; }
        .hanh-thuy { color: #000000 !important; }
        .hanh-hoa  { color: #d32f2f !important; }
        .hanh-moc  { color: #2e7d32 !important; }
        .hanh-tho  { color: #b8860b !important; }
        .hanh-kim  { color: #6c757d !important; }
        .tuan-triet-marker {
          position: absolute; background: #111; color: white;
          font-size: 0.55rem; font-weight: bold; padding: 2px 4px; border-radius: 12px;
          transform: translate(-50%, -50%); z-index: 20; white-space: nowrap;
          pointer-events: none; box-shadow: 0 1px 3px rgba(0,0,0,0.6); border: 1px solid #333; line-height: 1.2;
        }

        /* ========== MOBILE: Ô RỘNG HƠN, VIỀN MẢNH ========== */
        @media (max-width: 700px) {
          #resultScreen { padding: 0; margin: 0; }
          .tử-vi-grid {
            width: 100%;
            margin: 0;
            gap: 1px;                  /* đường kẻ 1px mảnh */
            border: 1px solid #4a2e1e; /* viền ngoài mảnh */
            border-radius: 0;
            aspect-ratio: auto;
            min-height: 200vw;
          }
          .cung {
            border: none;              /* bỏ viền ô, tiết kiệm diện tích */
            border-radius: 0;
            padding: 2px 1px 1px;     /* giảm padding, tăng không gian cho chữ */
          }
          .cung-ten { font-size: 0.45rem; }
          .chi-name { font-size: 0.35rem; }
          .chinh-tinh { font-size: 0.5rem; line-height: 1.2; }
          .sao-trai, .sao-phai { font-size: 0.45rem; }
          .truong-sinh { font-size: 0.4rem; }
          .dai-van-corner { font-size: 0.4rem; }
          .cung-than { font-size: 0.45rem; }
          .trung-tam { font-size: 0.6rem; padding: 4px; }
          .name-row { font-size: 0.8rem; }
          .info-line .label { font-size: 0.55rem; width: 40%; }
          .info-line .value { font-size: 0.6rem; }
          .meta-note { font-size: 0.6rem; }
          .tuan-triet-marker { font-size: 0.35rem; padding: 1px 2px; }
          .form-group label { width: 100px; font-size: 1rem; }
          #inputScreen { padding: 20px 15px; }
          .year-input { min-width: 70px; }
        }
        #inputError { color: #b33f3d; margin-top: 10px; font-size: 0.9rem; display: none; }
      </style>

      <div id="inputScreen">
        <h2>🌿 LẬP LÁ SỐ TỬ VI</h2>
        <div class="form-group"><label>Họ tên</label><input type="text" id="hoTen" class="form-control" value="Nguyễn Văn A"></div>
        <div class="form-group"><label>Loại lịch</label><div class="radio-group"><label><input type="radio" name="lich" value="duong" checked> Dương</label><label><input type="radio" name="lich" value="am"> Âm</label></div></div>
        <div class="form-group"><label>Ngày sinh</label><div class="date-row"><input type="text" id="ngaySinh" class="form-control" placeholder="Ngày" inputmode="numeric" value="1"><input type="text" id="thangSinh" class="form-control" placeholder="Tháng" inputmode="numeric" value="6"><input type="text" id="namSinh" class="form-control year-input" placeholder="Năm" inputmode="numeric" value="2025"></div></div>
        <div class="form-group"><label>Giờ sinh</label><div class="time-row"><input type="text" id="gioSinh" class="form-control" placeholder="Giờ" inputmode="numeric" value="4"><input type="text" id="phutSinh" class="form-control" placeholder="Phút" inputmode="numeric" value="0"></div></div>
        <div class="form-group"><label>Giới tính</label><div class="radio-group"><label><input type="radio" name="gioiTinh" value="Nam"> Nam</label><label><input type="radio" name="gioiTinh" value="Nữ" checked> Nữ</label></div></div>
        <div class="form-group"><label>Năm xem</label><input type="text" id="namXem" class="form-control year-input" placeholder="Năm" inputmode="numeric" value="2026"></div>
        <button type="button" class="btn-xem" id="btnXemLaSo">🔮 XEM LÁ SỐ</button>
        <div id="inputError"></div>
      </div>

      <div id="resultScreen">
        <button class="back-btn" id="backBtn">← Nhập lại</button>
        <div class="tử-vi-grid" id="tuViGrid">
          <!-- 12 cung giữ nguyên -->
          <div class="cung c-1" id="cung1"><span class="chi-name" id="cung1Chi">TỴ</span><span class="cung-ten" id="cung1Ten">MỆNH</span><span class="cung-than" id="cung1Than"></span><div class="chinh-tinh" id="c1Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c1Trai"></div><div class="sao-phai" id="c1Phai"></div></div><div class="truong-sinh" id="c1TruongSinh"></div><span class="dai-van-corner" id="dvCorner1"></span></div>
          <div class="cung c-2" id="cung2"><span class="chi-name" id="cung2Chi">NGỌ</span><span class="cung-ten" id="cung2Ten">PHỤ MẪU</span><span class="cung-than" id="cung2Than"></span><div class="chinh-tinh" id="c2Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c2Trai"></div><div class="sao-phai" id="c2Phai"></div></div><div class="truong-sinh" id="c2TruongSinh"></div><span class="dai-van-corner" id="dvCorner2"></span></div>
          <div class="cung c-3" id="cung3"><span class="chi-name" id="cung3Chi">MÙI</span><span class="cung-ten" id="cung3Ten">PHÚC ĐỨC</span><span class="cung-than" id="cung3Than"></span><div class="chinh-tinh" id="c3Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c3Trai"></div><div class="sao-phai" id="c3Phai"></div></div><div class="truong-sinh" id="c3TruongSinh"></div><span class="dai-van-corner" id="dvCorner3"></span></div>
          <div class="cung c-4" id="cung4"><span class="chi-name" id="cung4Chi">THÂN</span><span class="cung-ten" id="cung4Ten">ĐIỀN TRẠCH</span><span class="cung-than" id="cung4Than"></span><div class="chinh-tinh" id="c4Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c4Trai"></div><div class="sao-phai" id="c4Phai"></div></div><div class="truong-sinh" id="c4TruongSinh"></div><span class="dai-van-corner" id="dvCorner4"></span></div>
          <div class="cung c-5" id="cung5"><span class="chi-name" id="cung5Chi">DẬU</span><span class="cung-ten" id="cung5Ten">QUAN LỘC</span><span class="cung-than" id="cung5Than"></span><div class="chinh-tinh" id="c5Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c5Trai"></div><div class="sao-phai" id="c5Phai"></div></div><div class="truong-sinh" id="c5TruongSinh"></div><span class="dai-van-corner" id="dvCorner5"></span></div>
          <div class="cung c-6" id="cung6"><span class="chi-name" id="cung6Chi">TUẤT</span><span class="cung-ten" id="cung6Ten">NÔ BỘC</span><span class="cung-than" id="cung6Than"></span><div class="chinh-tinh" id="c6Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c6Trai"></div><div class="sao-phai" id="c6Phai"></div></div><div class="truong-sinh" id="c6TruongSinh"></div><span class="dai-van-corner" id="dvCorner6"></span></div>
          <div class="cung c-7" id="cung7"><span class="chi-name" id="cung7Chi">HỢI</span><span class="cung-ten" id="cung7Ten">THIÊN DI</span><span class="cung-than" id="cung7Than"></span><div class="chinh-tinh" id="c7Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c7Trai"></div><div class="sao-phai" id="c7Phai"></div></div><div class="truong-sinh" id="c7TruongSinh"></div><span class="dai-van-corner" id="dvCorner7"></span></div>
          <div class="cung c-8" id="cung8"><span class="chi-name" id="cung8Chi">TÝ</span><span class="cung-ten" id="cung8Ten">TẬT ÁCH</span><span class="cung-than" id="cung8Than"></span><div class="chinh-tinh" id="c8Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c8Trai"></div><div class="sao-phai" id="c8Phai"></div></div><div class="truong-sinh" id="c8TruongSinh"></div><span class="dai-van-corner" id="dvCorner8"></span></div>
          <div class="cung c-9" id="cung9"><span class="chi-name" id="cung9Chi">SỬU</span><span class="cung-ten" id="cung9Ten">TÀI BẠCH</span><span class="cung-than" id="cung9Than"></span><div class="chinh-tinh" id="c9Chinh"></div><div class="phu-tinh-row"><div class="sao-trai" id="c9Trai"></div><div class="sao-phai" id="c9Phai"></div></div><div class="truong-sinh" id="c9TruongSinh"></div><span class="dai-van-corner" id="dvCorner9"></span></div>
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
    const btn = this.querySelector('#btnXemLaSo');
    btn.addEventListener('click', () => this._updateLaSo());
    btn.addEventListener('touchend', (e) => { e.preventDefault(); this._updateLaSo(); });
    this.querySelector('#backBtn').addEventListener('click', () => this._showInput());
    this._showInput();
  }

  // ========== HẰNG SỐ & TOÀN BỘ LOGIC AN SAO (giữ nguyên) ==========
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
  _getStarDisplayName(starName, chi) { /* ... */ }
  _getStarHanhClass(starName) { /* ... */ }
  _formatStarWithColor(starName, chi) { /* ... */ }
  _sortStars(stars) { /* ... */ }
  _parseGZ(gz) { /* ... */ }
  _getBaZi(y, m, d, h, min) { /* ... */ }
  _getLunarInfoFromSolar(y, m, d) { /* ... */ }
  _convertLunarToSolar(ly, lm, ld) { /* ... */ }
  _getMenhNapAm(canChiYear) { /* ... */ }
  _tinhCucByMenh(menhCan, menhChi) { /* ... */ }
  _getCucNumber(cucName) { /* ... */ }
  _soSanhMenhCuc(menh, cuc) { /* ... */ }
  _getAmDuong(namCanChi, gioiTinh) { /* ... */ }
  _getThuanNghich(amDuongStr) { /* ... */ }
  _getChuTinh() { return { menh: 'Liêm Trinh', than: 'Thiên Lương' }; }
  _anMenhThan(amThang, gio) { /* ... */ }
  _assignCungNames(menhPos) { /* ... */ }
  _computeCungCanChi(yearCan) { /* ... */ }
  _computeDaiVanValues(menhPos, isThuan, startNum) { /* ... */ }
  _anTuVi(amNgay, cucNumber) { /* ... */ }
  _forwardSteps(pos, steps) { for(let i=0;i<steps;i++) pos=(pos%12)+1; return pos; }
  _backwardSteps(pos, steps) { for(let i=0;i<steps;i++){pos=pos-1;if(pos<1)pos=12;} return pos; }
  _computeAllStars(tuViPos) { /* ... */ }
  _computeThaiTuePositions(yearChi) { /* ... */ }
  _computeLocTonStartPos(yearCan) { /* ... */ }
  _computeLocTonPositions(yearCan, isThuan) { /* ... */ }
  _computeKinhDaPositions(locTonStartPos) { /* ... */ }
  _getHoaLinhPositions(yearChi, gio, isThuan) { /* ... */ }
  _computeTaHuuPositions(amThang) { /* ... */ }
  _computeLongPhuongPositions(yearChi) { /* ... */ }
  _computeKhoiVietPositions(yearCan) { /* ... */ }
  _computeTruongSinhPositions(cuc, isThuan) { /* ... */ }
  _computeThienKhocHu(yearChi) { /* ... */ }
  _computeTamThaiBatToa(taPos, huuPos, amNgay) { /* ... */ }
  _computeAnQuangThienQuy(vanXuongPos, vanKhucPos, amNgay) { /* ... */ }
  _computeThienNguyetDuc(yearChi) { /* ... */ }
  _computeThienHinhThieuDieu(amThang) { /* ... */ }
  _computeHongLoanThienHy(yearChi) { /* ... */ }
  _computeQuocAnDuongPhu(locTonStartPos) { /* ... */ }
  _computeThaiPhuPhongCao(gio) { /* ... */ }
  _computeCoThanQuaTu(yearChi) { /* ... */ }
  _computeDaoHoaThienMaHoaCai(yearChi) { /* ... */ }
  _computeLuuHa(yearCan) { /* ... */ }
  _computeLongVanTinh(yearCan) { /* ... */ }
  _getTuHoaPositions(yearCan, starPositions) { /* ... */ }
  _getTrietPair(yearCan) { /* ... */ }
  _getTuanPair(namAm) { /* ... */ }
  _updateTuanTrietMarkers(tuanPair, trietPair) { /* ... */ }
  _extractLaSoData() { /* ... */ }
  _normalizeSao(name) { /* ... */ }
  _parseIntSafe(str) { /* ... */ }

  _updateLaSo() {
    // ... toàn bộ logic _updateLaSo như các phiên bản trước ...
  }

  _showInput() { /* ... */ }
  _showResult() { /* ... */ }
}

customElements.define('tu-vi-module', TuViModule);
