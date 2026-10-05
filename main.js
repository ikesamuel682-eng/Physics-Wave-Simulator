/* ==========================================================================
   WAVE LAB — INTERACTIVE PHYSICS SIMULATOR
   ========================================================================== */


/* ==========================================================================
   INTRO / DR. WAVE TUTOR
   ========================================================================== */

const introOverlay = document.getElementById("introOverlay");
const introSlideText = document.getElementById("introSlideText");
const introNextBtn = document.getElementById("introNextBtn");
const introQuiz = document.getElementById("introQuiz");
const introSlides = document.getElementById("introSlides");
const quizCompleteCard = document.getElementById("quizCompleteCard");
const startExploringBtn = document.getElementById("startExploringBtn");

const tutorSlides = [

    "Hi! I'm Dr. Wave, and I'll be your guide today. Waves are everywhere — in water, sound, light, and radio signals. Let's learn the basics before you start experimenting!",

    "Every wave has an AMPLITUDE — how tall it is. A bigger amplitude means the wave carries more energy.",

    "Every wave also has a FREQUENCY — how many cycles pass a point each second. Higher frequency means the cycles are packed closer together.",

    "Wave speed, frequency, and wavelength are connected by v = fλ. You can change one variable and watch the others respond. Let's check what you've learned!"

];

let slideIndex = 0;


/* --------------------------------------------------------------------------
   Initial Tutor Message
   -------------------------------------------------------------------------- */

if (introSlideText) {
    introSlideText.textContent = tutorSlides[0];
}


/* --------------------------------------------------------------------------
   Tutor Next Button
   -------------------------------------------------------------------------- */

if (introNextBtn) {

    introNextBtn.addEventListener("click", () => {

        playClickSound();

        slideIndex++;

        if (slideIndex < tutorSlides.length) {

            if (introSlideText) {
                introSlideText.textContent =
                    tutorSlides[slideIndex];
            }

        }

        else {

            if (introSlides) {
                introSlides.style.display = "none";
            }

            if (introQuiz) {
                introQuiz.style.display = "block";
            }

            if (introNextBtn) {
                introNextBtn.style.display = "none";
            }

        }

    });

}


/* ==========================================================================
   INTRO QUIZ
   ========================================================================== */

let answeredCount = 0;

const quizQuestions =
    document.querySelectorAll(".quiz-question");


quizQuestions.forEach(question => {

    const correctAnswer =
        question.dataset.answer;

    const feedback =
        question.querySelector(".quiz-feedback");

    question.dataset.answered = "false";


    question.querySelectorAll(".quiz-option")
        .forEach(button => {

            button.addEventListener("click", () => {

                if (question.dataset.answered === "true") return;

                question.dataset.answered = "true";

                answeredCount++;

                playClickSound();


                if (
                    button.dataset.choice ===
                    correctAnswer
                ) {

                    button.classList.add("correct");

                    if (feedback) {

                        feedback.textContent =
                            "✅ Correct!";

                        feedback.style.color =
                            "#7fffb0";

                    }

                }

                else {

                    button.classList.add("incorrect");

                    if (feedback) {

                        feedback.textContent =
                            "Not quite — no worries! You'll see the relationship in action.";

                        feedback.style.color =
                            "#ffcc66";

                    }


                    question.querySelectorAll(".quiz-option")
                        .forEach(option => {

                            if (
                                option.dataset.choice ===
                                correctAnswer
                            ) {

                                option.classList.add("correct");

                            }

                        });

                }


                question.querySelectorAll(".quiz-option")
                    .forEach(option => {

                        option.disabled = true;

                    });


                if (
                    answeredCount >=
                    quizQuestions.length
                ) {

                    setTimeout(() => {

                        if (introOverlay) {

                            introOverlay.style.setProperty(
                                "display",
                                "none",
                                "important"
                            );

                            introOverlay.style.opacity = "0";

                            introOverlay.style.pointerEvents = "none";

                            introOverlay.setAttribute(
                                "aria-hidden",
                                "true"
                            );

                        }


                        if (quizCompleteCard) {

                            quizCompleteCard.style.setProperty(
                                "display",
                                "flex",
                                "important"
                            );

                            quizCompleteCard.style.opacity = "1";

                            quizCompleteCard.style.pointerEvents = "auto";

                            quizCompleteCard.setAttribute(
                                "aria-hidden",
                                "false"
                            );

                        }


                        if (startExploringBtn) {

                            startExploringBtn.style.setProperty(
                                "display",
                                "inline-block",
                                "important"
                            );

                            startExploringBtn.style.opacity = "1";

                            startExploringBtn.style.visibility = "visible";

                            startExploringBtn.style.pointerEvents = "auto";

                            startExploringBtn.disabled = false;

                        }


                        if (
                            typeof mascotSay ===
                            "function"
                        ) {

                            mascotSay(
                                "Excellent! 🎉 You've completed the check. Click Start Exploring and enter the Wave Lab!"
                            );

                        }

                    }, 600);

                }

            });

        });

});


/* ==========================================================================
   START EXPLORING — FIXED TRANSITION
   ========================================================================== */

if (startExploringBtn) {

    startExploringBtn.addEventListener("click", () => {

        playClickSound();


        if (quizCompleteCard) {

            quizCompleteCard.style.setProperty(
                "display",
                "none",
                "important"
            );

            quizCompleteCard.style.opacity = "0";

            quizCompleteCard.style.pointerEvents = "none";

            quizCompleteCard.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        if (introOverlay) {

            introOverlay.style.setProperty(
                "display",
                "none",
                "important"
            );

            introOverlay.style.opacity = "0";

            introOverlay.style.pointerEvents = "none";

            introOverlay.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        document.body.classList.add("lab-started");


        currentMode = "1d";


        if (modeButtons && modeButtons.length) {
            modeButtons.forEach(button => {

                button.classList.remove("active");

                if (
                    button.dataset.mode ===
                    "1d"
                ) {

                    button.classList.add("active");

                }

            });
        }


        updateControlsForMode("1d");

        updateUIReadouts();

        updateEquationDisplay();


        requestAnimationFrame(() => {

            resizeCanvas();

            resize3DCanvas();

            updateUIReadouts();

            updateEquationDisplay();

        });


        setTimeout(() => {

            mascotSay(
                "Welcome to Wave Lab! 🌊 Try clicking the colored numbers in the equation or moving the sliders."
            );

        }, 450);

    });

}


/* ==========================================================================
   ELEMENT REFERENCES
   ========================================================================== */

const modeButtons =
    document.querySelectorAll(".mode-selector button");

const canvas =
    document.getElementById("waveCanvas");

const ctx =
    canvas
        ? canvas.getContext("2d")
        : null;

const canvas3D =
    document.getElementById("canvas3D");

const controls =
    document.querySelector(".controls");

const equationDisplay =
    document.getElementById("equationDisplay");

const polarizationBtn =
    document.getElementById("polarizationBtn");

const emLegend =
    document.getElementById("emLegend");

const stringControls =
    document.getElementById("stringControls");

const soundControls =
    document.getElementById("soundControls");

const radioControls =
    document.getElementById("radioControls");

const fourierControls =
    document.getElementById("fourierControls");

const mascotBubble =
    document.getElementById("mascotBubble");

const challengeBox =
    document.getElementById("challengeBox");

const checkChallengeBtn =
    document.getElementById("checkChallengeBtn");

const challengeFeedback =
    document.getElementById("challengeFeedback");

const amplitudeSlider =
    document.getElementById("amplitudeSlider");

const frequencySlider =
    document.getElementById("frequencySlider");

const speedSlider =
    document.getElementById("speedSlider");

const amplitudeValue =
    document.getElementById("amplitudeValue");

const frequencyValue =
    document.getElementById("frequencyValue");

const speedValue =
    document.getElementById("speedValue");

const experimentVariable =
    document.getElementById("experimentVariable");

const constantVariable =
    document.getElementById("constantVariable");

const experimentMessage =
    document.getElementById("experimentMessage");

const playPauseBtn =
    document.getElementById("playPauseBtn");

const resetBtn =
    document.getElementById("resetBtn");

const playCarBtn =
    document.getElementById("playCarBtn");

const dopplerReadout =
    document.getElementById("dopplerReadout");

const playRadioBtn =
    document.getElementById("playRadioBtn");


/* ==========================================================================
   PHYSICS STATE
   ========================================================================== */

let time = 0;

let waveParams = {

    amplitude: 50,

    frequency: 0.02,

    speed: 0.05,

    wavelength: 0.05 / 0.02

};

let currentMode = "1d";


/* ==========================================================================
   AUDIO / CLICK SOUND
   ========================================================================== */

let audioCtx = null;


function playClickSound() {

    try {

        if (!audioCtx) {

            audioCtx =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }


        if (
            audioCtx.state ===
            "suspended"
        ) {

            audioCtx.resume();

        }


        const oscillator =
            audioCtx.createOscillator();

        const gain =
            audioCtx.createGain();


        oscillator.type = "sine";

        oscillator.frequency.value = 440;


        gain.gain.setValueAtTime(
            0.08,
            audioCtx.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioCtx.currentTime + 0.1
        );


        oscillator.connect(gain);

        gain.connect(
            audioCtx.destination
        );


        oscillator.start();

        oscillator.stop(
            audioCtx.currentTime + 0.1
        );

    } catch (error) {

    }

}


/* ==========================================================================
   BUTTON CLICK SOUNDS
   ========================================================================== */

document.querySelectorAll("button")
    .forEach(button => {

        if (
            button === introNextBtn ||
            button === startExploringBtn ||
            button.classList.contains("quiz-option")
        ) {

            return;

        }


        button.addEventListener(
            "click",
            playClickSound
        );

    });


/* ==========================================================================
   MASCOT / DR. WAVE SPEECH
   ========================================================================== */

function mascotSay(message) {

    if (!mascotBubble) return;

    mascotBubble.textContent =
        message;


    mascotBubble.classList.remove(
        "speech-pop"
    );


    void mascotBubble.offsetWidth;


    mascotBubble.classList.add(
        "speech-pop"
    );

}


/* ==========================================================================
   PHYSICS RELATIONSHIP
   v = fλ
   ========================================================================== */

function calculateWavelength() {

    if (
        waveParams.frequency <= 0
    ) {

        return 0;

    }


    return (
        waveParams.speed /
        waveParams.frequency
    );

}


function calculateSpeed() {

    return (
        waveParams.frequency *
        waveParams.wavelength
    );

}


/* ==========================================================================
   SLIDER HANDLER
   ========================================================================== */

function handleSliderChange(
    changedParam,
    newValue
) {

    waveParams[changedParam] =
        newValue;


    const heldConstant =
        constantVariable
            ? constantVariable.value
            : "none";


    if (
        heldConstant === "speed"
    ) {

        if (
            changedParam ===
            "frequency"
        ) {

            if (
                waveParams.frequency > 0
            ) {

                waveParams.wavelength =
                    waveParams.speed /
                    waveParams.frequency;

            }

        }

    }

    else if (
        heldConstant === "frequency"
    ) {

        if (
            changedParam ===
            "speed"
        ) {

            waveParams.wavelength =
                waveParams.speed /
                waveParams.frequency;

        }

    }

    else if (
        heldConstant ===
        "wavelength"
    ) {

        if (
            changedParam ===
            "frequency"
        ) {

            waveParams.speed =
                waveParams.frequency *
                waveParams.wavelength;


            syncSlider(
                speedSlider,
                waveParams.speed
            );

        }

        else if (
            changedParam ===
            "speed"
        ) {

            if (
                waveParams.wavelength !==
                0
            ) {

                waveParams.frequency =
                    waveParams.speed /
                    waveParams.wavelength;


                syncSlider(
                    frequencySlider,
                    waveParams.frequency
                );

            }

        }

    }

    else {

        if (
            changedParam === "frequency" ||
            changedParam === "speed"
        ) {

            waveParams.wavelength =
                calculateWavelength();

        }

    }


    updateUIReadouts();

    updateEquationDisplay(
        changedParam
    );

    updateExperimentGuide();

    explainParameterChange(
        changedParam
    );

}


/* ==========================================================================
   SAFE SLIDER SYNCHRONIZATION
   ========================================================================== */

function syncSlider(
    slider,
    value
) {

    if (!slider) return;


    const min =
        parseFloat(slider.min);

    const max =
        parseFloat(slider.max);


    const clamped =
        Math.max(
            min,
            Math.min(
                max,
                value
            )
        );


    slider.value =
        clamped;

}


/* ==========================================================================
   UI READOUTS
   ========================================================================== */

function updateUIReadouts() {

    if (amplitudeValue) {

        amplitudeValue.textContent =
            Math.round(
                waveParams.amplitude
            );

    }


    if (frequencyValue) {

        frequencyValue.textContent =
            waveParams.frequency.toFixed(2);

    }


    if (speedValue) {

        speedValue.textContent =
            waveParams.speed.toFixed(2);

    }

}


/* ==========================================================================
   PARAMETER EXPLANATIONS
   ========================================================================== */

function explainParameterChange(
    parameter
) {

    if (
        currentMode !==
        "1d"
    ) {

        return;

    }


    if (
        parameter ===
        "amplitude"
    ) {

        mascotSay(
            "Amplitude controls the height of the wave. Increase it and watch the wave become taller!"
        );

    }

    else if (
        parameter ===
        "frequency"
    ) {

        mascotSay(
            "Frequency controls how rapidly the wave cycles. With speed held constant, higher frequency means shorter wavelength."
        );

    }

    else if (
        parameter ===
        "speed"
    ) {

        mascotSay(
            "Wave speed controls how quickly the disturbance travels. Remember: v = fλ."
        );

    }

}


/* ==========================================================================
   EXPERIMENT GUIDE
   ========================================================================== */

function updateExperimentGuide() {

    const changing =
        experimentVariable
            ? experimentVariable.value
            : "amplitude";


    const constant =
        constantVariable
            ? constantVariable.value
            : "none";


    if (
        changing === constant &&
        constant !== "none"
    ) {

        if (experimentMessage) {

            experimentMessage.textContent =
                "⚠️ A variable cannot be changed and held constant at the same time. Select different options!";

        }

        return;

    }


    let guideText = "";

    let mascotText = "";


    if (
        changing ===
        "frequency" &&
        constant ===
        "speed"
    ) {

        guideText =
            "Observing: With wave speed constant, increasing frequency decreases wavelength because λ = v / f.";

        mascotText =
            "Watch the crests move closer together as frequency increases!";

    }

    else if (
        changing ===
        "amplitude"
    ) {

        guideText =
            "Observing: Changing amplitude changes the height of the wave without directly changing frequency or wave speed.";

        mascotText =
            "Make the amplitude huge and watch the wave grow taller!";

    }

    else if (
        changing ===
        "speed" &&
        constant ===
        "frequency"
    ) {

        guideText =
            "Observing: With frequency constant, increasing wave speed increases wavelength.";

        mascotText =
            "The faster the wave travels, the farther apart the crests become!";

    }

    else if (
        changing ===
        "wavelength" &&
        constant ===
        "frequency"
    ) {

        guideText =
            "Observing: With frequency constant, changing wavelength changes wave speed because v = fλ.";

        mascotText =
            "You're changing wavelength while frequency stays fixed — watch the speed respond!";

    }

    else {

        guideText =
            `Adjusting ${changing.toUpperCase()} while holding ${constant.toUpperCase()} constant. Observe the relationship on screen.`;

        mascotText =
            "Try changing one variable at a time and look for patterns!";

    }


    if (experimentMessage) {

        experimentMessage.textContent =
            guideText;

    }


    mascotSay(
        mascotText
    );

}


/* ==========================================================================
   MODE SYSTEM
   ========================================================================== */

if (modeButtons && modeButtons.length) {
modeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            playClickSound();


            currentMode =
                button.dataset.mode;


            modeButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            updateControlsForMode(
                currentMode
            );

        }
    );

});
}


function updateControlsForMode(
    mode
) {

    if (controls) {

        controls.style.display =
            "flex";

    }


    if (polarizationBtn) {

        polarizationBtn.style.display =
            mode === "3d"
                ? "inline-block"
                : "none";

    }


    if (emLegend) {

        emLegend.style.display =
            mode === "em"
                ? "block"
                : "none";

    }


    if (stringControls) {

        stringControls.style.display =
            mode === "1d"
                ? "block"
                : "none";

    }


    if (soundControls) {

        soundControls.style.display =
            mode === "sound"
                ? "block"
                : "none";

    }


    if (radioControls) {

        radioControls.style.display =
            mode === "radio"
                ? "block"
                : "none";

    }


    if (fourierControls) {

        fourierControls.style.display =
            mode === "fourier"
                ? "block"
                : "none";

    }


    if (challengeBox) {

        challengeBox.style.display =
            mode === "1d"
                ? "block"
                : "none";

    }


    if (mode === "1d") {

        mascotSay(
            "You're in the Wave on a String lab. Click a number in the equation or move a slider!"
        );

    }

    else if (mode === "2d") {

        mascotSay(
            "Click anywhere on the water surface to create ripples!"
        );

    }

    else if (mode === "3d") {

        mascotSay(
            "Rotate the 3D wave with your mouse. Try switching between linear and circular polarization!"
        );

    }

    else if (mode === "em") {

        mascotSay(
            "Here you can see electric and magnetic fields oscillating perpendicular to each other."
        );

    }

    else if (mode === "sound") {

        mascotSay(
            "Watch the wavefronts around the moving car and observe the Doppler effect!"
        );

    }

    else if (mode === "radio") {

        mascotSay(
            "Experiment with AM and FM modulation to see how information can ride on a carrier wave."
        );

    }

    else if (mode === "fourier") {

        mascotSay(
            "Build complex waves by combining simple harmonics!"
        );

    }


    updateEquationDisplay();


    if (
        [
            "1d",
            "sound"
        ].includes(mode)
    ) {

        if (canvas) {
            canvas.style.display = "block";
        }

        if (canvas3D) {
            canvas3D.style.display = "none";
        }

    }

    else {

        if (canvas) {
            canvas.style.display = "none";
        }

        if (canvas3D) {
            canvas3D.style.display = "block";
        }


        init3DScene();


        if (plane3D) {
            plane3D.visible = mode === "2d";
        }

        if (waveGroup3D) {
            waveGroup3D.visible = mode === "3d";
        }

        if (emGroup3D) {
            emGroup3D.visible = mode === "em";
        }

        if (radioGroup3D) {
            radioGroup3D.visible = mode === "radio";
        }

        if (fourierGroup3D) {
            fourierGroup3D.visible = mode === "fourier";
        }


        if (mode === "radio") {
            updateRadioWave3D();
        }

        if (mode === "fourier") {
            updateFourierWave3D();
        }


        resize3DCanvas();

    }

}


/* ==========================================================================
   INITIAL MODE
   ========================================================================== */

if (
    modeButtons.length >
    0
) {

    modeButtons[0].classList.add(
        "active"
    );

}


/* ==========================================================================
   2D CANVAS
   ========================================================================== */

function resizeCanvas() {

    if (
        !canvas ||
        !ctx
    ) {

        return;

    }


    const dpr =
        window.devicePixelRatio ||
        1;


    const rect =
        canvas.getBoundingClientRect();


    if (
        rect.width <= 0 ||
        rect.height <= 0
    ) {

        return;

    }


    canvas.width =
        rect.width *
        dpr;

    canvas.height =
        rect.height *
        dpr;


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}


window.addEventListener(
    "resize",
    resizeCanvas
);


/* ==========================================================================
   3D SCENE
   ========================================================================== */

let renderer3D = null;

let scene3D = null;

let camera3D = null;

let controls3D = null;

let plane3D = null;

let is3DInitialized = false;


function init3DScene() {

    if (
        is3DInitialized ||
        !canvas3D ||
        typeof THREE ===
        "undefined"
    ) {

        return;

    }


    scene3D =
        new THREE.Scene();


    scene3D.background =
        new THREE.Color(
            0x001f3f
        );


    camera3D =
        new THREE.PerspectiveCamera(
            60,
            canvas3D.clientWidth /
                Math.max(
                    canvas3D.clientHeight,
                    1
                ),
            0.1,
            1000
        );


    camera3D.position.set(
        0,
        60,
        100
    );


    renderer3D =
        new THREE.WebGLRenderer({
            canvas: canvas3D,
            antialias: true
        });


    renderer3D.setSize(
        canvas3D.clientWidth,
        canvas3D.clientHeight
    );


    renderer3D.setPixelRatio(
        window.devicePixelRatio ||
        1
    );


    if (
        THREE.OrbitControls
    ) {

        controls3D =
            new THREE.OrbitControls(
                camera3D,
                renderer3D.domElement
            );


        controls3D.enableDamping =
            true;

    }


    const light =
        new THREE.DirectionalLight(
            0xffffff,
            1
        );


    light.position.set(
        50,
        80,
        50
    );


    scene3D.add(
        light
    );


    scene3D.add(
        new THREE.AmbientLight(
            0x404060
        )
    );


    const geometry =
        new THREE.PlaneGeometry(
            100,
            100,
            60,
            60
        );


    const material =
        new THREE.MeshPhongMaterial({
            color: 0x00aaff,
            wireframe: false,
            flatShading: false,
            shininess: 80,
            side: THREE.DoubleSide
        });


    plane3D =
        new THREE.Mesh(
            geometry,
            material
        );


    plane3D.rotation.x =
        -Math.PI / 2;


    scene3D.add(
        plane3D
    );


    init3DWaveObjects();

    init3DEMObjects();

    init3DRadioObjects();

    init3DFourierObjects();


    is3DInitialized =
        true;

}


function resize3DCanvas() {

    if (
        !renderer3D ||
        !camera3D ||
        !canvas3D
    ) {

        return;

    }


    const width =
        canvas3D.clientWidth;


    const height =
        Math.max(
            canvas3D.clientHeight,
            1
        );


    camera3D.aspect =
        width /
        height;


    camera3D.updateProjectionMatrix();


    renderer3D.setSize(
        width,
        height,
        false
    );

}


window.addEventListener(
    "resize",
    resize3DCanvas
);


/* ==========================================================================
   2D RIPPLE SOURCES
   ========================================================================== */

let rippleSources = [];

const MAX_RIPPLE_SOURCES = 5;


const raycaster =
    typeof THREE !== "undefined"
        ? new THREE.Raycaster()
        : null;


const mouse3D =
    typeof THREE !== "undefined"
        ? new THREE.Vector2()
        : null;


if (canvas3D) {

    canvas3D.addEventListener(
        "click",
        event => {

            if (
                currentMode !==
                "2d" ||
                !camera3D ||
                !plane3D ||
                !raycaster ||
                !mouse3D
            ) {

                return;

            }


            const rect =
                canvas3D.getBoundingClientRect();


            mouse3D.x =
                (
                    (event.clientX -
                        rect.left) /
                    rect.width
                ) *
                2 -
                1;


            mouse3D.y =
                -(
                    (event.clientY -
                        rect.top) /
                    rect.height
                ) *
                2 +
                1;


            raycaster.setFromCamera(
                mouse3D,
                camera3D
            );


            const intersects =
                raycaster.intersectObject(
                    plane3D
                );


            if (
                intersects.length >
                0
            ) {

                const point =
                    intersects[0].point;


                const localPoint =
                    plane3D.worldToLocal(
                        point.clone()
                    );


                rippleSources.push({

                    x: localPoint.x,

                    y: localPoint.z,

                    startTime: time

                });


                if (
                    rippleSources.length >
                    MAX_RIPPLE_SOURCES
                ) {

                    rippleSources.shift();

                }


                mascotSay(
                    "🌊 Ripple created! Try clicking several places and watch the waves interfere."
                );

            }

        }
    );

}


function updateRipples() {

    if (!plane3D) return;


    const positions =
        plane3D.geometry
            .attributes
            .position;


    for (
        let i = 0;
        i < positions.count;
        i++
    ) {

        const x =
            positions.getX(i);

        const y =
            positions.getY(i);


        let z = 0;


        for (
            const source of
            rippleSources
        ) {

            const dx =
                x -
                source.x;


            const dy =
                y -
                source.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            const elapsed =
                time -
                source.startTime;


            const decay =
                Math.max(
                    0,
                    1 - distance / 80
                );


            z +=
                waveParams.amplitude *
                0.03 *
                decay *
                Math.sin(
                    waveParams.frequency *
                    10 *
                    distance -
                    elapsed
                );

        }


        positions.setZ(
            i,
            z
        );

    }


    positions.needsUpdate =
        true;


    plane3D.geometry
        .computeVertexNormals();

}


/* ==========================================================================
   3D WAVE
   ========================================================================== */

let waveGroup3D = null;

let waveLine3D = null;

let waveParticles3D = [];

let polarizationMode =
    "linear";


const WAVE_PARTICLE_COUNT =
    60;

const WAVE_LENGTH_3D =
    100;


if (polarizationBtn) {

    polarizationBtn.addEventListener(
        "click",
        () => {

            polarizationMode =
                polarizationMode ===
                "linear"
                    ? "circular"
                    : "linear";


            polarizationBtn.textContent =
                `Polarization: ${
                    polarizationMode ===
                    "linear"
                        ? "Linear"
                        : "Circular"
                }`;


            mascotSay(
                polarizationMode ===
                "linear"
                    ? "Linear polarization means the particles oscillate in one direction."
                    : "Circular polarization makes the oscillation rotate as the wave travels."
            );

        }
    );

}


function init3DWaveObjects() {

    waveGroup3D =
        new THREE.Group();


    const axisGeometry =
        new THREE.BufferGeometry()
            .setFromPoints([

                new THREE.Vector3(
                    -WAVE_LENGTH_3D / 2,
                    0,
                    0
                ),

                new THREE.Vector3(
                    WAVE_LENGTH_3D / 2,
                    0,
                    0
                )

            ]);


    waveGroup3D.add(
        new THREE.Line(
            axisGeometry,
            new THREE.LineBasicMaterial({
                color: 0x445577
            })
        )
    );


    const positions =
        new Float32Array(
            WAVE_PARTICLE_COUNT *
            3
        );


    const geometry =
        new THREE.BufferGeometry();


    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    waveLine3D =
        new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: 0x00e0ff
            })
        );


    waveGroup3D.add(
        waveLine3D
    );


    waveParticles3D = [];


    const particleGeometry =
        new THREE.SphereGeometry(
            1.5,
            12,
            12
        );


    for (
        let i = 0;
        i < WAVE_PARTICLE_COUNT;
        i++
    ) {

        const sphere =
            new THREE.Mesh(
                particleGeometry,
                new THREE.MeshPhongMaterial({
                    color: 0xffffff
                })
            );


        waveGroup3D.add(
            sphere
        );


        waveParticles3D.push(
            sphere
        );

    }


    waveGroup3D.visible =
        false;


    scene3D.add(
        waveGroup3D
    );

}


function updateWave3D() {

    if (!waveLine3D) return;


    const positions =
        waveLine3D.geometry
            .attributes
            .position;


    for (
        let i = 0;
        i < WAVE_PARTICLE_COUNT;
        i++
    ) {

        const t =
            i /
            (
                WAVE_PARTICLE_COUNT -
                1
            );


        const x =
            (
                t -
                0.5
            ) *
            WAVE_LENGTH_3D;


        const phase =
            waveParams.frequency *
            (
                x +
                WAVE_LENGTH_3D / 2
            ) *
            2 -
            time;


        const y =
            waveParams.amplitude *
            0.04 *
            Math.sin(
                phase
            );


        const z =
            polarizationMode ===
            "circular"
                ?
                waveParams.amplitude *
                0.04 *
                Math.cos(
                    phase
                )
                :
                0;


        positions.setXYZ(
            i,
            x,
            y,
            z
        );

        waveParticles3D[i]
            .position
            .set(
                x,
                y,
                z
            );

    }


    positions.needsUpdate =
        true;

}


/* ==========================================================================
   ELECTROMAGNETIC WAVES
   ========================================================================== */

let emGroup3D = null;

let eFieldLine = null;

let bFieldLine = null;

let eArrows = [];

let bArrows = [];


const EM_POINT_COUNT =
    60;

const EM_ARROW_COUNT =
    12;


function init3DEMObjects() {

    emGroup3D =
        new THREE.Group();


    const axisGeometry =
        new THREE.BufferGeometry()
            .setFromPoints([

                new THREE.Vector3(
                    -WAVE_LENGTH_3D / 2,
                    0,
                    0
                ),

                new THREE.Vector3(
                    WAVE_LENGTH_3D / 2,
                    0,
                    0
                )

            ]);


    emGroup3D.add(
        new THREE.Line(
            axisGeometry,
            new THREE.LineBasicMaterial({
                color: 0x445577
            })
        )
    );


    const ePositions =
        new Float32Array(
            EM_POINT_COUNT *
            3
        );


    const eGeometry =
        new THREE.BufferGeometry();


    eGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            ePositions,
            3
        )
    );


    eFieldLine =
        new THREE.Line(
            eGeometry,
            new THREE.LineBasicMaterial({
                color: 0xff4444
            })
        );


    emGroup3D.add(
        eFieldLine
    );


    const bPositions =
        new Float32Array(
            EM_POINT_COUNT *
            3
        );


    const bGeometry =
        new THREE.BufferGeometry();


    bGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            bPositions,
            3
        )
    );


    bFieldLine =
        new THREE.Line(
            bGeometry,
            new THREE.LineBasicMaterial({
                color: 0x4488ff
            })
        );


    emGroup3D.add(
        bFieldLine
    );


    const spacing =
        WAVE_LENGTH_3D /
        (
            EM_ARROW_COUNT -
            1
        );


    for (
        let i = 0;
        i < EM_ARROW_COUNT;
        i++
    ) {

        const x =
            -WAVE_LENGTH_3D / 2 +
            i * spacing;


        const origin =
            new THREE.Vector3(
                x,
                0,
                0
            );


        const eArrow =
            new THREE.ArrowHelper(
                new THREE.Vector3(
                    0,
                    1,
                    0
                ),
                origin,
                1,
                0xff4444,
                3,
                2
            );


        const bArrow =
            new THREE.ArrowHelper(
                new THREE.Vector3(
                    0,
                    0,
                    1
                ),
                origin,
                1,
                0x4488ff,
                3,
                2
            );


        emGroup3D.add(eArrow);

        emGroup3D.add(bArrow);


        eArrows.push({
            arrow: eArrow,
            x: x
        });


        bArrows.push({
            arrow: bArrow,
            x: x
        });

    }


    emGroup3D.visible =
        false;


    scene3D.add(
        emGroup3D
    );

}


function updateEMWaves() {

    if (!eFieldLine) return;


    const ePositions =
        eFieldLine.geometry
            .attributes
            .position;


    const bPositions =
        bFieldLine.geometry
            .attributes
            .position;


    for (
        let i = 0;
        i < EM_POINT_COUNT;
        i++
    ) {

        const t =
            i /
            (
                EM_POINT_COUNT -
                1
            );


        const x =
            (
                t -
                0.5
            ) *
            WAVE_LENGTH_3D;


        const phase =
            waveParams.frequency *
            (
                x +
                WAVE_LENGTH_3D / 2
            ) *
            2 -
            time;


        const field =
            waveParams.amplitude *
            0.04 *
            Math.sin(
                phase
            );


        ePositions.setXYZ(
            i,
            x,
            field,
            0
        );


        bPositions.setXYZ(
            i,
            x,
            0,
            field
        );

    }


    ePositions.needsUpdate =
        true;


    bPositions.needsUpdate =
        true;


    eArrows.forEach(
        item => {

            const phase =
                waveParams.frequency *
                (
                    item.x +
                    WAVE_LENGTH_3D / 2
                ) *
                2 -
                time;


            const e =
                waveParams.amplitude *
                0.04 *
                Math.sin(
                    phase
                );


            const length =
                Math.max(
                    0.01,
                    Math.abs(e)
                );


            item.arrow.setDirection(
                new THREE.Vector3(
                    0,
                    e >= 0
                        ? 1
                        : -1,
                    0
                )
            );


            item.arrow.setLength(
                length,
                length * 0.3,
                length * 0.2
            );

        }
    );


    bArrows.forEach(
        item => {

            const phase =
                waveParams.frequency *
                (
                    item.x +
                    WAVE_LENGTH_3D / 2
                ) *
                2 -
                time;


            const b =
                waveParams.amplitude *
                0.04 *
                Math.sin(
                    phase
                );


            const length =
                Math.max(
                    0.01,
                    Math.abs(b)
                );


            item.arrow.setDirection(
                new THREE.Vector3(
                    0,
                    0,
                    b >= 0
                        ? 1
                        : -1
                )
            );


            item.arrow.setLength(
                length,
                length * 0.3,
                length * 0.2
            );

        }
    );

}


/* ==========================================================================
   3D RADIO WAVES
   ========================================================================== */

let radioGroup3D = null;

let radioCarrierLine3D = null;

let radioEnvelopeTop3D = null;

let radioEnvelopeBottom3D = null;

let radioFieldLine3D = null;

const RADIO_POINT_COUNT =
    180;

const RADIO_LENGTH_3D =
    100;


function init3DRadioObjects() {

    radioGroup3D =
        new THREE.Group();


    const axisGeometry =
        new THREE.BufferGeometry()
            .setFromPoints([

                new THREE.Vector3(
                    -RADIO_LENGTH_3D / 2,
                    0,
                    0
                ),

                new THREE.Vector3(
                    RADIO_LENGTH_3D / 2,
                    0,
                    0
                )

            ]);


    const axis =
        new THREE.Line(
            axisGeometry,
            new THREE.LineBasicMaterial({
                color: 0x445577
            })
        );


    radioGroup3D.add(axis);


    const carrierPositions =
        new Float32Array(
            RADIO_POINT_COUNT *
            3
        );


    const carrierGeometry =
        new THREE.BufferGeometry();


    carrierGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            carrierPositions,
            3
        )
    );


    radioCarrierLine3D =
        new THREE.Line(
            carrierGeometry,
            new THREE.LineBasicMaterial({
                color: 0x00e0ff
            })
        );


    radioGroup3D.add(
        radioCarrierLine3D
    );


    const envelopeTopPositions =
        new Float32Array(
            RADIO_POINT_COUNT *
            3
        );


    const envelopeTopGeometry =
        new THREE.BufferGeometry();


    envelopeTopGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            envelopeTopPositions,
            3
        )
    );


    radioEnvelopeTop3D =
        new THREE.Line(
            envelopeTopGeometry,
            new THREE.LineBasicMaterial({
                color: 0xff9944
            })
        );


    radioGroup3D.add(
        radioEnvelopeTop3D
    );


    const envelopeBottomPositions =
        new Float32Array(
            RADIO_POINT_COUNT *
            3
        );


    const envelopeBottomGeometry =
        new THREE.BufferGeometry();


    envelopeBottomGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            envelopeBottomPositions,
            3
        )
    );


    radioEnvelopeBottom3D =
        new THREE.Line(
            envelopeBottomGeometry,
            new THREE.LineBasicMaterial({
                color: 0xff9944
            })
        );


    radioGroup3D.add(
        radioEnvelopeBottom3D
    );


    const fieldPositions =
        new Float32Array(
            RADIO_POINT_COUNT *
            3
        );


    const fieldGeometry =
        new THREE.BufferGeometry();


    fieldGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            fieldPositions,
            3
        )
    );


    radioFieldLine3D =
        new THREE.Line(
            fieldGeometry,
            new THREE.LineBasicMaterial({
                color: 0x6688ff,
                transparent: true,
                opacity: 0.25
            })
        );


    radioGroup3D.add(
        radioFieldLine3D
    );


    radioGroup3D.visible =
        false;


    scene3D.add(
        radioGroup3D
    );

}


function updateRadioWave3D() {

    if (
        !radioCarrierLine3D ||
        !radioEnvelopeTop3D ||
        !radioEnvelopeBottom3D ||
        !radioFieldLine3D
    ) {

        return;

    }


    const carrierPositions =
        radioCarrierLine3D.geometry
            .attributes
            .position;


    const envelopeTopPositions =
        radioEnvelopeTop3D.geometry
            .attributes
            .position;


    const envelopeBottomPositions =
        radioEnvelopeBottom3D.geometry
            .attributes
            .position;


    const fieldPositions =
        radioFieldLine3D.geometry
            .attributes
            .position;


    const carrierAmplitude =
        Math.min(
            20,
            Math.max(
                6,
                waveParams.amplitude *
                0.18
            )
        );


    const messageAmplitude =
        carrierAmplitude *
        0.55;


    const carrierCycles =
        18;


    const messageCycles =
        2;


    for (
        let i = 0;
        i < RADIO_POINT_COUNT;
        i++
    ) {

        const t =
            i /
            (
                RADIO_POINT_COUNT -
                1
            );


        const x =
            (
                t -
                0.5
            ) *
            RADIO_LENGTH_3D;


        const message =
            Math.sin(
                t *
                Math.PI *
                2 *
                messageCycles -
                time *
                0.35
            );


        let carrierY = 0;

        let envelope = 0;


        if (
            modulationType ===
            "am"
        ) {

            envelope =
                carrierAmplitude +
                messageAmplitude *
                message;


            const carrier =
                Math.sin(
                    t *
                    Math.PI *
                    2 *
                    carrierCycles -
                    time
                );


            carrierY =
                envelope *
                carrier;

        }

        else {

            envelope =
                carrierAmplitude;


            const frequencyShift =
                1 +
                0.45 *
                message;


            const carrier =
                Math.sin(
                    t *
                    Math.PI *
                    2 *
                    carrierCycles *
                    frequencyShift -
                    time
                );


            carrierY =
                envelope *
                carrier;

        }


        carrierPositions.setXYZ(
            i,
            x,
            carrierY,
            0
        );


        envelopeTopPositions.setXYZ(
            i,
            x,
            envelope,
            0
        );


        envelopeBottomPositions.setXYZ(
            i,
            x,
            -envelope,
            0
        );


        const fieldDepth =
            carrierY *
            0.65;


        fieldPositions.setXYZ(
            i,
            x,
            0,
            fieldDepth
        );

    }


    carrierPositions.needsUpdate =
        true;


    envelopeTopPositions.needsUpdate =
        true;


    envelopeBottomPositions.needsUpdate =
        true;


    fieldPositions.needsUpdate =
        true;


    if (
        modulationType ===
        "am"
    ) {

        radioEnvelopeTop3D.visible =
            true;

        radioEnvelopeBottom3D.visible =
            true;

    }

    else {

        radioEnvelopeTop3D.visible =
            false;

        radioEnvelopeBottom3D.visible =
            false;

    }

}


/* ==========================================================================
   3D FOURIER WAVES
   ========================================================================== */

let fourierGroup3D = null;

let fourierHarmonicLines3D = [];

let fourierCombinedLine3D = null;

const FOURIER_POINT_COUNT =
    180;

const FOURIER_LENGTH_3D =
    100;


function init3DFourierObjects() {

    fourierGroup3D =
        new THREE.Group();


    const axisGeometry =
        new THREE.BufferGeometry()
            .setFromPoints([

                new THREE.Vector3(
                    -FOURIER_LENGTH_3D / 2,
                    0,
                    0
                ),

                new THREE.Vector3(
                    FOURIER_LENGTH_3D / 2,
                    0,
                    0
                )

            ]);


    fourierGroup3D.add(
        new THREE.Line(
            axisGeometry,
            new THREE.LineBasicMaterial({
                color: 0x445577
            })
        )
    );


    fourierHarmonicLines3D = [];


    for (
        let h = 0;
        h < 5;
        h++
    ) {

        const positions =
            new Float32Array(
                FOURIER_POINT_COUNT *
                3
            );


        const geometry =
            new THREE.BufferGeometry();


        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                positions,
                3
            )
        );


        const line =
            new THREE.Line(
                geometry,
                new THREE.LineBasicMaterial({
                    color: 0x8888aa,
                    transparent: true,
                    opacity: 0.65
                })
            );


        line.position.z =
            (
                h -
                2
            ) *
            3;


        fourierGroup3D.add(
            line
        );


        fourierHarmonicLines3D.push(
            line
        );

    }


    const combinedPositions =
        new Float32Array(
            FOURIER_POINT_COUNT *
            3
        );


    const combinedGeometry =
        new THREE.BufferGeometry();


    combinedGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            combinedPositions,
            3
        )
    );


    fourierCombinedLine3D =
        new THREE.Line(
            combinedGeometry,
            new THREE.LineBasicMaterial({
                color: 0x00e0ff
            })
        );


    fourierCombinedLine3D.position.z =
        0;


    fourierGroup3D.add(
        fourierCombinedLine3D
    );


    fourierGroup3D.visible =
        false;


    scene3D.add(
        fourierGroup3D
    );

}


function updateFourierWave3D() {

    if (
        !fourierCombinedLine3D ||
        fourierHarmonicLines3D.length ===
        0
    ) {

        return;

    }


    const combinedPositions =
        fourierCombinedLine3D.geometry
            .attributes
            .position;


    const scale =
        0.12;


    const baseCycles =
        2;


    for (
        let h = 0;
        h < fourierHarmonicLines3D.length;
        h++
    ) {

        const line =
            fourierHarmonicLines3D[h];


        const harmonic =
            harmonics[h];


        const positions =
            line.geometry
                .attributes
                .position;


        if (!harmonic) {

            line.visible =
                false;

            continue;

        }


        line.visible =
            harmonic.on &&
            harmonic.amp > 0;


        for (
            let i = 0;
            i < FOURIER_POINT_COUNT;
            i++
        ) {

            const t =
                i /
                (
                    FOURIER_POINT_COUNT -
                    1
                );


            const x =
                (
                    t -
                    0.5
                ) *
                FOURIER_LENGTH_3D;


            const phase =
                t *
                Math.PI *
                2 *
                baseCycles *
                harmonic.n -
                time *
                0.5;


            const y =
                harmonic.amp *
                scale *
                Math.sin(
                    phase
                );


            positions.setXYZ(
                i,
                x,
                y,
                0
            );

        }


        positions.needsUpdate =
            true;

    }


    for (
        let i = 0;
        i < FOURIER_POINT_COUNT;
        i++
    ) {

        const t =
            i /
            (
                FOURIER_POINT_COUNT -
                1
            );


        const x =
            (
                t -
                0.5
            ) *
            FOURIER_LENGTH_3D;


        let total =
            0;


        harmonics.forEach(
            harmonic => {

                if (
                    !harmonic.on ||
                    harmonic.amp <= 0
                ) {

                    return;

                }


                const phase =
                    t *
                    Math.PI *
                    2 *
                    baseCycles *
                    harmonic.n -
                    time *
                    0.5;


                total +=
                    harmonic.amp *
                    Math.sin(
                        phase
                    );

            }
        );


        combinedPositions.setXYZ(
            i,
            x,
            total * scale,
            0
        );

    }


    combinedPositions.needsUpdate =
        true;

}


/* ==========================================================================
   PLAY / PAUSE / RESET
   ========================================================================== */

let isPlaying = true;


if (playPauseBtn) {

    playPauseBtn.addEventListener(
        "click",
        () => {

            isPlaying =
                !isPlaying;


            playPauseBtn.textContent =
                isPlaying
                    ? "Pause"
                    : "Play";


            mascotSay(
                isPlaying
                    ? "The simulation is running!"
                    : "Simulation paused. Look closely at the wave."
            );

        }
    );

}


/* ==========================================================================
   STRING SIMULATION
   ========================================================================== */

const STRING_N =
    100;


let stringY =
    new Array(
        STRING_N
    ).fill(0);


let stringYOld =
    new Array(
        STRING_N
    ).fill(0);


let stringYNew =
    new Array(
        STRING_N
    ).fill(0);


let endType =
    "fixed";


let sourceMode =
    "oscillate";


let pulseActive =
    false;


let pulseTime =
    0;


let manualDragY =
    0;


let isDraggingString =
    false;


/* ==========================================================================
   LABORATORY APPARATUS STATE
   ========================================================================== */

let manualToolY = 0;

let sourceToolDragging = false;

let sourceToolHover = false;


/*
   The apparatus is drawn around the existing string simulation.

   The source remains at stringY[0].
   The end condition remains at stringY[STRING_N - 1].

   Visually this means:
   LEFT  = fixed support
   RIGHT = source/tool

   The string itself is mapped in reverse so the existing physics
   does not need to be rewritten.
*/


function getStringApparatusLayout() {

    if (!canvas) return null;


    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;


    const centerY =
        height * 0.48;


    const leftSupportX =
        Math.max(
            105,
            width * 0.10
        );


    const rightSourceX =
        Math.min(
            width - 105,
            width * 0.90
        );


    return {

        width: width,

        height: height,

        centerY: centerY,

        leftSupportX: leftSupportX,

        rightSourceX: rightSourceX,

        stringStartX: leftSupportX + 42,

        stringEndX: rightSourceX - 42,

        benchY: height * 0.82,

        benchHeight: Math.max(
            55,
            height * 0.18
        )

    };

}


/* ==========================================================================
   APPARATUS DRAWING HELPERS
   ========================================================================== */

function drawRoundedRect(
    context,
    x,
    y,
    width,
    height,
    radius
) {

    const r =
        Math.min(
            radius,
            width / 2,
            height / 2
        );


    context.beginPath();

    context.moveTo(
        x + r,
        y
    );

    context.arcTo(
        x + width,
        y,
        x + width,
        y + height,
        r
    );

    context.arcTo(
        x + width,
        y + height,
        x,
        y + height,
        r
    );

    context.arcTo(
        x,
        y + height,
        x,
        y,
        r
    );

    context.arcTo(
        x,
        y,
        x + width,
        y,
        r
    );

    context.closePath();

}


/* --------------------------------------------------------------------------
   Lab bench
   -------------------------------------------------------------------------- */

function drawLabBench(
    layout
) {

    const benchY =
        layout.benchY;


    const benchHeight =
        layout.benchHeight;


    const gradient =
        ctx.createLinearGradient(
            0,
            benchY,
            0,
            benchY + benchHeight
        );


    gradient.addColorStop(
        0,
        "#56606b"
    );

    gradient.addColorStop(
        0.12,
        "#303841"
    );

    gradient.addColorStop(
        1,
        "#161b20"
    );


    ctx.fillStyle =
        gradient;


    drawRoundedRect(
        ctx,
        28,
        benchY,
        layout.width - 56,
        benchHeight,
        10
    );


    ctx.fill();


    ctx.fillStyle =
        "#89939e";


    drawRoundedRect(
        ctx,
        28,
        benchY,
        layout.width - 56,
        8,
        4
    );


    ctx.fill();


    ctx.fillStyle =
        "rgba(255,255,255,0.08)";


    ctx.fillRect(
        40,
        benchY + 15,
        layout.width - 80,
        2
    );


    /* Bench legs */

    ctx.fillStyle =
        "#20262c";


    ctx.fillRect(
        60,
        benchY + benchHeight - 4,
        18,
        34
    );


    ctx.fillRect(
        layout.width - 78,
        benchY + benchHeight - 4,
        18,
        34
    );

}


/* --------------------------------------------------------------------------
   Fixed support
   -------------------------------------------------------------------------- */

function drawFixedSupport(
    layout
) {

    const x =
        layout.leftSupportX;


    const baseY =
        layout.benchY - 4;


    /* Base */

    const baseGradient =
        ctx.createLinearGradient(
            x - 55,
            baseY - 16,
            x + 55,
            baseY + 12
        );


    baseGradient.addColorStop(
        0,
        "#9da5ad"
    );

    baseGradient.addColorStop(
        0.5,
        "#4d5660"
    );

    baseGradient.addColorStop(
        1,
        "#20262c"
    );


    ctx.fillStyle =
        baseGradient;


    drawRoundedRect(
        ctx,
        x - 58,
        baseY - 16,
        116,
        20,
        5
    );


    ctx.fill();


    /* Vertical post */

    const postGradient =
        ctx.createLinearGradient(
            x - 13,
            0,
            x + 13,
            0
        );


    postGradient.addColorStop(
        0,
        "#20262c"
    );

    postGradient.addColorStop(
        0.35,
        "#9ba4ad"
    );

    postGradient.addColorStop(
        0.6,
        "#59636d"
    );

    postGradient.addColorStop(
        1,
        "#1b2025"
    );


    ctx.fillStyle =
        postGradient;


    drawRoundedRect(
        ctx,
        x - 13,
        105,
        26,
        baseY - 105,
        5
    );


    ctx.fill();


    /* Clamp arm */

    ctx.fillStyle =
        "#626d77";


    drawRoundedRect(
        ctx,
        x - 5,
        layout.centerY - 13,
        55,
        26,
        5
    );


    ctx.fill();


    /* Clamp block */

    ctx.fillStyle =
        "#b2bac1";


    drawRoundedRect(
        ctx,
        x + 36,
        layout.centerY - 22,
        24,
        44,
        5
    );


    ctx.fill();


    /* String attachment */

    ctx.beginPath();

    ctx.arc(
        layout.stringStartX,
        layout.centerY,
        8,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#20252a";

    ctx.fill();


    ctx.beginPath();

    ctx.arc(
        layout.stringStartX,
        layout.centerY,
        4,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#dce2e7";

    ctx.fill();


    /* Support label */

    ctx.fillStyle =
        "rgba(235,240,244,0.86)";

    ctx.font =
        "600 13px Segoe UI";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "FIXED SUPPORT",
        x,
        82
    );

}


/* --------------------------------------------------------------------------
   String itself
   -------------------------------------------------------------------------- */

function drawLaboratoryString(
    layout,
    scale
) {

    const startX =
        layout.stringStartX;


    const endX =
        layout.stringEndX;


    const stringLength =
        endX - startX;


    /* Shadow */

    ctx.beginPath();


    for (
        let i = 0;
        i < STRING_N;
        i++
    ) {

        const t =
            i /
            (
                STRING_N -
                1
            );


        /*
         Reverse mapping:
         index 0 = right/source
         index N-1 = left/fixed support
        */

        const x =
            endX -
            t *
            stringLength;


        const y =
            layout.centerY -
            stringY[i] *
            scale;


        if (i === 0) {

            ctx.moveTo(
                x,
                y + 3
            );

        }

        else {

            ctx.lineTo(
                x,
                y + 3
            );

        }

    }


    ctx.strokeStyle =
        "rgba(0,0,0,0.32)";

    ctx.lineWidth =
        6;

    ctx.stroke();


    /* Main string */

    ctx.beginPath();


    for (
        let i = 0;
        i < STRING_N;
        i++
    ) {

        const t =
            i /
            (
                STRING_N -
                1
            );


        const x =
            endX -
            t *
            stringLength;


        const y =
            layout.centerY -
            stringY[i] *
            scale;


        if (i === 0) {

            ctx.moveTo(
                x,
                y
            );

        }

        else {

            ctx.lineTo(
                x,
                y
            );

        }

    }


    const stringGradient =
        ctx.createLinearGradient(
            0,
            layout.centerY - 3,
            0,
            layout.centerY + 3
        );


    stringGradient.addColorStop(
        0,
        "#f7fbff"
    );

    stringGradient.addColorStop(
        0.45,
        "#b9c8d4"
    );

    stringGradient.addColorStop(
        0.55,
        "#6d7b87"
    );

    stringGradient.addColorStop(
        1,
        "#edf3f7"
    );


    ctx.strokeStyle =
        stringGradient;

    ctx.lineWidth =
        3;

    ctx.stroke();


    /* Equilibrium guide */

    ctx.beginPath();

    ctx.moveTo(
        startX,
        layout.centerY
    );

    ctx.lineTo(
        endX,
        layout.centerY
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.14)";

    ctx.lineWidth =
        1;

    ctx.setLineDash([
        7,
        7
    ]);

    ctx.stroke();

    ctx.setLineDash([]);

}


/* --------------------------------------------------------------------------
   Manual wrench / handle
   -------------------------------------------------------------------------- */

function drawManualTool(
    layout,
    sourceY
) {

    const x =
        layout.rightSourceX;


    const y =
        sourceY;


    ctx.save();

    ctx.translate(
        x,
        y
    );


    ctx.rotate(
        -0.12
    );


    /* Handle shadow */

    ctx.fillStyle =
        "rgba(0,0,0,0.3)";

    drawRoundedRect(
        ctx,
        -10,
        -66,
        20,
        132,
        9
    );

    ctx.fill();


    /* Metal handle */

    const metal =
        ctx.createLinearGradient(
            -10,
            0,
            10,
            0
        );


    metal.addColorStop(
        0,
        "#2d3339"
    );

    metal.addColorStop(
        0.25,
        "#c3cbd2"
    );

    metal.addColorStop(
        0.5,
        "#f0f4f7"
    );

    metal.addColorStop(
        0.75,
        "#89949e"
    );

    metal.addColorStop(
        1,
        "#262c32"
    );


    ctx.fillStyle =
        metal;


    drawRoundedRect(
        ctx,
        -8,
        -62,
        16,
        124,
        7
    );

    ctx.fill();


    /* Wrench head */

    ctx.beginPath();

    ctx.arc(
        0,
        -62,
        21,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#68747e";

    ctx.fill();


    ctx.beginPath();

    ctx.arc(
        0,
        -62,
        11,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#171c21";

    ctx.fill();


    /* Grip */

    ctx.fillStyle =
        "#33404a";


    drawRoundedRect(
        ctx,
        -12,
        40,
        24,
        25,
        9
    );

    ctx.fill();


    /* Highlight */

    ctx.strokeStyle =
        "rgba(255,255,255,0.55)";

    ctx.lineWidth =
        2;

    ctx.beginPath();

    ctx.moveTo(
        -4,
        -47
    );

    ctx.lineTo(
        -4,
        35
    );

    ctx.stroke();


    ctx.restore();


    /* Tool label */

    ctx.fillStyle =
        "rgba(235,240,244,0.9)";

    ctx.font =
        "600 13px Segoe UI";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "MANUAL DRIVE",
        x,
        layout.benchY - 72
    );

}


/* --------------------------------------------------------------------------
   Mechanical oscillator
   -------------------------------------------------------------------------- */

function drawOscillator(
    layout,
    sourceY
) {

    const x =
        layout.rightSourceX;


    const y =
        sourceY;


    /* Motor housing */

    const housingGradient =
        ctx.createLinearGradient(
            x - 42,
            y - 42,
            x + 42,
            y + 42
        );


    housingGradient.addColorStop(
        0,
        "#aeb7bf"
    );

    housingGradient.addColorStop(
        0.3,
        "#59636d"
    );

    housingGradient.addColorStop(
        0.65,
        "#303840"
    );

    housingGradient.addColorStop(
        1,
        "#151a1f"
    );


    ctx.fillStyle =
        housingGradient;


    drawRoundedRect(
        ctx,
        x - 42,
        y - 38,
        84,
        76,
        12
    );


    ctx.fill();


    /* Motor face */

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        22,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#20272d";

    ctx.fill();


    ctx.beginPath();

    ctx.arc(
        x,
        y,
        13,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#909ba5";

    ctx.fill();


    ctx.beginPath();

    ctx.arc(
        x,
        y,
        5,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#2b333a";

    ctx.fill();


    /* Drive rod */

    ctx.strokeStyle =
        "#d5dde3";

    ctx.lineWidth =
        7;

    ctx.beginPath();

    ctx.moveTo(
        x,
        y - 38
    );

    ctx.lineTo(
        x,
        y - 72
    );

    ctx.stroke();


    /* Moving rod connection */

    ctx.strokeStyle =
        "#8c979f";

    ctx.lineWidth =
        5;

    ctx.beginPath();

    ctx.moveTo(
        x,
        y - 70
    );

    ctx.lineTo(
        x - 16,
        layout.centerY -
            sourceY
    );

    ctx.stroke();


    ctx.fillStyle =
        "#dfe5e9";


    ctx.beginPath();

    ctx.arc(
        x,
        y - 70,
        8,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* Status indicator */

    ctx.beginPath();

    ctx.arc(
        x + 29,
        y - 24,
        4,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#69e69a";

    ctx.fill();


    ctx.fillStyle =
        "rgba(235,240,244,0.9)";

    ctx.font =
        "600 13px Segoe UI";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "MECHANICAL OSCILLATOR",
        x,
        layout.benchY - 72
    );

}


/* --------------------------------------------------------------------------
   Pulse launcher
   -------------------------------------------------------------------------- */

function drawPulseLauncher(
    layout,
    sourceY
) {

    const x =
        layout.rightSourceX;


    const y =
        sourceY;


    /* Housing */

    const housingGradient =
        ctx.createLinearGradient(
            x - 38,
            y - 30,
            x + 38,
            y + 30
        );


    housingGradient.addColorStop(
        0,
        "#b8c0c7"
    );

    housingGradient.addColorStop(
        0.45,
        "#68737d"
    );

    housingGradient.addColorStop(
        1,
        "#252c32"
    );


    ctx.fillStyle =
        housingGradient;


    drawRoundedRect(
        ctx,
        x - 38,
        y - 30,
        76,
        60,
        10
    );


    ctx.fill();


    /* Launcher plunger */

    ctx.fillStyle =
        "#dce3e8";


    drawRoundedRect(
        ctx,
        x - 10,
        y - 62,
        20,
        34,
        7
    );


    ctx.fill();


    ctx.fillStyle =
        "#30383f";


    ctx.beginPath();

    ctx.arc(
        x,
        y - 64,
        13,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* Spring */

    ctx.strokeStyle =
        "#cbd3d9";

    ctx.lineWidth =
        2;

    ctx.beginPath();


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const sx =
            x -
            20 +
            i * 7;


        const sy =
            y -
            3 +
            (
                i % 2 ===
                0
                    ? -7
                    : 7
            );


        if (i === 0) {

            ctx.moveTo(
                sx,
                sy
            );

        }

        else {

            ctx.lineTo(
                sx,
                sy
            );

        }

    }


    ctx.stroke();


    ctx.fillStyle =
        "rgba(235,240,244,0.9)";

    ctx.font =
        "600 13px Segoe UI";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "PULSE LAUNCHER",
        x,
        layout.benchY - 72
    );

}


/* --------------------------------------------------------------------------
   Source connector
   -------------------------------------------------------------------------- */

function drawSourceConnector(
    layout,
    sourceY
) {

    const x =
        layout.rightSourceX;


    const stringX =
        layout.stringEndX;


    ctx.strokeStyle =
        "#252c32";

    ctx.lineWidth =
        8;

    ctx.beginPath();

    ctx.moveTo(
        stringX,
        sourceY
    );

    ctx.lineTo(
        x - 38,
        sourceY
    );

    ctx.stroke();


    ctx.strokeStyle =
        "#d4dce2";

    ctx.lineWidth =
        3;

    ctx.beginPath();

    ctx.moveTo(
        stringX,
        sourceY
    );

    ctx.lineTo(
        x - 38,
        sourceY
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.arc(
        stringX,
        sourceY,
        7,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#252b31";

    ctx.fill();


    ctx.beginPath();

    ctx.arc(
        stringX,
        sourceY,
        3,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#eef3f6";

    ctx.fill();

}


/* ==========================================================================
   LABORATORY 1D DRAWING
   ========================================================================== */

function drawLaboratory1D() {

    if (
        !canvas ||
        !ctx
    ) {

        return;

    }


    const layout =
        getStringApparatusLayout();


    if (!layout) return;


    const scale =
        Math.min(
            1.15,
            layout.height / 500
        );


    ctx.clearRect(
        0,
        0,
        layout.width,
        layout.height
    );


    /* Background */

    const background =
        ctx.createLinearGradient(
            0,
            0,
            0,
            layout.height
        );


    background.addColorStop(
        0,
        "#0b1117"
    );

    background.addColorStop(
        0.58,
        "#101922"
    );

    background.addColorStop(
        1,
        "#18232c"
    );


    ctx.fillStyle =
        background;


    ctx.fillRect(
        0,
        0,
        layout.width,
        layout.height
    );


    /* Back wall lines */

    ctx.strokeStyle =
        "rgba(255,255,255,0.045)";

    ctx.lineWidth =
        1;


    for (
        let y = 40;
        y < layout.benchY;
        y += 40
    ) {

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            layout.width,
            y
        );

        ctx.stroke();

    }


    /* Header */

    ctx.fillStyle =
        "rgba(235,242,247,0.9)";

    ctx.font =
        "700 15px Segoe UI";

    ctx.textAlign =
        "left";

    ctx.fillText(
        "WAVE ON A STRING — PHYSICS LAB",
        24,
        29
    );


    ctx.fillStyle =
        "rgba(185,199,210,0.72)";

    ctx.font =
        "12px Segoe UI";

    ctx.fillText(
        "Observe transverse motion, reflection, amplitude and wavelength",
        24,
        48
    );


    /* Bench */

    drawLabBench(
        layout
    );


    /* Fixed support */

    drawFixedSupport(
        layout
    );


    /*
       Source position.

       In oscillate mode the source moves continuously.
       In manual mode the source follows the draggable handle.
       In pulse mode the source follows the pulse disturbance.
    */

    let sourceY =
        layout.centerY;


    if (
        sourceMode ===
        "oscillate"
    ) {

        sourceY =
            layout.centerY -
            stringY[0] *
            scale;

    }

    else if (
        sourceMode ===
        "manual"
    ) {

        sourceY =
            layout.centerY -
            manualDragY *
            scale;

    }

    else {

        sourceY =
            layout.centerY -
            stringY[0] *
            scale;

    }


    /* String */

    drawLaboratoryString(
        layout,
        scale
    );


    /* Source connector */

    drawSourceConnector(
        layout,
        sourceY
    );


    /* Source apparatus */

    if (
        sourceMode ===
        "manual"
    ) {

        drawManualTool(
            layout,
            sourceY
        );

    }

    else if (
        sourceMode ===
        "oscillate"
    ) {

        drawOscillator(
            layout,
            sourceY
        );

    }

    else {

        drawPulseLauncher(
            layout,
            sourceY
        );

    }


    /* Wave direction indicator */

    ctx.fillStyle =
        "rgba(220,230,237,0.65)";

    ctx.font =
        "11px Segoe UI";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "TRANSVERSE WAVE",
        (
            layout.stringStartX +
            layout.stringEndX
        ) / 2,
        layout.centerY - 88
    );


    /* Small equilibrium marker */

    ctx.strokeStyle =
        "rgba(255,255,255,0.24)";

    ctx.lineWidth =
        1;

    ctx.beginPath();

    ctx.moveTo(
        layout.stringStartX,
        layout.centerY - 7
    );

    ctx.lineTo(
        layout.stringStartX,
        layout.centerY + 7
    );

    ctx.moveTo(
        layout.stringEndX,
        layout.centerY - 7
    );

    ctx.lineTo(
        layout.stringEndX,
        layout.centerY + 7
    );

    ctx.stroke();


    /* Mode instruction */

    ctx.fillStyle =
        "rgba(220,230,237,0.72)";

    ctx.font =
        "12px Segoe UI";

    ctx.textAlign =
        "left";


    if (
        sourceMode ===
        "manual"
    ) {

        ctx.fillText(
            "Drag the manual drive vertically to disturb the string.",
            24,
            layout.height - 18
        );

    }

    else if (
        sourceMode ===
        "pulse"
    ) {

        ctx.fillText(
            "A single disturbance travels down the string.",
            24,
            layout.height - 18
        );

    }

    else {

        ctx.fillText(
            "The mechanical oscillator continuously drives the string.",
            24,
            layout.height - 18
        );

    }

}


/* ==========================================================================
   End Conditions
   ========================================================================== */

document.querySelectorAll(
    ".end-btn"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            document.querySelectorAll(
                ".end-btn"
            ).forEach(btn =>
                btn.classList.remove(
                    "active"
                )
            );


            button.classList.add(
                "active"
            );


            endType =
                button.dataset.end;


            mascotSay(

                endType === "fixed"

                    ? "A fixed end reflects the wave upside down."

                    : endType === "loose"

                        ? "A loose end reflects the wave without flipping it."

                        : "With no end, the wave can leave the string."

            );

        }
    );

});


/* ==========================================================================
   Source Modes
   ========================================================================== */

document.querySelectorAll(
    ".source-btn"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            document.querySelectorAll(
                ".source-btn"
            ).forEach(btn =>
                btn.classList.remove(
                    "active"
                )
            );


            button.classList.add(
                "active"
            );


            sourceMode =
                button.dataset.source;


            pulseActive =
                false;

            pulseTime =
                0;

            manualDragY =
                0;


            if (
                sourceMode ===
                "pulse"
            ) {

                pulseActive =
                    true;

                pulseTime =
                    0;


                mascotSay(
                    "Pulse mode sends a single disturbance down the string."
                );

            }

            else if (
                sourceMode ===
                "manual"
            ) {

                mascotSay(
                    "Manual mode: grab the metal drive handle and move it vertically."
                );

            }

            else {

                mascotSay(
                    "Oscillate mode uses a mechanical driver to continuously move the string."
                );

            }

        }
    );

});


/* ==========================================================================
   MANUAL STRING INTERACTION — LAB TOOL ONLY
   ========================================================================== */

function getManualToolHitArea() {

    const layout =
        getStringApparatusLayout();


    if (!layout) return null;


    const sourceY =
        layout.centerY -
        manualDragY *
        Math.min(
            1.15,
            layout.height / 500
        );


    return {

        x: layout.rightSourceX,

        y: sourceY,

        radius: 76

    };

}


if (canvas) {

    canvas.addEventListener(
        "mousedown",
        event => {

            if (
                currentMode !== "1d" ||
                sourceMode !== "manual"
            ) {

                return;

            }


            const rect =
                canvas.getBoundingClientRect();


            const mouseX =
                event.clientX -
                rect.left;


            const mouseY =
                event.clientY -
                rect.top;


            const hit =
                getManualToolHitArea();


            if (!hit) return;


            const distance =
                Math.sqrt(
                    Math.pow(
                        mouseX - hit.x,
                        2
                    ) +
                    Math.pow(
                        mouseY - hit.y,
                        2
                    )
                );


            if (
                distance <=
                hit.radius
            ) {

                isDraggingString =
                    true;

                sourceToolDragging =
                    true;

                canvas.style.cursor =
                    "grabbing";


                updateManualDrag(
                    event
                );

            }

        }
    );


    canvas.addEventListener(
        "mousemove",
        event => {

            if (
                currentMode !==
                "1d"
            ) {

                return;

            }


            if (
                isDraggingString &&
                sourceToolDragging
            ) {

                updateManualDrag(
                    event
                );

            }

            else if (
                sourceMode ===
                "manual"
            ) {

                const rect =
                    canvas.getBoundingClientRect();


                const mouseX =
                    event.clientX -
                    rect.left;


                const mouseY =
                    event.clientY -
                    rect.top;


                const hit =
                    getManualToolHitArea();


                if (hit) {

                    const distance =
                        Math.sqrt(
                            Math.pow(
                                mouseX - hit.x,
                                2
                            ) +
                            Math.pow(
                                mouseY - hit.y,
                                2
                            )
                        );


                    sourceToolHover =
                        distance <=
                        hit.radius;


                    canvas.style.cursor =
                        sourceToolHover
                            ? "grab"
                            : "default";

                }

            }

        }
    );

}


window.addEventListener(
    "mouseup",
    () => {

        isDraggingString =
            false;

        sourceToolDragging =
            false;


        if (canvas) {

            canvas.style.cursor =
                sourceToolHover
                    ? "grab"
                    : "default";

        }

    }
);


function updateManualDrag(
    event
) {

    if (!canvas) return;


    const rect =
        canvas.getBoundingClientRect();


    const mouseY =
        event.clientY -
        rect.top;


    const middle =
        canvas.clientHeight /
        2;


    manualDragY =
        Math.max(
            -waveParams.amplitude,
            Math.min(
                waveParams.amplitude,
                -(mouseY - middle) /
                    Math.min(
                        1.15,
                        canvas.clientHeight /
                        500
                    )
            )
        );

}


/* ==========================================================================
   STRING PHYSICS
   ========================================================================== */

function updateStringSimulation() {

    if (
        !canvas ||
        !ctx
    ) {

        return;

    }


    const c2 =
        Math.min(
            0.25,
            Math.pow(
                waveParams.speed *
                6,
                2
            )
        );


    const damping =
        0.0015;


    if (
        sourceMode ===
        "oscillate"
    ) {

        stringY[0] =
            waveParams.amplitude *
            0.55 *
            Math.sin(
                time * 2
            );

    }


    else if (
        sourceMode ===
        "pulse"
    ) {

        if (pulseActive) {

            pulseTime++;


            stringY[0] =
                waveParams.amplitude *
                0.55 *
                Math.exp(
                    -Math.pow(
                        (
                            pulseTime -
                            10
                        ) / 5,
                        2
                    )
                );


            if (
                pulseTime >
                40
            ) {

                pulseActive =
                    false;

            }

        }

        else {

            stringY[0] =
                0;

        }

    }


    else if (
        sourceMode ===
        "manual"
    ) {

        if (
            isDraggingString
        ) {

            stringY[0] =
                manualDragY;

        }

        else {

            stringY[0] *=
                0.9;

        }

    }


    for (
        let i = 1;
        i < STRING_N - 1;
        i++
    ) {

        stringYNew[i] =
            (
                2 * stringY[i] -
                stringYOld[i] +
                c2 *
                (
                    stringY[i + 1] -
                    2 * stringY[i] +
                    stringY[i - 1]
                )
            ) *
            (
                1 -
                damping
            );

    }


    if (
        endType ===
        "fixed"
    ) {

        stringYNew[
            STRING_N - 1
        ] = 0;

    }

    else if (
        endType ===
        "loose"
    ) {

        stringYNew[
            STRING_N - 1
        ] =
            stringYNew[
                STRING_N - 2
            ];

    }

    else {

        stringYNew[
            STRING_N - 1
        ] =
            stringY[
                STRING_N - 2
            ];

    }


    stringYNew[0] =
        stringY[0];


    stringYOld =
        stringY;


    stringY =
        stringYNew.slice();


    drawLaboratory1D();

}


/* ==========================================================================
   LEGACY DRAW FUNCTION
   ========================================================================== */

function drawString() {

    drawLaboratory1D();

}


/* ==========================================================================
   SOUND / DOPPLER
   ========================================================================== */

let carActive = false;

let carX = -50;

const listenerX = 0.5;

let soundWavefronts = [];

let lastEmitTime = 0;

const SOUND_SPEED_PX = 4;

let soundOsc = null;

let soundGain = null;


function initAudioForSound() {

    if (!audioCtx) {

        audioCtx =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }


    if (
        audioCtx.state ===
        "suspended"
    ) {

        audioCtx.resume();

    }


    if (!soundOsc) {

        soundOsc =
            audioCtx.createOscillator();

        soundGain =
            audioCtx.createGain();


        soundOsc.type =
            "sine";

        soundGain.gain.value =
            0;


        soundOsc.connect(
            soundGain
        );

        soundGain.connect(
            audioCtx.destination
        );


        soundOsc.start();

    }

}


if (playCarBtn) {

    playCarBtn.addEventListener(
        "click",
        () => {

            initAudioForSound();


            carActive =
                true;

            carX =
                -50;

            soundWavefronts =
                [];

            lastEmitTime =
                0;


            soundGain.gain.setTargetAtTime(
                0.08,
                audioCtx.currentTime,
                0.05
            );


            mascotSay(
                "Listen carefully! As the car approaches, the observed frequency increases."
            );

        }
    );

}


function stopCarSound() {

    carActive =
        false;


    if (
        soundGain &&
        audioCtx
    ) {

        soundGain.gain.setTargetAtTime(
            0,
            audioCtx.currentTime,
            0.1
        );

    }

}


function updateSoundScene() {

    if (
        !canvas ||
        !ctx
    ) {

        return;

    }


    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;

    const roadY =
        height / 2;

    const listenerPixelX =
        width * listenerX;


    const baseFreq =
        220 +
        (
            (
                waveParams.frequency -
                0.01
            ) /
            (
                0.2 -
                0.01
            )
        ) * 440;


    const carSpeedPx =
        1 +
        (
            (
                waveParams.speed -
                0.01
            ) /
            (
                0.3 -
                0.01
            )
        ) * 5;


    if (carActive) {

        carX +=
            carSpeedPx;


        const emitInterval =
            Math.max(
                4,
                30 -
                baseFreq / 30
            );


        lastEmitTime++;


        if (
            lastEmitTime >
            emitInterval
        ) {

            soundWavefronts.push({

                x: carX,

                birth:
                    performance.now()

            });


            lastEmitTime =
                0;

        }


        const dx =
            listenerPixelX -
            carX;


        const approaching =
            dx > 0;


        const relativeSpeedFactor =
            carSpeedPx /
            SOUND_SPEED_PX;


        let heardFreq;


        if (
            Math.abs(dx) <
            6
        ) {

            heardFreq =
                baseFreq;

        }

        else {

            heardFreq =
                baseFreq /
                (
                    1 +
                    (
                        approaching
                            ? -relativeSpeedFactor
                            : relativeSpeedFactor
                    )
                );

        }


        heardFreq =
            Math.max(
                80,
                Math.min(
                    2000,
                    heardFreq
                )
            );


        if (
            soundOsc &&
            audioCtx
        ) {

            soundOsc.frequency
                .setTargetAtTime(
                    heardFreq,
                    audioCtx.currentTime,
                    0.05
                );

        }


        if (dopplerReadout) {

            dopplerReadout.textContent =
                `Heard frequency: ${
                    Math.round(
                        heardFreq
                    )
                } Hz`;

        }


        if (
            carX >
            width + 50
        ) {

            stopCarSound();

        }

    }


    const now =
        performance.now();


    soundWavefronts =
        soundWavefronts.filter(
            wave =>
                now -
                wave.birth < 4000
        );


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    ctx.strokeStyle =
        "rgba(255,255,255,0.3)";

    ctx.setLineDash([
        10,
        8
    ]);


    ctx.beginPath();

    ctx.moveTo(
        0,
        roadY
    );

    ctx.lineTo(
        width,
        roadY
    );

    ctx.stroke();

    ctx.setLineDash([]);


    soundWavefronts.forEach(
        wave => {

            const age =
                (
                    now -
                    wave.birth
                ) / 1000;


            const radius =
                age *
                SOUND_SPEED_PX *
                15;


            const alpha =
                Math.max(
                    0,
                    1 -
                    age / 4
                );


            ctx.beginPath();

            ctx.strokeStyle =
                `rgba(0,224,255,${alpha})`;

            ctx.lineWidth =
                2;


            ctx.arc(
                wave.x,
                roadY,
                radius,
                0,
                Math.PI * 2
            );


            ctx.stroke();

        }
    );


    ctx.font =
        "36px sans-serif";

    ctx.textAlign =
        "center";


    ctx.fillText(
        "🧍",
        listenerPixelX,
        roadY + 15
    );


    if (
        carActive ||
        carX > -50
    ) {

        ctx.fillText(
            "🚗",
            carX,
            roadY + 10
        );

    }

}


/* ==========================================================================
   RADIO WAVES
   ========================================================================== */

let modulationType =
    "am";

let radioOsc =
    null;

let radioGain =
    null;

let radioPlaying =
    false;


document.querySelectorAll(
    ".modulation-btn"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            document.querySelectorAll(
                ".modulation-btn"
            ).forEach(btn =>
                btn.classList.remove(
                    "active"
                )
            );


            button.classList.add(
                "active"
            );


            modulationType =
                button.dataset.modulation;


            updateEquationDisplay();


            if (
                currentMode ===
                "radio"
            ) {

                updateRadioWave3D();

            }


            mascotSay(

                modulationType ===
                "am"

                    ? "AM changes the amplitude of the carrier wave."

                    : "FM changes the frequency of the carrier wave."

            );

        }
    );

});


if (playRadioBtn) {

    playRadioBtn.addEventListener(
        "click",
        () => {

            if (!audioCtx) {

                audioCtx =
                    new (
                        window.AudioContext ||
                        window.webkitAudioContext
                    )();

            }


            if (
                audioCtx.state ===
                "suspended"
            ) {

                audioCtx.resume();

            }


            if (
                !radioPlaying
            ) {

                radioOsc =
                    audioCtx.createOscillator();

                radioGain =
                    audioCtx.createGain();


                radioOsc.frequency.value =
                    440;

                radioGain.gain.value =
                    0.05;


                radioOsc.connect(
                    radioGain
                );

                radioGain.connect(
                    audioCtx.destination
                );


                radioOsc.start();


                radioPlaying =
                    true;


                playRadioBtn.textContent =
                    "⏹️ Stop Modulated Signal";


                mascotSay(

                    modulationType ===
                    "am"

                        ? "AM signal is playing."

                        : "FM signal is playing."

                );

            }

            else {

                if (radioOsc) {

                    radioOsc.stop();

                }


                radioOsc =
                    null;

                radioGain =
                    null;

                radioPlaying =
                    false;


                playRadioBtn.textContent =
                    "🔊 Play Modulated Signal";

            }

        }
    );

}


/* ==========================================================================
   FOURIER WAVES
   ========================================================================== */

let harmonics = [];


for (
    let i = 1;
    i <= 5;
    i++
) {

    harmonics.push({

        n: i,

        amp:
            i === 1
                ? 80
                : 0,

        on:
            i === 1

    });

}


document.querySelectorAll(
    ".harmonic-row"
).forEach(row => {

    const n =
        parseInt(
            row.dataset.harmonic
        );


    const checkbox =
        row.querySelector(
            ".harmonic-toggle"
        );


    const slider =
        row.querySelector(
            ".harmonic-slider"
        );


    const harmonic =
        harmonics[
            n - 1
        ];


    if (checkbox) {

        checkbox.addEventListener(
            "change",
            () => {

                harmonic.on =
                    checkbox.checked;


                updateEquationDisplay();


                if (
                    currentMode ===
                    "fourier"
                ) {

                    updateFourierWave3D();

                }


                mascotSay(
                    `Harmonic ${n} ${
                        harmonic.on
                            ? "added"
                            : "removed"
                    } from the wave.`
                );

            }
        );

    }


    if (slider) {

        slider.addEventListener(
            "input",
            () => {

                harmonic.amp =
                    parseFloat(
                        slider.value
                    );


                updateEquationDisplay();


                if (
                    currentMode ===
                    "fourier"
                ) {

                    updateFourierWave3D();

                }

            }
        );

    }

});


function applyFourierPreset(
    type
) {

    if (
        type ===
        "square"
    ) {

        harmonics.forEach(
            harmonic => {

                harmonic.on =
                    true;

                harmonic.amp =
                    harmonic.n % 2 === 1
                        ? 100 /
                          harmonic.n
                        : 0;

            }
        );

    }

    else if (
        type ===
        "sawtooth"
    ) {

        harmonics.forEach(
            harmonic => {

                harmonic.on =
                    true;

                harmonic.amp =
                    100 /
                    harmonic.n;

            }
        );

    }


    syncFourierControls();

    updateEquationDisplay();


    if (
        currentMode ===
        "fourier"
    ) {

        updateFourierWave3D();

    }

}


function syncFourierControls() {

    document.querySelectorAll(
        ".harmonic-row"
    ).forEach(row => {

        const n =
            parseInt(
                row.dataset.harmonic
            );


        const harmonic =
            harmonics[
                n - 1
            ];


        const checkbox =
            row.querySelector(
                ".harmonic-toggle"
            );


        const slider =
            row.querySelector(
                ".harmonic-slider"
            );


        if (checkbox) {

            checkbox.checked =
                harmonic.on;

        }


        if (slider) {

            slider.value =
                Math.min(
                    100,
                    harmonic.amp
                );

        }

    });

}


const squareWavePreset =
    document.getElementById(
        "squareWavePreset"
    );


const sawtoothPreset =
    document.getElementById(
        "sawtoothWavePreset"
    );


const clearHarmonics =
    document.getElementById(
        "clearHarmonics"
    );


if (squareWavePreset) {

    squareWavePreset.addEventListener(
        "click",
        () => {

            applyFourierPreset(
                "square"
            );


            mascotSay(
                "Square waves can be built by adding odd harmonics!"
            );

        }
    );

}


if (sawtoothPreset) {

    sawtoothPreset.addEventListener(
        "click",
        () => {

            applyFourierPreset(
                "sawtooth"
            );


            mascotSay(
                "A sawtooth wave can be built from many harmonics."
            );

        }
    );

}


if (clearHarmonics) {

    clearHarmonics.addEventListener(
        "click",
        () => {

            harmonics.forEach(
                harmonic => {

                    harmonic.on =
                        false;

                    harmonic.amp =
                        0;

                }
            );


            syncFourierControls();

            updateEquationDisplay();


            if (
                currentMode ===
                "fourier"
            ) {

                updateFourierWave3D();

            }


            mascotSay(
                "All harmonics cleared. Now build your own wave!"
            );

        }
    );

}


/* ==========================================================================
   EQUATION DISPLAY
   ========================================================================== */

function updateEquationDisplay(
    activeParam = null
) {

    if (!equationDisplay) return;


    if (
        currentMode ===
        "1d"
    ) {

        const amplitude =
            Math.round(
                waveParams.amplitude
            );


        const frequency =
            waveParams.frequency.toFixed(
                2
            );


        const speed =
            waveParams.speed.toFixed(
                2
            );


        const wavelength =
            waveParams.wavelength.toFixed(
                2
            );


        equationDisplay.innerHTML = `

            <span
                class="eq-term ${
                    activeParam ===
                    "amplitude"
                        ? "pulse"
                        : ""
                }"
                data-term="amplitude"
                style="color:#00e0ff;"
                title="Click to learn about amplitude"
            >
                ${amplitude}
            </span>

            · sin(

            <span
                class="eq-term ${
                    activeParam ===
                    "frequency"
                        ? "pulse"
                        : ""
                }"
                data-term="frequency"
                style="color:#ff9944;"
                title="Click to learn about frequency"
            >
                ${frequency}
            </span>

            x + t)

            <span class="equation-extra">

                &nbsp;&nbsp;|&nbsp;&nbsp;

                v =

                <span
                    class="eq-term ${
                        activeParam ===
                        "speed"
                            ? "pulse"
                            : ""
                    }"
                    data-term="speed"
                    style="color:#7cff7c;"
                    title="Click to learn about wave speed"
                >
                    ${speed}
                </span>

                = fλ

            </span>

            <span class="equation-extra">

                &nbsp;&nbsp;|&nbsp;&nbsp;

                λ =

                <span
                    class="eq-term ${
                        activeParam ===
                        "wavelength"
                            ? "pulse"
                            : ""
                    }"
                    data-term="wavelength"
                    style="color:#c084fc;"
                    title="Click to learn about wavelength"
                >
                    ${wavelength}
                </span>

            </span>

        `;

    }

    else if (
        currentMode ===
        "sound"
    ) {

        equationDisplay.innerHTML = `

            <span class="eq-term">

                f′ = f × v /

                (v ∓ v₍car₎)

            </span>

            <br>

            <small>
                Doppler Effect
            </small>

        `;

    }

    else if (
        currentMode ===
        "radio"
    ) {

        equationDisplay.textContent =

            modulationType ===
            "am"

                ?

                "s(t) = [1 + m(t)] · cos(2πfct) — Amplitude Modulation"

                :

                "s(t) = cos(2πfct + βm(t)) — Frequency Modulation";

    }

    else if (
        currentMode ===
        "fourier"
    ) {

        const terms =
            harmonics

                .filter(
                    harmonic =>
                        harmonic.on &&
                        harmonic.amp > 0
                )

                .map(
                    harmonic =>
                        `A${harmonic.n}sin(${harmonic.n}ωt)`
                )

                .join(
                    " + "
                );


        equationDisplay.textContent =
            `y(t) = ${
                terms ||
                "0"
            }`;

    }

    else {

        equationDisplay.textContent =
            `y(x,t) = ${
                Math.round(
                    waveParams.amplitude
                )
            } · sin(${
                waveParams.frequency.toFixed(
                    2
                )
            }x + t)`;

    }

}


/* ==========================================================================
   CLICKABLE EQUATION PARAMETERS
   ========================================================================== */

if (equationDisplay) {

    equationDisplay.addEventListener(
        "click",
        event => {

            const term =
                event.target.closest(
                    ".eq-term"
                );


            if (!term) return;


            const parameter =
                term.dataset.term;


            term.classList.add(
                "pulse"
            );


            setTimeout(
                () => {

                    term.classList.remove(
                        "pulse"
                    );

                },
                600
            );


            if (
                parameter ===
                "amplitude"
            ) {

                if (
                    amplitudeSlider
                ) {

                    amplitudeSlider.classList.add(
                        "slider-pulse"
                    );


                    setTimeout(
                        () => {

                            amplitudeSlider.classList.remove(
                                "slider-pulse"
                            );

                        },
                        600
                    );

                }


                mascotSay(
                    "🌊 AMPLITUDE: how tall the wave is. Increasing amplitude makes the wave taller."
                );

            }

            else if (
                parameter ===
                "frequency"
            ) {

                if (
                    frequencySlider
                ) {

                    frequencySlider.classList.add(
                        "slider-pulse"
                    );


                    setTimeout(
                        () => {

                            frequencySlider.classList.remove(
                                "slider-pulse"
                            );

                        },
                        600
                    );

                }


                mascotSay(
                    "🔄 FREQUENCY: how many cycles happen per second. If speed stays constant, increasing frequency makes wavelength shorter."
                );

            }

            else if (
                parameter ===
                "speed"
            ) {

                if (
                    speedSlider
                ) {

                    speedSlider.classList.add(
                        "slider-pulse"
                    );


                    setTimeout(
                        () => {

                            speedSlider.classList.remove(
                                "slider-pulse"
                            );

                        },
                        600
                    );

                }


                mascotSay(
                    "🚀 WAVE SPEED: how quickly the disturbance travels. Wave speed follows v = fλ."
                );

            }

            else if (
                parameter ===
                "wavelength"
            ) {

                mascotSay(
                    "📏 WAVELENGTH: the distance from one crest to the next. With constant speed, increasing frequency makes wavelength decrease."
                );

            }

        }
    );

}


/* ==========================================================================
   CHALLENGE SYSTEM
   ========================================================================== */

if (checkChallengeBtn) {

    checkChallengeBtn.addEventListener(
        "click",
        () => {

            if (
                waveParams.frequency >
                0.15
            ) {

                if (
                    challengeFeedback
                ) {

                    challengeFeedback.textContent =
                        "✅ Correct! Higher frequency means a shorter wavelength when wave speed is held constant.";

                    challengeFeedback.style.color =
                        "#7fffb0";

                }


                mascotSay(
                    "Great job! You just discovered the inverse relationship between frequency and wavelength!"
                );

            }

            else {

                if (
                    challengeFeedback
                ) {

                    challengeFeedback.textContent =
                        "Not yet — move the Frequency slider above 0.15 and check again.";

                    challengeFeedback.style.color =
                        "#ffcc66";

                }


                mascotSay(
                    "Keep going! Push the frequency higher and watch what happens to the spacing between the waves."
                );

            }

        }
    );

}


/* ==========================================================================
   EXPERIMENT LISTENERS
   ========================================================================== */

function initExperimentListeners() {

    if (
        amplitudeSlider
    ) {

        amplitudeSlider.addEventListener(
            "input",
            event => {

                handleSliderChange(
                    "amplitude",
                    parseFloat(
                        event.target.value
                    )
                );

            }
        );

    }


    if (
        frequencySlider
    ) {

        frequencySlider.addEventListener(
            "input",
            event => {

                handleSliderChange(
                    "frequency",
                    parseFloat(
                        event.target.value
                    )
                );

            }
        );

    }


    if (
        speedSlider
    ) {

        speedSlider.addEventListener(
            "input",
            event => {

                handleSliderChange(
                    "speed",
                    parseFloat(
                        event.target.value
                    )
                );

            }
        );

    }


    if (
        experimentVariable
    ) {

        experimentVariable.addEventListener(
            "change",
            updateExperimentGuide
        );

    }


    if (
        constantVariable
    ) {

        constantVariable.addEventListener(
            "change",
            updateExperimentGuide
        );

    }

}


/* ==========================================================================
   RESET
   ========================================================================== */

if (resetBtn) {

    resetBtn.addEventListener(
        "click",
        () => {

            time =
                0;


            rippleSources =
                [];


            stringY.fill(
                0
            );


            stringYOld.fill(
                0
            );


            stringYNew.fill(
                0
            );


            pulseActive =
                false;


            pulseTime =
                0;


            manualDragY =
                0;


            isDraggingString =
                false;


            sourceToolDragging =
                false;


            carActive =
                false;


            carX =
                -50;


            soundWavefronts =
                [];


            lastEmitTime =
                0;


            stopCarSound();


            if (
                radioPlaying &&
                radioOsc
            ) {

                radioOsc.stop();


                radioOsc =
                    null;


                radioGain =
                    null;


                radioPlaying =
                    false;


                if (
                    playRadioBtn
                ) {

                    playRadioBtn.textContent =
                        "🔊 Play Modulated Signal";

                }

            }


            waveParams.amplitude =
                50;


            waveParams.frequency =
                0.02;


            waveParams.speed =
                0.05;


            waveParams.wavelength =
                waveParams.speed /
                waveParams.frequency;


            syncSlider(
                amplitudeSlider,
                waveParams.amplitude
            );


            syncSlider(
                frequencySlider,
                waveParams.frequency
            );


            syncSlider(
                speedSlider,
                waveParams.speed
            );


            updateUIReadouts();

            updateEquationDisplay();

            updateExperimentGuide();


            if (
                currentMode ===
                "radio"
            ) {

                updateRadioWave3D();

            }


            if (
                currentMode ===
                "fourier"
            ) {

                updateFourierWave3D();

            }


            mascotSay(
                "🔄 Reset complete! Everything is back to the starting conditions."
            );

        }
    );

}


/* ==========================================================================
   MAIN ANIMATION LOOP
   ========================================================================== */

function animate() {

    requestAnimationFrame(
        animate
    );


    if (isPlaying) {

        time +=
            waveParams.speed;

    }


    /* ----------------------------------------------------------
       1D
       ---------------------------------------------------------- */

    if (
        currentMode ===
        "1d"
    ) {

        if (
            isPlaying ||
            isDraggingString
        ) {

            updateStringSimulation();

        }

        else {

            drawLaboratory1D();

        }

    }


    /* ----------------------------------------------------------
       Sound
       ---------------------------------------------------------- */

    else if (
        currentMode ===
        "sound"
    ) {

        if (
            isPlaying ||
            carActive
        ) {

            updateSoundScene();

        }

        else {

            updateSoundScene();

        }

    }


    /* ----------------------------------------------------------
       2D
       ---------------------------------------------------------- */

    else if (
        currentMode ===
        "2d" &&
        is3DInitialized
    ) {

        if (isPlaying) {

            updateRipples();

        }

    }


    /* ----------------------------------------------------------
       3D
       ---------------------------------------------------------- */

    else if (
        currentMode ===
        "3d" &&
        is3DInitialized
    ) {

        if (isPlaying) {

            updateWave3D();

        }

    }


    /* ----------------------------------------------------------
       EM
       ---------------------------------------------------------- */

    else if (
        currentMode ===
        "em" &&
        is3DInitialized
    ) {

        if (isPlaying) {

            updateEMWaves();

        }

    }


    /* ----------------------------------------------------------
       RADIO — 3D
       ---------------------------------------------------------- */

    else if (
        currentMode ===
        "radio" &&
        is3DInitialized
    ) {

        updateRadioWave3D();

    }


    /* ----------------------------------------------------------
       FOURIER — 3D
       ---------------------------------------------------------- */

    else if (
        currentMode ===
        "fourier" &&
        is3DInitialized
    ) {

        updateFourierWave3D();

    }


    /* ----------------------------------------------------------
       Render Three.js
       ---------------------------------------------------------- */

    if (
        is3DInitialized &&
        renderer3D &&
        scene3D &&
        camera3D
    ) {

        if (controls3D) {

            controls3D.update();

        }


        renderer3D.render(
            scene3D,
            camera3D
        );

    }

}


/* ==========================================================================
   INITIALIZATION
   ========================================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initExperimentListeners();


        if (amplitudeSlider) {

            waveParams.amplitude =
                parseFloat(
                    amplitudeSlider.value
                );

        }


        if (frequencySlider) {

            waveParams.frequency =
                parseFloat(
                    frequencySlider.value
                );

        }


        if (speedSlider) {

            waveParams.speed =
                parseFloat(
                    speedSlider.value
                );

        }


        waveParams.wavelength =
            calculateWavelength();


        updateUIReadouts();

        updateExperimentGuide();

        updateEquationDisplay();

        resizeCanvas();

        updateControlsForMode(
            currentMode
        );


        if (canvas) {

            canvas.style.display =
                "block";

        }


        animate();

    }
);


/* ==========================================================================
   INITIAL CANVAS SETUP
   ========================================================================== */

setTimeout(
    () => {

        resizeCanvas();

        updateUIReadouts();

        updateEquationDisplay();

    },
    100
);