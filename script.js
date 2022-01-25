var plates = document.querySelectorAll('select')
var selectedPlates = document.querySelector('.selectedPlates')
var numberPlates = document.querySelector('.progress p span:nth-of-type(2)')

var numberSelectedPlates = 0, contaClick = 0, pratoRemovido = false

for (let i = 0; i < 4; i++) {
    //criarPratos()
}

function criarPratos(){
    var plate = document.createElement('div');
    var imgDiv = document.createElement('div');
    var img = document.createElement('img')
    img.src = window.location.href

    var infoPlate = document.createElement('div');
    
    var p = document.createElement('p');
    var minus = document.createElement('span');
    minus.innerHTML = '-'
    minus.classList.add('menuMinus')

    var count = document.createElement('span');
    count.innerHTML = '1'
    count.classList.add('count')

    var plus = document.createElement('span')
    plus.innerHTML= '+'
    plus.classList.add('menuPlus')
    p.appendChild(minus)
    p.appendChild(count)
    p.appendChild(plus)
    infoPlate.appendChild(p)
    
    plate.classList.add('plate')
    imgDiv.classList.add('img')
    infoPlate.classList.add('infoPlates')
    
    imgDiv.appendChild(img)
    plate.appendChild(imgDiv)
    plate.appendChild(infoPlate)

    selectedPlates.appendChild(plate)
}

var novaQuantidadePratos = 0
// selecionando os pratos
plates.forEach(elem =>{
    elem.addEventListener('change', function(){
        numberPlates.innerHTML = elem.value
        //selectedPlates.innerHTML = ''

       
        document.querySelector('.progress p span:nth-of-type(1)').innerHTML = 'FALTA '
        document.querySelector('.progress p span:nth-of-type(3)').innerHTML = 'PRATO(S)'

        let contaPratos = 0
        document.querySelectorAll('.plate').forEach(numeroTotalPratosPreenchidos =>{

            //numeroTotalPratosPreenchidos.querySelector('.count').innerHTML
            if(numeroTotalPratosPreenchidos.querySelector('img').src == window.location.href){
                contaPratos++
            }else{
                contaPratos = contaPratos +  Number(numeroTotalPratosPreenchidos.querySelector('.count').innerHTML)
            }

        })

        
        // trabalhando com o progress bar
        var percentagemCrescimento = (numberSelectedPlates / elem.value) * 100
        document.querySelector('.progress-bar').style.width = percentagemCrescimento + '%'
        numberPlates.innerHTML = elem.value - numberSelectedPlates

        novaQuantidadePratos = contaPratos

        for(let i = 0; i < elem.value - novaQuantidadePratos; i++){
            criarPratos()
        }

        var plateImg = document.querySelectorAll('.plate')
        // verificando se foi selecionado pratos à mais em relacao ao pacote pretendido
        if((elem.value - numberSelectedPlates) < 0){
            numberPlates.innerHTML = numberSelectedPlates - elem.value
            document.querySelector('.progress p span:nth-of-type(1)').innerHTML = 'RETIRE'
            document.querySelector('.progress p span:nth-of-type(3)').innerHTML = 'PRATOS'
            
        }


        // removendo os protos que estão acima do pacote pretendido
        if(contaPratos > elem.value){
           
            var qtdEliminar = contaPratos - elem.value
        
            for (let i = 1; i <= qtdEliminar; i++) {
                if(plateImg[plateImg.length - i].querySelector('.img img').src == window.location.href)
                    plateImg[plateImg.length - i].remove()
                    // melhorar este ponto............................................................................................
                    // Acho que já está solucionado 
            }
        }


    })
})


var countModal = 0, abrirModal = false

// function PLUS
var plus = document.querySelectorAll('.produto .plus')
plus.forEach(elem => {
    elem.onclick = function (){
        countModal++


        //contando o 1 click para abrir a modal
        if(countModal == 1){
            // trabalnho com  a modal
            // Get the modal
            var modal = document.getElementById("myModal");

            // Get the button that opens the modal
            var btn = document.querySelectorAll(".plus");
            
            if(countModal == 1)
            modal.style.display = "block";
            
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
                countModal = 0
                document.getElementById("erro").innerHTML = ""
                document.getElementById('valorPostal').value = ""
            }


            // pegando o valor postal para a sua verificação
            var postal = document.getElementById("postal")

            
            postal.onclick = function(){
                var valorPostal = document.getElementById('valorPostal').value
                if(valorPostal == ""){
                    console.log("preencha");
                    //alert("preencha o campo")
                    document.getElementById("erro").innerHTML = "Preencha o campo"
                    document.getElementById("erro").style.color = "red"
                }else{
                    if(valorPostal){
                        modal.style.display = "none";
                        abrirModal = true
                        alert("Olá "+ valorPostal + " que o nosso prazer o acompanhe")
                    } else{
                        //alert("endereço postal não existe")
                        document.getElementById("erro").innerHTML = "Endereço postal não existe"
                        document.getElementById("erro").style.color = "red"
                    }    
                }
    
            }
           

            //When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                countModal = 0
                document.getElementById("erro").innerHTML = ""
                document.getElementById('valorPostal').value = ""
            }
            }
        }

        if(numberSelectedPlates == document.querySelector('.selected select').value){
            console.log('Carrinho cheiro');
            //alert('Pacote Preenchido')
            numberPlates.innerHTML = ''
            document.querySelector('.progress p span:nth-of-type(1)').innerHTML = 'PROXÍMO '
            document.querySelector('.progress p span:nth-of-type(3)').innerHTML = 'PACOTE? CLICK 👇'
            setTimeout(() => {
                document.querySelector('.progress').style.border = "2px solid green"
                document.querySelector('.progress').style.color = "green"
            }, 3000);
               
            // setTimeout(() => {
            //     document.querySelector('.progress').style.border = "1px solid black"
            //     document.querySelector('.progress').style.color = "black"
            // }, 3000);

        }else if(numberSelectedPlates > document.querySelector('.selected select').value){
            console.log('RETIRE pratos');
            alert('RETIRE pratos')
        }else{

            if(abrirModal == true){
            numberSelectedPlates++
            contaClick++

            // document.querySelector('.infoPlates p span:nth-of-type(2)').innerHTML = elem.parentElement.querySelector('.count').innerHTML - numberSelectedPlates
            

            // mostrando os elementos de adicao e subtracao e o contador dos pratos
            var parent = elem.parentElement.querySelectorAll('span')
            parent.forEach(newelem => {
                newelem.style.display = 'inline-block'
            })
            elem.parentElement.querySelector('.count').innerHTML = Number(elem.parentElement.querySelector('.count').innerHTML) + 1


            //elem.parentElement.parentElement.parentElement.style.backgroundColor = '#07393E'


            
            // pegando as imagens do pratos a serem selecionada
            var plateImg = document.querySelectorAll('.plate')
            var pos = 0 // posicao dos elementos que não têm imgs
            var posImg = -1 // posicao dos elementos que já têm imgs

            
            // pegando a imagem da div selecionada ex img/m1.jpg
            var imgSrc = elem.parentElement.parentElement.parentElement.parentElement.querySelector('.produto img').src.split('/')
            elem.parentElement.parentElement.parentElement.parentElement.querySelector('.produto img').src.split('/')

            // verificando no array img vazias
            for (let i = 0; i < plateImg.length; i++) {
                    if(plateImg[i].querySelector('.img img').src === window.location.href){
                        console.log('Prato adicionado pela primeira vez');
                        pos = i // img ou prato ainda nao selecionado
                        
                        // elimincacao das caixas dos pratos
                        if( !contaClick == 1){
                            plateImg[plateImg.length -1].remove()
                            pratoRemovido = true    
                        }
                        break
                    }else if(plateImg[i].querySelector('.img img').src == elem.parentElement.parentElement.parentElement.parentElement.querySelector('.produto img').src){
                        // confirmando que o prato ja foi elecionado e aumentando a quantidade
                        console.log('prato já adicionado');
                        posImg = i // img ou prato ja selecionado
                        plateImg[i].querySelector('.img img').parentElement.parentElement.querySelectorAll('.infoPlates p span')[1].innerHTML =
                        elem.parentElement.querySelector('span:nth-of-type(2)').innerHTML
                        
                        // elimincacao das caixas dos pratos
                        if(contaClick > 1 && plateImg[plateImg.length -1].querySelector('.img img').src == window.location.href){
                            plateImg[plateImg.length -1].remove()
                            pratoRemovido = true
                            
                        }
                        break
                    }
                    
            }

            // trabalhando com o progress bar
            // calculo da percentagem progress bar 'numberSelectedPlates numero de pratos selecionados / numero da pratos total'
            var percentagemCrescimento = (numberSelectedPlates / document.querySelector('select').value) * 100
            document.querySelector('.progress-bar').style.width = percentagemCrescimento + '%'
            numberPlates.innerHTML = numberPlates.innerHTML - 1

            // confirmando se a posicao achada está vazia
            //console.log(plateImg[pos].querySelector('.img img').src, window.location.href);
            if(plateImg[pos].querySelector('.img img').src === window.location.href){
                plateImg[pos].querySelector('.img img').src = imgSrc[imgSrc.length -2] + '/' + imgSrc[imgSrc.length -1]
                
                plateImg[pos].querySelector('.img img').style.display = 'inline-block'

                plateImg[pos].querySelector('.img img').parentElement.parentElement.querySelectorAll('.infoPlates p span').forEach(newelem => {
                    newelem.style.display = 'inline-block'
                    //document.querySelector('.infoPlates p span:nth-of-type(2)').innerHTML = elem.parentElement.querySelector('span:nth-of-type(2)').innerHTML
                })
            }

        }

    }
}
})



// function MINUS
var minus = document.querySelectorAll('.produto .minus')
minus.forEach(elem => {
    elem.onclick = function (){

        var plateImg = document.querySelectorAll('.plate')

        // numero da pratos for maior que o numero do pacote pretendido remover pratos
        if(numberSelectedPlates > document.querySelector('.selected select').value){
            // plateImg[plateImg.length - 1].remove()
            // numberPlates.innerHTML = Number(numberPlates.innerHTML) - 1
            // amanhã trabalhar neste ponto................................................................
        }else{
        numberSelectedPlates--
        elem.parentElement.querySelector('.count').innerHTML = Number(elem.parentElement.querySelector('.count').innerHTML) - 1

         // pegando as imagens do pratos a serem selecionada
         var pos = 0 // posicao dos elementos que não têm imgs
         var posImg = -1 // posicao dos elementos que já têm imgs

         var imgSrc = elem.parentElement.parentElement.parentElement.parentElement.querySelector('.produto img').src.split('/')
        elem.parentElement.parentElement.parentElement.parentElement.querySelector('.produto img').src.split('/')

        for (let i = 0; i < plateImg.length; i++) {
            if(plateImg[i].querySelector('.img img').src == elem.parentElement.parentElement.parentElement.parentElement.querySelector('.produto img').src){
                // confirmando que o prato ja foi elecionado e aumentando a quantidade
                console.log('prato já adicionado');
                posImg = i // img ou prato ja selecionado
                plateImg[i].querySelector('.img img').parentElement.parentElement.querySelectorAll('.infoPlates p span')[1].innerHTML =
                elem.parentElement.querySelector('span:nth-of-type(2)').innerHTML
                

                // decrescendo a quantidade dos pratos ou removendo os pratos
                if(elem.parentElement.querySelector('.count').innerHTML == 0){

                    plateImg[i].querySelector('.count').innerHTML = 1
                    plateImg[i].querySelector('.img img').src = ''
                    plateImg[i].querySelector('.img img').style.display = 'none'
                    plateImg[i].querySelectorAll('.infoPlates p span').forEach(e =>{
                        e.style.display = 'none'
                    })

                    var parent = elem.parentElement.querySelectorAll('span:not(:last-child)')
                    parent.forEach(newelem => {
                    newelem.style.display = 'none'
                    })

                    plateImg[i].remove()
                    criarPratos()
                }
                break
            }
        }

        // trabalhando com o progress bar
        var percentagemCrescimento = (numberSelectedPlates / document.querySelector('select').value) * 100
        document.querySelector('.progress-bar').style.width = percentagemCrescimento + '%'
        
        
        if((document.querySelector('select').value - numberSelectedPlates) < 0){
            numberPlates.innerHTML = numberSelectedPlates - document.querySelector('select').value
            document.querySelector('.progress p span:nth-of-type(1)').innerHTML = 'RETIRE'
            document.querySelector('.progress p span:nth-of-type(3)').innerHTML = 'PRATOS'
        }else if((document.querySelector('select').value - numberSelectedPlates) == 0){
            numberPlates.innerHTML = ''
            document.querySelector('.progress p span:nth-of-type(1)').innerHTML = 'PROXÍMO'
            document.querySelector('.progress p span:nth-of-type(3)').innerHTML = 'PACOTE? CLICK 👇'
        }else{
            numberPlates.innerHTML = Number(numberPlates.innerHTML) + 1
            document.querySelector('.progress p span:nth-of-type(1)').innerHTML = 'FALTA'
            document.querySelector('.progress p span:nth-of-type(3)').innerHTML = 'PRATOS'
            console.log('Trabalhando');

            // fazendo a contagem dos pratos para a adicao do numero exato
            let contaPratos = 0
            document.querySelectorAll('.plate').forEach(numeroTotalPratosPreenchidos =>{

                //numeroTotalPratosPreenchidos.querySelector('.count').innerHTML
                if(numeroTotalPratosPreenchidos.querySelector('img').src == window.location.href){
                contaPratos++
                }else{
                    contaPratos = contaPratos +  Number(numeroTotalPratosPreenchidos.querySelector('.count').innerHTML)
                }

            })
            
            // adicionando pratos...
            if(pratoRemovido){
                
                if(document.querySelector('select').value > plateImg.length){
                    if(contaPratos != document.querySelector('select').value){
                        criarPratos() 
                    }
                }

            }
        }
    }
        
    }
})

var posicaoElemnto = 0
document.addEventListener('click', function(e){
    
    // function menuMinus
    if(e.target && e.target.classList.value == 'menuMinus'){
        numberSelectedPlates--
        e.target.parentElement.querySelector('span:nth-of-type(2)').innerHTML = Number(e.target.parentElement.querySelector('span:nth-of-type(2)').innerHTML) - 1
        
        // pegando as imagens do pratos a serem selecionada
        var produtos = document.querySelectorAll('.produto')
         for (let i = 0; i < produtos.length; i++) {
             if(produtos[i].querySelector('div:first-child img').src == e.target.parentElement.parentElement.parentElement.querySelector('div:first-child img').src){
                 produtos[i].querySelector('span:nth-of-type(2)').innerHTML = Number(e.target.parentElement.querySelector('span:nth-of-type(2)').innerHTML)
                 posicaoElemnto = i
             }
        }
             // decrescendo a quantidade dos pratos ou removendo os pratos
            if(e.target.parentElement.querySelector('span:nth-of-type(2)').innerHTML == 0){
                e.target.parentElement.querySelector('span:nth-of-type(2)').innerHTML = 1
                e.target.parentElement.parentElement.parentElement.querySelector('.img img').src = ''
                e.target.parentElement.parentElement.parentElement.querySelector('.img img').style.display = 'none'
                e.target.parentElement.parentElement.parentElement.querySelectorAll('.infoPlates p span').forEach(e =>{
                    e.style.display = 'none'
                })

                produtos[posicaoElemnto].querySelector('span:nth-of-type(2)').innerHTML = 0
                var parent = produtos[posicaoElemnto].querySelectorAll('span:not(:last-child)')
                parent.forEach(newelem => {
                newelem.style.display = 'none'
                })

                e.target.parentElement.parentElement.parentElement.remove()
                criarPratos()
            }
         
        

         // trabalhando com o progress bar
         var plateImg = document.querySelectorAll('.plate')
         var percentagemCrescimento = (numberSelectedPlates / document.querySelector('select').value) * 100
         document.querySelector('.progress-bar').style.width = percentagemCrescimento + '%'


         if((document.querySelector('select').value - numberSelectedPlates) < 0){
            numberPlates.innerHTML = numberSelectedPlates - document.querySelector('select').value
            document.querySelector('.progress p span:nth-of-type(1)').innerHTML = 'RETIRE'
            document.querySelector('.progress p span:nth-of-type(3)').innerHTML = 'PRATOS'
        }else if((document.querySelector('select').value - numberSelectedPlates) == 0){
            numberPlates.innerHTML = ''
            document.querySelector('.progress p span:nth-of-type(1)').innerHTML = 'PROXÍMO'
            document.querySelector('.progress p span:nth-of-type(3)').innerHTML = 'PACOTE? CLICK 👇'
        }else{
            numberPlates.innerHTML = Number(numberPlates.innerHTML) + 1
            document.querySelector('.progress p span:nth-of-type(1)').innerHTML = 'FALTA'
            document.querySelector('.progress p span:nth-of-type(3)').innerHTML = 'PRATOS'
            

            // fazendo a contagem dos pratos para a adicao do numero exato
            let contaPratos = 0
            document.querySelectorAll('.plate').forEach(numeroTotalPratosPreenchidos =>{

                //numeroTotalPratosPreenchidos.querySelector('.count').innerHTML
                if(numeroTotalPratosPreenchidos.querySelector('img').src == window.location.href){
                contaPratos++
                }else{
                    contaPratos = contaPratos +  Number(numeroTotalPratosPreenchidos.querySelector('.count').innerHTML)
                }

            })
            
            // adicionando pratos...
            if(pratoRemovido){
                
                if(document.querySelector('select').value > plateImg.length){
                    if(contaPratos != document.querySelector('select').value){
                        criarPratos() 
                    }
                }

            }
        }



    }else if(e.target && e.target.classList.value == 'menuPlus'){


        // function menuPlus
        if(numberSelectedPlates == document.querySelector('.selected select').value){
            console.log('Carrinho cheiro');
            numberPlates.innerHTML = ''
            document.querySelector('.progress p span:nth-of-type(1)').innerHTML = 'PROXIMO '
            document.querySelector('.progress p span:nth-of-type(3)').innerHTML = 'PACOTE? CLICK 👇'
           // alert('Pacote Preenchido')
        }else if(numberSelectedPlates > document.querySelector('.selected select').value){
            console.log('RETIRE pratos');
            alert('RETIRE pratos')
        }else{
        numberSelectedPlates++
        e.target.parentElement.querySelector('span:nth-of-type(2)').innerHTML = Number(e.target.parentElement.querySelector('span:nth-of-type(2)').innerHTML) + 1
         //document.querySelector('.infoPlates p span:nth-of-type(2)').innerHTML = e.target.parentElement.querySelector('span:nth-of-type(2)').innerHTML
         
         // pegando as imagens do pratos a serem selecionada
         var produtos = document.querySelectorAll('.produto')
         for (let i = 0; i < produtos.length; i++) {
             if(produtos[i].querySelector('div:first-child img').src == e.target.parentElement.parentElement.parentElement.querySelector('div:first-child img').src){
                 produtos[i].querySelector('span:nth-of-type(2)').innerHTML = Number(e.target.parentElement.querySelector('span:nth-of-type(2)').innerHTML)
             }
         }

        // trabalhando com o progress bar
        var plateImg = document.querySelectorAll('.plate')
        var percentagemCrescimento = (numberSelectedPlates / document.querySelector('select').value) * 100
        numberPlates.innerHTML = numberPlates.innerHTML - 1

        document.querySelector('.progress-bar').style.width = percentagemCrescimento + '%'

        // elimincacao das caixas dos pratos
        if(contaClick >= 1 && plateImg[plateImg.length -1].querySelector('.img img').src == window.location.href){
            plateImg[plateImg.length -1].remove()
            pratoRemovido = true
            
        }

        }
     }
    
});

// document.addEventListener("input", function(e){
//     // trabalnho na validação do codigo postal, 
//     if(e.target && e.target.id == "valorPostal"){
//         var postalList = [], li = document.createElement("li")
//         document.querySelector('#postal').style.display = 'block'
//             li.innerHTML = ''
//             fetch(`https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&postcode=${e.target.value}&limit=1`)
//                 .then(resp => resp.json())
//                 .then(postalAPI => {
//                     postalList = postalAPI.features
//                     postalList.forEach(e => {
//                         if(e.properties.context.split(', ')[2] == 'Île-de-France'){
//                             li.innerHTML = e.properties.postcode +" - " + e.properties.city
//                         }else{
//                             li.innerHTML = 'Nous ne livrons pas de produits dans cette région'
//                             document.querySelector('#postal').style.display = 'none'
//                             setTimeout(() => {
//                                 document.querySelector(".postalResultAPI li").style.display = 'none'
//                                 document.querySelector(".postalResultAPI li").innerHTML =''
//                                 document.querySelector('#postal').style.display = 'block'
//                                 document.querySelector('#valorPostal').value = ''
//                             }, 2000);
//                         }
//                         document.querySelector(".postalResultAPI").appendChild(li)
//                     })
//             })
//     }
// })

document.querySelector('.selected a').onclick = function(e){
    e.preventDefault()
    var pacoteCheio = document.querySelector('.selected .progress p:first-child span:nth-of-type(2)').innerHTML;
    if(pacoteCheio == '' ){
        var modal = document.getElementById('modalNextPrato');
        modal.style.display = 'block';
        var novoProximoPrato = 0

            document.getElementById("proximoPrato").onclick = function(e){
                var proximoPrato = Number(document.querySelector('select').value)
            
                switch(proximoPrato) {
                    case 4:
                        novoProximoPrato = 6
                        break;
                    case 6:
                        novoProximoPrato = 8
                        break;
                    case 8:
                        novoProximoPrato = 10
                        break;
                    case 10:
                        novoProximoPrato = 12
                        break;
                    case 12:
                        novoProximoPrato = 14
                        break;
                    case 14:
                        novoProximoPrato = 24
                        break;
                    default:
                        break;
                }
                document.querySelector('select').value = novoProximoPrato

                numberPlates.innerHTML = novoProximoPrato
                //selectedPlates.innerHTML = ''

            
                document.querySelector('.progress p span:nth-of-type(1)').innerHTML = 'FALTA '
                document.querySelector('.progress p span:nth-of-type(3)').innerHTML = 'PRATOS'

                let contaPratos = 0
                document.querySelectorAll('.plate').forEach(numeroTotalPratosPreenchidos =>{

                    //numeroTotalPratosPreenchidos.querySelector('.count').innerHTML
                    if(numeroTotalPratosPreenchidos.querySelector('img').src == window.location.href){
                        contaPratos++
                    }else{
                        contaPratos = contaPratos +  Number(numeroTotalPratosPreenchidos.querySelector('.count').innerHTML)
                    }

                })

                
                // trabalhando com o progress bar
                var percentagemCrescimento = (numberSelectedPlates / novoProximoPrato) * 100
                document.querySelector('.progress-bar').style.width = percentagemCrescimento + '%'
                numberPlates.innerHTML = novoProximoPrato - numberSelectedPlates

                novaQuantidadePratos = contaPratos

                for(let i = 0; i < novoProximoPrato - novaQuantidadePratos; i++){
                    criarPratos()
                }

                modal.style.display = 'none';
            }

            // When the user clicks on <span> (x), close the modal
            var span = document.getElementsByClassName('close')[1];
            span.onclick = function() {
                modal.style.display = 'none';
            }
    }
}