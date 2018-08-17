/**
 * Utility class to work with browser cookies
 */
class Cookie {
    /**
     * Method returns value of cookie
     * @param name: Name of cookie
     * @returns value of cookie
     */
    get(name) {
        var result = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return result ? result[2] : null;
    }

    /**
     * Method to set cookie
     * @param name: Name of cookie
     * @param value: Value of cookie
     * @param days: Expiration period in days
     */
    set(name,value,days=365) {
        var d = new Date();
        d.setTime(d.getTime() + 24*60*60*1000*days);
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    }

    /**
     * Method to delete cookie
     * @param name: Name of cookie
     */
    delete(name) {
        this.set(name, '', -1);
    }

}

export default new Cookie();