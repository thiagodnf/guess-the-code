class InputNumber extends Observable {

    constructor($el) {
        super();

        this.$el = $el;

        const that = this;

        $(document).on("change", "#" + this.$el.attr("id"), function (e) {
            that.onChange(e);
        });

        this.$el.click(function () {
            this.select();
        });

        this.$el.keypress(function (event) {

            if (event.which < 48 || event.which > 57) {
                event.preventDefault();
            }
        });
    }

    onChange() {

        const min = parseInt(this.$el.prop("min"));
        const max = parseInt(this.$el.prop("max"));

        let value = parseInt(this.$el.val());

        if (isNaN(value) || value < min) {
            this.$el.val(min);
        }
        if (value > max) {
            this.$el.val(max);
        }

        value = parseInt(this.$el.val());

        this.trigger("change", value);
    }

    get value() {
        return parseInt(this.$el.val());
    }

    set value(val) {
        this.$el.val(val);
    }
}
