/** function to regsiter functionality for dropdown */
function dropdown() {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dd => {
        const select = dd.querySelector(".select");
        const caret = dd.querySelector(".caret");
        const menu = dd.querySelector(".menu");
        const options = dd.querySelectorAll(".menu li");
        const selected = dd.querySelector(".selected");

        select.addEventListener("click", () => {
            select.classList.toggle("select-clicked");
            caret.classList.toggle("caret-rotate");
            menu.classList.toggle("menu-open");

            const selectElems = document.querySelectorAll(".select");
            selectElems.forEach(sel => {
                if (sel.classList.contains("select-clicked") && sel != select) {
                    sel.click();
                }
            })
        })

        options.forEach(opt => {
            opt.addEventListener("click", () => {
                selected.innerText = opt.innerText
                select.classList.remove("select-clicked");
                caret.classList.remove("caret-rotate");
                menu.classList.remove("menu-open");

                options.forEach(opt => {
                    opt.classList.remove("active");
                })
                opt.classList.add("active");
            })
        })
    })
}



var dropdowns = []

function getDropdowns() {
    const regDrops = Array.from(document.querySelectorAll(".dropdown"));
    const checkDrops = Array.from(document.querySelectorAll(".dropdown-checkbox"));
    dropdowns = dropdowns.concat(regDrops, checkDrops);
}

function closer() {
    document.addEventListener("click", () => {
        let isDropdown = false;
        for (let i=0; i < dropdowns.length; i++) {
            if (dropdowns[i].contains(this.event.target)) {
                isDropdown = true;
                break;
            }
        }
        if(!isDropdown) {
            dd = getOpenDropdownSelect() 
            if (dd) {
                dd.click()
            }
        }
    })
}

function getOpenDropdownSelect() {
    try {
        const open = document.querySelector(".menu-open").parentElement.firstElementChild
        return open
    }
    catch {
        return null
    }
}

/***********************************/
/* dropdown checkbox functionality */
/***********************************/

/**function to register functionality for dropdown with checkboxes */
function dropdownCheckbox() {
    const dropdowns = document.querySelectorAll(".dropdown-checkbox");
    dropdowns.forEach(dd => {
        const select = dd.querySelector(".select");
        const caret = dd.querySelector(".caret");
        const menu = dd.querySelector(".menu");

        select.addEventListener("click", () => {
            select.classList.toggle("select-clicked");
            caret.classList.toggle("caret-rotate");
            menu.classList.toggle("menu-open");
            menu.classList.toggle("dropdown-checkbox-closed");

            const selectElems = document.querySelectorAll(".select");
            selectElems.forEach(sel => {
                if (sel.classList.contains("select-clicked") && sel != select) {
                    sel.click();
                }
            })
        })
        const listItems =  Array.from(menu.querySelectorAll("li"));
        listItems.forEach(li => {
            li.addEventListener("click", () => {
                if (listItems.includes(this.event.target)) {
                    let input = li.querySelector("input");
                    input.click()
                }
            })
        })
    })
}

/****************************/
/* select all functionality */
/****************************/
var selectAll;
// function that clicks all checkboxes 
function selectAllPersonnel() {
    selectAll = document.querySelector("#select_all_personnel");
    if (selectAll) {
        selectAll.addEventListener("click", function() {
            const items = document.querySelectorAll(".li-checkbox");
            // determine whether all checkboxes have been checked
            const selected = isAllSelected();
            items.forEach(i => {
                // for all items except select all checkbox
                if (i != selectAll) {
                    // if all selected just click checkbox
                    if (selected) {
                        i.click();
                    }
                    else {
                        // if checkbox not checked click
                        if (!i.checked) {
                            i.click()
                        }
                    }
                }
            })
        })
    }
}

/** function that determines wether all checkboxes have been selected */
function isAllSelected() {
    let allSelected = true
    const items = document.querySelectorAll(".li-checkbox");
    for (let i=0; i < items.length; i++) {
        if (items[i] != selectAll) {
            if (!items[i].checked) {
                allSelected = false;
                break
            }   
        }
    }
    return allSelected;
}


function start() {
    dropdown();
    getDropdowns();
    closer();
    // dropdownCheckbox();
    // selectAllPersonnel();
}

window.onload = function(){
    start()
}
