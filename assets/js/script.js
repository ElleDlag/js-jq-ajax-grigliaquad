function nRand(n,x){
    return Math.floor(Math.random()*(n-x)+x)
}

$(function(){
    var countFill = 0;
    var wdSize;
    wdSize = $(window).width()
    wdSize = Math.round(wdSize - (wdSize * 0.2));
    wdSize = nRand(wdSize,300)
    $(':root').css('--wd-size', (wdSize + 'px'))

    $(window).resize(function(){
        /* wdSize = $(window).width() */
        wdSize = Math.round(wdSize - (wdSize * 0.2));
        $(':root').css('--wd-size', (wdSize + 'px'))
    })

    var sourceCell = document.getElementById("cell-template").innerHTML;
    var cellGrid = Handlebars.compile(sourceCell);
    var num =  nRand(14,3)
    $(':root').css('--size', num)
    var size = $(':root').css('--size')
    var multiply = size*size

    for(var i = 0; i<multiply; i++){
        $('.grid').append(cellGrid)
    }

    myCell = $('.cell-grid')
    $(document).on({
        'click':function(){
        myCell = $(this)
        
        if(myCell.css('background-color') == 'rgb(255, 255, 255)'){
            $.ajax({
                type: "GET",
                url: "https://flynn.boolean.careers/exercises/api/random/int",
                dataType: "json",
                success: function (dataRex) {
                    var result = dataRex.response
                    $('h2').text(result)
                    myCell.children('.cell-value').text(result)
                    if (result <= 5 ){
                        myCell.css('background-color','red');
                        myCell.off();
                        countFill++
                    } else {
                        myCell.css('background-color','yellow')
                        myCell.off()
                        countFill++
                    }
                    return countFill
                },
                error: function (dataRex) {
                    myCell.children('.cell-value').text('e')
                }
            }); 
        }

        if(countFill == ($('.cell-grid').length)-1 ){
            var i = 0;
            var addEffect = setInterval(function(){
                $('.cell-grid').eq(i).addClass('purple');
                $('.cell-grid').eq(i).css('background-color','purple')
                i++;
            }, 25)
            if(i == $('.cell-grid').length){
                clearInterval(addEffect)
            }
 
        }
        }
    },'.cell-grid')


    $('button').click(function(){
        location.reload()
    })
        
    ;
})//end here