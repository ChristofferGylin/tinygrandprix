export class EngineSynth {

    constructor() {

        // create components

        this.lowPassFilter = new Tone.Filter({
            frequency: 400,
            rolloff: -24,
            Q: 1
        });
        this.highPassFilter = new Tone.Filter({
            frequency: 20,
            type: 'highpass'
        });
        this.vca = new Tone.Gain(0.5);
        this.oscGain = new Tone.Gain(0.5);
        this.subOscGain = new Tone.Gain(0.3);
        this.noiseGain = new Tone.Gain(0.2);
        this.pulseOsc = new Tone.PulseOscillator(20);
        this.sawOsc = new Tone.Oscillator(30, 'sawtooth');
        this.subOsc = new Tone.Oscillator(30, 'square');
        this.noiseOsc = new Tone.Noise('brown');

        // connect components

        this.subOsc.connect(this.subOscGain);
        this.subOscGain.connect(this.highPassFilter);
        this.noiseOsc.connect(this.noiseGain);
        this.noiseGain.connect(this.highPassFilter);
        this.pulseOsc.connect(this.oscGain)
        //this.sawOsc.connect(this.oscGain)
        this.oscGain.connect(this.highPassFilter);
        this.highPassFilter.connect(this.lowPassFilter);
        this.lowPassFilter.connect(this.vca);
        this.vca.toDestination();

        this.subOsc.detune.value = -1200;

        this.startSynth = function () {

            this.pulseOsc.start(Tone.Now);
            this.sawOsc.start(Tone.Now);
            this.subOsc.start(Tone.Now);
            this.noiseOsc.start(Tone.No);

        };

    }
}