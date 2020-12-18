const caculateTip = (bill,tipPercent=20)=>{
    const total = bill + ((tipPercent/100)*bill)
    return total
}
const ftoc = (temp)=>{
    return (temp-32)/1.8;
}
const ctof = (temp)=>{
    return (temp*1.8)+32;
}
module.exports={
    caculateTip:caculateTip,
    ftoc,
    ctof,
}