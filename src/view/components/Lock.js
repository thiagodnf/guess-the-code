class Lock {

    constructor($el) {
        this.$el = $el;
    }

    shake(time = 500) {
        this.$el.effect("shake", {}, time, function () { });
    }

    open() {
        this.$el.find("i").removeClass("bi-lock-fill").addClass("bi-unlock-fill");
    }

    close() {
        this.$el.find("i").removeClass("bi-unlock-fill").addClass("bi-lock-fill");
    }
}
