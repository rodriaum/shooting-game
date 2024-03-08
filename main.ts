let score = 0
let range = 0

let started = false

input.onButtonPressed(Button.A, function() {
    if (!started) {
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

basic.forever(function () {

    if (started && pins.digitalReadPin(DigitalPin.P1) == 1) {
        score++
        music.startMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once)
        basic.showNumber(score)

        if (started && hasRangeLimit)
            handleEnd()
    }
})

function handleEnd() {
    music.play(music.stringPlayable("C5 B A G F E D C ", 500), music.PlaybackMode.UntilDone)
    basic.clearScreen()
    basic.showString(hasRangeLimit ? "WIN" : "END", 150)
    basic.clearScreen()
    started = false
    score = 0
    range = 0
}

function hasRangeLimit() {
    return score >= range
}