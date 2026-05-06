<!-- Cuối file HTML -->
<script type="module">
  import BatTuModule from './BatTuModule.js';

  const app = new BatTuModule();

  window.addEventListener('DOMContentLoaded', () => {
    app.initDOM();
    app.fetchSuggestions();

    // Gắn event listeners cho các nút
    document.querySelector('button[onclick="calcDungThan()"]')
      ?.addEventListener('click', () => app.calcDungThan());
    document.querySelector('button[onclick="calcQuyNhan()"]')
      ?.addEventListener('click', () => app.calcQuyNhan());
    document.getElementById('tb-dt')
      ?.addEventListener('click', () => app.switchTab('dt'));
    document.getElementById('tb-qn')
      ?.addEventListener('click', () => app.switchTab('qn'));
  });
</script>
