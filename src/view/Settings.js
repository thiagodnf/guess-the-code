class Settings extends Observable {

    constructor($el) {
        super();

        this.$el = $el;

        this.$language = new InputSelect(this.$el.find("#language"));
        this.$size = new InputInteger(this.$el.find("#size"));
        this.$mode = new InputSelect(this.$el.find("#mode"));
        this.$interval = new InputRange(this.$el.find("#interval"));
        this.$target = new InputDynamic(this.$el.find("#manuals"));
        this.$audio = new InputSwitch(this.$el.find("#audio"));
        this.$repetition = new InputSwitch(this.$el.find("#repetition"));

        const that = this;

        this.$size.on("change", function (size) {

            that.$target.value = size;
        });

        this.$mode.on("change", function (mode) {

            if (mode == "random") {
                that.$el.find("#mode-random").removeClass("d-none");
                that.$el.find("#mode-manual").addClass("d-none");
            } else if (mode == "manual") {
                that.$el.find("#mode-manual").removeClass("d-none");
                that.$el.find("#mode-random").addClass("d-none");
            };
        });

        this.$audio.on("change", function (audio) {
            SettingsUtils.audio = audio;
        });

        this.$repetition.on("change", function (repetition) {
            SettingsUtils.repetition = repetition;
        });

        this.$el.find("#save").click(function () {

            SettingsUtils.size = that.$size.value;
            SettingsUtils.mode = that.$mode.value;
            SettingsUtils.interval = that.$interval.value;
            SettingsUtils.language = that.$language.value;
            SettingsUtils.target = that.$target.value;

            if (SettingsUtils.mode === "manual") {
                SettingsUtils.interval = { min: 0, max: Math.max(...SettingsUtils.target) };
            }

            that.trigger("save");
        });



        // this.$language.on("change", function (language) {

        //     // SettingsUtils.language = language;

        //     console.log("Changing language to", language);

        //     if (language === "ar") {
        //         $("html[lang=en]").attr("dir", "rtl");
        //     } else {
        //         $("html[lang=en]").attr("dir", "ltr");
        //     }

        //     // Define the current language
        //     $.i18n().locale = language;
        //     // Change all text on the webpage
        //     $("body").i18n();
        // });
    }

    load() {

        this.$size.value = SettingsUtils.size;
        this.$mode.value = SettingsUtils.mode;
        this.$interval.value = SettingsUtils.interval;
        this.$language.value = SettingsUtils.language;
        this.$audio.value = SettingsUtils.audio;
        this.$repetition.value = SettingsUtils.repetition;
        this.$target.value = Array(SettingsUtils.size).fill(0);

        this.$el.find("input").first().focus();
    }
}
