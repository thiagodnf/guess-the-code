class SettingsUtils {

    static init() {
        SettingsUtils.theme = "auto";
        SettingsUtils.language = "en_us";
        SettingsUtils.size = 3;
        SettingsUtils.mode = "random";
        SettingsUtils.target = [0, 0, 0];
        SettingsUtils.interval = { min: 0, max: 9 };
    }

    static get theme() {
        return LocalStorageUtils.getObject("theme", "light");
    }

    static set theme(value) {
        return LocalStorageUtils.setItem("theme", value);
    }

    static get language() {
        return LocalStorageUtils.getObject("language", "en_us");
    }

    static set language(value) {
        return LocalStorageUtils.setItem("language", value);
    }

    static get target() {
        return LocalStorageUtils.getObject("target", []);
    }

    static set target(value) {
        return LocalStorageUtils.setItem("target", value);
    }

    static get mode() {
        return LocalStorageUtils.getObject("mode", "random");
    }

    static set mode(value) {
        return LocalStorageUtils.setItem("mode", value);
    }

    static get size() {
        return LocalStorageUtils.getInteger("size", 3);
    }

    static set size(value) {
        return LocalStorageUtils.setItem("size", value);
    }

    static get interval() {
        return LocalStorageUtils.getObject("interval", { min: 0, max: 9 });
    }

    static set interval(value) {
        return LocalStorageUtils.setItem("interval", value);
    }
}
