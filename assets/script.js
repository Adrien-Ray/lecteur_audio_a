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
        let liDom = `<li><span id="element_${i}" onclick="clickItem('${dir}/${file}', 'element_${i}');">${file}</span></li>`;
        contentUl = contentUl+liDom
    }    
    document.getElementById('listFiles').innerHTML = contentUl;
}

fetch('./assets/data.json')
  .then(response => response.json())
  .then(data => {
    const listFiles = data.data;
    console.log(data);
    constructList(listFiles, data.folderMusic);
  });