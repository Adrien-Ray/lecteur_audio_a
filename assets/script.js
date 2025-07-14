import { constructList } from "./scripts/constructList.js";
import { menuSpecial } from "./scripts/menuSpecial.js";
import { newCall } from "./scripts/newCall.js";

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
