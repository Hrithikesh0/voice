

    // wedlock_multi_input.js       for taking input as a sentence

    // alekya_speech.js             for taking questions and checking nearest

    // wedlock_main.js              main js file for wedlock

    // wedlock_output.js            for displaying result and saving cookies

    // wedlock_add_to_corpus.js     for adding new words to corpus







    var temptranscript =  {}
    var result_input = ""
    var out_nodes = {}
    var o_nodes = {}
    var i = 0
    var current_node = ''
    var inp =  []
    var array_data = []
    var all_nodes = []
    var glo_flag = 'true'
    var final_message = 'Please confirm and proceed'
    var search_keywords = ""

    function AlekyaVoice(obj){
        var outnode = obj.nodename
        all_nodes.push(outnode)
        var check = "checked"
        array_data = obj.main
        var auto_correct_input = `<lable><input type='checkbox' ${check} class='auto-correct' onchange='toggle_auto_correct(this.title)' id='${outnode}_check'  title='${outnode}'> auto correct </lable>`
        if(!obj.auto_correct){
          obj.auto_correct = false
          check = ""
          auto_correct_input = ''
        }
        if(!obj.data_array){
          obj.data_array = []
        }

        out_nodes[outnode] = {"auto_correct" : obj.auto_correct ,"data_array" :  obj.data_array }
        o_nodes[outnode] = {"auto_correct" : obj.auto_correct ,"data_array" :  obj.data_array }
        result_input = "#" + outnode + "_result"
        var new_word = obj.new_word

        document.getElementById(obj.output).innerHTML += `<div class='mx-auto' id="${outnode}_node" >
                                <div style='display:flex; justify-content:center'>
                                    <div style='width:100px;' >

                                            <small>${outnode}</small> <a href='javascript:void(0)' id='${outnode}_clear' onclick='clear_indi(this.id)'><small>clear</small></a>
                                            <input style='width:100%;'  class='form-control voiceInput' placeholder='${outnode}' type='text' id='${outnode}_result'>
                                    </div>
                                    <div id="${outnode}_options" >
                                    <br />
                                        <div class='options d-flex'>
                                        <div><button class=' m-0 mx-2 rounded-circle btn bg-info text-white px-3 py-2 ' title='${outnode}' onclick="manual_data_recognition(this.title)" id="${outnode}_submit"><i class="fas fa-check"></i></button></div>
                                        <div> <button class=' m-0 mx-2 rounded-circle btn bg-info text-white px-3 py-2 ' title='${outnode}' onclick="start_recognition(this.title)" id="${outnode}_start"><i class="fas fa-microphone-alt"></i></button></div>
                                        <div> <button class=' m-0 mx-2 rounded-circle btn bg-danger text-white px-3 none py-2 ' style='display:none' id='${outnode}_stop' title='${outnode}' onclick="stop_recognition(this.title)"><i class="fas fa-microphone"></i></button></div>
                                        <div> ${auto_correct_input}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        for(let x in all_nodes){
            if(getCookie(all_nodes[x]) != null || getCookie(all_nodes[x]) != undefined || getCookie(all_nodes[x]) != ''){
                var temp = getCookie(all_nodes[x])
                try{
                    document.getElementById(`${all_nodes[x]}_result`).value = temp
                }
                catch(e){
                    document.getElementById(`${outnode}_result`).value = ''
                }

            }else{
                document.getElementById(`${all_nodes[x]}_result`).value = ''
            }
        }
                        // <svg class="svg-icon btn-primary" title='${outnode}' style='width:30px; padding:0;' fill='white' onclick="start_recognition(this.title)" id="${outnode}_start" viewBox="0 0 20 20">
               //   <path d="M10.403,15.231v2.035h2.827c0.223,0,0.403,0.181,0.403,0.404c0,0.223-0.181,0.403-0.403,0.403H6.77c-0.223,0-0.404-0.181-0.404-0.403c0-0.224,0.181-0.404,0.404-0.404h2.826v-2.035C6.89,15.024,4.751,12.758,4.751,10c0-0.223,0.181-0.403,0.404-0.403S5.559,9.777,5.559,10c0,2.449,1.992,4.441,4.441,4.441c2.449,0,4.441-1.992,4.441-4.441c0-0.223,0.182-0.403,0.404-0.403s0.403,0.18,0.403,0.403C15.248,12.758,13.108,15.024,10.403,15.231 M13.026,4.953V10c0,1.669-1.357,3.027-3.027,3.027S6.972,11.669,6.972,10V4.953c0-1.669,1.358-3.028,3.028-3.028S13.026,3.284,13.026,4.953M12.221,4.953c0-1.225-0.996-2.22-2.221-2.22s-2.221,0.995-2.221,2.22V10c0,1.225,0.996,2.22,2.221,2.22s2.221-0.995,2.221-2.22V4.953z"></path>
              //      </svg>


    }



    var temp;
    var gloval = [];
    var expected_input = ''

    function start_recognition(id){
      result_input =   id + "_result"
      current_node = id

      document.getElementById(id + "_start").style.display = "none"
      document.getElementById(id + "_stop").style.display = "block"

      console.log(out_nodes)

      readOutLoud(id)
      setTimeout(function(){
          voice_recognition.start()
      },800)
    }






    function stop_recognition(current_node){
      voice_recognition.stop()
       document.getElementById(current_node + "_start").style.display = "block"
      document.getElementById(current_node + "_stop").style.display = "none"
    }

    function clear_indi(id){
        var id = id.split("_", 1);
        document.getElementById(id + '_result').value = ''
        delete_cookie(id)
    }
    var delete_cookie = function(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    var Speechrecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
         var voice_recognition = new Speechrecognition();
         voice_recognition.onstart = () => {
           console.log("VOICE IS ACTIVATED...");
         };

    function manual_data_recognition(node){
        current_node = node
        result_input = node +"_result"

       data =  document.getElementById(node + "_result").value
       if(data != ""){
            data_recognition(data)
       }
    }

        function data_recognition(data){
                console.log(current_node)
                console.log(o_nodes)
                  if(expected_input == 'true'){
                    expected_input = "false"
                  console.log(array_data)
                  console.log(array_data[current_node])
                  document.getElementById("popup_msg").innerHTML = ""

                  if(data == 'yes' || data == 'chess' || data.includes('s')){
                      add_new_value_list(temp,array_data[current_node],current_node)
                      data = temp
                  }
                  else if(data == 'no'){
                      data = document.getElementById(current_node +"_result").value

                      for(x=0;x<gloval.length;x++){
                         document.getElementById("popup_msg").innerHTML += `<button onclick='add_to(this.innerHTML)'>${gloval[x]}</button>`
                      }

                  }
                  console.log(array_data[current_node])
                }

                 else if(o_nodes[current_node]["auto_correct"]){
                  data = check_nearest(data)
                 }
                document.getElementById(result_input).value = data
                temptranscript[current_node] = data
        }
        voice_recognition.onresult = function (event){
                 const current = event.resultIndex;
                data = event.results[current][0].transcript.toLowerCase()
                data_recognition(data)


                 document.getElementById(current_node + "_start").style.display = "block"
                document.getElementById(current_node + "_stop").style.display = "none"

        }

    function readOutLoud(e) {
              var delay = e.split(" ").length * 400
              var t = new SpeechSynthesisUtterance();
              (t.text = e), (t.volume = 1), (t.rate = 1), (t.pitch = 1), window.speechSynthesis.speak(t);
          }



    function check_nearest(transcript){

        // let myPromise = new Promise(function(myResolve, myReject) {
        //     myResolve(transcript);

      var data = out_nodes[current_node]["data_array"]
      temp = transcript
    //   gloval.push(array_data[current_node][0][0])
    //   gloval.push(array_data[current_node][1][0])
        gloval = []
        for(x in array_data[current_node]){
            gloval.push(array_data[current_node][x][0])
        }
      var done = false
        for(list in data){
          if(data[list].includes(transcript)){
                transcript = data[list][0]
                done = true
                break
              }
        }
        if(!done){
            glo_flag = 'false'
            readOutLoud("we do not have a match, this is new in " + current_node)
            readOutLoud('we have the following categories, please select any')
            setTimeout(function(){
                for(x=0;x<gloval.length;x++){
                      document.getElementById('popup_msg').value += `<button onclick='add_to(this.innerHTML)'>${gloval[x]}</button>`
                  }
            },3500)
            readOutLoud('do you want to add this in corpus')

            expected_input = 'true'

          setTimeout(function(){
            voice_recognition.start()
          },8500)
        }
        else if(transcript != temp){
            glo_flag = 'false'
            readOutLoud("we replaced "+ temp + " with " +  transcript + ", this is nearest match")
        }
        // });
        // transcript = await myPromise;
        console.log(transcript)
        search_keywords += ' ' + transcript
        return transcript;
    }
    function toggle_auto_correct(id,val){
      var checkBox = document.getElementById(id + "_check");
        console.log(checkBox)
      if (checkBox.checked == true){
        out_nodes[id]["auto_correct"] = true
        console.log(0)
      } else {
        out_nodes[id]["auto_correct"] = false
        console.log(1)
      }
        console.log( out_nodes[id])
    }


    function setCookie(name,value,exdays=365) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = name + '=' + value + ";" + exdays + ";path=/";
    }


    function getCookie(e) {
          var name = e + "=";
          var decodedCookie = decodeURIComponent(document.cookie);
          var ca = decodedCookie.split(';');
          for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
            }
          }
          return "";
        }



    function show_options(id){
        document.querySelectorAll('.options').forEach(function(el) {
           el.style.display = 'none';
        });
        var node_id = id.split("_")[0] + "_options"
        document.getElementById(node_id).style.display = "block"
    }
    function hide_options(id){
        document.querySelectorAll('.options').forEach(function(el) {
           el.style.display = 'none';
        });
        var node_id = id.split("_")[0] + "_options"
        document.getElementById(node_id).style.display = "none"
    }








