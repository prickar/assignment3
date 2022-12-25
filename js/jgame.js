$(function(){
    let container = $('#container');
    let bird = $('#bird');
    let pole = $('.pole');
    let pole_1 = $('#pole_1');
    let pole_2 = $('#pole_2');
    let score = $('#score');
    let speed_span = $('#speed');
    let restart_btn = $('#restart_btn');

    let container_width = parseInt(container.width());
    let container_height = parseInt(container.height());
    let pole_initial_position = parseInt(pole.css('right'));
    let pole_initial_height = parseInt(pole.css('height'));
    let bird_left = parseInt(bird.css('left'));
    let bird_height = parseInt(bird.height());
    let speed = 10;

    let go_up = false;
    let score_updated = false;
    let game_over = false; 


    let the_game = setInterval(function() {

        if (collision(bird, pole_1) || collision(bird, pole_2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > 
        container_height - bird_height) {
            
            stop_the_game();

        } else {

        let pole_current_position = parseInt(pole.css('right'));

        if(pole_current_position > container_width - bird_left) {
            if(score_updated === false){
            score.text(parseInt(score.text()) + 1);
            score_updated = true;
            }
        }
        if(pole_current_position > container_width) {
            let new_height = parseInt(Math.random() * 100);

            pole_1.css('height', pole_initial_height + new_height);
            pole_2.css('height', pole_initial_height - new_height);

            speed = speed + 1; 
            speed_span.text(speed);

            score_updated = false;

            pole_current_position = pole_initial_position;
        }

        pole.css('right', pole_current_position + speed); 

        if(go_up === false) {
            go_down();
        }
    }

    }, 40);

    $(document).on('keydown', function(e) {
        let key = e.keyCode;
        if(key === 32 && go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
    });

    $(document).on('keyup', function(e) {
        let key = e.keyCode;
        if(key === 32) {
            clearInterval(go_up);
            go_up = false; 
        }
    });

    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 5);
    }

    function up() {
        bird.css('top', parseInt(bird.css('top')) - 10);
    }

    function stop_the_game() {
        clearInterval(the_game);
        game_over = true;
        restart_btn.slideDown();
    }

    restart_btn.click(function() {
        location.reload();
    });

    function collision($div1, $div2) {       
        let x1 = $div1.offset().left;
        let y1 = $div1.offset().top;
        let h1 = $div1.outerHeight(true);
        let w1 = $div1.outerWidth(true);
        let b1 = y1 + h1; 
        let r1 = x1 + w1; 
        let x2 = $div2.offset().left;
        let y2 = $div2.offset().top;
        let h2 = $div2.outerHeight(true);
        let w2 = $div2.outerWidth(true);
        let b2 = y2 + h2; 
        let r2 = x2 + w2; 

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2)  return false;
        return true;
    }


});