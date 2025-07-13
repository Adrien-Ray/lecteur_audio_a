export function constructList(listFiles, folderMusic) {
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