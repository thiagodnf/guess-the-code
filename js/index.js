function getRandomInteger(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(function(){

    var correctCode1 = getRandomInteger(0, 9);
    var correctCode2 = getRandomInteger(0, 9);
    var correctCode3 = getRandomInteger(0, 9);

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

        var code1 = $(this).find("#code-1").val().trim();
        var code2 = $(this).find("#code-2").val().trim();
        var code3 = $(this).find("#code-3").val().trim();

        alert(code1 + ","+code2+ ","+code3);


        $("#code-1").select();

        return false;
    });
});
