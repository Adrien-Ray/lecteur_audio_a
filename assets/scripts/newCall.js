export function newCall(
    itemDOMcssSelector = 'ul#listFiles > li > span',
    isRandomMode = false
) {
    let itemDOM = document.querySelectorAll(itemDOMcssSelector);
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