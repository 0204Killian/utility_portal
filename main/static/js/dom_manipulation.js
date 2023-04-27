
/**gets parent nodes. default level is 1.
 * level 1 is the parent node of the argument
 * for element.
*/
function getParentNode(element, level=1) {
    while(level-- > 0) {
        element = element.parentNode;
        if (!element) {
            return null;
        }
    }
    return element
}

/**function to create a button
 * 
 * text is set as innerHTML.
 * 
 * onclick array must contain functions to be added as event listeners
 * for the button click event.
 */
function createButton(text=undefined, classes=[], id=undefined, onclick = [], title=undefined) {
    const button = document.createElement("button");

    if (text) {
        button.innerHTML = text;
    }

    classes.forEach(c => {
        button.classList.add(c)
    });

    if(id) {
        button.id = id;
    }

    for (let i=0; i < onclick.length; i++) {
        if (typeof(onclick[i]) == "function") {
            button.addEventListener("click", onclick[i]);
        }
    }
    
    if(title) {
        button.title = title;
    }

    return button
}

/**returns elems index within its parent children. */
function getIndexInParent(elem) {
    const parent = getParentNode(elem); 
    let index = Array.prototype.indexOf.call(parent.children, elem);
    return index;
}

/**returns element at index in argument for nodes children. */
function getChildNodeAtIndex(node, index) {
    return node.children[index];
}
