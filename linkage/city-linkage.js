var cityLinkage = function () {
    var src = $('script').last().attr('src'),
        json = src.substr(0, src.lastIndexOf('/')) + '/pcas-code.json',
        $province, $city, $county, $street,
        data, sub1, sub2, sub3;

    function action(params) {
        if (params == 'getData') {
            return getData();
        }
        appendDom();
        $.getJSON(json, function (res) {
            data = res;
            fillProvince();
            if (params) {
                params.province && $province.val(params.province);
                fillCity();
                params.city && $city.val(params.city);
                fillCounty();
                params.county && $county.val(params.county);
                fillStreet();
                params.street && $street.val(params.street);
            }
            bindEvent();
        });
    }

    return action;

    function appendDom() {
        $('#city-linkage').html('\
            <select><option value="" disabled selected>请选择省份</option></select>\
            <select><option value="" disabled selected>请选择城市</option></select>\
            <select><option value="" disabled selected>请选择区/县</option></select>\
            <select><option value="" disabled selected>请选择街道</option></select>\
        ');
        $province = $('#city-linkage>select:eq(0)');
        $city = $('#city-linkage>select:eq(1)');
        $county = $('#city-linkage>select:eq(2)');
        $street = $('#city-linkage>select:eq(3)');
    }

    function getData() {
        return {
            province: $province.val(),
            city: $city.val(),
            county: $county.val(),
            street: $street.val()
        };
    }

    function fillProvince() {
        var province = '';
        for (var i = 0; i < data.length; i++) {
            province += '<option value="' + data[i].name + '" sub="' + i + '">' + data[i].name + '</option>';
        }
        $province.append(province);
    }

    function fillCity() {
        var city = '';
        sub1 = $province.find('option:selected').attr('sub');
        for (var i = 0; i < data[sub1].childs.length; i++) {
            city += '<option value="' + data[sub1].childs[i].name + '" sub="' + i + '">' + data[sub1].childs[i].name + '</option>';
        }
        $city.html(city);
    }

    function fillCounty() {
        var county = '';
        sub2 = $city.find('option:selected').attr('sub');
        for (var i = 0; i < data[sub1].childs[sub2].childs.length; i++) {
            county += '<option value="' + data[sub1].childs[sub2].childs[i].name + '" sub="' + i + '">' + data[sub1].childs[sub2].childs[i].name + '</option>';
        }
        $county.html(county);
    }

    function fillStreet() {
        var street = '';
        sub3 = $county.find('option:selected').attr('sub');
        for (var i = 0; i < data[sub1].childs[sub2].childs[sub3].childs.length; i++) {
            street += '<option value="' + data[sub1].childs[sub2].childs[sub3].childs[i].name + '" sub="' + i + '">' + data[sub1].childs[sub2].childs[sub3].childs[i].name + '</option>';
        }
        $street.html(street);
    }

    function bindEvent() {
        $province.on('change', function () {
            fillCity();
            fillCounty();
            fillStreet();
        });
        $city.on('change', function () {
            fillCounty();
            fillStreet();
        });
        $county.on('change', function () {
            fillStreet();
        });
    }
}();