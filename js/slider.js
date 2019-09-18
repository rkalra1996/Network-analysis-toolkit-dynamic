    
    var sliderModule =(function(){


        var _initiateSlider = function(data) {
            var totalTicks = data.length;
            document.getElementsByTagName('input')[0].setAttribute('max', totalTicks);
            var sliderEl = document.getElementById('sliderticks')

            for (let i = 0 ; i < totalTicks ; i++) {
                let listItem = document.createElement('p');
                if (i == 0) {
                    listItem.setAttribute('class', 'active selected');
                    listItem.setAttribute('width', '1%');
                } else {}
                listItem.style.width = 100/totalTicks + '%'
                let snippet = document.createTextNode(i+1);
                listItem.appendChild(snippet);
                sliderEl.appendChild(listItem);
            }
        }

        var _moveSlider = function(pointToMove) {
            console.log('move', pointToMove);
            document.querySelector('input[type=range]').value = pointToMove;
        }

        return {
            setSlider: _initiateSlider,
            moveSlider: _moveSlider
            }


    })();

