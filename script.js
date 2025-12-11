const textBoxText = document.getElementById("text-box-text");
const option = document.getElementsByClassName("option");
const title = document.getElementById("title");
const menu = document.getElementById("menu-row");
const kanata = document.getElementById("Kanata");
const ryhes = document.getElementById("Ryhes");
let textIndex = 0;
let pathIndex = 0;

async function getPaths(){
    const response = await fetch('paths.json');
    const paths = await response.json();
    return paths;
}

getPaths().then(paths => {
    console.log(paths);
    main(paths);
})

function main(data) {
    title.innerText = data.paths[pathIndex].title;
    fillTextBox(data);
    makeButtons(data);
    console.log(data.paths[0].options.length);
}

function buttonClick(data){
    for(let i = 0; i < option.length; i++){
        option[i].addEventListener("click", function(){
            if(data.paths[pathIndex].textBox.length-1 === textIndex){
                changePath(data, option[i].getAttribute('id'))
            }else{
                changeText(data);
            }
        })
    }
}

function changeText(data){
    textIndex += 1;
    fillTextBox(data);
}

function changePath(data, button){
    if(button === null){
        console.log(`next: ${data.paths[pathIndex].options[0].next}`);
        pathIndex = data.paths[pathIndex].options[0].next;
    }else{
        console.log(`next: ${data.paths[pathIndex].options[button].next}`);
        pathIndex = data.paths[pathIndex].options[button].next;
    }
    if(pathIndex > data.paths.length-1){
        alert(`That's as much as written`);
        return
    }
    console.log(`path index: ${pathIndex}`);
    console.log(`path title: ${data.paths[pathIndex].title}`)
    textIndex = 0;
    changeTitle(data);
    makeButtons(data);
    fillTextBox(data);
}

function fillTextBox(data){
    let textBox = data.paths[pathIndex].textBox[textIndex];
    textBoxText.innerHTML = textBox.text;
    changeKanata(textBox.kanataImg);
    changeRyhes(textBox.ryhesImg);
    makeButtons(data);
}

function changeTitle(data){
    title.innerText = data.paths[pathIndex].title;
}

function makeOptions(options){
    let markup = "";
    for(o of options){
        if(textIndex === o.timer && o.timer != 0){
            markup += `
            <div class="col px-2 d-flex align-items-center justify-content-center">
                <div id="${o.index}" class="option card p-2 rounded-0 justify-content-center">
                        <p class="m-0 text-center">${o.text}</p>
                    </div>
                </div>
            </div>
            `        
        }else if(o.timer === 0 && o.leave != textIndex){
            markup += `
                <div id="${o.index}" class="col px-2 d-flex align-items-center justify-content-center">
                    <div class="option card p-2 rounded-0 justify-content-center">
                        <p class="m-0 text-center">${o.text}</p>
                    </div>
                </div>
                `
        }
    };
    return markup;
}

function makeButtons(data){
    menu.innerHTML = makeOptions(data.paths[pathIndex].options);
    buttonClick(data);
}

function changeKanata(kanataImg){
    let kanataClasses = ["space"];
    kanata.classList.remove('open');
    kanata.classList.remove('right');

    switch (kanataImg){
        case "center-open":
            kanataClasses = ["open"];
            break;
        case "right-open":
            kanataClasses = ["right", "open"];
            break;
        case "right-close":
            kanataClasses = ["right"];
            break;
    }
    kanata.classList.add(...kanataClasses);
}

function changeRyhes(ryhesImg){
    let ryhesClasses = ["space"];
    ryhes.classList.remove('open');
    ryhes.classList.remove('left');
    ryhes.classList.remove('surprised');

    switch (ryhesImg){
        case "open":
            ryhesClasses = ["open"];
            break;
        case "left-close":
            ryhesClasses = ["left"];
            break;
        case "left-open":
            ryhesClasses = ["left", "open"];
            break;
        case "left-surprised":
            ryhesClasses = ["left", "surprised"];
            break;
    }
    ryhes.classList.add(...ryhesClasses);
}