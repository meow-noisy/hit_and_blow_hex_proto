
function number_generator() {
    // Shuffle array
    let array = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    const shuffled = array.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    const selected = shuffled.slice(0, 5);

    return selected;
};

var correct_array = number_generator()


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
    predict_num_list.push(this.id);
    predict.innerHTML = predict_num_list
}



const btns = document.querySelectorAll(".btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", reply_click, false)
}


var result_text = document.getElementById("result");
function submit_result() {
    const result = count_num_of_hit_and_blow(predict_num_list);
    result_text.innerHTML = `result: hit=${result["hit"]}, blow=${result["blow"]}`
    console.log(result)
}

const submit_button = document.getElementById("submit_btn");
submit_button.addEventListener("click", submit_result, false);

