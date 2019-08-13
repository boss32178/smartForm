
export const NumberValidation = (value, wholeNumberMax, decimalNumberMax) => {
    
    let prettyValue =value.replace(/[^\d.]/g, '');
    let splitValue = prettyValue.split(".");
    let cleanValue  = splitValue[0].substring(0,wholeNumberMax);

    if (splitValue.length > 1){
        cleanValue +=  "." + splitValue[1].substring(0,decimalNumberMax);
    };

    return [cleanValue];
};