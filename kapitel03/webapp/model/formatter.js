sap.ui.define([], function () {
    "use strict";

    var userLanguage = window.navigator.userLanguage || window.navigator.language;

    return {
        calculatePrice: function (sPrice, sCount, sCurrency) {

            var formatter = new Intl.NumberFormat(userLanguage, {
                style: 'currency',
                currency: sCurrency,
                currencyDisplay: 'code'
            
        });
        var iPreis = parseFloat(sPrice);
        var iCount = parseFloat(sCount);
        var iResult = iPreis * iCount;
        return formatter.format(iResult); 
        }
    }

})