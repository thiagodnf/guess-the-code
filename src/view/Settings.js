class Settings extends Observable {

    constructor($el) {
        super();

        this.$el = $el;

        this.$language = new InputSelect(this.$el.find("#language"));
        this.$audio = new InputSwitch(this.$el.find("#audio"));

        const that = this;

        this.$el.find("#save").click(function () {

            SettingsUtils.language = that.$language.value;
            SettingsUtils.audio = that.$audio.value;

            that.trigger("save");
        });
    }

    load() {

        this.$language.value = SettingsUtils.language;
        this.$audio.value = SettingsUtils.audio;

        this.$el.find("input").first().focus();
    }
}
