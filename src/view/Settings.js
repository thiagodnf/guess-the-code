class Settings extends Observable {

    constructor($el) {
        super();

        this.$el = $el;

        this.$language = new InputSelect(this.$el.find("#language"));
        this.$audio = new InputSwitch(this.$el.find("#audio"));
        this.$confetti = new InputSwitch(this.$el.find("#confetti"));

        const that = this;

        this.$el.find("#save").click(function () {

            SettingsUtils.language = that.$language.value;
            SettingsUtils.audio = that.$audio.value;
            SettingsUtils.confetti = that.$confetti.value;

            that.trigger("save");
        });
    }

    load() {

        this.$language.value = SettingsUtils.language;
        this.$audio.value = SettingsUtils.audio;
        this.$confetti.value = SettingsUtils.confetti;

        this.$el.find("input").first().focus();
    }
}
