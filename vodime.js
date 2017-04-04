


document.addEventListener("DOMContentLoaded", function (evt) {
    console.log("Event Finish: ", evt);
    var count = {
        step: 1, // - step
        end: false, // next step
        steps: {// steps actions on elements
            1: document.getElementById("txt_auction_name"),
            2: document.getElementById("txt_auction_description"),
            3: document.getElementById("txt_date_start"),
            4: document.getElementById("txt_time_start_hour"),
            5: document.getElementById("txt_time_start_min"),
            6: document.getElementById("txt_validationperiod"),
            7: document.getElementById("second_announcement"),
            8: document.getElementById("sel_status"),
            9: document.getElementById("sel_sellingtype")
        },
        infos: {
            1: "Information for step 1",
            2: "Second info",
            3: "Third information",
            4: "Fourth",
            5: "Five",
            6: "Six",
            7: "Seventh"
        },
        responses: {},
        onoffer: document.getElementById("pomoshnik")
    };
    count.onoffer.addEventListener("change", function (evt) {
        if (evt.target.checked) {

            var helper = new Promise((resolve, reject) => {
                var firstStepEl$ = count.steps[count.step];
                (count.step == 1) ? applyBorderAndTitleOnThisEl(firstStepEl$) : reject(count);
                resolve(count);
            });
            function executeInfoForStep(stepNum) {
                removeBorderOnLastElement(count.steps[ (stepNum > 1) ? stepNum - 1 : stepNum ]);
                applyBorderAndTitleOnThisEl(count.steps[stepNum]);
                count.step += 1;
            }
            function removeBorderOnLastElement(numEl) {
                numEl.style.border = "";
            }
            function applyBorderAndTitleOnThisEl(el) {
                el.style.border = "2px solid red";
                el.title = count.infos[count.step];
                el.focus();
            }
            Object.values(count.steps)
                    .forEach(el$ => el$.addEventListener("blur", evt => count.responses[count.step > 1 ? count.step - 1 : count.step] = evt.target.value));
            document.getElementById("frm_auction")
                    .addEventListener("keypress", function (evt) {
                        if (evt.keyCode === 13) {
                            helper.then(result => {
                                if (result.step <= Object.keys(count.steps).length) {
                                    executeInfoForStep(count.step);
                                    return result;
                                }
                                else {
                                    count.step = 1;
                                    removeBorderOnLastElement(count.steps[Object.keys(count.steps).length]);
                                    return result;
                                }
                            })
                                    .catch(exc => console.log("Exception in Promise: %s", exc));
                        }
                    });
        }
        else {
            count.steps[count.step].style.border = "";
            count.step = 1;
        }
    })


});