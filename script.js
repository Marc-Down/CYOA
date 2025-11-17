const textBoxText = document.getElementById("text-box-text");
const option1 = document.getElementById("option-1");
const option2 = document.getElementById("option-2");
const option3 = document.getElementById("option-3");
const option4 = document.getElementById("option-4");
const option1Text = document.getElementById("option-1-text");
const option2Text = document.getElementById("option-2-text");
const option3Text = document.getElementById("option-3-text");
const option4Text = document.getElementById("option-4-text");

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
    textBoxText.innerText = data.paths[0].textBox[0];

    console.log(data.paths[0].options.length);
    for(let i = 0; i < data.paths[0].options.length; i++){
        
    }

    option1Text.innerText = data.paths[0].options[0];
    option2Text.innerText = data.paths[0].options[1];
    option3Text.innerText = data.paths[0].options[2];
    option4Text.innerText = data.paths[0].options[3];
}