export function menuSpecial() {
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