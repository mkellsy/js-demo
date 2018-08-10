window.onload = function () {
    GetJSON("https://api.encompass8.com/aspx1/API.ashx?APIToken=8a2769debbda2273c80fe9c59c310299&EncompassID=Pioneer1808&APICommand=Kellsy_GetProductList&Format=JSON").then(function(data) {
        data = data.Export.Table.Row;

        var html = "";

        for (var i = 0; i < data.length; i++) {
            html += "<tr>";
            html += "  <td>" + data[i].ProductID + "</td>";
            html += "  <td>" + data[i].ProductName + "</td>";
            html += "  <td>" + (data[i].CaseUPC ? data[i].CaseUPC : "") + "</td>";
            html += "</tr>";
        }

        document.getElementById("product-list").innerHTML = html;
    });

    document.getElementById("product-list").addEventListener("click", function (event) {
        var id = parseInt(event.target.parentElement.getElementsByTagName("td")[0].innerHTML);

        if (!isNaN(id)) {
            GetDetails(id);
        }
    });
};

var GetDetails = function (id) {
    GetJSON("https://api.encompass8.com/ECP_18.08_A/aspx1/API.ashx?APIToken=8a2769debbda2273c80fe9c59c310299&EncompassID=Pioneer1808&Format=JSON&APICommand=Kellsy_GetProductDetail&Parameters=F:ProductID~V:" + id + "~O:E").then(function(data) {
        data = data.Export.Table.Row;

        var details = document.getElementById("details");
        var html = "";

        html += "<h2>" + data.ProductName + "</h2>";
        html += "ID: " + data.ProductID + "<br />";
        html += "Supplier: " + data.Supplier + "<br />";
        html += "Brand: " + data.Brand + "<br />";
        html += "Package: " + data.Package + "<br />";
        html += "Ounces: " + data.Ounces + "<br />";
        html += "Case Equiv: " + data.CaseEquiv + "<br />";
        html += "<br />";
        html += "Case UPC: " + (data.CaseUPC ? data.CaseUPC : "") + "<br />";
        html += "Carrier UPC: " + (data.CarrierUPC ? data.CarrierUPC : "") + "<br />";
        html += "Unit UPC: " + (data.UnitUPC ? data.UnitUPC : "") + "<br />";
        html += "<br />";
        html += "Width: " + data.Width + " in<br />";
        html += "Length: " + data.Length + " in<br />";
        html += "Height: " + data.Height + " in<br />";
        html += "Weight: " + data.CaseWeightinLbs + " Lbs<br />";
        html += "Cases/Pallet: " + data.CasesperPallet + "<br />";
        html += "Cases/Layer: " + data.CasesperLayer + "<br />";

        details.innerHTML = html;

        if (html != "") {
            details.parentElement.style.display = "block";
        } else {
            details.parentElement.style.display = "none";
        }
    });
};
