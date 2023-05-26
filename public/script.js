let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {
    gender: '',
    height: 0,
    weight: 0,
    calorieGoal: 0
};
let swimData = JSON.parse(localStorage.getItem('swimData')) || [];

function showModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

function closeModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

function saveUserInfo() {
    let gender = document.getElementById('gender').value;
    let height = parseInt(document.getElementById('height').value);
    let weight = parseInt(document.getElementById('weight').value);

    userInfo.gender = gender;
    userInfo.height = height;
    userInfo.weight = weight;

    let calorieGoal = parseInt(document.getElementById('calorie-goal').value);
    userInfo.calorieGoal = calorieGoal;

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    closeModal('user-info-modal');
}

function addSwim() {
    let duration = parseInt(document.getElementById('duration').value);
    let distance = parseInt(document.getElementById('distance').value);

    let swimEntry = {
        duration: duration,
        distance: distance
    };

    swimData.push(swimEntry);
    localStorage.setItem('swimData', JSON.stringify(swimData));
    displaySwimEntry(swimEntry, swimData.length - 1);
    closeModal('add-swim-modal');
    displayTotalDistance();  // 添加游泳记录后显示总里程
}

function deleteSwim(index) {
    swimData.splice(index, 1);
    localStorage.setItem('swimData', JSON.stringify(swimData));
    document.getElementById('card-container').innerHTML = '';
    for(let i = 0; i < swimData.length; i++) {
        displaySwimEntry(swimData[i], i);
    }
    displayTotalDistance();  // 删除游泳记录后显示总里程
}

function displaySwimEntry(entry, index) {
    let cardContainer = document.getElementById('card-container');
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <nobr><h1>${entry.duration}</h1></nobr> 
        <h4> Min</h4>
        <h4>Swim Duration</h4>
        <h4>${entry.distance} Me</h4>
        <h4>Swim Distance</h4>
        <button onclick="deleteSwim(${index})">Delete</button>
    `;
    cardContainer.appendChild(card);
}

function displayTotalDistance() {
    let totalDistance = 0;
    for(let i = 0; i < swimData.length; i++) {
        totalDistance += swimData[i].distance;
    }
    let card = document.getElementById('total-distance-card');
    card.innerHTML = `
        <h1>${totalDistance} Meters</h1>
        <h4>Total Distance</h4>
    `;
}

// Display stored swim data and total distance on page load
window.onload = function() {
    for(let i = 0; i < swimData.length; i++) {
        displaySwimEntry(swimData[i], i);
    }
    displayTotalDistance();  // 页面加载时显示总里程
}
