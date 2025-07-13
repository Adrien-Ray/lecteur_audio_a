import { constructList } from "./scripts/constructList.js";

function menuSpecial() {
    // listen click on nodeList special
    const listSpecialAction = document.querySelectorAll('.buttonSpecial');
    listSpecialAction.forEach(btnAction => {
        btnAction.addEventListener('click', () => {
            // toggle en fonction du btn les class            
            if (btnAction.id === 'randomMode') {
                document.getElementById('randomMode').classList.toggle('randomModeActive');
            }
            if (btnAction.id === 'multiPistMode') {
                document.getElementById('multiPistMode').classList.toggle('multiPistModeActive');
                document.getElementById('listFiles').classList.toggle('multiPistModeEnabled');
            }
            var isRandomMode = document.querySelector('#randomMode.randomModeActive');
            var isMultiPistMode = document.querySelector('#multiPistMode.multiPistModeActive');
            if (isRandomMode || isMultiPistMode) {
            document.getElementById('lecteur').loop = false;
            }
            if (!isRandomMode && !isMultiPistMode) {
            document.getElementById('lecteur').loop = true;
            }
        })
    });
}

function newCall(
    itemDOMcssSelector = 'ul#listFiles > li > span',
    isRandomMode = false
) {
    console.log('newCall', itemDOMcssSelector, isRandomMode);
    let itemDOM = document.querySelectorAll(itemDOMcssSelector);
    console.log(itemDOM);
    if (isRandomMode) {
        let randomIndex = Math.floor(Math.random() * itemDOM.length);
        let randomItem = itemDOM[randomIndex];
        randomItem.click();
    } else {
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
    }








    return;
}

function lecteurEnded() {
    // console.log('in lecteurEnded');
    
    // listen ended
    document.getElementById('lecteur').addEventListener('ended',() => {
        // console.log('in lecteurEnded listener scope');
        
        // check special bool bool
        var isRandomMode = document.querySelector('#randomMode.randomModeActive');
        var isMultiPistMode = document.querySelector('#multiPistMode.multiPistModeActive');
        if (!isRandomMode && !isMultiPistMode) {
            // if false false -> loop true
            document.getElementById('lecteur').loop = true;
        } else {
            // else  loop false
            document.getElementById('lecteur').loop = false;
            let itemDOMcssSelector;
            //       if *** true -> crée liste restreinte
            if (isMultiPistMode) {
                itemDOMcssSelector = 'ul#listFiles > li > span.multiPistModeCheck';
                //           if false true -> nextCall()
                if (!isRandomMode && isMultiPistMode) {
                    newCall(itemDOMcssSelector,false);
                }
                //           if true true -> randomCall()
                if (isRandomMode && isMultiPistMode) {
                    newCall(itemDOMcssSelector,true);
                }
                
            }
            if (isRandomMode && !isMultiPistMode) {
                itemDOMcssSelector = 'ul#listFiles > li > span';
                //       if true false -> randomCall() (sans list restreinte)
                    newCall(itemDOMcssSelector,true);
                
            }
            
        }
    });
}

fetch('./assets/data.json')
  .then(response => response.json())
  .then(data => {
    const listFiles = data.data;
    constructList(listFiles, data.folderMusic);
    menuSpecial();
    lecteurEnded();
  });

