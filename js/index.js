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

    var valids = getValidNumbers(codes, target);
    var corrects = getCorrectNumbers(codes, target);

    if (valids == 0){
        return "Everthing is wrong!";
    }else if(valids == 1 && corrects == 1){
        return "A valid number in a correct place";
    }else if(valids == 1 && corrects != 1){
        return "A valid number in a wrong place";
    }else if(valids == 2 && corrects == 2){
        return "Two valid numbers in a correct place";
    }else if(valids == 2 && corrects != 2){
        return "Two valid numbers in a wrong place";
    }else if(valids == 3 && corrects != 3){
        return "Three valid numbers in a wrong place";
    }else if(valids == 3 && corrects == 3){
        return "Unlocked!";
    }
}

$(function(){

    var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    var targetCode1 = array.splice(getRandomInteger(0, array.length-1), 1)[0] ;
    var targetCode2 = array.splice(getRandomInteger(0, array.length-1), 1)[0] ;
    var targetCode3 = array.splice(getRandomInteger(0, array.length-1), 1)[0] ;

    targetCode1 = 0;
    targetCode2 = 4;
    targetCode3 = 2;

    var target = [targetCode1, targetCode2, targetCode3];

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

        alert(evaluate([code1, code2, code3], target));

        $("#code-1").select();

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
});
