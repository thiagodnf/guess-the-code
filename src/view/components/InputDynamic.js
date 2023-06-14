class InputDynamic extends Observable {

    constructor($el) {
        super();

        this.$el = $el;

        const that = this;

        this.$numbers = [];
    }

    get value() {

        return this.$el.find("input").map(function () {
            return parseInt($(this).val());
        }).get();
    }

    set value(values) {

        const that = this;

        this.$el.empty();

        let id = 0;

        for (const value of values) {
            this.$el.append(`<input id="d-${id++}" type=\"text\" class=\"form-control text-center mx-1 px-0 small\" min=\"0\" max=\"99\" value=\"${value}\" step=\"1\" autocomplete=\"off\" inputmode=\"decimal\">`);
        }

        this.$el.find("input").each(function () {

            let $input = new InputInteger($(this));

            $input.on("change", function () {
                that.trigger("change", that.value);
            });
        });

        this.trigger("change", this.value);
    }
}
