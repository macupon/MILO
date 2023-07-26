// const small = document.getElementById('sm');
// small.addEventListener('click', ()=>{
//     const priceSmall = 600;
//     small.classList.toggle('size_cake_shadow');
//     console.log(priceSmall)
// });

// const medium = document.getElementById('md');
// medium.addEventListener('click', ()=>{
//     const priceSmall = 800;
//     medium.classList.toggle('size_cake_shadow');
//     console.log(priceSmall)
// });

// const big = document.getElementById('bg');
// big.addEventListener('click', ()=>{
//     const priceSmall = 1000;
//     big.classList.toggle('size_cake_shadow');
//     console.log(priceSmall)
// });

const sizeCake = document.querySelectorAll('.size_cake');
const finalPrice = document.getElementById('final_price');

let sizePrice = {
    sm : 1160,
    md : 1340,
    bg : 1600,
}

// console.log(sizeCake[0].id)

let click_img =null;
let price;

sizeCake.forEach(ele => 
    ele.addEventListener('click', ()=>{
        ele.classList.toggle('size_cake_shadow');
        let id = ele.id
        price = sizePrice[id]
        console.log(price)
        // if(ele.id === "sm"){
        //     price = sizePrice.sm;
        // } else if (ele.id === "md"){
        //     price = sizePrice.md;
        // } else {
        //     price = sizePrice.bg;
        // };
        if(click_img!== null){
            click_img.classList.remove('size_cake_shadow');
        }
        click_img = ele;
        
        let textPrice = `Price: $ ${price} Dkk.`;
        finalPrice.innerHTML = textPrice;
    })
);

