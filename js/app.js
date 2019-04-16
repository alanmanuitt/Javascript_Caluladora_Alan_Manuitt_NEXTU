(function (){

    const maxDisplayCharacters = 8;
    const maxAmountOfDecimals  = 4;

    const historicRegister = [];

    const specialCharacters = ['+', '-', '*', '/', '.'];

    const display   = document.getElementById("display");
    const historic  = document.getElementById("historic");

    // Operation
    const ac            = document.getElementById("ac");
    const plusMinus     = document.getElementById("plus-minus");
    const squareRoot    = document.getElementById("square-root");
    const divide        = document.getElementById("divide");
    const multiplier    = document.getElementById("multiplier");
    const minus         = document.getElementById("minus");
    const plus          = document.getElementById("plus");
    const dot           = document.getElementById("dot");
    const equal         = document.getElementById("equal");

    const numbers = document.querySelectorAll(".key-number");

    // Helper Functions

    // Add Symbol Operation
    function addOperation (display, operator) {
        const lastCharacterPosition = display.length - 1;
        const lastCharacter         = display[lastCharacterPosition];
        
        if (specialCharacters.includes(lastCharacter)) {
            const characters = display.split('');
            characters.splice(lastCharacterPosition, 1, operator);
            display = characters.join('');
        } else {
            display += operator;
        }

        return display;
    }

    // Add Historic Register
    function addHistoricRegister(register) {
        historicRegister.push(register);
        
        const registerNode = document.createElement('div');
        registerNode.classList = "register";

        const operationNode = document.createElement("p");
        operationNode.appendChild(document.createTextNode(register.operation));
        const equalNode = document.createElement("p");
        equalNode.appendChild(document.createTextNode('='));
        const resultNode = document.createElement("p");
        resultNode.appendChild(document.createTextNode(register.result));

        registerNode.appendChild(operationNode);
        registerNode.appendChild(equalNode);
        registerNode.appendChild(resultNode);

        historic.appendChild(registerNode);
    }

    // Add Listener to Numbers
    numbers.forEach((number) => {
        number.addEventListener('click', (e) => {
            e.preventDefault();

            const value = Number(number.dataset.value);

            if (display.value.length < maxDisplayCharacters) {
                display.value = display.value + value;
            }
        })
    });

    // AC Operation
    ac.addEventListener('click', (e) => {
        e.preventDefault();

        display.value = null;
    });

    // Plus Minus Operation
    plusMinus.addEventListener('click', (e) => {
        e.preventDefault();

        display.value = Number(display.value) * -1;
    });

    // Square Root Operation
    squareRoot.addEventListener('click', (e) => {
        e.preventDefault();

        display.value = `Math.sqrt(${display.value})`;
    });

    // Divide Operation
    divide.addEventListener('click', (e) => {
        e.preventDefault();

        display.value = addOperation(display.value, '/');
    });

    // Multiplier Operation
    multiplier.addEventListener('click', (e) => {
        e.preventDefault();

        display.value = addOperation(display.value, '*');
    });

    // Minus Operation
    minus.addEventListener('click', (e) => {
        e.preventDefault();

        display.value = addOperation(display.value, '-');
    });

    // Plus Operation
    plus.addEventListener('click', (e) => {
        e.preventDefault();

        display.value = addOperation(display.value, '+');
    });

    // Dot Operation
    dot.addEventListener('click', (e) => {
        e.preventDefault();

        specialCharactersExpression = specialCharacters.filter(s => s !== '.').map(c => `\\${c}`).join('|');
        const groupOfValues = display.value.split(new RegExp(specialCharactersExpression, 'i')).filter(s => Boolean(s));
        const lastValue = groupOfValues[groupOfValues.length - 1];

        if (!lastValue.includes('.') && Boolean(lastValue)) {
            display.value = addOperation(display.value, '.');
        }
    });

    // Equal Operation
    equal.addEventListener('click', (e) => {
        e.preventDefault();

        const cleanValue = display.value;

        const operation = cleanValue;
        const result    = Number(eval(cleanValue));

        const register = {
            operation,
            result
        };

        addHistoricRegister(register);

        display.value = result;
    });

})();