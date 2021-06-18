'use strict';


var submit_button = document.getElementById("message");


var num_of_array = 5
var predict_num_list = []

var submit_button = document.getElementById("submit_btn");
const predict = document.getElementById("predict");
var message = document.getElementById("message");
var btns = document.querySelectorAll(".btn");
var history_table = document.getElementById("history");
var history_table_body = history_table.getElementsByTagName("tbody")[0];
var result_text = document.getElementById("result");
var clear_btn = document.getElementById("clear_btn");
var giveup_btn = document.getElementById("giveup_btn");


// 当ててほしい数を生成する
function number_generator() {
    // Shuffle array
    let array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    const shuffled = array.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    const selected = shuffled.slice(0, num_of_array);

    return selected;
};
var correct_array = number_generator()

// hit数, blow数を計算する
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


// 数字ボタンを押した時
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
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", reply_click, false);
}


function add_history(predict, hit, blow) {
    let row = document.createElement("tr");

    let list = [predict, hit, blow];

    for (var j = 0; j < 3; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var cellText = document.createTextNode(list[j]);
        cell.appendChild(cellText);
        row.appendChild(cell);
    }
    history_table_body.appendChild(row);
}


function delete_history() {

    let rows = history_table.getElementsByTagName('tbody')[0].getElementsByTagName('tr')
    for (let i = rows.length - 1; i >= 0; i--) {
        history_table.getElementsByTagName('tbody')[0].deleteRow(i);
    }
}


// clearボタンを押した時
function clear_result() {
    predict_num_list = []
    predict.innerHTML = "ボタンを押してね。"

    for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = false;
    }

}
clear_btn.addEventListener("click", clear_result, false);


function game_clear_state() {
    for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
    }
    submit_button.disabled = true;
    clear_btn.disabled = true;
    giveup_btn.innerHTML = "play again"
    message.innerHTML = "Congratulations!"
}

// submitボタンを押した時
function submit_result() {
    let result = count_num_of_hit_and_blow(predict_num_list);
    result_text.innerHTML = `result: hit=${result["hit"]}, blow=${result["blow"]}`
    add_history(predict_num_list, result["hit"], result["blow"])
    clear_result()

    if (result["hit"] === num_of_array) {
        game_clear_state();
    }

    console.log(result)
}
submit_button.addEventListener("click", submit_result, false);


function reset_state() {
    result_text.innerHTML = "result: ";
    giveup_btn.innerHTML = "give up"
    message.innerHTML = ""
    clear_result();
    delete_history();
    submit_button.disabled = false;
    clear_btn.disabled = false;
    correct_array = number_generator();
}

// give up ボタンを押した時
giveup_btn.addEventListener("click", reset_state, false);



