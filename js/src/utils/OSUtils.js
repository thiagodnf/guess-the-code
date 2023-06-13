class OSUtils {

    static isSafari() {
        var userAgent = window.navigator.userAgent;
        return /^((?!chrome|android).)*safari/i.test(userAgent);
    }

    static isiOS() {
        var userAgent = window.navigator.userAgent;
        return /(iPad|iPhone|iPod)/g.test(userAgent);
    }

    static isSafariForiOS() {
        return OSUtils.isSafari() && OSUtils.isiOS();
    }
}
