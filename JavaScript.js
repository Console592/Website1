let users = JSON.parse(localStorage.getItem('users')) || [];

function generatePassword() {
    const name = document.getElementById('userName').value.trim();
    if (!name) {
        alert('Пожалуйста, введите ваше имя');
        return;
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    
    for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    const userData = {
        name: name,
        password: password,
        timestamp: new Date().toLocaleString()
    };
    
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    
    document.getElementById('passwordResult').innerHTML = `
        <strong>Ваш пароль:</strong> ${password}
    `;
}

function showAdminPanel() {
    const adminPassword = prompt('Введите пароль администратора:');
    if (adminPassword === 'admin123') {
        const adminPanel = document.getElementById('adminPanel');
        adminPanel.classList.toggle('hidden');
        
        const userList = users.map(user => `
            <div class="user-entry">
                <p>Имя: ${user.name}</p>
                <p>Пароль: ${user.password}</p>
                <p>Время: ${user.timestamp}</p>
                <hr>
            </div>
        `).join('');
        
        document.getElementById('userList').innerHTML = userList;
    } else {
        alert('Неверный пароль!');
    }
}