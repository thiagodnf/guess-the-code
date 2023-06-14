class InputRange extends Observable {

    constructor($el) {
        super();

        this.$el = $el;
        this.$min = new InputInteger($el.find("#interval-min"));
        this.$max = new InputInteger($el.find("#interval-max"));

        const that = this;

        this.$min.on("change", function (min) {
            that.onChangeMin(min);
        });

        this.$max.on("change", function (max) {
            that.onChangeMax(max);
        });
    }

    onChangeMin(min) {

        if (min > this.$max.value) {
            this.$min.value = this.$max.value;
        }

        this.trigger("change", this.$min.value, this.$max.value);
    }

    onChangeMax(max) {

        if (max < this.$min.value) {
            this.$max.value = this.$min.value;
        }

        this.trigger("change", this.$min.value, this.$max.value);
    }

    set value(val = { min: 0, max: 9 }) {
        this.$min.value = val.min;
        this.$max.value = val.max;
        this.trigger("change", this.$min.value, this.$max.value);
    }

    get value() {
        return {
            min: this.$min.value,
            max: this.$max.value
        };
    }
}
