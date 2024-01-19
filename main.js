let passwordHistory = [];

function generatePassword() {
  
    const length = document.getElementById("length").value;
    const useUppercase = document.getElementById("uppercase").checked;
    const useLowercase = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSpecial = document.getElementById("special").checked;

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+";

    let charset = "";
    if (useUppercase) charset += uppercaseChars;
    if (useLowercase) charset += lowercaseChars;
    if (useNumbers) charset += numberChars;
    if (useSpecial) charset += specialChars;

    if (charset === "") {
        alert("Por favor, selecciona al menos un tipo de carácter.");
        return;
    }
    

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    document.getElementById("password").value = password;

    // Añade la contraseña generada al historial
    passwordHistory.push(password);

    // Actualiza la visualización del historial
    updatePasswordHistory();
}


function updatePasswordHistory() {
    const historyContainer = document.getElementById("passwordHistory");
    historyContainer.innerHTML = "<h3>Historial de Contraseñas</h3>";
    
    passwordHistory.forEach((password, index) => {
        const passwordItem = document.createElement("div");
        passwordItem.textContent = `${index + 1}. ${password}`;
        historyContainer.appendChild(passwordItem);
    });
}

// Evalúa la fortaleza de la contraseña y actualiza el color de la barra
    const strengthIndicator = document.getElementById("passwordStrength");
    const strength = evaluatePasswordStrength(password);
    strengthIndicator.className = `password-strength ${strength}`;

function evaluatePasswordStrength(password) {
    const minLength = 8;
    const minStrength = 3;

    let strength = 0;

    // Añade lógica para evaluar la fortaleza de la contraseña, por ejemplo:
    if (password.length >= minLength) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*()_+]/.test(password)) strength++;

    return strength >= minStrength
        ? "password-strong"
        : strength > 1
            ? "password-medium"
            : "password-weak";
}


function clearPasswordHistory() {
    passwordHistory = [];
    updatePasswordHistory();
}

function copyToClipboard() {
    const passwordInput = document.getElementById("password");
    passwordInput.select();
    document.execCommand("copy");
}