function clickItem(path, id) {    
    document.querySelector('audio').src = path;
    document.getElementById('label_lecteur').innerTEXT = path;
    const elementCurrent = document.querySelectorAll('ul li span.current');
    elementCurrent.forEach(element => {
        element.classList.toggle('current');
    })
    document.getElementById(id).classList.toggle('current');
}

function constructList(listFiles, folderMusic) {
    let contentUl = '';
    for (let i = 0; i < listFiles.length; i++) {
        const file = listFiles[i].name;
        const dir = listFiles[i].path;
        const duration = listFiles[i].duration;
        let liDom = `<li><span id="element_${i}" data-object='{"file":"${file}","dir":"${dir}","duration":"${duration}"}' onclick="clickItem('${dir}/${file}', 'element_${i}');">${dir}/<b>${file}</b></span></li>`;
        contentUl = contentUl+liDom
    }    
    document.getElementById('listFiles').innerHTML = contentUl;
}

function randomMode() {
    if (! document.getElementById('randomMode').classList.contains('randomModeActive')) {
        function randomCall() {
            const itemDOM = document.querySelectorAll('ul#listFiles > li > span');
            // console.log(itemDOM);
            let randomIndex = Math.floor(Math.random() * itemDOM.length);
            let randomItem = itemDOM[randomIndex];
            // console.log(randomItem);
            randomItem.click();
            document.getElementById('lecteur').addEventListener('ended', () => {
                randomCall();
                return;
            });
        };
        randomCall();
        document.getElementById('randomMode').addEventListener('click', () => {
            // clearInterval(randomCall);
            randomCall = null;
        });
    }
    document.getElementById('randomMode').classList.toggle('randomModeActive');
    document.getElementById('lecteur').loop = !document.getElementById('lecteur').loop;
}

fetch('./assets/data.json')
  .then(response => response.json())
  .then(data => {
    const listFiles = data.data;
    // console.log(data);
    constructList(listFiles, data.folderMusic);
  });

