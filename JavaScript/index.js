const text = document.querySelector(".text p");

text.innerHTML = text.innerText
	.split("")
	.map(
		(char, i) => `<span style="transform:rotate(${i * 5.8}deg)">${char}</span>`
	)
	.join("");


// $(function() {
//     $('.gallery .block').each(function(){
//         var img = $(this).find('img').attr('src');
//         $(this).css('background-image','url('+img+')');
//     });
// });