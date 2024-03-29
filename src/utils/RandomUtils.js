class RandomUtils {

    static chance = new Chance();

    static seed = new Date().getTime();

    static setSeed(seed = new Date().getTime()) {

        RandomUtils.seed = seed;

        RandomUtils.chance = new Chance(RandomUtils.seed);
    }

    /**
     * @param {*} min the minimum number (inclusive)
     * @param {*} max the maximum number (inclusive)
     * @returns a random integer.
     */
    static nextInt(min, max) {
        return RandomUtils.chance.integer({ min: min, max: max });
    }

    static nextCode(size = 3, interval = { min: 0, max: 9 }) {

        if (SettingsUtils.repetition) {
            return this.nextCodeWithRepetition(size, interval);
        } else {
            return this.nextCodeWithoutRepetition(size, interval);
        }
    }

    static nextCodeWithoutRepetition(size = 3, interval = { min: 0, max: 9 }) {

        const random = new Set();

        while (random.size !== size) {
            random.add(RandomUtils.nextInt(interval.min, interval.max));
        }

        return [...random];
    }

    static nextCodeWithRepetition(size = 3, interval = { min: 0, max: 9 }) {

        const random = [];

        for (let i = 0; i < size; i++) {
            random.push(RandomUtils.nextInt(interval.min, interval.max));
        }

        return random;
    }
}
