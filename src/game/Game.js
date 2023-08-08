class Game {

    constructor(target, min = 0, max = 9) {
        this.attempts = 0;
        this.target = target;
        this.min = min;
        this.max = max;

        console.log("Target: ", target);
    }

    length() {
        return this.target.length;
    }

    validate(numbers) {

        const arraySize = numbers.length;

        let valids = 0;
        let corrects = 0;
        let message = "";

        for (let i in numbers) {

            let number = numbers[i];

            if (this.target.includes(number)) {
                valids++;
            }

            if (this.target[i] === number) {
                corrects++;
            }
        }

        if (valids === 0) {
            message = "everything.is.wrong";
        } else if (valids === arraySize && corrects === arraySize) {
            message = "end-game";
        } else if (valids === corrects) {
            message = "valid.numbers.in.correct.places";
        } else if (valids !== corrects) {
            message = "valid.numbers.in.wrong.places";
        }

        return { attempts: this.attempts, valids, corrects, message };
    }

    evaluate(numbers) {

        this.attempts++;

        if (numbers.length !== this.target.length) {
            return "code.has.different.length";
        }

        if (!SettingsUtils.repetition) {

            if (new Set(numbers).size !== arraySize) {
                return "invalid.repeated.numbers";
            }
        }

        return this.validate(numbers);
    }
}
