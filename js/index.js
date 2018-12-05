function getRandomInteger(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isEverythingWrong(codes, target){

    for(var i in codes){
        if(target.includes(codes[i])){
            return false;
        }
    }

    return true;
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

function rightPlace(codes, target){

    for(var i in codes){
        if(codes[i] == target[i]){
            return true;
        }
    }

    return false;
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
    }else if(valids == 1){
        if(rightPlace(codes, target)){
            return "A correct number in a correct place";
        }else{
            return "A correct number in a wrong place";
        }
    }else if(valids == 2){
        if(rightPlaceTwoNumbers(codes, target)){
            return "Two correct number in a correct place";
        }else{
            return "Two correct number in a wrong place";
        }
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

console.log(target)
    $("#form-unlock").submit(function(event){
        event.preventDefault();

        var code1 = parseInt($(this).find("#code-1").val());
        var code2 = parseInt($(this).find("#code-2").val());
        var code3 = parseInt($(this).find("#code-3").val());

        var correct = 0;

        if(code1 == targetCode1){
            correct++;
        }
        if(code2 == targetCode2){
            correct++;
        }
        if(code3 == targetCode3){
            correct++;
        }

        if(correct == 3){
            alert("Unlocked!");
        }else{
            alert(evaluate([code1, code2, code3], target));
        }

        $("#code-1").select();

        return false;
    });
});
