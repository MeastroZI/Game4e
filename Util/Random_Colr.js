export default function Random_Colr() {
    const num = Math.floor((Math.random() * 5) + 1)
    let ColorCode

    switch (num) {
        case 1:
            ColorCode = '#FF461C';
            break;

        case 2:
            ColorCode = '#FF36DD';
            break;

        case 3:
            ColorCode = '#54FFCF';
            break;

        case 4:
            ColorCode = '#F4FF54';
            break;

        case 5:
            ColorCode = '#00FF08';
            break;
    }

    return ColorCode
}
