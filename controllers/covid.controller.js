const fs = require('fs');
const moment = require('moment');
var path = require('path');
const json_path = "data/guarda/cases.json";
const covidData = require(`../${json_path}`);
const input_date_format = "DD-MM-YYYY";
const date_format = "ddd DD-MM-YYYY";

const toDate = (date, modify = true) => {
    var date_modified = false;
    if( date.split("-").length == 2 ){
        date = moment(date, "DD-MM");
        date_modified = true;
    }else
    if( date.split("-").length == 3 ){
        date = moment(date, "DD-MM-YYYY");
        date_modified = true;
    }

    if( date_modified && modify){
        date = date.format(date_format);
    }
    return date;
}

exports.register = (req, res) => {
    let total = covidData.length;
    res.json( { "register" : total } )
}

exports.day_more_cases = (req, res) => {
    let active_cases = [];
    covidData.forEach(function(item){
        active_cases.push(item["Total Ativos"]);
    });

    var max = active_cases.reduce(function(a, b) {
        return Math.max(a, b);
    }, -Infinity);

    let date = null;
    covidData.forEach(function(item){
        if (item["Total Ativos"] == max){
            date = item["DATA"]
        }
    });

    date = toDate(date);

    res.json( { "date" : date } )
}
exports.day_less_cases = (req, res) => {
    let active_cases = [];
    covidData.forEach(function(item){
        active_cases.push(item["Total Ativos"]);
    });

    var min = Math.min.apply(null, active_cases)

    let date = null;
    covidData.forEach(function(item){
        if (item["Total Ativos"] == min){
            date = item["DATA"]
        }
    });

    date = toDate(date);

    res.json( { "date" : date } )
}
exports.between_dates = (req, res) => {
    let group = [];
    start_dt = moment(req.params.start_date, input_date_format);
    end_dt = moment(req.params.end_date, input_date_format);

    covidData.forEach(function(item){
        if( toDate(item["DATA"], false) >= start_dt && toDate(item["DATA"], false) <= end_dt ){
            group.push( item )
        }
    });

    res.json( group );
}

exports.set_register = (req, res) => {
    covidData.push(req.body);
    fs.writeFile( path.resolve(json_path) , JSON.stringify(covidData), err => {
        if(err) res.json({"message":"Error"});
        res.json({"message":"New data added"});
    });
}