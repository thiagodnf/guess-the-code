let game = null;

let $modalSettings = null;
let $modalNewGame = null;

let $settings = null;
let $newGame = null;

let $lock = null;
let $messageBox = null;
let $lightDarkMode = null;
let $audio = {
    WINNER: null,
    WRONG: null
};

function changeLanguageTo(language) {

    console.log("Changing language to", language);

    if (language === "ar") {
        $("html[lang=en]").attr("dir", "rtl");
    } else {
        $("html[lang=en]").attr("dir", "ltr");
    }

    // Define the current language
    $.i18n().locale = language;
    // Change all text on the webpage
    $("body").i18n();
}

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

function setColorTheme(colorTheme) {
    $("html").attr("data-bs-theme", colorTheme);
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

function getSystemColorTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function loadAudio(files = []) {

    let sound = new Howl({
        src: files,
        volume: 0.5,
        html5: true
    });

    // Fires when the sound finishes playing.
    sound.on("end", function () {
        console.log("Finished!");
    });

    return sound;
}

function playAudioEffect(audio) {

    if (!SettingsUtils.audio) {
        return;
    }

    audio.play();
}

function showConfetti() {

    if (!SettingsUtils.showConfetti) {
        return;
    }

    confetti({
        particleCount: 300,
        spread: 70,
        origin: { y: 0.3 },
    });
}

$(function () {

    $audio.WRONG = loadAudio("audio/wrong.mp3");
    $audio.WINNER = loadAudio("audio/winner.mp3");

    $modalSettings = $("#modal-settings");
    $modalNewGame = $("#modal-new-game");

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
        $newGame.load();

        changeLanguageTo(SettingsUtils.language);

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

    $("#btn-new-game").click(function (event) {
        event.preventDefault();

        $modalNewGame.modal("show");

        return false;
    });

    $settings = new Settings($modalSettings.find("form"));
    $newGame = new NewGame($modalNewGame.find("form"));

    $lock = new Lock($(".lock"));
    $messageBox = new MessageBox($("#message-box"));
    $lightDarkMode = new DropDownMenu($("#light-dark-mode"));

    $lightDarkMode.on("change", function (theme) {

        SettingsUtils.theme = theme;

        if (SettingsUtils.theme === "auto") {
            setColorTheme(getSystemColorTheme());
        } else {
            setColorTheme(theme);
        }
    });

    $lightDarkMode.value = SettingsUtils.theme;

    if (SettingsUtils.theme === "auto") {
        setColorTheme(getSystemColorTheme());
    }

    $newGame.on("save", function () {
        $modalNewGame.modal("hide");
        restartGame();
    });
    $settings.on("save", function () {
        $modalSettings.modal("hide");
        changeLanguageTo(SettingsUtils.language);
    });

    $modalSettings.on("shown.bs.modal", function () {
        $settings.load();
    });
    $modalNewGame.on("shown.bs.modal", function () {
        $newGame.load();
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
                playAudioEffect($audio.WINNER);
                showConfetti();
                setUnlockButtonVisible(false);
            } else {
                $lock.shake();
                $messageBox.error($.i18n(result.message, result.valids));
                playAudioEffect($audio.WRONG);
                $("#numbers").find(".number").first().focus().select();
            }

        } catch (error) {
            $lock.shake();
            $messageBox.error($.i18n(error.message));
            playAudioEffect($audio.WRONG);
        }

        return false;
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {

        if (SettingsUtils.theme === "auto") {
            setColorTheme(getSystemColorTheme());
        }
    });

    $(document).on("keypress", "#numbers .number", function (e) {

        if (e.which == 13) {

            const next = $(e.target).next();

            if (next.length !== 0) {
                next.focus().select();
            } else {
                $("#btn-unlock").trigger("click");
            }
        }
    });
});
