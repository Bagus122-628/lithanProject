var default_content = "";

$(document).ready(function () {
  checkURL();
  $("a").click(function (e) {
    checkURL(this.hash);
  });
  default_content = $("#pageContent").html();
  setInterval("checkURL()", 250);

});


var lasturl = "";

function checkURL(hash) {
  if (!hash) hash = window.location.hash;

  if (hash != lasturl) {
    lasturl = hash;
    if (hash == "") $("#pageContent").html(default_content);
    loadPage(hash);
  }
}

function loadPage(url) {
  url = url.replace("#", "");

  $.ajax({
    type: "POST",
    url: "load_page.jsp",
    data: "page=" + url,
    dataType: "html",
    success: function (msg) {
      if (parseInt(msg) != 0) {
        $("#pageContent").html(msg);
      }
    },
  });
}

