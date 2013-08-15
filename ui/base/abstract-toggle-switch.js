/*global require, exports*/

/**
    @module montage/ui/base/abstract-toggle-switch.reel
    @requires montage/core/core
    @requires montage/ui/component
    @requires montage/ui/native-control
    @requires montage/composer/press-composer
*/
var Montage = require("montage").Montage,
    AbstractControl = require("ui/base/abstract-control").AbstractControl,
    PressComposer = require("composer/press-composer").PressComposer;

/**
 * @class AbstractToggleSwitch
 * @extends AbstractControl
 * @fires AbstractToggleSwitch#action
 */
var AbstractToggleSwitch = exports.AbstractToggleSwitch = AbstractControl.specialize( /** @lends AbstractToggleSwitch# */ {

    /**
     * Dispatched when the switch is toggled through a mouse click, finger tap,
     * or when focused and the spacebar is pressed.
     * @event action
     * @memberof AbstractToggleSwitch
     * @property {Dict} detail - The detail object as defined in {@link AbstractControl#detail}
     */

    /** 
     * @private
     */
    constructor: {
        value: function AbstractToggleSwitch() {
            if(this.constructor === AbstractToggleSwitch) {
                throw new Error("AbstractToggleSwitch cannot be instantiated.");
            }
            AbstractControl.constructor.call(this); // super
            this._pressComposer = new PressComposer();
            this.addComposer(this._pressComposer);

            this.defineBinding("classList.has('montage-ToggleSwitch--checked')", {"<-": "checked"});
        }
    },

    // TODO: enabled, preventFocus

    _pressComposer: {
        value: null
    },

    _checked: {
        value: false
    },

    checked: {
        get: function() {
            return this._checked;
        },
        set: function(value) {
            this._checked = value;
            this.needsDraw = true;
        }
    },

    prepareForActivationEvents: {
        value: function() {
            this._pressComposer.addEventListener("press", this, false);
        }
    },

    /**
     * Called when the user has interacted with the toggle switch.
     * @private
     */
    handlePress: {
        value: function(event) {
            this.checked = !this.checked;
            this.dispatchActionEvent();
        }
    },

    handleKeyup: {
        value: function(event) {
            // action event on spacebar
            if (event.keyCode === 32) {
                this.checked = !this.checked;
                this.dispatchActionEvent();
            }
        }
    },

    enterDocument: {
        value: function(firstDraw) {
            this.element.setAttribute("role", "checkbox");
            this.element.addEventListener("keyup", this, false);
        }
    },

    draw: {
        value: function() {
            this.element.setAttribute("aria-checked", this._checked);
        }
    }

});
