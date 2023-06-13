class SettingsUtils {

    static init() {
        SettingsUtils.locale = "en_us";
        SettingsUtils.size = 3;
        SettingsUtils.mode = "random";
        SettingsUtils.manual = [0, 0, 0];
        SettingsUtils.interval = { min: 0, max: 9 };
    }

    static get locale() {
        return LocalStorageUtils.getObject("locale", "en_us");
    }

    static set locale(value) {
        return LocalStorageUtils.setItem("locale", value);
    }

    static get manual() {
        return LocalStorageUtils.getObject("manual", []);
    }

    static set manual(value) {
        return LocalStorageUtils.setItem("manual", value);
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
