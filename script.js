let btn = document.querySelector('#scroll');
const contentDivs = document.querySelectorAll('#about>section');



btn.addEventListener('click', () => {
  let height = window.innerHeight - window.scrollY;
  window.scrollBy({
    top: height,
    left: 0,
    behavior: 'smooth'
  })
})



window.addEventListener('scroll', showBoxesInView);



//Animate bottom border landing page
function animateBorder(element) {
    return new Promise(resolve => {
        element.classList.add("animate-border");
        setTimeout(resolve, 1000);
    })
}



//Typing effect for landing page
async function type(element, text , animate, delay) {
    return new Promise(resolve => {
        let i = 0;
      
        async function writeChar() {
          element.textContent += text.charAt(i);
          if (i < text.length) {
            i++;
            setTimeout(writeChar, delay);
          }
          else if (animate) {
            await animateBorder(element);
            resolve();
          }
          else {
            resolve();
          }
        }
        writeChar();
    })
}




function elementInView(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
}
 


function showBoxesInView() {
  for (let div of contentDivs) {
    if (elementInView(div)) {
      div.classList.add('showing');
    }
  }
}


async function runAnimation() {
    let response = await fetch("content.json");
    let json = await response.json();

    await type(document.querySelector('h1'), json.title , true, 100);
    await type(document.querySelector('#name'), json.name, false, 100);
    await type(document.querySelector('#presentation'), json.developer, false, 75);
    await type(document.querySelector('#lia'), json.lia, false, 75);
    setTimeout( () => {document.querySelector('#socials').classList.add('visible');}, 500)
}

runAnimation();