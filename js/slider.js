    
    var sliderModule =(function(){


        var _initiateSlider = function(data) {
            
            var totalTicks = data.length;
            
            document.getElementsByTagName('input')[0].setAttribute('max', totalTicks -1);
            
            var sliderEl = document.getElementById('sliderticks')
            var constantPaddingLeft = '10px';
            for (let i = 0 ; i < totalTicks ; i++) {
                let listItem = document.createElement('li');

                listItem.style.width = 100/totalTicks + '%'
                listItem.classList += 'ticks'
                if (i > 0) {
                    listItem.style.paddingLeft += ( parseFloat(constantPaddingLeft.split('px')[0]) + 4*i) + 'px';
                }
                
                let snippet = document.createTextNode((i+1)*5);
                
                listItem.appendChild(snippet);
                sliderEl.appendChild(listItem);
            }
            return true;
        }

        var _moveSlider = function(pointToMove) {
            debugger;
            console.log('move', pointToMove);
            document.querySelector('input[type=range]').value = pointToMove;
        }

        return {
            setSlider: _initiateSlider,
            moveSlider: _moveSlider
            }


    })();

