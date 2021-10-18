
        // wedlock_multi_input.js       for taking input as a sentence

        // alekya_speech.js             for taking questions and checking nearest

        // wedlock_main.js              main js file for wedlock

        // wedlock_output.js            for displaying result and saving cookies

        // wedlock_add_to_corpus.js     for adding new words to corpus




        $('#sql_form').submit(function(){
            var formData = new FormData($(this)[0]);
            $.ajax({
                url: '/wedlock',
                type: 'POST',
                data: formData,
                async: false,
                success: function (data) {
                    $('.alert').fadeOut()
                    sqltable = data.data;
                    data_count = sqltable.length
                    $(function(){
                        var oTable = $('#sql_table').DataTable({
                            data: data.data,
                            columns: data.cols,
                            pageLength : 5,
                            'scrollX':true,
                            // "bDestroy": true,
                            // "dom": 'C<"clear">lfrtip',
                            // "columnDefs" : [
                            //   { "targets": [2,6], "visible": false,},
                            //   {"targets": -1,
                            //     "data": null,
                            //     "defaultContent": "<div><button class='btn btn-info btn-sm'>See more!</button></div>"}
                            //],
                            rowReorder: {
                                selector: 'td:nth-child(2)'
                            },
                            responsive: true
                        });
                        // $('#sql_table tbody').on( 'click', 'button', function () {
                        //     var data = oTable.row( $(this).parents('tr') ).data();
                        //     alert("You need to Reigister to see whole information ");
                        // });
                    })
                    // createCard(data)
                },
                error: function(xhr, textStatus, error){
                   // $('.alert').fadeIn()
                    console.log(xhr.statusText);
                    console.log(textStatus);
                    console.log(error);
                },
                dataType: 'JSON',
                cache: false,
                contentType: false,
                processData: false
            });
            return false;
        });
    
    
        function createCard(d){
            var data = d.data
            var cols = d.cols
            $('#card_g').fadeIn()
            for(let x in data){
                for(let y in data[x]){
                var temp = document.createElement(`<!DOCTYPE html>
                                            <html lang="en">
    
                                            <head>
                                              <meta charset="UTF-8" />
                                              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                              <title>Document</title>
                                            </head>
    
                                            <body>
                                              <div id="pInfo">
                                                <div>
                                                  <div class="card" style="width: 300px">
                                                    <div class="card-header">
                                                      <button class="close" onclick="close_proflie()" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                      </button>
                                                      <div id="profile-main">
                                                        <div style="display: inline-flex">
                                                          <div style="
                                                                background-color: white;
                                                                padding: 5px;
                                                                box-shadow: 0.5px 0.5px 2px #888888;
                                                                width: 100px;
                                                                height: 100px;
                                                              ">
                                                            <p id="profile"></p>
                                                            <p id="pName" class="d-inline"></p>
                                                          </div>
                                                          <div class="p-2">
                                                            <p id="user_sign" class="p-1 m-0" style="font-size: 0.8rem"></p>
                                                            <p id="user_mood" class="p-1 m-0" style="font-size: 0.8rem"></p>
                                                            <button class="btn btn-outline-info p-1 m-1" style="font-size: 0.8rem" onclick="sound_toggle()"
                                                              type="button" id="sound_toggle">
                                                              🎵 Off
                                                            </button>
                                                            <button class="btn btn-outline-info p-1 m-1" style="font-size: 0.8rem" id="chat_btn" onclick="chat()">
                                                              chat
                                                            </button>
                                                            <form action="/anime" method="post">
                                                              <input type="text" name="slide_uid" style="display: none" id="slide_userid" />
                                                              <input type="submit" class="btn btn-outline-info p-1 m-1" style="font-size: 0.8rem" value="slideshow"
                                                                id="slideshow" />
                                                            </form>
                                                          </div>
                                                        </div>
                                                        <div style="display: flex">
                                                          <button class="btn btn-outline-info p-1 m-1" style="font-size: 0.8rem" onclick="remove_profile()">
                                                            Decline Profile
                                                          </button>
                                                          <button class="btn btn-outline-info p-1 m-1" style="font-size: 0.8rem" onclick="show_report()">
                                                            <i class="fa fa-flag"></i> Report profile
                                                          </button>
                                                        </div>
    
                                                        <ul class="list-group list-group-flush">
                                                          <li class="list-group-item">
                                                            <p class='pCat'>
                                                                <b>${cols[2]['title']}: </b> ${data[x][2]} (${data[x][4]})<br>
                                                                <b>${cols[3]['title']}: </b> ${data[x][3]}<br>
                                                                <b>${cols[0]['title']}: </b> ${data[x][0]}<br>
                                                                <b>${cols[5]['title']}: </b> ${data[x][5]}<br>
                                                                <b>${cols[6]['title']}: </b> ${data[x][6]}<br>
                                                                <b>${cols[7]['title']}: </b> ${data[x][7]}<br>
                                                            </p>
                                                            <div style="display: inline-flex">
                                                              <p class="m-0 p-0" style="
                                                                    font-size: 0.8rem;
                                                                    border-top: 1px dotted gray;
                                                                    position: relative;
                                                                    left: 40%;
                                                                  " onclick="show_more()">
                                                                Additional details
                                                              </p>
                                                              <img class="m-1 p-0" src="./static/down_arrow.png" onclick="show_more()" id="show_more_png" style="
                                                                    display: none;
                                                                    width: 20px;
                                                                    height: 10px;
                                                                    position: relative;
                                                                    left: 10%;
                                                                  " />
                                                              <img class="m-1 p-0" src="./static/down_arrow.png" onclick="hide_more()" id="hide_more_png" style="
                                                                    -ms-transform: rotate(180deg);
                                                                    transform: rotate(180deg);
                                                                    width: 20px;
                                                                    height: 10px;
                                                                    position: relative;
                                                                    left: 10%;
                                                                  " />
                                                              -->
                                                            </div>
    
                                                            <div id="more_details" style="
                                                                  border-top: 1px dotted gray;
                                                                  display: none;
                                                                  transition: 1s;
                                                                ">
                                                              <p id="bio_info">Self intro : blank</p>
                                                              <p id="add_info">Additional details : blank</p>
                                                            </div>
                                                          </li>
                                                        </ul>
                                                      </div>
                                                      <div id="report-div" style="display: none; height: 350px">
                                                        <div class="card-header">
                                                          <h4><i class="fa fa-flag"></i> Report profile</h4>
                                                        </div>
                                                        <input type="checkbox" id="checkbox1" class="report_inputs" value="fake" />Profile is not real<br />
                                                        <input class="report_inputs" type="checkbox" id="checkbox3" value="chat" />Abused behavior over the
                                                        chat<br />
                                                        <input type="checkbox" id="checkbox2" value="" />Violent or
                                                        repulsive content<br />
                                                        <div class="dropdown" id="report_opt2" style="display: none">
                                                          <button class="custom-select" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                                            aria-haspopup="true" aria-expanded="false">
                                                            Select options
                                                          </button>
                                                          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="position: relative">
                                                            <label class="dropdown-item"><input class="report_inputs" type="checkbox" value="profile" />Bad profile
                                                              image</label>
                                                            <label class="dropdown-item"><input class="report_inputs" type="checkbox" value="music" />Bad
                                                              music</label>
                                                            <label class="dropdown-item"><input class="report_inputs" type="checkbox" value="bio" />Bad content in
                                                              bio</label>
                                                          </div>
                                                        </div>
                                                        <button type="button" class="btn btn-secondary btn-sm m-1" onclick="cancel_report()">
                                                          Back
                                                        </button>
                                                        <button class="btn btn-primary btn-sm m-1" onclick="submit_report()">
                                                          Submit
                                                        </button>
                                                      </div>
                                                      <div id="feedback-msg" style="display: none; height: 350px">
                                                        <div class="jumbotron">
                                                          <h1>Thank you for your feedback!</h1>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </body>
    
                                            </html>`)
    
                }
                document.getElementById('g_card').appndChild(temp)
            }
                // $('#pCat').append()
        }
    
    
    
    
    
        function close_chat(){
        document.getElementById('chat_Div').style.display = 'none'
        }
    
        function close_proflie(){
             document.getElementById('pInfo').style.display = 'none'
           audio.pause();
        }
        function close_decline(){
             document.getElementById('decline_div').style.display = 'none'
        }
        function open_decline(){
            document.getElementById('close_mystuff').click()
            document.getElementById('decline_div').style.display = 'block'
    
                var elmnt = document.getElementById("decline_div");
            elmnt.scrollIntoView();
    
        }