class MessageBox {

    constructor($el) {
        this.$el = $el;
    }

    empty() {
        this.$el.empty().attr("class", "");
    }

    success(text) {

        this.empty();

        this.$el
            .addClass("alert alert-success text-center")
            .html(text);
    }

    error(text) {

        this.empty();

        this.$el
            .addClass("alert alert-danger text-center")
            .html(text);
    }
}
