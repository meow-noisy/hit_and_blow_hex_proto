'use strict';


var num_of_array = 5

function number_generator() {
    // Shuffle array
    let array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    const shuffled = array.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    const selected = shuffled.slice(0, num_of_array);

    return selected;
};

var correct_array = number_generator()
var submit_button = document.getElementById("submit_btn");



function count_num_of_hit_and_blow(estimate_array) {

    let hit = 0;
    let blow = 0;

    for (let i = 0, len = estimate_array.length; i < len; ++i) {

        if (estimate_array[i] === correct_array[i]) {
            ++hit;
        }

        if (correct_array.includes(estimate_array[i])) {
            ++blow;
        }
    }

    const result = {
        "hit": hit,
        "blow": blow
    };

    return result;
}

var predict_num_list = []
const predict = document.getElementById("predict");


const reply_click = function () {
    // console.log("Button clicked, id " + this.id);
    if (predict_num_list.length >= num_of_array) {
        return
    }
    let num_to_be_pushed = this.id
    if (predict_num_list.includes(num_to_be_pushed)) {
        return
    }

    predict_num_list.push(this.id);
    predict.innerHTML = predict_num_list

    this.disabled = true;
}



var btns = document.querySelectorAll(".btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", reply_click, false);
}


function clear_result() {
    predict_num_list = []
    predict.innerHTML = "ボタンを押してね。"

    for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = false;
    }

}

var result_text = document.getElementById("result");
function submit_result() {
    let result = count_num_of_hit_and_blow(predict_num_list);
    result_text.innerHTML = `result: hit=${result["hit"]}, blow=${result["blow"]}`
    clear_result()

    console.log(result)
}



submit_button.addEventListener("click", submit_result, false);

var clear_btn = document.getElementById("clear_btn");
clear_btn.addEventListener("click", clear_result, false);


var giveup_btn = document.getElementById("giveup_btn");
giveup_btn.addEventListener("click", () => {
    result_text.innerHTML = "result: ";
    clear_result();
    correct_array = number_generator();
}, false);

