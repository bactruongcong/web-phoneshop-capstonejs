function Validate(){
//txtName, txtPrice, txtScreen, txtBlackCamera, txtFrontCamera, txtImg, txtDes, txtType
//    this.txtName = txtName,
//    this.txtPrice = txtPrice,
//    this.txtScreen = txtScreen,
//    this.txtBlackCamera = txtBlackCamera,
//    this.txtFrontCamera = txtFrontCamera,
//    this.txtImg = txtImg,
//    this.txtDes = txtDes,
//    this.txtType = txtType,
   this.checkRequile = function(inputId){
        var txtInput = inputId;
        var name = document.getElementById(txtInput).value;
        if(name.trim() === ""){
            switch (txtInput){
                case "txtName":
                    document.getElementById("spanName").innerHTML = "*Tên SP không được bỏ trống";
                    return false;
                case "txtPrice":
                    document.getElementById("spanPrice").innerHTML = "*Giá không được bỏ trống";
                    return false;
                case "txtScreen":
                    document.getElementById("spanScreen").innerHTML = "*Màn hình không được bỏ trống";
                    return false;
                case "txtBlackCamera":
                    document.getElementById("spanBCamera").innerHTML = "*Camera sau không được bỏ trống";
                    return false;
                case "txtFrontCamera":
                    document.getElementById("spanFCamera").innerHTML = "*Camera trước không được bỏ trống";
                    return false;
                case "txtImg":
                    document.getElementById("spanImg").innerHTML = "*Hình không được bỏ trống";
                    return false;
                case "txtDes":
                    document.getElementById("spanDes").innerHTML = "*Chi tiết không được bỏ trống";
                    return false;
                case "txtType":
                    document.getElementById("spanType").innerHTML = "*Loại không được bỏ trống";
                    return false;
                    default:
            }
        }else{
            switch (txtInput){
                case "txtName":
                    document.getElementById("spanName").innerHTML = "";
                    return true;
                case "txtPrice":
                    document.getElementById("spanPrice").innerHTML = "";
                    return true;
                case "txtScreen":
                    document.getElementById("spanScreen").innerHTML = "";
                    return true;
                case "txtBlackCamera":
                    document.getElementById("spanBCamera").innerHTML = "";
                    return true;
                case "txtFrontCamera":
                    document.getElementById("spanFCamera").innerHTML = "";
                    return true;
                case "txtImg":
                    document.getElementById("spanImg").innerHTML = "";
                    return true;
                case "txtDes":
                    document.getElementById("spanDes").innerHTML = "";
                    return true;
                case "txtType":
                    document.getElementById("spanType").innerHTML = "";
                    return true;
                    default:
            }
        }
       
   }
   this.checkNumber = function(inputId,spanId){
    var reg = /^[0-9]+$/;
    var txtNumber = document.getElementById(inputId).value;
    if(txtNumber.match(reg)){
        document.getElementById(spanId).innerHTML = "";
        return true;
    }
    document.getElementById(spanId).innerHTML = "*Giá trị nhập vào phải là số 0 - 9";
    return false;
   }
   this.checkMaxNumber = function(inputId,spanId){
    var txtNumber = document.getElementById(inputId).value;
    if(txtNumber.length > 10){
        document.getElementById(spanId).innerHTML = "*Tối đa 10 ký tự số 9,999,999,999";
        return false;
    }
    document.getElementById(spanId).innerHTML = "";
    return true;
   }
   this.checkMaxLength = function(inputId,spanId){
    var txtNumber = document.getElementById(inputId).value;
    if(txtNumber.length > 200){
        document.getElementById(spanId).innerHTML = "*Tối đa 200 ký tự";
        return false;
    }
    document.getElementById(spanId).innerHTML = "";
    return true;
   }
}