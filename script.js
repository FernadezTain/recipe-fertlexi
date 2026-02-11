const recipes = [
  {
    id: 1, 
    name: "🍰 Шоколадный торт", 
    cat: "sweet", 
    time: 30, 
    ing: ["200г муки", "200г сахара", "100г какао", "2 яйца"], 
    steps: ["Смешайте сухие ингредиенты", "Добавьте яйца и перемешайте", "Вылейте в форму", "Выпекайте 30 минут"]
  },
  {
    id: 2, 
    name: "🍯 Медовые пряники", 
    cat: "sweet", 
    time: 20, 
    ing: ["300г меда", "400г муки", "1 яйцо", "корица и имбирь"], 
    steps: ["Растопите мед", "Добавьте яйцо и специи", "Замесите тесто", "Выпекайте 15 минут"]
  },
  {
    id: 3, 
    name: "🍎 Яблочный пирог", 
    cat: "sweet", 
    time: 45, 
    ing: ["3 яблока", "200г муки", "150г сахара", "сливочное масло"], 
    steps: ["Нарежьте яблоки кубиками", "Смешайте тесто", "Выложите яблоки", "Выпекайте 40 минут"]
  },
  {
    id: 4, 
    name: "🥗 Овощной салат", 
    cat: "salty", 
    time: 15, 
    ing: ["2 огурца", "2 помидора", "1 перец", "оливковое масло"], 
    steps: ["Нарежьте все овощи", "Положите в миску", "Заправьте маслом", "Посолите и поперчите"]
  },
  {
    id: 5, 
    name: "🍝 Спагетти", 
    cat: "salty", 
    time: 20, 
    ing: ["250г спагетти", "томатный соус", "чеснок", "пармезан"], 
    steps: ["Отварите спагетти", "Обжарьте чеснок в масле", "Добавьте соус", "Подавайте с пармезаном"]
  },
  {
    id: 6, 
    name: "🥤 Апельсиновый сок", 
    cat: "drinks", 
    time: 5, 
    ing: ["4 апельсина", "сахар по вкусу", "вода"], 
    steps: ["Разрежьте апельсины", "Выжмите сок", "Добавьте сахар", "Разбавьте водой"]
  },
  {
    id: 7, 
    name: "🍹 Ягодный смузи", 
    cat: "drinks", 
    time: 10, 
    ing: ["ягоды", "банан", "йогурт", "мед"], 
    steps: ["Положите все в блендер", "Взбейте до однородности", "Перелейте в стакан", "Подавайте со льдом"]
  },
  {
    id: 8, 
    name: "🍵 Мятный чай", 
    cat: "drinks", 
    time: 10, 
    ing: ["свежая мята", "мед", "вода", "лимон"], 
    steps: ["Заварите мяту кипятком", "Настаивайте 5 минут", "Добавьте мед", "Украсьте лимоном"]
  },
  {
    id: 9, 
    name: "🥐 Круассаны", 
    cat: "baking", 
    time: 120, 
    ing: ["500г муки", "250г масла", "молоко", "дрожжи"], 
    steps: ["Замесите тесто", "Раскатайте с маслом", "Сверните в спираль", "Выпекайте 30 минут"]
  },
  {
    id: 10, 
    name: "🍞 Домашний хлеб", 
    cat: "baking", 
    time: 90, 
    ing: ["500г муки", "дрожжи", "вода", "соль"], 
    steps: ["Замесите тесто", "Дайте подняться 1 час", "Сформируйте батон", "Выпекайте 40 минут"]
  }
];

function showRecipes(r) {
  const list = document.getElementById('recipeList');
  
  if (r.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-text">Рецепты не найдены</div>
        <div class="empty-state-subtext">Попробуйте другой поиск или фильтр</div>
      </div>
    `;
    document.getElementById('shownCount').textContent = 0;
    return;
  }
  
  list.innerHTML = r.map((rec, idx) => `
    <div class="recipe-card ${rec.cat}" style="animation-delay: ${idx * 0.1}s">
      <div class="recipe-top">
        <div class="recipe-title">${rec.name}</div>
        <div class="recipe-meta">⏱ ${rec.time} мин</div>
      </div>
      <div class="recipe-content">
        <div class="section-title">📋 ИНГРЕДИЕНТЫ:</div>
        <ul class="ingredients-list">
          ${rec.ing.map(i => `<li>${i}</li>`).join('')}
        </ul>
        <div class="section-title">👨‍🍳 ПРИГОТОВЛЕНИЕ:</div>
        <ol class="instructions-list">
          ${rec.steps.map(s => `<li>${s}</li>`).join('')}
        </ol>
        <div class="recipe-bottom">
          <div class="recipe-time">⏱ ${rec.time} мин</div>
          <div class="type-badge type-${rec.cat}">
            ${rec.cat === 'sweet' ? '🍰 Сладкое' : 
              rec.cat === 'salty' ? '🥗 Солёное' : 
              rec.cat === 'drinks' ? '🥤 Напиток' : '🥐 Выпечка'}
          </div>
        </div>
      </div>
    </div>
  `).join('');
  
  document.getElementById('shownCount').textContent = r.length;
  document.getElementById('totalCount').textContent = recipes.length;
}

function filterCategory(cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  
  if (cat === 'all') {
    showRecipes(recipes);
  } else {
    showRecipes(recipes.filter(r => r.cat === cat));
  }
}

function search() {
  const term = document.getElementById('searchInput').value.toLowerCase();
  
  if (!term) {
    document.getElementById('btnAll').click();
    return;
  }
  
  showRecipes(recipes.filter(r =>
    r.name.toLowerCase().includes(term) ||
    r.ing.some(i => i.toLowerCase().includes(term)) ||
    r.steps.some(s => s.toLowerCase().includes(term))
  ));
  
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
}

function randomRecipe() {
  const random = recipes[Math.floor(Math.random() * recipes.length)];
  showRecipes([random]);
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btnRandom').classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  showRecipes(recipes);
  
  document.getElementById('btnAll').onclick = () => filterCategory('all');
  document.getElementById('btnSweet').onclick = () => filterCategory('sweet');
  document.getElementById('btnSalty').onclick = () => filterCategory('salty');
  document.getElementById('btnDrinks').onclick = () => filterCategory('drinks');
  document.getElementById('btnBaking').onclick = () => filterCategory('baking');
  document.getElementById('searchInput').oninput = search;
  document.getElementById('btnRandom').onclick = randomRecipe;
});
