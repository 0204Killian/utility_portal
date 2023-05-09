var chbxs = document.getElementById("checkboxes")
var gas = ["Gas_lines","Gas_points2"]
var esb = ["hv_lines_view","lvmv_lines_view","lvmv_poles_view"]
var cables = ["testedPole","UndergroundUtilityBox","Underground_Route"]

var waterdis = 'http://mobilegis.water.ie/arcgis/services/LA_Enterprise/WaterDistributionNetwork_wms/MapServer/WMSServer';
var waterdisInquiry = 'http://mobilegis.water.ie/arcgis/services/LA_Enterprise/WaterDistributionNetwork_wms/MapServer/WMSServer?request=GetCapabilities';

var stormwater = "http://mobilegis.water.ie/arcgis/services/LA_Enterprise/StormWaterNetwork_wms/MapServer/WMSServer"
var stormwaterInquiry = "http://mobilegis.water.ie/arcgis/services/LA_Enterprise/StormWaterNetwork_wms/MapServer/WMSServer?request=GetCapabilities"

var sewernetwork = "http://mobilegis.water.ie/arcgis/services/LA_Enterprise/SewerStormWaterNetwork_wms/MapServer/WMSServer"
var sewernetworkInquiry = "http://mobilegis.water.ie/arcgis/services/LA_Enterprise/SewerStormWaterNetwork_wms/MapServer/WMSServer?request=GetCapabilities"

var renderedLayers = [];
var renderedWaterLayers = [];
var waterNum = [];
var Num = [];

var map = L.map('map').setView([53.44, -7.50], 7);
map.options.minZoom = 4;
map.options.maxZoom = 20;

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
        else if(layer_load == "waterDis"){
            get_water_layers(waterdisInquiry)
                .then(waterNum => {
                    renderWater(waterNum, waterdis, "waterDis")
                })
                .catch(error => {
                    console.error(error);
                });
        }else if(layer_load == "sewerStorm"){
            get_water_layers(sewernetworkInquiry)
                .then(waterNum => {
                    renderWater(waterNum, sewernetwork, "sewerStorm")
                })
                .catch(error => {
                    console.error(error);
                });
        }else if(layer_load == "stormWater"){
            get_water_layers(stormwaterInquiry)
                .then(waterNum => {
                    renderWater(waterNum, stormwater, "stormwater")
                })
                .catch(error => {
                    console.error(error);
                });
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
        else if(layer_load == "waterDis"){
            unrenderWater(waterdis, "waterDis")
        }
        else if(layer_load == "sewerStorm"){
            unrenderWater(sewernetwork, "sewerStorm")
        }
        else if(layer_load == "stormWater"){
            unrenderWater(stormwater, "stormwater")
        }
    }
})

function get_water_layers(url) {
    const promises = [];

        const promise = fetch(`http://192.168.1.150:8900/get_water_layers/${encodeURIComponent(url)}`)
            .then(response => response.text())
            .then(data => {
                try {
                    const jsonData = JSON.parse(data);
                    return jsonData.titles.length;
                } catch (error) {
                    console.error(error);
                    return 0;
                }
            });
        promises.push(promise);
    
    return Promise.all(promises)
        .then(waterNum => {
            return waterNum;
        });
}
    
function renderWater(Num, water, group){
        for(let x = 0; x < Num; x++){
            var rendered = L.tileLayer.wms(water,{
                layers: x,
                format: 'image/png',
                transparent: true,
                crs: L.CRS.EPSG4326,
                group: group
            }).addTo(map);
            renderedWaterLayers.push(rendered);
        }
    }

function render(layers, geoserver){
    for(let i = 0; i < layers.length; i++){
        var rendered = L.Geoserver.wms(`http://admin:geoserver@192.168.1.150:8001/${geoserver}/wms`,{
            layers: `Utility_stats:${layers[i]}`
        }).addTo(map);
        renderedLayers.push(rendered);
    }
}

function unrenderWater(layer, group){
    for(var i = 0; i < renderedWaterLayers.length; i++){
        if (renderedWaterLayers[i].options.group.includes(group)) {
            map.removeLayer(renderedWaterLayers[i]);
        }
    }
};

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