class DropDownMenu extends Observable {

    constructor($el) {
        super();

        const that = this;

        this.$el = $el;

        this.$options = $el.find("[data-value]");

        this.$options.each(function () {
            $(this).click(function () {
                that.onClick($(this).data("value"));
            });
        });
    }

    onClick(selected) {

        this.setSelected(selected);

        this.trigger("change", selected);
    }

    setSelected(value) {

        const $dropDownToggle = this.$el.find(".dropdown-toggle");
        const $allDropdownItems = this.$el.find(".dropdown-item");
        const $dropdownItemSelected = this.$el.find(`[data-value=${value}]`);

        $allDropdownItems.removeClass("active").find(".bi-check2").addClass("d-none");

        $dropdownItemSelected.addClass("active");
        $dropdownItemSelected.find(".bi-check2").removeClass("d-none");

        $dropDownToggle.find("i").attr("class", $dropdownItemSelected.find("i").first().attr("class"));
    }

    set value(selected) {

        this.setSelected(selected);

        this.trigger("change", selected);
    }
}
