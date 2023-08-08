class InputSwitch extends Observable {

    constructor($el) {
        super();

        this.$el = $el;

        const that = this;

        $(document).on("change", "#" + this.$el.attr("id"), function (e) {
            that.onChange(e);
        });
    }

    onChange() {

        let mode = this.$el.is(":checked");

        this.trigger("change", mode);
    }

    get value() {
        return this.$el.is(":checked");
    }

    set value(val) {
        this.$el.prop("checked", val).trigger("change");
    }
}
