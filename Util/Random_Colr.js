export default function Random_Colr() {
    const num = Math.floor((Math.random() * 5) + 1)
    let ColorCode

    switch (num) {
        case 1:
            ColorCode = {
                r: 255,
                g: 0,
                b: 140
            };
            break;

        case 2:

            ColorCode = {
                r: 0,
                g: 120,
                b: 9
            };
            break;

        case 3:

            ColorCode = {
                r: 120,
                g: 3,
                b: 0
            };
            break;

        case 4:

            ColorCode = {
                r: 0,
                g: 120,
                b: 100,
            };
            break;

        case 5:

            ColorCode = {
                r: 0,
                g: 80,
                b: 120
            };
            break;
    }

    return ColorCode
}
