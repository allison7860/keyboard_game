var sentences = [
    sentence1 =  'The dog fell off a huge steep hill but he had no choice but to look around for his old friend. The two reunited again after a long two day journey home.',
    sentence2 =  'The thirsty impulse persuades the adjustment. The profit devises the tacky burst. The bouncy body check in the size.',
    sentence3 =  'The level bread allocates the secretary. The shade extends the thoughtful damage.',
    sentence4 =  'The prose validates the week. The sky holds the fertile heat. The song addresses the wholesale idea.',
    sentence5 =  'The driving calculates the science. The paltry rule draws the music. The destruction maps the uneven digestion. The wax researches the secretary.',
    sentence6 =  'The exchange accomplishes the modern approval. The fire involves the brave expansion. The hysterical wind uncovers the operation.',
    sentence7 = 'She borrowed the book from him many years ago and has not yet returned it. A purple pig and a green donkey flew a kite in the middle of the night and ended up sunburnt.',
    sentence8 = 'Abstraction is often one floor above you. The body may perhaps compensates for the loss of a true metaphysics.'
];

var newAr = [];
var arfinal = [];

var startGame = (function(){
    newAr.length = 0;
    arfinal.length = 0;
    var disabled = $('.startgame, .endgame').blur();
    $('.time').html('');
    var methods = {
    start: 0,
    timer: (function() {
        try {
           endGame(); 
        } catch (err) {console.log('')}
        var start = Date.now();
        thetimer = setInterval(function(){
            var newtime = Date.now() - start;
            newtime = moment.duration(newtime).asSeconds();

            $('.time').html(Math.round(newtime) + ' sec');
        }, 1000);
    })(),
    // random grabs a sentence in array
    getSen: (function(){
        for (var i = 0; i <= sentences.length; i++) {
            var random = Math.random(i) * Math.floor(sentences.length-1);
            var round = Math.round(random);   
        }
        picked = sentences[round];
    })(),
    addSpan: (function () {
        // Add each letter in sentence to a span element
        $('pre').html('');
        for (var s = 0; s < picked.length; s++) {
            var picked_html = '<span>' + picked[s] + '</span>';
            $('pre').append(picked_html)
        }
    })(),
    letter: (function() {
        var letter = picked.split('');
        for (var i = 0; i < letter.length; i++) {
            // Fixing "period" from ASCII to Key code 
            if (letter[i].toUpperCase().charCodeAt(0) == 46) {
                    newAr.push(190);
            } else {
            var lee = letter[i].toUpperCase().charCodeAt(0);
            newAr.push(lee);
            }
        }
    })()
    }
    var errors = 0;
    capture = function (e) {
            var KeyCode = e.keyCode || e.which;

            // push the keys inside array
            if (arfinal.length < newAr.length) {
               arfinal.push(KeyCode);
               validate(arfinal, newAr);
            } 
            if (arfinal.length == newAr.length) {
                validate(arfinal, newAr);
                endGame();
            }
            // Check both arrays...
            function validate(a, n) {
                var lastIndex = a.slice(-1)[0];
                var thatIndex = a.lastIndexOf(lastIndex);

                // console.log('lastindex typed' + lastIndex + 'the actual index' + thatIndex + 'newAr # of same index' + n[thatIndex]);
                

                if (!(lastIndex == n[thatIndex])) {
                    errors++;
                    $('.er').html('Errors: ' + errors);
                }
                // Convert Keycode to Character
                var convert = String.fromCharCode(lastIndex).toLowerCase();
                var div = $('.keys');

                for (var i = 0; i < div.length; i++) {
                    if (convert == div[i].innerText) {
                        var d = div[i];
                    }
                }
                
                $(d).css({ 'background-color': '#ded', 'box-shadow': '3px 3px #000'});
                $(d).animate({ 'background-color':'#ded'},{duration:300,complete: function() {
                    $(this).css({'background-color': '#fff', 'box-shadow': '2px 2px #000'});
                }});

            

                // ADD functionality to the pre!
                var typed = picked[thatIndex].toUpperCase().charCodeAt(0);

                // console.log(typed, picked[thatIndex], thatIndex);
                var typed_190 = 190;

                var prespan = $('pre span')[thatIndex];

                if (typed == KeyCode) {
                    $(prespan).css('text-decoration', 'underline');

                } else if (typed_190 == KeyCode) {
                    $(prespan).css('text-decoration', 'underline');
                }
                else {
                    $(prespan).css('background-color', 'pink');
                }
            }
        };
        document.addEventListener('keydown', capture);
});

var endGame = (function() {
    var methods = {
        end: 1,
        timer:
            (function() {
            try { clearInterval(thetimer); }
            catch (err) {if (err instanceof ReferenceError) {
                
            }}
        })(),
        uncapture: (function(){
            try { document.removeEventListener('keydown', capture) }
            catch (err) {if (err instanceof ReferenceError) {}
        }
        })()
    }
});

$('.startgame').on('click', startGame);
$('.endgame').on('click',endGame);
