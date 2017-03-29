

function createInterface(cell, containerid, defaults, name){

    let container = $(containerid)[0]

    boundingBox = document.createElement('div');
    boundingBox.className = 'jungle-button-container';
    container.append(boundingBox);

    nameBox = document.createElement('h');
    nameBox.innerHTML = name;
    boundingBox.appendChild(nameBox)

    for(let sinkKey in cell.io.shell.sinks){

        if(sinkKey.match(/^t/)){
            let button = document.createElement('input');
            boundingBox.append(button);
            button.value = sinkKey.replace(/^t/, '');
            button.type = 'button';
            button.className = 'jungle-input-button';
            button.onclick = ()=>{cell.io.shell.sinks[sinkKey].handle(defaults[sinkKey])};
        }else if(sinkKey.match(/^n/)){
            let button = document.createElement('input');
            boundingBox.append(button);
            button.value = sinkKey.replace(/^n/, '');
            button.type = 'button';
            button.className = 'jungle-input-number-go';

            let number = document.createElement('input');
            boundingBox.append(number);
            number.value = 0;
            number.type = 'text';
            number.className = 'jungle-input-number';

            button.onclick = ()=>{cell.io.shell.sinks[sinkKey].handle(number.value)};

        }


    }
}
