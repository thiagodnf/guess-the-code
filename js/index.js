function showMessage(type, message){
    $(".output")
        .removeClass("alert-danger")
        .addClass(type)
        .data("language", message)
        .html(message.toLocaleString());
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

    var key = $(".output").data("language");

    if(key){
        $(".output").html(key.toLocaleString());
    }
}

$(function(){

    $('#select-language').selectpicker();

    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    var targetCode1 = array.splice(getRandomInteger(0, array.length-1), 1)[0] ;
    var targetCode2 = array.splice(getRandomInteger(0, array.length-1), 1)[0] ;
    var targetCode3 = array.splice(getRandomInteger(0, array.length-1), 1)[0] ;

    var target = [targetCode1, targetCode2, targetCode3];

    console.log("Target: ");
    console.log(target);

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

    $("#form-unlock").submit(function(event){
        event.preventDefault();

        var code1 = parseInt($(this).find("#code-1").val());
        var code2 = parseInt($(this).find("#code-2").val());
        var code3 = parseInt($(this).find("#code-3").val());

        var result = evaluate([code1, code2, code3], target);

        if(result == "congratulations"){
            showMessage("alert-success", result);
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
        if (event.which <  48 || event.which > 58) {
            event.preventDefault();
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
});
