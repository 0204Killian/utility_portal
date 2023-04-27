var chbxs = document.getElementById("checkboxes")
var gas = ["Gas_lines","Gas_points2"]
var esb = ["hv_lines_view","lvmv_lines_view","lvmv_poles_view"]
var cables = ["testedPole","UndergroundUtilityBox","Underground_Route"]
var renderedLayers = [];

var map = L.map('map').setView([53.44, -7.50], 7);
map.options.minZoom = 4;
map.options.maxZoom = 18;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

chbxs.addEventListener("change", function(event){
    var input_target = document.getElementById(event.target.id + "_img")
    var layer_load = event.target.id
    if (input_target.hidden == true){
        input_target.hidden = false;
        if (layer_load == "gas"){
            render(gas, "geoserver3")
        }
        else if (layer_load == "esb"){
            render(esb, "geoserver2")
        }
        else if(layer_load == "cable"){
            render(cables, "geoserver4")
        }
    } else if (input_target.hidden == false){
        input_target.hidden = true
        if(layer_load == "gas"){
            unrender(gas)
        }
        else if(layer_load == "esb"){
            unrender(esb)
        }
        else if(layer_load == "cable"){
            unrender(cables)
        }
    }
})

function render(layers, geoserver){
    for(let i = 0; i < layers.length; i++){
        var rendered = L.Geoserver.wms(`http://admin:geoserver@192.168.1.150:8001/${geoserver}/wms`,{
            layers: `Utility_stats:${layers[i]}`
        }).addTo(map);
        renderedLayers.push(rendered);
    }
}

function unrender(layers){
    for(let i = 0; i < layers.length; i++){
        for(let j = 0; j < renderedLayers.length; j++){
            if(renderedLayers[j].options.layers.includes(layers[i])){
                map.removeLayer(renderedLayers[j]);
                renderedLayers.splice(j, 1);
                break;
            }
        }
    }
}