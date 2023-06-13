class Settings extends Observable {

    constructor($el) {
        super();

        this.$el = $el;

        this.$language = new InputSelect(this.$el.find("#language"));
        this.$size = new InputInteger(this.$el.find("#size"));
        this.$mode = new InputSelect(this.$el.find("#mode"));
        this.$interval = new InputRange(this.$el.find("#interval"));
        this.$target = new InputDynamic(this.$el.find("#manuals"));

        const that = this;

        this.$size.on("change", function (size) {

            SettingsUtils.size = size;

            that.$target.value = Array(size).fill(0);
        });

        this.$mode.on("change", function (mode) {

            SettingsUtils.mode = mode;

            if (mode == "random") {
                that.$el.find("#mode-random").removeClass("d-none");
                that.$el.find("#mode-manual").addClass("d-none");
            } else if (mode == "manual") {
                that.$el.find("#mode-manual").removeClass("d-none");
                that.$el.find("#mode-random").addClass("d-none");
            };
        });

        this.$interval.on("change", function (min, max) {

            SettingsUtils.interval = { min, max };
        });

        this.$target.on("change", function (values) {

            SettingsUtils.target = values;
        });

        this.$el.find("#save").click(function () {

            if (SettingsUtils.mode === "manual") {
                SettingsUtils.interval = { min: 0, max: Math.max(...SettingsUtils.target) };
            }

            that.trigger("save");
        });

        this.$language.on("change", function (language) {

            SettingsUtils.language = language;

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
        });
    }

    load() {

        this.$size.value = SettingsUtils.size;
        this.$mode.value = SettingsUtils.mode;
        this.$interval.value = SettingsUtils.interval;
        this.$target.value = SettingsUtils.target;
        this.$language.value = SettingsUtils.language;

        this.$el.find("input").first().focus();
    }
}
