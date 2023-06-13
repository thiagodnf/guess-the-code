class Settings extends Observable {

    constructor($el) {
        super();

        this.$el = $el;

        this.$sizeInputNumber = new InputNumber(this.$el.find("#size"));
        this.$modeInputSelect = new InputSelect(this.$el.find("#mode"));
        this.$intervalInputInterval = new InputInterval(this.$el.find("#interval"));
        this.$manualsInputDynamic = new InputDynamic(this.$el.find("#manuals"));

        const that = this;

        this.$sizeInputNumber.on("change", function (size) {

            SettingsUtils.size = size;

            that.$manualsInputDynamic.value = Array(size).fill(0);
        });

        this.$modeInputSelect.on("change", function (mode) {

            SettingsUtils.mode = mode;

            if (mode == "random") {
                that.$el.find("#mode-random").removeClass("d-none");
                that.$el.find("#mode-manual").addClass("d-none");
            } else if (mode == "manual") {
                that.$el.find("#mode-manual").removeClass("d-none");
                that.$el.find("#mode-random").addClass("d-none");
            };
        });

        this.$intervalInputInterval.on("change", function (min, max) {

            SettingsUtils.interval = { min, max };
        });

        this.$manualsInputDynamic.on("change", function (values) {

            SettingsUtils.manual = values;
        });

        this.$el.find("#save").click(function () {

            if (SettingsUtils.mode === "manual") {
                SettingsUtils.interval = { min: 0, max: Math.max(...SettingsUtils.manual) };
            }

            that.trigger("save");
        });
    }

    load() {

        this.$sizeInputNumber.value = SettingsUtils.size;
        this.$modeInputSelect.value = SettingsUtils.mode;
        this.$intervalInputInterval.value = SettingsUtils.interval;
        this.$manualsInputDynamic.value = SettingsUtils.manual;

        this.$el.find("input").first().focus();
    }
}
