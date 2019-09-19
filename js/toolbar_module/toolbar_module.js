var toolbarModule = (function(jQuery){

    function _getNodeDetailsTemplate(elementToUse, data) {
        let el = elementToUse;
        let elemTemplate = `
        <div class="row">
            <p class="name">Name</p>
            <p class="value">${data.name}</p>
        </div>
        <div class="row">
            <p class="name">Type</p>
            <p class="value">${data.type}</p>
        </div>
        <div class="row">
            <p class="name">Gender</p>
            <p class="value">${data.gender}</p>
        </div>
        <div class="row">
            <p class="name">Tone</p>
            <p class="value ${data.tone}">${data.tone}</p>
      </div>
      `;

      // insert the template into the element
        el.empty();
        el.html(elemTemplate);
    }

    var _updateNodeDetails = function(dataToUse) {

        let coreEl = jQuery('.node-details');
        coreEl.css('opacity', 1);

        let el = jQuery('div.node-details > div.container > div.body');
        if (dataToUse === -1) {
        // sequence completed 
            el.empty();
            el.html('<p style="margin: 0; text-align: center; padding-bottom: 5px;">Sequence Complete !</p>');

            setTimeout(function(){
                coreEl.css('opacity', 0)
            }, 2000);
        } else {
            let name = dataToUse.pname || 'NA';
            let type = dataToUse.ptype || 'NA';
            let gender = dataToUse.gender || 'Not Specified';
            let tone = dataToUse.tone || 'NA';

        _getNodeDetailsTemplate(el,{name, type, gender, tone});
        }

    }

    var _updateVideoDetails = function(dataToUse) {}
    
    return {
        updateNodeDetails : _updateNodeDetails,
        updateVideDetails: _updateVideoDetails
    }
})($)