// Logic xào, rút và lật bài Tarot — không cần thư viện ngoài.
document.addEventListener("DOMContentLoaded", () => {
  const shuffleBtn = document.getElementById("shuffleBtn");
  const reshuffleBtn = document.getElementById("reshuffleBtn");
  const newReadingBtn = document.getElementById("newReadingBtn");
  const spreadSelect = document.getElementById("spreadSelect");
  const topicSelect = document.getElementById("topicSelect");
  const shuffleDeck = document.getElementById("shuffleDeck");
  const drawArea = document.getElementById("drawArea");
  const drawDeck = document.getElementById("drawDeck");
  const result = document.getElementById("spreadResult");
  const status = document.getElementById("statusText");
  const instruction = document.getElementById("drawInstruction");

  let deck = [];
  let drawn = [];
  let isShuffling = false;
  let required = 1;

  const spreadLabels = {
    one: ["Thông điệp dành cho hiện tại"],
    three: ["Quá khứ", "Hiện tại", "Hướng đi có thể cân nhắc"],
    love3: ["Cảm xúc", "Điều cần chú ý", "Lời khuyên"],
    four: ["Bản thân", "Hoàn cảnh", "Thử thách", "Hướng hành động"]
  };

  function countCards() {
    required = spreadLabels[spreadSelect.value].length;
    instruction.textContent = `Hãy chọn ${required} lá bài${required > 1 ? " theo thứ tự" : ""}.`;
  }

  function freshDeck() {
    deck = [...tarotCards].sort(() => Math.random() - 0.5);
    drawn = [];
  }

  function setBusy(busy) {
    shuffleBtn.disabled = busy;
    spreadSelect.disabled = busy;
    topicSelect.disabled = busy;
  }

  async function shuffleAnimation() {
    if (isShuffling) return;
    isShuffling = true;
    setBusy(true);
    drawArea.hidden = true;
    result.innerHTML = "";
    shuffleDeck.classList.add("is-shuffling");
    status.textContent = "Đang xào bài… hãy để câu hỏi lắng xuống.";
    await new Promise(r => setTimeout(r, 2300));
    shuffleDeck.classList.remove("is-shuffling");
    freshDeck();
    isShuffling = false;
    setBusy(false);
    drawArea.hidden = false;
    status.textContent = "Bộ bài đã sẵn sàng. Hãy chọn lá theo trực giác của bạn.";
    renderDrawCards();
    countCards();
  }

  function renderDrawCards() {
    drawDeck.innerHTML = "";
    // Chỉ hiển thị 12 lá úp đại diện cho bộ bài để giao diện nhẹ.
    deck.slice(0, 12).forEach((card, index) => {
      const el = document.createElement("button");
      el.className = "draw-card";
      el.setAttribute("aria-label", "Chọn một lá bài");
      el.innerHTML = `<span class="card-back-pattern">☾<small>✦</small></span>`;
      el.style.setProperty("--i", index);
      el.addEventListener("click", () => chooseCard(card, el));
      drawDeck.appendChild(el);
    });
  }

  function chooseCard(card, element) {
    if (isShuffling || drawn.some(x => x.card.id === card.id) || drawn.length >= required) return;
    element.classList.add("is-drawing");
    setTimeout(() => {
      const reversed = Math.random() < 0.35;
      drawn.push({card, reversed});
      element.disabled = true;
      element.classList.add("chosen");
      renderResult();
      if (drawn.length >= required) {
        instruction.textContent = "Trải bài đã hoàn tất. Hãy đọc chậm từng thông điệp.";
        status.textContent = "Bạn đã hoàn thành lượt trải.";
      } else {
        instruction.textContent = `Đã chọn ${drawn.length}/${required}. Hãy chọn lá tiếp theo.`;
      }
    }, 480);
  }

  function renderResult() {
    result.innerHTML = "";
    const labels = spreadLabels[spreadSelect.value];
    drawn.forEach((item, index) => {
      const c = item.card;
      const orientation = item.reversed ? "Ngược" : "Xuôi";
      const meaning = item.reversed ? c.reversed : c.upright;
      const topic = topicSelect.options[topicSelect.selectedIndex].text;
      const cardEl = document.createElement("article");
      cardEl.className = "result-card";
      cardEl.innerHTML = `
        <div class="result-card-inner ${item.reversed ? "reversed" : ""}">
          <div class="mini-card-art"><span>${c.symbol}</span><b>${c.vi}</b><small>${c.name}</small></div>
          <div class="result-copy">
            <span class="position">${labels[index]}</span>
            <h3>${c.vi} <small>${orientation}</small></h3>
            <p class="keyword">${c.keyword}</p>
            <p>${meaning}</p>
            <p class="reflection"><strong>Gợi ý chiêm nghiệm:</strong> Với chủ đề “${topic}”, hãy tự hỏi: điều gì trong thông điệp này thực sự chạm đến trải nghiệm hiện tại của bạn?</p>
          </div>
        </div>`;
      result.appendChild(cardEl);
    });
  }

  function resetReading() {
    drawn = [];
    result.innerHTML = "";
    drawArea.hidden = true;
    status.textContent = "Hãy xào bài trước khi bắt đầu.";
    instruction.textContent = "";
    shuffleDeck.classList.remove("is-shuffling");
    freshDeck();
  }

  spreadSelect.addEventListener("change", () => { countCards(); resetReading(); });
  shuffleBtn.addEventListener("click", shuffleAnimation);
  reshuffleBtn.addEventListener("click", shuffleAnimation);
  newReadingBtn.addEventListener("click", resetReading);

  const params = new URLSearchParams(location.search);
  if (params.get("topic")) topicSelect.value = params.get("topic");
  countCards();
});