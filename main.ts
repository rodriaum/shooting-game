/**
 * Created by Github@Rodriaum
 * Start the system along with the variables.
 */

let score = 0
let range = 3

let started = false

/**
 * Button Pressed Event
 */

input.onButtonPressed(Button.A, function() {
    if (!started) {
        if (hasRangeLimit())
            handleEnd()

        music.play(music.stringPlayable("C D E F G A B C5 ", 500), music.PlaybackMode.UntilDone)
        basic.showNumber(score)
        started = true
    } else {
        handleEnd()
    }
})

input.onButtonPressed(Button.B, function () {
    range++
    basic.showNumber(range)
})

/**
 * Repeaters
 */

basic.forever(function () {
    if (started && pins.digitalReadPin(DigitalPin.P1) == 1) {
        score++
        music.startMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once)
        basic.showNumber(score)
        basic.pause(1000)

        // Ao atingir o limite máximo de pontuação, o jogo termina.
        if (started && hasRangeLimit())
            handleEnd()
    }
})

/** 
 * Functions
 */

function handleEnd() {
    started = false
    music.startMelody(
        music.builtInMelody(hasRangeLimit() 
        ? Melodies.Punchline 
        : Melodies.Funeral
        ), MelodyOptions.Once)
    basic.clearScreen()
    basic.showString(hasRangeLimit() ? "WIN" : "END", 150)
    basic.clearScreen()
    score = 0
    range = 0 
}

function hasRangeLimit() {
    return score >= range
}