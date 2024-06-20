// views
let allWishView = document.querySelector("#all-wish-view");
let editDeleteView = document.querySelector("#edit-delete-view");
let allWishTbody = allWishView.querySelector("tbody");
let EditDeleteWishTbody = editDeleteView.querySelector("tbody");
let addWishView = document.querySelector("#add-wish-view");

// buttons
let addWishBtn = document.querySelector("#add-wish-btn");
let allWishBtn = document.querySelector("#all-wish-btn");
let saveBtn = document.querySelector("#save-btn");
let allNavLinks = document.querySelectorAll("nav .nav-link");
let editDeleteBtn = document.querySelector("#edit-delete-btn");

// event listeners

addWishBtn.addEventListener('click', showAddWishView);
allWishBtn.addEventListener('click', showAllWishView);
editDeleteBtn.addEventListener('click', showEditDeleteView);
saveBtn.addEventListener('click', saveNewWish);
// allNavLinks.forEach(link => link.addEventListener('click', navActive));

//inputs

let idInput = addWishView.querySelector("input[name='id']");
let itemInput = addWishView.querySelector("input[name='item']");
let priceInput = addWishView.querySelector("input[name='price']");
let linkInput = addWishView.querySelector("input[name='link']");
let sourceInput = addWishView.querySelector("input[name='source']");
let importantInput = addWishView.querySelector("input[name='important']");

// functions

createWishTable();



function navActive(aTag) {
    allNavLinks.forEach(link => {
        link.classList.remove("active");
    })
    aTag.classList.add("active");
}

function showAddWishView(e) {
    if(e){
        e.preventDefault();
    }
    navActive(this);
    addWishView.style.display = "block";
    allWishView.style.display = "none";
    editDeleteView.style.display = "none";
}
 
function showAllWishView(e) {
    if(e){
        e.preventDefault();
    }
    navActive(this);
    allWishView.style.display = "block";
    addWishView.style.display = "none";
    editDeleteView.style.display = "none";
}

function showEditDeleteView(e) {
    if(e){
        e.preventDefault();
    }
    navActive(this); 
    editDeleteView.style.display = "block";
    addWishView.style.display = "none";
    allWishView.style.display = "none";
}

function saveNewWish(e) {
    let newWish = {
        id: idInput.value,
        item: itemInput.value,
        price: priceInput.value,
        link: linkInput.value,
        important: importantInput.checked,
        source: sourceInput.value
    }
    wishes.push(newWish);
    createWishTable(); 
    showAllWishView();
}
function createWishTable() {
    let text = "";
    wishes.forEach(wish => {
        (wish.important) ? importantMsg = "important" : importantMsg = "normal"
        text += `   <tr class = "${importantMsg}">
                            <td>${wish.id}</td>
                            <td>${wish.item}</td>
                            <td>${wish.price}</td>
                            <td><a href="${wish.link}" class="btn btn-primary btn-sm">Link</a></td>
                            <td>${importantMsg}</td>
                            <td>${wish.source} </td>
                        </tr>`.trim();
                        
    })
    allWishTbody.innerHTML = text;
}
function createEditDeleteTable() {
    let text = "";
    wishes.forEach(wish => {
        (wish.important) ? importantMsg = "important" : importantMsg = "normal"
        text += `   <tr class = "${importantMsg}">
                            <td>${wish.id}</td>
                            <td>${wish.item}</td>
                            <td>${wish.price}</td>
                            <td><a href="${wish.link}" class="btn btn-primary btn-sm">Link</a></td>
                            <td>${importantMsg}</td>
                            <td>${wish.source} </td>
                            <td>
                                <a href="#" class="btn btn-danger btn-sm">Delete</a>
                                <a href="#" class="btn btn-warning btn-sm">Edit</a>
                            </td>
                        </tr>`.trim();
                        
    })
    EditDeleteWishTbody.innerHTML = text;
}
createEditDeleteTable();