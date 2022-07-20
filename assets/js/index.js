//Dom id input
function domId(id) {
    return document.getElementById(id);
}
//danh sách giỏ hàng
var cardProductList = [];
// loai
var resultType = [];
//Lấy data từ Api
function getListProduct(valueSelect) {
    domId("loader").style.display = "block";
    axios({
        url: "https://62bc4dceeff39ad5ee223a51.mockapi.io/api/products",
        method: "GET"
    })
        .then(function (res) {
            // console.log(res);
            renderProduct(res.data, valueSelect);
            renderCartShoping(res.data);
            domId("loader").style.display = "none";
            if (cardProductList.length <= 0) {
                domId("btnPay").style.display = "none";
            } else {
                domId("btnPay").style.display = "block";
            }

        })
        .catch(function (err) {
            console.log(err);
        })
}
getListProduct();

//Hiển thị danh sách sản phẩm ra giao diện
function renderProduct(data, valueSelect) {
    result = "";
    rsType = `<option value="all">Tất cả sản phẩm</option>`;
    for (var i = 0; i < data.length; i++) {
       if(valueSelect === undefined || valueSelect === "all"){
        result += `
        <div class="mt-5 col-lg-4 col-md-6">
        <div class="item ">
            <div class="item-inner">
                <div class="item-image">
                    <img src=${data[i].img} alt=""/>
                    <div class="overplay-order">
                        <div class="icon-order">
                            <button class="cart-shopping" onclick="addCardShoping('${data[i].id}')"><i class="fa-solid fa-cart-shopping"></i></button>
                            
                            <a class="btn-info">
                                <i class="fa-solid fa-info"></i>
                                <div class="overplay-detail">
                                    <h4 class="text-center mt-3">Thông tin sản phẩm</h4>
                                    <ul id="detailProduct">
                                        <li><b>Màn hình:</b> <span id="spanScreen">${data[i].screen}</span></li>
                                        <li><b>Camera sau:</b> <span id="spanBCamera">${data[i].blackCamera}</span>	</li>
                                        <li><b>Camera trước:</b> <span id="spanFCamera">${data[i].frontCamera}</span></li>
                                        <li><b>Chi tiết:</b> <span id="spanDes">${data[i].desc}</span></li>
                                        <li><b>Hãng:</b> <span id="spanType">${data[i].type}</span></li>
                                    </ul>
                                </div>
                            </a>
                        </div>
                        
                    </div>
                </div>
                <div class="item-info ">
                    <span id="txtName" class="item-name">${data[i].name}</span>
                    <div class="product-price-and-shipping">
                        <span id="txtPrice" class="item-price">Giá: ${changePrice(data[i].price)}</span>                                                                                                                                                                                      
                    </div>
                </div>
                
            </div>
        </div>
    </div>
        `;
        var type = data[i].type;
        var check = false;
        var rs = "";
        for (var j = 0; j < resultType.length; j++) {
            if (resultType[j] === type) {
                check = true;
            }
        }
        if (check === false) {
            resultType.push(type);
        }
       }else{
        if(data[i].type === valueSelect){
            result += `
        <div class="mt-5 col-lg-4 col-md-6">
        <div class="item ">
            <div class="item-inner">
                <div class="item-image">
                    <img src=${data[i].img} alt=""/>
                    <div class="overplay-order">
                        <div class="icon-order">
                            <button class="cart-shopping" onclick="addCardShoping('${data[i].id}')"><i class="fa-solid fa-cart-shopping"></i></button>
                            
                            <a class="btn-info">
                                <i class="fa-solid fa-info"></i>
                                <div class="overplay-detail">
                                    <h4 class="text-center mt-3">Thông tin sản phẩm</h4>
                                    <ul id="detailProduct">
                                        <li><b>Màn hình:</b> <span id="spanScreen">${data[i].screen}</span></li>
                                        <li><b>Camera sau:</b> <span id="spanBCamera">${data[i].blackCamera}</span>	</li>
                                        <li><b>Camera trước:</b> <span id="spanFCamera">${data[i].frontCamera}</span></li>
                                        <li><b>Chi tiết:</b> <span id="spanDes">${data[i].desc}</span></li>
                                        <li><b>Hãng:</b> <span id="spanType">${data[i].type}</span></li>
                                    </ul>
                                </div>
                            </a>
                        </div>
                        
                    </div>
                </div>
                <div class="item-info ">
                    <span id="txtName" class="item-name">${data[i].name}</span>
                    <div class="product-price-and-shipping">
                        <span id="txtPrice" class="item-price">Giá: ${changePrice(data[i].price)}</span>                                                                                                                                                                                      
                    </div>
                </div>
                
            </div>
        </div>
    </div>
        `;
        }
       }

    }
    for (var i = 0; i < resultType.length; i++) {
        rsType += `
        <option value="${resultType[i]}">${resultType[i]}</option>
         `
    }
    domId("type-select").innerHTML = rsType;
    domId("products-list").innerHTML = result;
    if (valueSelect !== undefined) {
        domId("type-select").value = valueSelect;
    }


}
//tìm kiếm sản phẩm theo từ khóa
function searchProduct() {
    // var valKey = domId("txtSearch").value;
    // var valueSelect = domId("type-select").value;
    // getListProduct(valueSelect, valKey);
}
//Hien thi danh sach theo loai
function showProductType() {
    var valueSelect = domId("type-select").value;
    getListProduct(valueSelect);
}
//kiem tra type
function findType(type) {
    for (var i = 0; i < resultType.length; i++) {
        if (resultType[i] === type) {
            return i;
        }
    }
    return -1;
}
//chuổi đổi số thành định dạng tiền tệ
function changePrice(stringPrice) {
    var results = stringPrice.split('');
    if (stringPrice.length === 6) {
        results.splice(3, 0, ",");
        results = results.join('');
    } else if (stringPrice.length === 7) {
        results.splice(1, 0, ",");
        results.splice(5, 0, ",");
        results = results.join('');
    } else if (stringPrice.length === 8) {
        results.splice(2, 0, ",");
        results.splice(6, 0, ",");
        results = results.join('');
    } else if (stringPrice.length === 9) {
        results.splice(3, 0, ",");
        results.splice(7, 0, ",");
        results = results.join('');
    } else if (stringPrice.length === 10) {
        results.splice(1, 0, ",");
        results.splice(5, 0, ",");
        results.splice(9, 0, ",");
        results = results.join('');
    }
    return results;
}
//Add product card
function addCartShopingVolume(id) {
    var valueSelect = domId("type-select").value;
    var index = findByIdList(id);
    var setVolume = +domId("txtVolume" + id).value;
    if (setVolume === 0) {
        cardProductList.splice(index, 1);
        domId("spanCountShoping").innerHTML = cardProductList.length;
        getListProduct(valueSelect);
        // console.log(cardProductList);
        return
    }
    cardProductList[index].volume = setVolume;
    getListProduct(valueSelect);
    return
}
function addCardShoping(id) {
    var valueSelect = domId("type-select").value;
    var index = findByIdList(id);
    if (index !== -1) {
        var count = +cardProductList[index].volume;
        if (count === 20) {
            domId("spanerr" + id).innerText = "*Số lượng đặt tối đa 20c";
            domId("btn-complete").click();
            var result = "";
            domId("exampleModalLabel").innerHTML = "Thông báo";
            result += `<span>*Bạn đã đặt tối đa 20c</span>`;
            domId("modal-body-completed").innerHTML = result;
            return
        } else {
            cardProductList[index].volume = count + 1;
            getListProduct(valueSelect);
            saveLocalStorage();
            return
        }
    }
    var productcart = new ProductsCartShoping(id, 1);
    cardProductList.push(productcart);
    // console.log(cardProductList)
    domId("spanCountShoping").innerHTML = cardProductList.length;
    getListProduct(valueSelect);
    saveLocalStorage();
}
//Tim vị trí 
function findByIdList(id) {
    for (var i = 0; i < cardProductList.length; i++) {
        if (id === cardProductList[i].id) {
            return i;
        }
    }
    return -1;
}
//In danh sách ra giao diện giỏ hàng
function renderCartShoping(data) {
    var result = "";
    if (cardProductList === null) return;
    for (var i = 0; i < cardProductList.length; i++) {
        var cart = cardProductList[i];
        for (var j = 0; j < data.length; j++) {
            if (data[j].id === cart.id) {
                var total = data[j].price * cart.volume;
                cart.price = data[j].price;
                cart.name = data[j].name;
                // console.log(cart);
                result += `
                        <tr>
                        <th scope="row">${i + 1}</th>
                        <td>
                        <div class="td-Name">${data[j].name}</div>
                        </td>
                        <td>${changePrice(data[j].price)}
                        </td>
                        <td>
                        <div class="row btn-cart-shop">
                        <div class="col-2">
                        <button type="button" class="btn btn-primary " onclick="upDownVolume('${data[j].id}')">+</button>
                        </div>
                        <div class="col-3 ms-2">
                        <input id="txtVolume${data[j].id}" value="${cart.volume}" style="height: 30px" disabled="true" type="text" class="form-control" oninput="addCartShopingVolume('${data[j].id}')">
                        </div>
                        <div class="col-2 ms-2">
                        <button type="button" class="btn btn-secondary " onclick="upDownVolume('${data[j].id}','down')">-</button>
                        </div>
                        <div class="col-2 ms-2">
                        <button type="button" class="btn btn-danger btnDelete-custom " onclick="removeCartItem('${data[j].id}')">X</button>
                        </div>
                        </div>
                        <span>Thành tiền: ${changePrice(total + "")}</span></br>
                        <span id="spanerr${data[j].id}" style="color:red"></span>
                        </td>

                    </tr>
                `
            }
        }
    }
    var total = 0;
    for (var i = 0; i < cardProductList.length; i++) {
        total += cardProductList[i].price * cardProductList[i].volume;
    }
    domId("totalCart").innerHTML = "Tổng cộng: " + changePrice(total + "") + " VNĐ ";
    domId("tbodyCartShoping").innerHTML = result;
}

//tăng volume
function upDownVolume(id, upDown) {
    if (upDown === undefined) {
        var volume = +domId("txtVolume" + id).value;
        if (volume === 20) {
            domId("spanerr" + id).innerText = "*Số lượng đặt tối đa 20c";
        } else {
            volume = volume + 1;
            loadCartList(id, volume);
        }

    } else {
        var volume = +domId("txtVolume" + id).value;
        domId("spanerr" + id).innerText = "";
        volume = volume - 1;
        loadCartList(id, volume);
    }


}
function removeCartItem(id, volume) {
    var volume = 0;
    loadCartList(id, volume);
}
//tăng giảm volume
function loadCartList(id, volume) {
    domId("txtVolume" + id).value = volume;
    var valueSelect = domId("type-select").value;
    var index = findByIdList(id);
    if (volume === 0) {
        cardProductList.splice(index, 1);
        domId("spanCountShoping").innerHTML = cardProductList.length;
        getListProduct(valueSelect);
        // console.log(cardProductList);
        saveLocalStorage();
        return
    }
    cardProductList[index].volume = volume;
    getListProduct(valueSelect);
    saveLocalStorage();
    return
}
//Thanh toán
function payCart() {
    var valueSelect = domId("type-select").value;
    total = 0;
    result = "";
    for (var i = 0; i < cardProductList.length; i++) {
        var volume = cardProductList[i].volume;
        var price = cardProductList[i].price;
        total += +volume * +price;
        result += `
            <span>- ${cardProductList[i].name} x </span>
            <span><b>${cardProductList[i].volume}</b> = </span>
            <span>${changePrice(cardProductList[i].price + "")}</span><br>
        `
    }
    domId("btn-close-cart").click();
    domId("btn-complete").click();
    result += `<h4>Tổng tiền: ${changePrice(total + '')}</h4>`;
    domId("modal-body-completed").innerHTML = result;
    cardProductList = [];
    domId("spanCountShoping").innerHTML = "0";
    getListProduct(valueSelect);
    saveLocalStorage();
}
//luu về localStorage gio hàng
function saveLocalStorage() {
    var stringJs = JSON.stringify(cardProductList);
    localStorage.setItem("listcart", stringJs);
}
//lấy data từ localStorage giỏ hàng
function getLocalStorage() {
    var strLoca = localStorage.getItem("listcart");
    if (strLoca === null) return;
    var arrCart = JSON.parse(strLoca);
    cardProductList = arrCart;
    domId("spanCountShoping").innerHTML = cardProductList.length;
}
getLocalStorage();