export default function CheckOverLape(pan, Id, pansArr) {

    // console.log(.Y)
    const top1 = pan.Y;
    const bottom1 = pan.Y + pan.Height;
    const left1 = pan.X - pan.Width;
    const right1 = pan.X;
    let OverLap = false;




    pansArr.forEach((elm, index) => {
        // console.log(elm)
        if (index != Id) {
            // console.log("under the if ")
            const top2 = elm.Y;
            const bottom2 = elm.Y + elm.Height;
            const left2 = elm.X - elm.Width;
            const right2 = elm.X;

            const Condition = !(bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2);
            // console.log(Condition)
            if (Condition) {
                OverLap = true
            }
        }
    })

    return OverLap

}