const questions = [
    {
        question: "たぶん何？",
        image: "images/bird.png",
        choices: ["ア","イ","ウ","エ"],
        answer: 2
    },

    {
        question: "たぶん何？",
        image: "images/singou.png",
        choices: ["","","",""],
        answer: 3
    },

    {
        question: "たぶん何？",
        image: "images/tegami.png",
        choices: ["阿形","作業","吽形","江戸川"],
        answer: 1
    },

    {
        question: "たぶん何？",
        image: "images/jojo.png",
        choices: ["結果","根掘り葉掘り","ボルケニオン","覚悟"],
        answer: 3
    },

    {
        question: "たぶん何？",
        image: "images/final.png",
        choices: ["A","B","C","D"],
        answer: 2
    },
]


// 問題表示場所
const quizArea =
    document.querySelector("#quizArea");


// 問題生成
questions.forEach((q, index) => {

    // 問題全体
    const box =
        document.createElement("div");

    box.className = "questionBox";

    // 2問目以降は隠す
    if(index !== 0){

        box.classList.add("hidden");

    }



    // 問題文
    const title =
        document.createElement("div");

    title.className = "questionTitle";

    title.textContent =
        `問題${index + 1} ${q.question}`;

    box.appendChild(title);

    // 画像がある場合
if(q.image){

    const image =
        document.createElement("img");

    image.src = q.image;

    image.className = "questionImage";

    box.appendChild(image);

}


    // 選択肢生成
    q.choices.forEach((choiceText, choiceIndex) => {

        // 選択肢エリア
        const choiceArea =
            document.createElement("div");

        choiceArea.className =
            "choiceArea";


        // ラジオボタン
        const radio =
            document.createElement("input");

        radio.type = "radio";

        radio.name = `q${index}`;


        // 2問目だけ色付き
        if(index === 1){
            if(choiceIndex === 1){
                radio.classList.add("redRadio");
            }else if(choiceIndex === 2){
                radio.classList.add("yellowRadio");
            }else if(choiceIndex === 3){
                radio.classList.add("blueRadio");
            }
        }


        // 選択肢文章
        const choice =
            document.createElement("span");

        choice.className = "choice";

        choice.textContent =
            choiceText;


        // 打消し線
        choice.addEventListener("click", () => {

            choice.classList.toggle(
                "strike"
            );

        });


        // 追加
        choiceArea.appendChild(radio);

        choiceArea.appendChild(choice);

        box.appendChild(choiceArea);

    });


    // 判定ボタン
    const checkButton =
        document.createElement("button");

    checkButton.textContent = "判定";


    // 判定結果
    const result =
        document.createElement("p");


    // 判定処理
    checkButton.addEventListener("click", () => {

        const radios =
            box.querySelectorAll(
                'input[type="radio"]'
            );

        const choices =
            box.querySelectorAll(".choice");


        const correctIndex =
            questions[index].answer;


        // 正しい選択肢が選ばれているか
        const isChecked =
            radios[correctIndex].checked;


        // ===== 5問目 =====
        if(index === 4){

            const hasStrike =
                choices[correctIndex]
                    .classList.contains(
                        "strike"
                    );

            if(isChecked && hasStrike){

                result.textContent =
                    "正解！";

                    // 結果ページへ
                    window.location.href =
                        "result.html";

            }else{

                result.textContent =
                    "不正解";
            }

        }

        // ===== 1〜4問目 =====
        else{

            if(isChecked){

                result.textContent =
                    "正解！";

                // 次の問題を表示
                const nextBox =
                    document.querySelectorAll(
                        ".questionBox"
                    )[index + 1];


                if(nextBox){

                    nextBox.classList.remove(
                        "hidden"
                    );

                    nextBox.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }else{

                result.textContent =
                    "不正解";
            }

        }

    });


    // ボタン追加
    box.appendChild(checkButton);

    box.appendChild(result);


    // 問題追加
    quizArea.appendChild(box);

});