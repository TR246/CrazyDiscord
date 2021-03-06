window.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("textarea");
    const buttonReset = document.getElementById("button_reset");
    const buttonConfirm = document.getElementById("button_confirm");
    const box_result = document.getElementById("box_result");
    const buttonCopy = document.getElementById("button_copy");

    let removeCurrentListener = () => {};

    const reset = () => {
        textarea.addEventListener(
            "input",
            (e) => {
                box_result.innerText = "入力記録中";

                let lastInput = e.target.value;
                let lastLength = 0;
                let result = "";

                const onInput = (e) => {
                    const { value } = e.target;
                    if (value == lastInput) {
                        lastLength = value.length;
                    } else if (Math.random() < 0.6) {
                        result += value.slice(lastLength);
                    }
                    lastInput = value;
                };
                textarea.addEventListener("input", onInput);
                removeCurrentListener = () => {
                    textarea.removeEventListener("input", onInput);
                };

                const confirmByEnter = (e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        confirm();
                        e.preventDefault();
                    }
                };
                const confirm = () => {
                    box_result.innerText = result;
                    buttonCopy.disabled = false;
                    textarea.removeEventListener("keypress", confirmByEnter);
                    buttonConfirm.removeEventListener("click", confirm);
                };
                textarea.addEventListener("keypress", confirmByEnter);
                buttonConfirm.addEventListener("click", confirm);
            },
            { once: true }
        );
    };

    buttonReset.addEventListener("click", () => {
        removeCurrentListener();
        textarea.value = "";
        box_result.innerText = "入力してください";
        buttonCopy.disabled = true;
        reset();
    });

    buttonCopy.addEventListener("click", () => {
        /*const tmp = document.createElement("textarea");
        tmp.value = box_result.innerText;
        tmp.select();
        document.execCommand("copy");*/
        document.addEventListener(
            "copy",
            (e) => {
                e.preventDefault();
                e.clipboardData.setData("text/plain", box_result.innerText);
            },
            { once: true }
        );
        document.execCommand("copy");
    });

    reset();
});
