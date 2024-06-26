window.addEventListener('beforeunload', save);
function save(){
    localStorage.db = JSON.stringify(wishes);
}

// helpers
let index = null;
// views
let allWishView = document.querySelector('#all-wish-view');
let allWishTbody = allWishView.querySelector('tbody');
let addWishView = document.querySelector('#add-wish-view');
let editDeleteView = document.querySelector('#edit-delete-view');
let editDeleteTbody = editDeleteView.querySelector('tbody');
let editWishView = document.querySelector('#edit-wish-view');

// buttons
let allWishBtn = document.querySelector('#all-wish-btn');
let addWishBtn = document.querySelector('#add-wish-btn');
let saveBtn = document.querySelector('#save-btn')
let editDeleteBtn = document.querySelector('#edit-delete-btn');
let allNavLinks = document.querySelectorAll('.nav-item a');
let updateBtn = document.querySelector('#update-btn');

// inputs
let idInput = document.querySelector('input[name="id"]');
let itemInput = document.querySelector('input[name="item"]');
let priceInput = document.querySelector('input[name="price"]');
let linkInput = document.querySelector('input[name="link"]');
let sourceInput = document.querySelector('input[name="source"]');
let importantInput = document.querySelector('input[name="important"]');
let searchInput = document.querySelector('#search-input');

let eidInput = document.querySelector('input[name="eid"]');
let eitemInput = document.querySelector('input[name="eitem"]');
let epriceInput = document.querySelector('input[name="eprice"]');
let elinkInput = document.querySelector('input[name="elink"]');
let esourceInput = document.querySelector('input[name="esource"]');
let eimportantInput = document.querySelector('input[name="eimportant"]');

// listeners
allWishBtn.addEventListener('click',showAllWishView)
addWishBtn.addEventListener('click',showAddWishView);
saveBtn.addEventListener('click',saveNewWish);
editDeleteBtn.addEventListener('click',showEditDeleteView);
allNavLinks.forEach(link => link.addEventListener('click',controlActive));
updateBtn.addEventListener('click',updateWish);
searchInput.addEventListener('input', searchDB);

createWishTable()

function searchDB(){
    let searchTerm = this.value.toLowerCase();
    let filtered = wishes.filter(function (el){
        return el.item.toLowerCase().includes(searchTerm) ||
                el.price.includes(searchTerm) ||
                el.source.toLowerCase().includes(searchTerm);
    })
    createWishTable(filtered);
}
function updateWish(e){
    console.log(index);
    let updated = {
        id : eidInput.value,
        item : eitemInput.value,
        price : epriceInput.value,
        link : elinkInput.value,
        important: eimportantInput.checked,
        source : esourceInput.value
    }

        wishes[index] = updated;
        createWishTable()
        showAllWishView();
}

function saveNewWish(e){
    let newWish = {
        id : idInput.value,
        item : itemInput.value,
        price : priceInput.value,
        link: linkInput.value,
        source : sourceInput.value,
        important: importantInput.checked
    }

    wishes.push(newWish);
    createWishTable();
    showAllWishView();
}

function showAddWishView(e){
//    controlActive(this) 
    if(e) e.preventDefault();
    addWishView.style.display = 'block';
    allWishView.style.display = 'none';
    editDeleteView.style.display = 'none';
    editWishView.style.display = 'none';
}

function showEditDeleteView(e){
    createEditDeleteTable()
    // controlActive(this);
    editDeleteView.style.display = 'block';
    allWishView.style.display = 'none';
    addWishView.style.display = 'none';
    editWishView.style.display = 'none';
}


function showAllWishView(e){
//   controlActive(this) 
    if(e) e.preventDefault();
    allWishView.style.display = 'block';
    addWishView.style.display = 'none';
    editDeleteView.style.display = 'none';
    editWishView.style.display = 'none';
}

function showUpdateForm(e){
    index = this.getAttribute('data-index');
    let currentWish = wishes[index];

    editWishView.style.display = 'block';
    addWishView.style.display = 'none';
    editDeleteView.style.display = 'none';
    allWishView.style.display = 'none';

    eidInput.value = currentWish.id;
    eitemInput.value = currentWish.item;
    epriceInput.value = currentWish.price;
    elinkInput.value = currentWish.link;
    esourceInput.value = currentWish.source;
    
    (currentWish.important) ? eimportantInput.setAttribute('checked',true) : false;
}


function createWishTable(filtered){
    let text = '';
    let importantMsg = '';
    let data = filtered || wishes
    data.forEach(wish => {
        (wish.important) ? importantMsg = 'Important' : importantMsg = 'Normal';
        text += `
         <tr class="${importantMsg.toLowerCase()}">
                        <td>${wish.id}</td>
                        <td>${wish.item}</td>
                        <td>${wish.price}</td>
                        <td><a href="${wish.link}" class="btn btn-sm btn-info">Link</a></td>
                        <td>${importantMsg}</td>
                        <td>${wish.source}</td>
                    </tr>
        `.trim()
    })
    allWishTbody.innerHTML = text;
}

function createEditDeleteTable(filtered){
    let text = '';
    let importantMsg = '';
    let data = filtered || wishes
    data.forEach((wish,index) => {
        (wish.important) ? importantMsg = 'Important' : importantMsg = 'Normal';
        text += `
         <tr class="${importantMsg.toLowerCase()}">
                        <td>${wish.id}</td>
                        <td>${wish.item}</td>
                        <td>${wish.price}</td>
                        <td><a href="${wish.link}" class="btn btn-sm btn-info">Link</a></td>
                        <td>${importantMsg}</td>
                        <td>${wish.source}</td>
                        <td><button data-index="${index}" class="delete-btns btn btn-sm btn-danger me-2">Delete</button><button data-index="${index}" class="edit-btns btn btn-sm btn-warning">Edit</button></td>
                    </tr>
        `.trim()
    })
    editDeleteTbody.innerHTML = text;
    let allDeleteBtns = document.querySelectorAll('.delete-btns');
    let allEditBtns = document.querySelectorAll('.edit-btns');

    allDeleteBtns.forEach((btn,index) => {
        btn.addEventListener('click',deleteWish);
        allEditBtns[index].addEventListener('click',showUpdateForm);
    }) 
}

function deleteWish(){
    let index = this.getAttribute('data-index');
    wishes.splice(index,1);
    createWishTable();
    showAllWishView();
}

function controlActive(e){
 allNavLinks.forEach(link => {
        link.classList.remove('active');
    })

    this.classList.add('active');
}