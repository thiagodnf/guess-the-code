function showMessage(type, message, attempts){
    $(".output")
        .removeClass("alert-danger")
        .addClass(type)
        .data("language", message)
        .html(message.toLocaleString().replace("{0}", attempts));
}

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

function getRandomInteger(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getValidNumbers(codes, target){

    var total = 0;

    for(var i in codes){
        if(target.includes(codes[i])){
            total++;
        }
    }

    return total;
}

function getCorrectNumbers(codes, target){

    var total = 0;

    for(var i in codes){
        if(codes[i] == target[i]){
            total++;
        }
    }

    return total;
}

function evaluate(codes, target){

    if (hasDuplicates(codes)){
        return "numbers.differents";
    }

    var valids = getValidNumbers(codes, target);
    var corrects = getCorrectNumbers(codes, target);

    if (valids == 0){
        return "everything.is.wrong";
    }else if(valids == 1 && corrects == 1){
        return "valid.number.correct.place";
    }else if(valids == 1 && corrects != 1){
        return "valid.number.wrong.place";
    }else if(valids == 2 && corrects == 2){
        return "two.valid.numbers.correct.place";
    }else if(valids == 2 && corrects != 2){
        return "two.valid.numbers.wrong.place";
    }else if(valids == 3 && corrects != 3){
        return "three.valid.numbers.wrong.place";
    }else if(valids == 3 && corrects == 3){
        return "congratulations";
    }
}

function loadLanguage(){
    $("#btn-unlock").html("unlock".toLocaleString());
    $("#hint").html("type.a.number".toLocaleString())
    $("#modal-challenge-your-friends .modal-title").html("challenge.your.friends".toLocaleString());
    $("#btn-challenge-your-friends").html("challenge.your.friends".toLocaleString());
    $("#label-type-the-code").html("type.the.code".toLocaleString());
    $("#btn-generate-link").html("generate".toLocaleString());
    $("#btn-close").html("close".toLocaleString());

    var key = $(".output").data("language");

    if(key){
        $(".output").html(key.toLocaleString());
    }
}

function encodeCodes(code1, code2, code3){

    var str = code1 + "," + code2 + "," + code3;

    return CryptoJS.AES.encrypt(str, "guess-the-code");
}

function decodeCode(str){

    var decrypted = CryptoJS.AES.decrypt(str, "guess-the-code").toString(CryptoJS.enc.Utf8);

    var s = decrypted.split(",");

    return [parseInt(s[0]), parseInt(s[1]), parseInt(s[2])];
}

function getRandomArray(){

    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    var targetCode1 = array.splice(getRandomInteger(0, array.length-1), 1)[0] ;
    var targetCode2 = array.splice(getRandomInteger(0, array.length-1), 1)[0] ;
    var targetCode3 = array.splice(getRandomInteger(0, array.length-1), 1)[0] ;

    return [targetCode1, targetCode2, targetCode3];
}

$(function(){

    var target = [];
    var attempts = 0;
    var code = location.search.split('code=')[1];

    if(code){
        target = decodeCode(code);
    }else{
        target = getRandomArray();

        console.log("Target: ", target);
    }

    $('#select-language').selectpicker();

    $("#code-1").focus();

    $('#code-1').on('input', function() {
        $("#code-2").select();
    });
    $('#code-2').on('input', function() {
        $("#code-3").select();
    });
    $('#code-3').on('input', function() {
        $("#btn-unlock").focus();
    });

    $('#share-code-1').on('input', function() {
        $("#share-code-2").select();
    });
    $('#share-code-2').on('input', function() {
        $("#share-code-3").select();
    });
    $('#share-code-3').on('input', function() {
        $("#btn-generate-link").focus();
    });

    $('#modal-challenge-your-friends').on('shown.bs.modal', function (e) {
        $(".share-code").val("");
        $("#challenge-link").val("");
        $("#share-code-1").select();
    });

    $('#modal-challenge-your-friends').on('hidde.bs.modal', function (e) {
        $("#code-1").focus();
    });

    $("#form-challenge-your-friends").submit(function(event){

        event.preventDefault();

        var code1 = parseInt($("#share-code-1").val());
        var code2 = parseInt($("#share-code-2").val());
        var code3 = parseInt($("#share-code-3").val());

        if (hasDuplicates([code1,code2,code3])){
            $("#share-code-1").select();
            return alert("numbers.differents".toLocaleString());
        }

        var encrypted = encodeCodes(code1, code2, code3);

        var href = window.location.protocol+ "//"+window.location.host+window.location.pathname+"?code="+encrypted

        $("#challenge-link").val(href).select();

        return false;
    });

    $("#form-unlock").submit(function(event){
        event.preventDefault();

        attempts++;

        var code1 = parseInt($("#code-1").val());
        var code2 = parseInt($("#code-2").val());
        var code3 = parseInt($("#code-3").val());

        var result = evaluate([code1, code2, code3], target);

        if(result == "congratulations"){
            showMessage("alert-success", result, attempts);
            $(".lock").prop( "disabled", true );
            $(".fas").removeClass("fa-lock").addClass("fa-lock-open");
        }else{
            showMessage("alert-danger", result);
            $(".lock-icon").effect( "shake",{}, 500, function(){});
            $("#code-1").select();
        }

        return false;
    });

    $(".codes").keypress( function(event) {
        if(event.which != 13){
            if (event.which <  48 || event.which > 58 ) {
                event.preventDefault();
            }
        }
    });

    $(".share-code").keypress( function(event) {
        if(event.which != 13){
            if (event.which <  48 || event.which > 58 ) {
                event.preventDefault();
            }
        }
    });

    // When click on input, select all the content.
    // Now the use is able just to type the new number
    $('input').each(function(){
        $(this).click(function() {
            this.select();
        });
    });

    // When the user change the language, this should be saved
    // and change the user interface
    $("#select-language").change(function(){
		String.locale = $(this).val();
		localStorage.setItem("locale", String.locale);
        loadLanguage();
        $("#code-1").focus();
    });

    // When load the page, we have to load the last language saved
    var locale = localStorage.getItem("locale");

    if(locale != null){
		String.locale = locale;
	}else{
		String.locale = 'en-US';
    }

    $('#select-language').selectpicker('val', String.locale);

    loadLanguage();

    // Clip the link to clipboard
    new ClipboardJS('.btn');


});
