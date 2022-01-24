const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

// Steps & Progressbar
const steps = document.querySelectorAll(".step");
const progressBar = document.querySelector(".naviguation-progress-bar");
const totalSteps = steps.length;
let activeStep = 1;

const datas = [
    {
        name: "Posters",
        class: "poster-img",
        activeClass: "poster-active",
    },
    {
        name: "Logos",
        class: "presentation-logo",
        activeClass: "logo-active",
    },
    {
        name: "Titles",
        class: "presentation-title",
        activeClass: "title-active",
    },
    {
        name: "Descriptions",
        class: "presentation-description",
        activeClass: "description-active",
    },
];

const updateDate = (currentStep) => {
    const currentDates = document.querySelectorAll(".presentation-date")[currentStep - 1]; // []
    const nextDates = document.querySelectorAll(".presentation-date")[activeStep - 1]; // []

    Array.from(currentDates.children).forEach((currentDate, key) => {
        const currentNbr = currentDate.getAttribute("data-date-number");
        const nextNbr = nextDates.children[key].getAttribute("data-date-number");

        if (currentNbr !== nextNbr) {
            currentDate.classList.remove("date-active", "next");
            currentDate.classList.add("back");
        }
    });

    Array.from(nextDates.children).forEach((nextDate, key) => {
        const currentNbr = nextDate.getAttribute("data-date-number");
        const nextNbr = currentDates.children[key].getAttribute("data-date-number");

        if (currentNbr !== nextNbr) {
            nextDate.classList.add("date-active", "next");
        }
    });
};

const changeDatas = (currentStep, classDirection) => {
    datas.forEach((data) => {
        const currentPoster = document.querySelectorAll(`.${data.class}`)[currentStep - 1];
        const nextPoster = document.querySelectorAll(`.${data.class}`)[activeStep - 1];

        currentPoster.classList.remove(data.activeClass, "next", "back");

        nextPoster.classList.remove("next", "back");
        nextPoster.classList.add(data.activeClass, classDirection);
    });
};

// OnClick next
arrowRight.addEventListener("click", (e) => {
    if (activeStep < totalSteps - 2) {
        // Change progressbar width
        progressBar.style.width =
            parseInt(progressBar.style.width.toString()) + parseInt((activeStep + 1 * 100) / (totalSteps - 1)) + "%";

        // Change color of the current step
        steps[activeStep].querySelector("svg > circle").classList.add("step-circle-active");

        // Incremente activeStep
        activeStep++;

        // Change
        changeDatas(activeStep - 1, "back");
        updateDate(activeStep - 1);

        // Change arrows
        if (activeStep === totalSteps) arrowRight.classList.remove("arrow-active");
        if (activeStep > 1) arrowLeft.classList.add("arrow-active");
    }
});

// OnClick back
arrowLeft.addEventListener("click", (e) => {
    if (activeStep > 1) {
        // Decrement activeStep
        activeStep--;

        // Change color of the current step
        steps[activeStep].querySelector("svg > circle").classList.remove("step-circle-active");

        // Change
        changeDatas(activeStep + 1, "next");
        updateDate(activeStep + 1);

        // Change progressbar width
        progressBar.style.width =
            parseInt(progressBar.style.width.toString()) - parseInt((activeStep + 1 * 100) / (totalSteps - 1)) + "%";

        // Change arrows
        if (activeStep < totalSteps) arrowRight.classList.add("arrow-active");
        if (activeStep === 1) arrowLeft.classList.remove("arrow-active");
    }
});
