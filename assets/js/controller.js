//Dom id input
function domId(id){
    return document.getElementById(id);
}
//Lay du lieu tu Api
function getListProduct(){
 
    axios({
        url: "https://62bc4dceeff39ad5ee223a51.mockapi.io/api/products",
        method: "GET"

    })
    .then(function(res){
        renderProduct(res.data);
        domId("loader").style.display = "none";
    })
    .catch(function(err){
        console.log(err);
    })
}
//Hien thi danh sach san pham ra giao dien 
function renderProduct(data){
    result = "";
    for(var i = 0; i < data.length ; i++){
        result +=  `
                <tr>
                    <td scope="row">${i+1}</td>
                    <td>
                    <div class="td-break1">
                    ${data[i].name}
                    </div>
                    </td>
                    <td>${changePrice(data[i].price)}</td>
                    <td>
                    <div class="td-break1">
                    ${data[i].screen}
                    </div>
                    </td>
                    <td>
                        <div class="td-break1">
                        ${data[i].blackCamera}
                        </div>
                    </td>
                    <td>
                        <div class="td-break1">
                         ${data[i].frontCamera}
                        </div>
                    </td>
                    <td>
                        <div class="td-break1">
                        <img src="${data[i].img}" width="100px" alt="${data[i].img}"/>
                        </div>
                    </td>
                    <td>
                    <div class="td-break1">
                    ${data[i].desc}
                    </div>
                    </td>
                    <td>
                    <div class="td-break1">
                    ${data[i].type}
                    </div>
                    </td>
                    <td>
                    <div class="d-flex">
                    <button type="button" class="btn btn-info me-2" onclick="getProduct(${data[i].id})">Cập nhật</button>
                    <button type="button" class="btn btn-danger" onclick="deleteProduct(${data[i].id})">Xóa</button>
                    </div>
                    </td>
                 </tr>
      `
    }
    domId("tbListProduct").innerHTML = result;
}
getListProduct();
//Them san pham
function addProduct(){
    var name = domId("txtName").value.trim();
    var price = domId("txtPrice").value.trim();
    var screen = domId("txtScreen").value.trim();
    var blackCamera = domId("txtBlackCamera").value.trim();
    var frontCamera = domId("txtFrontCamera").value.trim();
    var img = domId("txtImg").value.trim();
    var desc = domId("txtDes").value.trim();
    var type = domId("txtType").value.trim();
    var valid = new Validate();
    var isValid = true;
    isValid &= valid.checkRequile("txtName") && valid.checkMaxLength("txtName","spanName");
    isValid &= valid.checkRequile("txtPrice") && valid.checkNumber("txtPrice","spanPrice")&& valid.checkMaxNumber("txtPrice","spanPrice");
    isValid &= valid.checkRequile("txtScreen") && valid.checkMaxLength("txtScreen","spanScreen");
    isValid &= valid.checkRequile("txtBlackCamera") && valid.checkMaxLength("txtBlackCamera","spanBCamera");
    isValid &= valid.checkRequile("txtFrontCamera") && valid.checkMaxLength("txtFrontCamera","spanFCamera");
    isValid &= valid.checkRequile("txtImg");
    isValid &= valid.checkRequile("txtDes") && valid.checkMaxLength("txtDes","spanDes");
    isValid &= valid.checkRequile("txtType") && valid.checkMaxLength("txtType","spanType");
    if(isValid === 0) return;
    domId("loader").style.display = "block";
    var product = new Products(
        name,
        price,
        screen,
        blackCamera,
        frontCamera,
        img,
        desc,
        type
    );
    axios({
        url:"https://62bc4dceeff39ad5ee223a51.mockapi.io/api/products",
        method: "POST",
        data: product
    })
    .then(function(res){
        console.log(res);
        domId("btn-complete").click(); 
        domId("loader").style.display = "none";
        domId("modal-body-completed").innerHTML = `<span>Thêm thành công</span>`; 
        domId("btn-close").click();
        domId("btn-reset").click();
        getListProduct();
    })
    .catch(function(err){
        domId("btn-complete").click(); 
        domId("loader").style.display = "none";
        domId("modal-body-completed").innerHTML = `<span>Thêm thất bại</span>`;
    })
}
//lay du lieu dua len form de update
function getProduct(id){
    domId("btn-modal").click();
    domId("loader").style.display = "block";
    axios({
        url:"https://62bc4dceeff39ad5ee223a51.mockapi.io/api/products/" + id,
        method: "GET",
    })
    .then(function(res){
        domId("loader").style.display = "none";
        domId("txtName").value = res.data.name;
        domId("txtPrice").value = res.data.price;
        domId("txtScreen").value = res.data.screen;
        domId("txtBlackCamera").value = res.data.blackCamera;
        domId("txtFrontCamera").value = res.data.frontCamera;
        domId("txtImg").value = res.data.img;
        domId("txtDes").value = res.data.desc;
        domId("txtType").value = res.data.type;
        //Ẩn nút thêm sản phẩm
        domId("btn-addprouct").style.display = "none";
        domId("btn-reset").style.display = "none";
        //Hiện nút cập nhật
        domId("btn-update").style.display = "block";
        domId("btn-update").setAttribute("data-productId",`${res.data.id}`);
    })
    .catch(function(err){
        console.log(err);
        domId("btn-complete").click(); 
        domId("loader").style.display = "none";
        domId("modal-body-completed").innerHTML = `${err}`; 
    })
}
//cap nhat du lieu san pham
function updateProduct(event){
    var id = event.target.getAttribute("data-productId");
    var name = domId("txtName").value.trim();
    var price = domId("txtPrice").value.trim();
    var screen = domId("txtScreen").value.trim();
    var blackCamera = domId("txtBlackCamera").value.trim();
    var frontCamera = domId("txtFrontCamera").value.trim();
    var img = domId("txtImg").value.trim();
    var desc = domId("txtDes").value.trim();
    var type = domId("txtType").value.trim();
    var valid = new Validate();
    var isValid = true;
    isValid &= valid.checkRequile("txtName") && valid.checkMaxLength("txtName","spanName");
    isValid &= valid.checkRequile("txtPrice") && valid.checkNumber("txtPrice","spanPrice")&& valid.checkMaxNumber("txtPrice","spanPrice");
    isValid &= valid.checkRequile("txtScreen") && valid.checkMaxLength("txtScreen","spanScreen");
    isValid &= valid.checkRequile("txtBlackCamera") && valid.checkMaxLength("txtBlackCamera","spanBCamera");
    isValid &= valid.checkRequile("txtFrontCamera") && valid.checkMaxLength("txtFrontCamera","spanFCamera");
    isValid &= valid.checkRequile("txtImg");
    isValid &= valid.checkRequile("txtDes") && valid.checkMaxLength("txtDes","spanDes");
    isValid &= valid.checkRequile("txtType") && valid.checkMaxLength("txtType","spanType");
    if(isValid === 0) return;
    domId("loader").style.display = "block";
    var product = new Products(
        name,
        price,
        screen,
        blackCamera,
        frontCamera,
        img,
        desc,
        type
    );
    axios({
        url:"https://62bc4dceeff39ad5ee223a51.mockapi.io/api/products/" + id,
        method: "PUT",
        data: product
    })
    .then(function(res){
         getListProduct();
         //Ẩn nút thêm sản phẩm
         domId("btn-addprouct").style.display = "block";
         domId("btn-reset").style.display = "block";
         //Hiện nút cập nhật
         domId("btn-update").style.display = "none";
         domId("btn-update").setAttribute("data-productId","");
         domId("btn-reset").click();
        domId("btn-close").click();
        //loading, thông báo thành công 
        domId("btn-complete").click(); 
        domId("loader").style.display = "none";
        domId("modal-body-completed").innerHTML = `<span>Cập nhật thành công</span>`; 
    })
    .catch(function(err){
        domId("btn-complete").click(); 
        domId("loader").style.display = "none";
        domId("modal-body-completed").innerHTML = `<span>Cập nhật thất bại</span>`;
    })
}
//xoa san pham
function deleteProduct(id){
    domId("loader").style.display = "block";
    axios({
        url:"https://62bc4dceeff39ad5ee223a51.mockapi.io/api/products/" + id,
        method: "DELETE",
    })
    .then(function(res){
        domId("btn-complete").click(); 
        domId("loader").style.display = "none";
        domId("modal-body-completed").innerHTML = `<span>Xóa thành công</span>`; 
        getListProduct();
    })
    .catch(function(err){
        domId("btn-complete").click(); 
        domId("loader").style.display = "none";
        domId("modal-body-completed").innerHTML = `<span>Xóa thất bại</span>`; 
    })
}
//close modal
function closeModal(){
     //Hiện nút thêm sản phẩm
     domId("btn-addprouct").style.display = "block";
     domId("btn-reset").style.display = "block";
     //Ẩn nút cập nhật
     domId("btn-update").style.display = "none";
     domId("btn-update").setAttribute("data-productId","");
     domId("btn-reset").click();
     //Ẩn span nếu có báo lỗi
    domId("spanName").innerHTML = "";
    domId("spanPrice").innerHTML = "";
    domId("spanScreen").innerHTML = "";
    domId("spanBCamera").innerHTML = "";
    domId("spanFCamera").innerHTML = "";
    domId("spanImg").innerHTML = "";
    domId("spanDes").innerHTML = "";
    domId("spanType").innerHTML = "";
}
//chuổi đổi số thành định dạng tiền tệ
function changePrice(stringPrice){
    var results = stringPrice.split('');
    if(stringPrice.length === 6){
            results.splice(3,0,",");
            results= results.join('');
    }else if(stringPrice.length === 7){
            results.splice(1,0,",");
            results.splice(5,0,",");
            results= results.join('');
    }else if(stringPrice.length === 8){
            results.splice(2,0,",");
            results.splice(6,0,",");
            results= results.join('');
    }else if(stringPrice.length === 9){
        results.splice(3,0,",");
        results.splice(7,0,",");
        results= results.join('');
    }else if(stringPrice.length === 10){
        results.splice(1,0,",");
        results.splice(5,0,",");
        results.splice(9,0,",");
        results= results.join('');
    }
    return results;
}

