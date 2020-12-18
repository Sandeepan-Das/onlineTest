const {caculateTip,ctof,ftoc} = require("../src/temp/math")

test("Should calculate tip with total",()=>{
    const total = caculateTip(100,30);
    expect(total).toBe(130);
})

test("Should calculate temp in celsius",()=>{
    const celsius = ftoc(32);
    expect(celsius).toBe(0);
})
test("Should calculate temp in Farhenheit",()=>{
    const Farhenheit = ctof(100);
    expect(Farhenheit).toBe(212);
})
test("Should be equal at -40",()=>{
    const celsius = ftoc(-40);
    const Farhenheit = ctof(-40);
    expect(celsius).toEqual(Farhenheit);
})
