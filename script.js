obtenirDepartements()
initSelectDep()

var originalOptions = document.getElementById('cities').innerHTML;


async function obtenirDepartements() {

    const json = await callApi("https://geo.api.gouv.fr/departements")
    // console.log("json = ", json)

    for (let i = 0; i < json.length; i++) {
        // console.log(json[i].code + ": " + json[i].nom);

        var newOption = document.createElement("option");
        newOption.value = json[i].code;
        newOption.text = json[i].code + " - " + json[i].nom;

        var select = document.getElementById("dep");
        select.appendChild(newOption);
    }

}

async function obtenirCommunes(codeDepartement) {
    initSelectCities()

    console.log("obtenirCommunes(" + codeDepartement + ")")

    clearOptionsCities()

    const json = await callApi("https://geo.api.gouv.fr/departements/" + codeDepartement + "/communes")
    //console.log("json = ", json)

    for (let i = 0; i < json.length; i++) {
        //console.log(json[i].code + ": " + json[i].nom);

        var newOption = document.createElement("option");
        newOption.value = json[i].code;
        newOption.text = json[i].nom;

        var select = document.getElementById("cities");
        select.appendChild(newOption);
    }

}

async function obtenirDetailCommunes(codeCommune) {

    console.log("obtenirDetailCommunes(" + codeCommune + ")")

    const json = await callApi("https://geo.api.gouv.fr/communes/" + codeCommune)
    console.log("json = ", json)

    document.body.innerHTML = document.body.innerHTML + "<br> - Nom : " + json.nom + ", Population : " + json.population + ", CP : " + json.codesPostaux[0];

}

async function callApi(url) {
    try {
        const response = await fetch(url)
        const json = await response.json()
        // console.log("json = ", json)

        return json
    } catch (e) {
        console.error(e)
    }
}


function initSelectDep() {
    var select = document.getElementById("dep")

    select.addEventListener("change", function () {
        obtenirCommunes(select.value);
    });
}

function initSelectCities() {
    var select = document.getElementById("cities")

    select.addEventListener("change", function () {
        console.log(select.value)
        obtenirDetailCommunes(select.value);
    });
}

function clearOptionsCities() {
    var select = document.getElementById("cities")
    select.options.length = 0

    var select = document.getElementById("cities")
    select.innerHTML = originalOptions
}