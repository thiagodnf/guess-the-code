let game = null;

let $modalSettings = null;

let $settings = null;
let $lock = null;
let $messageBox = null;
let $lightDarkMode = null;

function getNumbers($container = $(".number")) {

    return $container.map(function () {

        const number = parseInt(this.value);

        if (isNaN(number)) {
            throw new Error("error-empty-number");
        }

        return number;
    }).get();
}

function resizeWindow() {

    var div = document.getElementById("numbers");

    if (div.offsetHeight < div.scrollHeight || div.offsetWidth < div.scrollWidth) {
        $("#numbers").removeClass("justify-content-center");
    } else {
        if (!OSUtils.isSafariForiOS()) {
            $("#numbers").addClass("justify-content-center");
        }
    }
}

function restartGame() {

    console.debug("Restarting the game");

    const size = SettingsUtils.size;
    const interval = SettingsUtils.interval;

    let target = [];

    if (SettingsUtils.mode === "random") {
        target = RandomUtils.nextCode(size, interval);
    } else {
        target = SettingsUtils.target;
    }

    SettingsUtils.target = target;

    $lock.close();
    $messageBox.empty();
    setNumbersEnabled(true);
    setUnlockButtonVisible(true);

    $("#type-a-number").text($.i18n("type-a-number", interval.min, interval.max));

    game = new Game(target, interval.min, interval.max);

    const $el = $("#numbers");

    $el.empty();

    let id = 0;

    for (let i = 0; i < size; i++) {
        $el.append(`<input type="text" id="n-${id++}" class="form-control number text-center mx-1 px-0" min="${interval.min}" step="1" max="${interval.max}"  tabindex="${i + 1}" autocomplete="off" inputmode="decimal">`);
    }

    $el.find("input").each(function () {
        new InputInteger($(this));
    });

    $el.find(".number").first().focus();
}

function setNumbersEnabled(enabled = true) {
    $("#numbers .number").prop("disabled", enabled);
}

function setUnlockButtonVisible(visible) {

    if (visible) {
        $("#btn-unlock").removeClass("d-none");
        $("#btn-restart").addClass("d-none");
    } else {
        $("#btn-unlock").addClass("d-none");
        $("#btn-restart").removeClass("d-none");
    }
}

$(function () {

    $modalSettings = $("#modal-settings");

    $(window).resize(resizeWindow).trigger("resize");

    if (!LocalStorageUtils.exists("size")) {
        SettingsUtils.init();
    }

    $.i18n.debug = true;

    $.i18n().load({
        en_us: "i18n/en_us.json",
        pt_br: "i18n/pt_br.json",
    }).done(function () {

        $settings.load();

        restartGame();
    });

    $("#btn-restart").click(function (event) {
        event.preventDefault();

        restartGame();

        return false;
    });

    $("#btn-settings").click(function (event) {
        event.preventDefault();

        $modalSettings.modal("show");

        return false;
    });

    $settings = new Settings($modalSettings.find("form"));
    $lock = new Lock($(".lock"));
    $messageBox = new MessageBox($("#message-box"));
    $lightDarkMode = new DropDownMenu($("#light-dark-mode"));

    $lightDarkMode.on("change", function (theme) {

        SettingsUtils.theme = theme;

        $("html").attr("data-bs-theme", theme);
    });

    $lightDarkMode.value = SettingsUtils.theme;

    $settings.on("save", function () {
        $modalSettings.modal("hide");
        restartGame();
    });

    $modalSettings.on("shown.bs.modal", function () {
        $settings.load();
    });

    $("#btn-unlock").click(function (event) {
        event.preventDefault();

        try {

            const numbers = getNumbers();

            var result = game.evaluate(numbers);

            if (result.message == "end-game") {
                $lock.open();
                $messageBox.success($.i18n(result.message, result.attempts));
                setNumbersEnabled(false);
                setUnlockButtonVisible(false);
            } else {
                $lock.shake();
                $messageBox.error($.i18n(result.message, result.valids));
                $("#numbers").find(".number").first().focus();
            }

        } catch (error) {
            $messageBox.error($.i18n(error.message));
        }

        return false;
    });
});