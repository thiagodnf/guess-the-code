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

            that.$target.value = Array(size).fill(0);
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

        this.$el.find("#save").click(function () {

            SettingsUtils.size = that.$size.value;
            SettingsUtils.mode = that.$mode.value;
            SettingsUtils.interval = that.$interval.value;
            SettingsUtils.language = that.$language.value;
            SettingsUtils.target = that.$target.value;
            SettingsUtils.repetition = that.$repetition.value;
            SettingsUtils.audio = that.$audio.value;

            if (SettingsUtils.mode === "manual") {

                let max = Math.max(...SettingsUtils.target);

                SettingsUtils.interval = { min: 0, max: Math.max(max, 9) };
            }

            that.trigger("save");
        });
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
