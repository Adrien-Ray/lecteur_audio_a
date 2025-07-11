function clickItem(path, id) {    
    document.querySelector('audio').src = path;
    document.getElementById('label_lecteur').innerTEXT = path;
    const elementCurrent = document.querySelectorAll('ul li span.current');
    elementCurrent.forEach(element => {
        element.classList.toggle('current');
    })
    document.getElementById(id).classList.toggle('current');
}

function constructList(listFiles) {
    let contentUl = '';
    for (let i = 0; i < listFiles.length; i++) {
        const pathFile = listFiles[i].path;
        let liDom = `<li><span id="element_${i}" onclick="clickItem('file:///${pathFile}', 'element_${i}');">${pathFile.substring(pathFile.lastIndexOf('/') + 1)}</span></li>`;
        contentUl = contentUl+liDom
    }    
    document.getElementById('listFiles').innerHTML = contentUl;
}

fetch('./assets/data.json')
  .then(response => response.json())
  .then(data => {
    const listFiles = data.data;
    console.log(listFiles);
    constructList(listFiles);
  });