export default class Animal {
    constructor(speciesName, sound) {
        this.animalSpecies = speciesName;
        this.animalSound = sound;
    }
    makeSound() {
        drawManager.console_log('Anim:', `The ${this.animalSpecies} is making ${this.animalSound}`);
        return `The ${this.animalSpecies} is making ${this.animalSound}`;
    }
}