class Lock {

    constructor($el) {
        this.$el = $el;
    }

    shake(time = 500) {
        this.$el.effect("shake", {}, time, function () { });
    }

    open() {
        this.$el.find("i").removeClass("fa-lock").addClass("fa-lock-open");
    }

    close() {
        this.$el.find("i").removeClass("fa-lock-open").addClass("fa-lock");
    }
}
