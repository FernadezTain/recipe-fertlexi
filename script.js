const recipes=[
{id:1,name:"🍰 Шоколадный торт",cat:"sweet",time:30,ing:["200г муки","200г сахара","100г какао","2 яйца"],steps:["Смешайте сухие","Добавьте яйца","Выпекайте 30 мин"]},
{id:2,name:"🍯 Медовые пряники",cat:"sweet",time:20,ing:["300г меда","400г муки","1 яйцо"],steps:["Смешайте мед","Замесите тесто","Выпекайте 15 мин"]},
{id:3,name:"🍎 Яблочный пирог",cat:"sweet",time:45,ing:["3 яблока","200г муки","150г сахара"],steps:["Нарежьте яблоки","Смешайте тесто","Выпекайте 40 мин"]},
{id:4,name:"🥗 Овощной салат",cat:"salty",time:15,ing:["2 огурца","2 помидора","1 перец"],steps:["Нарежьте овощи","Заправьте","Посолите"]},
{id:5,name:"🍝 Спагетти",cat:"salty",time:20,ing:["250г спагетти","томатный соус","чеснок"],steps:["Отварите","Обжарьте чеснок","Подавайте"]},
{id:6,name:"🥤 Апельсиновый сок",cat:"drinks",time:5,ing:["4 апельсина","сахар"],steps:["Разрежьте","Выжмите","Добавьте сахар"]},
{id:7,name:"🍹 Ягодный смузи",cat:"drinks",time:10,ing:["ягоды","банан","йогурт"],steps:["Положите","Взбейте","Подавайте"]},
{id:8,name:"🍵 Мятный чай",cat:"drinks",time:10,ing:["мята","мед","вода"],steps:["Заварите","Настоите","Добавьте мед"]},
{id:9,name:"🥐 Круассаны",cat:"baking",time:120,ing:["500г муки","250г масла"],steps:["Замесите","Раскатайте","Выпекайте"]},
{id:10,name:"🍞 Домашний хлеб",cat:"baking",time:90,ing:["500г муки","дрожжи","вода"],steps:["Замесите","Дайте подняться","Выпекайте"]}
];
function showRecipes(r){
document.getElementById('recipeList').innerHTML=r.map(rec=>`
<div class="recipe-card ${rec.cat}">
<div class="recipe-top"><div class="recipe-title">${rec.name}</div><div class="recipe-meta">⏱ ${rec.time} мин</div></div>
<div class="recipe-content">
<div class="ingredients-box"><div class="section-title">📋 ИНГРЕДИЕНТЫ:</div><ul class="ingredients-list">${rec.ing.map(i=>`<li>${i}</li>`).join('')}</ul></div>
<div class="instructions-box"><div class="section-title">👨‍🍳 ПРИГОТОВЛЕНИЕ:</div><ol class="instructions-list">${rec.steps.map(s=>`<li>${s}</li>`).join('')}</ol></div>
<div class="recipe-bottom"><div class="recipe-time">⏱ ${rec.time} минут</div><div class="type-badge type-${rec.cat}">${rec.cat==='sweet'?'СЛАДКОЕ':rec.cat==='salty'?'СОЛЁНОЕ':rec.cat==='drinks'?'НАПИТКИ':'ВЫПЕЧКА'}</div></div>
</div></div>`).join('');
document.getElementById('shownCount').textContent=r.length;
document.getElementById('totalCount').textContent=recipes.length;
}
function filterCategory(cat){
document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
event.target.classList.add('active');
if(cat==='all')showRecipes(recipes);
else showRecipes(recipes.filter(r=>r.cat===cat));
}
function search(){
const term=document.getElementById('searchInput').value.toLowerCase();
if(!term){filterCategory('all');return;}
showRecipes(recipes.filter(r=>
r.name.toLowerCase().includes(term)||
r.ing.some(i=>i.toLowerCase().includes(term))||
r.steps.some(s=>s.toLowerCase().includes(term))
));
}
function randomRecipe(){
showRecipes([recipes[Math.floor(Math.random()*recipes.length)]]);
}
document.addEventListener('DOMContentLoaded',()=>{
showRecipes(recipes);
document.getElementById('btnAll').onclick=()=>filterCategory('all');
document.getElementById('btnSweet').onclick=()=>filterCategory('sweet');
document.getElementById('btnSalty').onclick=()=>filterCategory('salty');
document.getElementById('btnDrinks').onclick=()=>filterCategory('drinks');
document.getElementById('btnBaking').onclick=()=>filterCategory('baking');
document.getElementById('searchInput').oninput=search;
document.getElementById('btnRandom').onclick=randomRecipe;
});