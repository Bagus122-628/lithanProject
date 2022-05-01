var default_content = "";
const currencyURL = "data/currency.json";

$(document).ready(function () {
  checkURL();
  $("ul li a").click(function (e) {
    checkURL(this.hash);
  });
  default_content = $("#pageContent").html();
  setInterval("checkURL()", 250);

  // add option text && value
  $.getJSON(currencyURL, function(data){
    let opt = ``;
    $.each(data.currencies, function(){
      opt += `<option value=${this.code}>${this.name}</option>`;
    });
    $(`#select`).html(opt);
  });
});



var lasturl = "";

function checkURL(hash) {
  if (!hash) hash = window.location.hash;

  if (hash != lasturl) {
    lasturl = hash;
    if (hash == "") $("#pageContent").html(default_content);
    else {
      if (hash == "#products") {
        loadProducts();
      } else {
        loadPage(hash);
      }
    }
  }
}

function loadPage(url) {
  url = url.replace("#", "");

  $("#loading").css("visibility", "visible");

  $.ajax({
    type: "POST",
    url: "load_page.jsp",
    data: "page=" + url,
    dataType: "html",
    success: function (msg) {
      if (parseInt(msg) != 0) {
        $("#pageContent").html(msg);
        $("#loading").css("visibility", "hidden");
      }
    },
  });

  $("select").val("SGD").attr("autofocus");
}

const jsonURL = "data/products.json";

function loadProducts() {
  $("#loading").css("visibility", "visible");

  $.getJSON(jsonURL, function (json) {
    let imgList = '<ul class="products">';
    $.each(json.products, function () {
      imgList += `<li>
                    <img src="${this.imgPath}">
                    <h3>${this.name}</h3>
                    <h3>
                      <span class="currency-code">SGD</span> 
                      <span class="price"id="${this.price}">${this.price}</span>
                      <span class="base-price" hidden>${this.price}</span>
                    </h3>
                  </li>`;
    });
    imgList += "</ul>";
    $("#pageContent").html(imgList);
    $("select").val("SGD");
  });

  $("#loading").css("visibility", "hidden");
  $("select").val("SGD").attr("autofocuse");

}


$(`#select`).on(`change`,function(){
  let i = $(`#select`).val();
  // console.info('currency-code = '+i);
  convertion(i)
 });

//change the currency-code
function convertion(i){
  $(`.currency-code`).html(i);

  $.getJSON(currencyURL, function(data){
    let x = data.currencies;
    b = x.findIndex(currencies => currencies.code == i); //get index of value
    // console.info(`===`+b);
    let y = data.currencies[b].conversion;
    // console.info(`----`+y); //info index
  
  let price=$(`.price`);
  // let value = $(`.base-price`).html();
  // console.log(value);
    $.each(price, function(index, data){
      const converted = (data.id * y).toFixed(2);
      // console.log(converted)
       data.textContent=converted.toString();
    });

    // let conversion =``;
    // $.getJSON(jsonURL, function(json){
    //   let price2 = ``;
    //   $.each(json.products, function(){
      //     console.info(this.price)
      //     price2 = "<p>"+(this.price*y.conversion).toFixed(2)+"</p>";
      //     console.info(price2);
      //   });
      //   $(`.price`).html(price2);
      // });
    });
  }
  
  // // Conversion
  // $(document).ready(function () {
  //   $("#select").on("change", function () {
  //     if (this.value === "SGD") {
  //       loadSelectedCurrency(0);
  //     } else if (this.value === "MYR") {
  //       loadSelectedCurrency(1);
  //     } else if (this.value === "INR") {
  //       loadSelectedCurrency(2);
  //     } else if (this.value === "PHP") {
  //       loadSelectedCurrency(3);
  //     } else {
  //       loadSelectedCurrency(4);
  //     }
  //   });
  // });


// const prices = $("price");
// const currencyCode = $("currency-code");

// function loadSelectedCurrency(i) {
//   loadBasePrice();
//   $.getJSON(currencyURL, function (data) {
//     const currencyJSON = data.currencies[i];
//     $.each(prices, function (index, data) {
//       const textContentPrice = parseFloat(data.textContent);
//       const converted = (currencyJSON.conversion * textContentPrice).toFixed(2);
//       data.textContent = converted.toString();
//     });
//     $.each(currencyCode, function (index, data) {
//       data.textContent = `${currencyJSON.code}`;
//     });
//   });
// }

// function loadBasePrice() {
//   $(document).ready(function () {
//     $(".p1").text("1.20");
//     $(".p2").text("2.40");
//     $(".p3").text("3.15");
//     $(".p4").text("1.50");
//   });
// }
