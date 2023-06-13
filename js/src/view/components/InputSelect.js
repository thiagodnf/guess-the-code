class InputSelect extends Observable {

    constructor($el) {
        super();

        this.$el = $el;

        const that = this;

        $(document).on("change", "#" + this.$el.attr("id"), function (e) {
            that.onChange(e);
        });
    }

    onChange() {

        let mode = this.$el.find("option:selected").val();

        this.trigger("change", mode);
    }

    set value(val) {
        this.$el.find(`option[value=${val}]`).prop("selected", true).trigger("change");
    }
}
