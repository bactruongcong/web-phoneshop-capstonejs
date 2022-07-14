//Dom id input
function domId(id){
    return document.getElementById(id);
}
//danh sách giỏ hàng
var cardProductList = [];
//Lấy data từ Api
function getListProduct(){
    domId("loader").style.display = "block";
    axios({
        url: "https://62bc4dceeff39ad5ee223a51.mockapi.io/api/products",
        method: "GET"
    })
    .then(function(res){
        // console.log(res);
        renderProduct(res.data);
        renderCartShoping(res.data);
        domId("loader").style.display = "none";
        
    })
    .catch(function(err){
        console.log(err);
    })
}
getListProduct();
//Hiển thị danh sách sản phẩm ra giao diện
function renderProduct(data){
    result = "";
    for(var i = 0; i < data.length ; i++){
        result += `
        <div class="mt-5 col-lg-4 col-md-6">
        <div class="item ">
            <div class="item-inner">
                <div class="item-image">
                    <img src=${data[i].img} alt=""/>
                    <div class="overplay-order">
                        <div class="icon-order">
                            <button class="cart-shopping" onclick="addCardShoping('${data[i].id}')"><i class="fa-solid fa-cart-shopping"></i></button>
                            <a class="cart-heart" href=""><i class="fa-solid fa-heart"></i></a>
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
        `
    }
    domId("products-list").innerHTML = result;

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
//Add product card
function addCartShopingVolume(id){
    var index = findByIdList(id);
    var setVolume = domId("txtVolume"+id).value;
    cardProductList[index].volume = setVolume;
    // console.log(cardProductList);
    getListProduct();
    return
}
function addCardShoping(id){
    var index = findByIdList(id);
    if(index !== -1){
        var count = +cardProductList[index].volume;
        cardProductList[index].volume = count + 1;
        getListProduct();
        return
    }
        var productcart = new ProductsCartShoping(id,1);
        cardProductList.push(productcart);
        // console.log(cardProductList)
        domId("spanCountShoping").innerHTML = cardProductList.length;
        getListProduct();
}
//Tim vị trí 
function findByIdList(id){
    for(var i = 0; i < cardProductList.length; i++){
        if(id === cardProductList[i].id){
            return i;
        }
    }
    return -1;
}
//In danh sách ra giao diện giỏ hàng
function renderCartShoping(data){
    var result = "";
    if(cardProductList === null)return;
    for(var i = 0; i < cardProductList.length ; i++){
        var cart = cardProductList[i];
        for(var j = 0; j < data.length; j++){
            if(data[j].id === cart.id){
                var total = data[j].price * cart.volume;
                cart.price = data[j].price;
                result += `
                        <tr>
                        <th scope="row">${i+1}</th>
                        <td>${data[j].name}
                        </td>
                        <td>${changePrice(data[j].price)}
                        </td>
                        <td>
                        <input id="txtVolume${data[j].id}" value="${cart.volume}" type="text" class="form-control" oninput="addCartShopingVolume('${data[j].id}')">
                        <span>Thành tiền: ${changePrice(total+"")}</span>
                        </td>
                    </tr>
                `
            }
        }
    }
    var total = 0;
    for(var i = 0; i < cardProductList.length; i++){
        total += cardProductList[i].price * cardProductList[i].volume;
    }
   domId("totalCart").innerHTML = "Tổng cộng: " + changePrice(total+"") + " VNĐ ";
   domId("tbodyCartShoping").innerHTML = result;
}
function test(){
    alert("he");
}