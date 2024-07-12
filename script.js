document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const quizForm = document.getElementById('quizForm');
    const registrationMessage = document.getElementById('registrationMessage');
    const loginMessage = document.getElementById('loginMessage');
    const quizMessage = document.getElementById('quizMessage');
    const resultMessage = document.getElementById('resultMessage');
    const scoreDisplay = document.getElementById('score');

    const users = JSON.parse(localStorage.getItem('users')) || {};

    function show(elementId) {
        document.getElementById('registration').classList.add('hidden');
        document.getElementById('login').classList.add('hidden');
        document.getElementById('quiz').classList.add('hidden');
        document.getElementById('result').classList.add('hidden');
        document.getElementById(elementId).classList.remove('hidden');
    }

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;

        if (users[username]) {
            registrationMessage.textContent = 'Username already taken.';
        } else {
            users[username] = { password, quizTaken: false, score: null };
            localStorage.setItem('users', JSON.stringify(users));
            registrationMessage.textContent = 'Registration successful!';
            show('login');
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        if (users[username] && users[username].password === password) {
            localStorage.setItem('currentUser', username);
            if (users[username].quizTaken) {
                scoreDisplay.textContent = users[username].score;
                show('result');
            } else {
                show('quiz');
            }
        } else {
            loginMessage.textContent = 'Invalid username or password.';
        }
    });

    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = localStorage.getItem('currentUser');
        let score = 0;
        const totalQuestions = 10;
        const correctAnswers = {
            q1: "Object-Based",
            q2: "Immediate if",
            q3: "Block that combines a number of statements into a single compound statement",
            q4: "Ignores the statements",
            q5: "Declaration statements",
            q6: "The local element",
            q7: "Function/Method",
            q8: "var obj = new Object();",
            q9: "Division by zero",
            q10: "valueOf()"
        };

        for (let i = 1; i <= totalQuestions; i++) {
            const answer = document.querySelector(`input[name="q${i}"]:checked`);
            if (answer && answer.value === correctAnswers[`q${i}`]) {
                score += 1;
            }
        }

        const percentage = (score / totalQuestions) * 100;
        users[username].quizTaken = true;
        users[username].score = percentage;
        localStorage.setItem('users', JSON.stringify(users));
        scoreDisplay.textContent = percentage.toFixed(2);
        show('result');
    });

    const currentUser = localStorage.getItem('currentUser');
    // if (currentUser) {
    //     if (users[currentUser].quizTaken) {
    //         scoreDisplay.textContent = users[currentUser].score;
    //         show('result');
    //     } else {
    //         show('quiz');
    //     }
    // } else {
    //     show('registration');
    // }
});
