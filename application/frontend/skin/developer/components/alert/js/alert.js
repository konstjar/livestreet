/**
 * Alert
 *
 * @module ls/alert
 *
 * @license   GNU General Public License, version 2
 * @copyright 2013 OOO "ЛС-СОФТ" {@link http://livestreetcms.com}
 * @author    Denis Shakhov <denis.shakhov@gmail.com>
 */

$.widget( "livestreet.lsAlert", {
    /**
     * Дефолтные опции
     */
    options: {
        // Селекторы
        selectors: {
            // Кнопка закрывающая уведомление
            close: '[data-type=alert-close]'
        },
        // Анимация при скрытии
        hide: {
            effect: 'fade',
            duration: 200
        }
    },

    /**
     * Конструктор
     *
     * @constructor
     * @private
     */
    _create: function() {
        this.closeButton = this.element.find( this.option( 'selectors.close' ) );

        this._on( this.closeButton, { 'click': this.hide } );
    },

    /**
     * Скрывает уведомление
     */
    hide: function () {
        this.element.hide( this.option( 'hide' ) );
    }
});