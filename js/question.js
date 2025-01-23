class Question {
    constructor(title) {
        this.title = title;
    }
}

class ImageButton {
    constructor(answerText, ImageButton) {
        this.answerText = answerText;
        this.image = ImageButton;
    }
}

class ButtonQuestion extends Question {
    constructor(title, answers) {
        super(title);
        this.answers = answers;
    }
}

class SliderQuestion extends Question {
    constructor(title, min, max) {
        super(title);
        this.min = min;
        this.max = max;
    }
}