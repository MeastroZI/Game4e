export default function CheckOverLape(pan, Id, pansArr) {





    const top1 = pan.Y;
    const bottom1 = pan.Y + pan.Height;
    const left1 = pan.X - pan.Width;
    const right1 = pan.X;
    let previousOverlap;
    let OverLappedIndex;
    let OverLap = false;
    // console.log(pan)
    // console.log(JSON.stringify(pansArr[0]));




    pansArr.forEach((elm, index) => {



        const top2 = elm.Y;
        const left2 = elm.X - elm.Width;
        const right2 = elm.X;
        const condition = (top2 < bottom1 && left1 < right2 && left2 < right1)
        if (condition) {

            if (previousOverlap) {
                OverLappedIndex = (left1 - previousOverlap) > (left2 - right2) ? index - 1 : index;
            }
            else {
                previousOverlap = right2;
                OverLappedIndex = index;
                OverLap = true;
            }
        }


    })


    return { OverLap: OverLap, Index: OverLappedIndex, Id: Id }

}