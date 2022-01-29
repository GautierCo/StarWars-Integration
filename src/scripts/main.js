const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

// Steps & Progressbar
const steps = document.querySelectorAll(".step");
const progressBar = document.querySelector(".naviguation-progress-bar");
const totalSteps = steps.length;
let activeStep = 1;
let previousStep;

const updateDate = () => {
    const dates = document.querySelectorAll(`.presentation-date`);
    const nextDates = Array.from(dates[activeStep - 1].children);

    nextDates.forEach((nextDate, key) => {
        const previousDate = dates[previousStep - 1].children[key];
        const previousNbr = dates[previousStep - 1].children[key].getAttribute("data-date-number");
        const nextNbr = dates[activeStep - 1].children[key].getAttribute("data-date-number");

        if (previousNbr !== nextNbr) {
            previousDate.classList.remove("date-out", "date-in", "date-active");

            if (activeStep > previousStep) {
                nextDate.classList.add("date-in");
            } else {
                nextDate.classList.add("date-out");
            }
        }
    });
};

const updatePoster = (nextStep) => {
    const posters = document.querySelectorAll(`.poster-img`);
    const posterContainerWidth = document.querySelector(".poster-imgs").getBoundingClientRect().width;

    posters.forEach((poster) => {
        poster.style.transition = `.255s linear`;
        poster.style.transform = `translateX(${-nextStep * posterContainerWidth}px)`;
    });
};

const updateHeader = (nextStep) => {
    const elements = [
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

    elements.forEach((element, key) => {
        const elements = document.querySelectorAll(`.${element.class}`);
        const elementWidth = document.querySelector(`.${element.class}`).getBoundingClientRect().width;
        const nextElement = elements[activeStep - 1];
        const previousElement = elements[previousStep - 1];

        previousElement.classList.remove(element.activeClass);
        previousElement.style.opacity = 0;

        nextElement.classList.add(element.activeClass);
        nextElement.style.opacity = 1;

        elements.forEach((element) => {
            element.style.transition = `${0.15 + key / 6}s linear`;
            element.style.transform = `translateX(${-nextStep * elementWidth - 15 * nextStep}px)`;
        });
    });
};

const updateColorStep = (action) => {
    if (action === "remove") {
        steps[activeStep].querySelector("svg > circle").classList.remove("step-circle-active");
    } else {
        steps[activeStep].querySelector("svg > circle").classList.add("step-circle-active");
    }
};

const updateProgressBar = (operator) => {
    if (operator === "+") {
        progressBar.style.width =
            parseInt(progressBar.style.width.toString()) + parseInt((activeStep + 1 * 100) / (totalSteps - 1)) + "%";
    } else {
        progressBar.style.width =
            parseInt(progressBar.style.width.toString()) - parseInt((activeStep + 1 * 100) / (totalSteps - 1)) + "%";
    }
};

// OnClick next
arrowRight.addEventListener("click", (e) => {
    if (activeStep < totalSteps - 2) {
        updateColorStep("add");

        previousStep = activeStep;
        activeStep++;

        updateDate();
        updateHeader(activeStep - 1);
        updatePoster(activeStep - 1);
        updateProgressBar("+");

        // Change arrows
        if (activeStep === totalSteps - 2) arrowRight.classList.remove("arrow-active");
        if (activeStep > 1) arrowLeft.classList.add("arrow-active");
    }
});

// OnClick back
arrowLeft.addEventListener("click", (e) => {
    if (activeStep > 1) {
        previousStep = activeStep;
        activeStep--;

        updateColorStep("remove");
        updateDate();
        updateHeader(activeStep - 1);
        updatePoster(activeStep - 1);
        updateProgressBar("-");

        // Change arrows
        if (activeStep < totalSteps) arrowRight.classList.add("arrow-active");
        if (activeStep === 1) arrowLeft.classList.remove("arrow-active");
    }
});
