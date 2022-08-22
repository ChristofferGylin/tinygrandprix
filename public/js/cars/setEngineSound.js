import { scaleValue } from '../math/scaleValue.js';

export function setEngineSound() {

    const oscFreq = this.engine.rpm / 60;
    //const oscFreq = scaleValue(this.engine.rpm, [0, this.engine.maxRpm], [16, 180]);
    const filterFreq = scaleValue(this.engine.rpm, [0, this.engine.maxRpm], [200, 1200]);
    this.engine.synth.pulseOsc.frequency.value = oscFreq;
    this.engine.synth.subOsc.frequency.value = oscFreq * 1.5;
    this.engine.synth.lowPassFilter.frequency.value = filterFreq;

}