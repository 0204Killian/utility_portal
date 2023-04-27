

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



/**enforces constraints for an input of type text that forces the entry 
 * of values between 0 and 1 to be accepted. 
 * 
 * precision of 2 decimal points. 
 * 
 * e.g 0.65 is accepted but not 0.655.
 */
function PercSplitConstraintsEnforcer(inp) {
    if (inp.value != 1) {
        if (!/^0+$/.test(inp.value) && !/^0[.]\d{0,2}$/.test(inp.value)) {
            if (inp.value.length == 1) {
                inp.value = 0;
            }
            else {
                // get all chars that are digits or .
                let testString = inp.value.replace(/[^\d.]/, '');
                
                // if two dots are present
                let dots = testString.match(/[.]/g) || []
                if (dots.length > 1) {
                    let ind = inp.value.indexOf(".") == 0 ? 0 : inp.value.lastIndexOf(".");
                    testString = testString.split('');
                    testString[ind] = ''
                    testString = testString.join('')
                }

                // try salvage . followed by 1-2 digits
                let dotOneOrMore = /[.]\d{1,2}/
                test = testString.match(dotOneOrMore) || [];
                if (test.length > 0) {
                    inp.value = "0" + test[0];
                }
                else {
                    // try salvage 0 followed by . followed by 0-2 digits
                    let zeroDotZeroOrMore = /0[.]\d{0,2}/
                    test = testString.match(zeroDotZeroOrMore) || [];
                    if (test.length > 0) {
                        inp.value = test[0];
                    }
                    else {
                        // try salvage zero
                        let zero = /0/
                        test = testString.match(zero) || [];
                        if (test.length > 0) {
                            inp.value = "0"
                        }
                        // reset
                        else{
                            inp.value = ""
                        }
                    }
                }
            }
        }

        // if value ends in 0 and has a digit (1-9) preceeding the 0
        // remove said 0 (last char)
        if (/^0.[1-9]{1}0$/.test(inp.value)) {
            inp.value = inp.value.slice(0, -1);
        }
    }
}
