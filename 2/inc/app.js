window.onload = function () {
    var myRequest = new ECP.EC_Request("Kellsy_GetProductList");

    myRequest.SetAPIToken("8a2769debbda2273c80fe9c59c310299");
    myRequest.AddRequestVariable("Format", "JSON");

    ECP.API2Rs(myRequest).then(function (adoRs) {
        var Html = "";

        while (!adoRs.EOF) {
            Html += "<tr>";
            Html += "  <td>" + adoRs.Item("ProductID") + "</td>";
            Html += "  <td>" + adoRs.Item("ProductName") + "</td>";
            Html += "  <td>" + adoRs.Item("CaseUPC") + "</td>";
            Html += "</tr>";

            adoRs.MoveNext();
        }

        document.getElementById("product-list").innerHTML = Html;
    });

    document.getElementById("product-list").addEventListener("click", function (event) {
        var id = parseInt(event.target.parentElement.getElementsByTagName("td")[0].innerHTML);

        if (!isNaN(id)) {
            GetDetails(id);
        }
    });

    var GetDetails = function (id) {
        var Details = document.getElementById("details");
        var myRequest = new ECP.EC_Request("Kellsy_GetProductDetail");

        myRequest.SetAPIToken("8a2769debbda2273c80fe9c59c310299");
        myRequest.AddRequestVariable("Format", "JSON");
        myRequest.AddParameter("ProductID", id, ECP.EC_Operator.Equals);

        ECP.API2Rs(myRequest).then(function (adoRs) {
            if (!adoRs.EOF) {
                var Html = "";

                Html += "<h2>" + adoRs.Item("ProductName") + "</h2>";
                Html += "ID: " + adoRs.Item("ProductID") + "<br />";
                Html += "Supplier: " + adoRs.Item("Supplier") + "<br />";
                Html += "Brand: " + adoRs.Item("Brand") + "<br />";
                Html += "Package: " + adoRs.Item("Package") + "<br />";
                Html += "Ounces: " + adoRs.Item("Ounces") + "<br />";
                Html += "Case Equiv: " + adoRs.Item("CaseEquiv") + "<br />";
                Html += "<br />";
                Html += "Case UPC: " + adoRs.Item("CaseUPC") + "<br />";
                Html += "Carrier UPC: " + adoRs.Item("CarrierUPC") + "<br />";
                Html += "Unit UPC: " + adoRs.Item("UnitUPC") + "<br />";
                Html += "<br />";
                Html += "Width: " + adoRs.Item("Width") + " in<br />";
                Html += "Length: " + adoRs.Item("Length") + " in<br />";
                Html += "Height: " + adoRs.Item("Height") + " in<br />";
                Html += "Weight: " + adoRs.Item("CaseWeightinLbs") + " Lbs<br />";
                Html += "Cases/Pallet: " + adoRs.Item("CasesperPallet") + "<br />";
                Html += "Cases/Layer: " + adoRs.Item("CasesperLayer") + "<br />";

                Details.innerHTML = Html;
                Details.parentElement.style.display = "block";
            } else {
                Details.innerHTML = "";
                Details.parentElement.style.display = "none";
            }
        });
    }
};
