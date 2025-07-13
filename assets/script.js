function clickItem(path, id) {    
    document.querySelector('audio').src = path;
    document.getElementById('label_lecteur').innerTEXT = path;
    const elementCurrent = document.querySelectorAll('ul li span.current');
    elementCurrent.forEach(element => {
        element.classList.toggle('current');
    })
    document.getElementById(id).classList.toggle('current');
    return;
}

function constructList(listFiles, folderMusic) {
    let contentUl = '';
    for (let i = 0; i < listFiles.length; i++) {
        const file = listFiles[i].name;
        const dir = listFiles[i].path;
        const duration = listFiles[i].duration;
        
        let liDom = `<li><input class="multiPistModeCheckbox" type="checkbox" onclick="document.getElementById('element_${i}').classList.toggle('multiPistModeCheck');"><span id="element_${i}" data-object='{"file":"${file}","dir":"${dir}","duration":"${duration}"}' onclick="clickItem('${dir}/${file}', 'element_${i}');">${dir}/<b>${file}</b></span></li>`;
        contentUl = contentUl+liDom
    }    
    document.getElementById('listFiles').innerHTML = contentUl;
    return;
}

function randomMode() {
    if (! document.getElementById('randomMode').classList.contains('randomModeActive')) {
        document.getElementById('lecteur').loop = false;
        function randomCall() {
            console.log('exec func randomCall');
            document.getElementById('lecteur').loop = false;
            let itemDOM;
            if (document.querySelector('button#multiPistMode.multiPistModeActive')) {
                itemDOM = document.querySelectorAll('ul#listFiles > li > span.multiPistModeCheck');
            } else {
                itemDOM = document.querySelectorAll('ul#listFiles > li > span');
            }
            // console.log(itemDOM);
            let randomIndex = Math.floor(Math.random() * itemDOM.length);
            let randomItem = itemDOM[randomIndex];
            // console.log(randomItem);
            randomItem.click();
            function listenEnded() {
                    randomCall();
                    return;
            }
            document.getElementById('lecteur').addEventListener('ended',listenEnded, { once: true });
        };
        randomCall();
        document.getElementById('randomMode').addEventListener('click', () => {
            randomCall = null;
        });
    } else {
        document.getElementById('lecteur').loop = true;
    }
    document.getElementById('randomMode').classList.toggle('randomModeActive');
    // document.getElementById('lecteur').loop = !document.getElementById('lecteur').loop;
    document.getElementById('randomMode').addEventListener('click', () => {
        return;
    })
}

function multiPistMode() {

    function nextCall() {
            console.log('exec func nextCall');
            
            document.getElementById('lecteur').loop = false;
            let itemDOM;
            if (document.querySelector('button#multiPistMode.multiPistModeActive')) {
                itemDOM = document.querySelectorAll('ul#listFiles > li > span.multiPistModeCheck');
            } else {
                console.error('La fonction nextCall ne devrai pas être appelé si multiPistMode is disabled');
                return;
            }
            let arrayLength = itemDOM.length;
            let itemDOMArray = Array.from(itemDOM);
            let actualIndex = itemDOMArray.findIndex(item => item.classList.contains('current'));
            let nextIndex = actualIndex+1;
            if(nextIndex >= arrayLength) {
                nextIndex = 0;
            };
            let nextItem = itemDOM[nextIndex];
            setTimeout(() => {
                nextItem.click();
            }, 100);
            function listenEnded() {
                    nextCall();
                    // document.getElementById('lecteur').removeEventListener('ended', listenEnded);
                    return;
            }
            document.getElementById('lecteur').addEventListener('ended',listenEnded, { once: true });
        };




    document.getElementById('multiPistMode').classList.toggle('multiPistModeActive');
    document.getElementById('listFiles').classList.toggle('multiPistModeEnabled');
    if (document.getElementById('multiPistMode').classList.contains('multiPistModeActive')) { // not already active
        document.getElementById('lecteur').loop = false;
        // console.log('now enabled');
        // check si randomMode + écoute si toggle class random active pour call ou pas une fonction de lecture à la suite des items multiPistModeCheck
        if (!document.getElementById('randomMode').classList.contains('randomModeActive')) {
            // si pas random, call nextCall
            nextCall();
        } else {
            // sinon écoute le désabonnement à randomMode
            document.getElementById('randomMode').addEventListener('click',() => {
                nextCall();
            })
        }
        // si click sur modeMulti, exit return
        document.getElementById('multiPistMode').addEventListener('click', () => {
            return;
        })
    } else { // already multi
        document.getElementById('lecteur').loop = true;
        // console.log('now disabled');
        return;
    }
}

fetch('./assets/data.json')
  .then(response => response.json())
  .then(data => {
    const listFiles = data.data;
    // console.log(data);
    constructList(listFiles, data.folderMusic);
  });

