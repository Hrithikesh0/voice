
    // AlekyaKeywordsRecognition.js       for taking input as a sentence

    // AlekyaSpeech.js             for taking questions and checking nearest

    // Main.js              main js file for wedlock

    // ReadOutLoud.js            for displaying result and saving cookies

    // AddToCorpus.js     for adding new words to corpus




    var questions = []
    var sorted_data = [] //  main data to be displayed
    var recognition1;

    var countdownTimer
    var seconds
    var tm = 0.2
    var flag_manual = false

           var user_data = {

            };
    function secondPassed() {
              var minutes = Math.round((seconds - 30)/60),
                  remainingSeconds = seconds % 60;
              if (remainingSeconds < 10) {
                  remainingSeconds = "0" + remainingSeconds;
              }
               document.getElementById('countdown').style.display = "block"
              document.getElementById('countdown').innerHTML = minutes + ":" + remainingSeconds ;
              if (seconds == 0) {
                  if(minutes == 0){
                      recognition1.stop()
                      setTimeout(function(){
                        glo_trans = ''
                        transcript = ''
                         document.getElementById('countdown').style.display = "none"
                      },200)
                  }
                  clearInterval(countdownTimer);
              } else {
                  seconds--;
              }
          }

    var glo_trans;
    var mic = "off"
    function init(data,ques){
        questions = ques
          for (let x in questions) {
              if(questions[x] != ""){

            document.getElementById(
              "inputs"
            ).innerHTML += `<li style='padding:10px; display:none' id='${questions[x]}' placeholder='${questions[x]}'></li>`;
          }
        }
          const SpeechRecognition1 =
            window.SpeechRecognition || window.webkitSpeechRecognition;
          recognition1 = new SpeechRecognition1();
          recognition1.onstart = () => {
               seconds = tm * 60;
             countdownTimer = setInterval('secondPassed()', 1000);
            console.log("VOICE IS ACTIVATED...");
          };
          btn.addEventListener("click", () => {
            recognition1.start();
            document.getElementById("btn").style.display = "none";
             document.getElementById("stop").style.display = "block";
          });
          recognition1.continuous = true
          recognition1.interimResults = false;
          document.getElementById("stop").addEventListener("click", () => {

            recognition1.interimResults = false;
            seconds = 0;
            secondPassed()
            clearInterval(countdownTimer)
            document.getElementById("btn").style.display = "block";
            document.getElementById("stop").style.display = "none";

          });
          let p = document.getElementById('transcript')
          var transcript;
          recognition1.onresult = function (event) {
              const current = event.resultIndex;
              transcript = event.results[current][0].transcript.toLowerCase();
              console.log(transcript)
               glo_trans += ' ' +  transcript
               if(transcript != undefined){
                              p.value = transcript

               }
               alert(transcript)

          }
          var manuel_sub = false;
          document.getElementById('mn_submit').onclick = function() {
             var mn = document.getElementById('transcript').value.toLowerCase();
             seconds = 0
             manuel_sub = true;
             try{
             recognition1.stop()
              setTimeout(function(){
                glo_trans = ''
                transcript = ''
                 document.getElementById('countdown').style.display = "none"
              },200)
              clearInterval(countdownTimer);


             }catch(e){
                 console.log(e)
             }

              document.getElementById("btn").style.display = "block";
            document.getElementById("stop").style.display = "none";

             setTimeout(function(){
                sort(mn)
             },1000)

             setTimeout(function(){
                 manuel_sub = false;
             },3000)
             return false
          }

          recognition1.onspeechend = function (event) {
              if(!manuel_sub){
              if(seconds > 0){
                  console.log(glo_trans)
                  console.log('recog restarted')

                  recognition1.stop()
                  recognition1.start()
              }
              else{
                  recognition1.stop()
                document.getElementById("btn").disabled = false;
                document.getElementById("btn").style.display = "block";
                document.getElementById("stop").style.display = "none";


                console.log(glo_trans)
                p.value = transcript
               sort(glo_trans)

                }
              }

          }

        var gender = "";
        var religion = "";
        var profession = "";
        var location = "";
        var age;
        var final_res = "";
        var new_Added = {}


        document.getElementById('demo').addEventListener('click',function(){
            setTimeout(()=>{
                sort('hi, i am female writer from hyderabad, my age is 25 years and my religion is hindu')
            },7500)
        })



        function delete_value(id){
            delete user_data[id];
             document.getElementById(id + "_node").innerHTML = ''
             document.getElementById("mn_submit").click()
        }


          function isInt(n) {
            return Number(n) === n && n % 1 === 0;
          }
        }
        function readOutLoud_copm(e){
            var t = new SpeechSynthesisUtterance();
            (t.text = e), (t.volume = 1), (t.rate = 0.9), (t.pitch = 1), window.speechSynthesis.speak(t);
        }


            function sort(e) {


            var temp = e.split(" ");

             new_Added = {}


            for (let x in temp) {

                   for(data in main_data){
                    for(corpus in main_data[data]){
                        for(key in main_data[data][corpus]){
                            if(temp[x].indexOf(main_data[data][corpus][key]) != -1){
                                new_Added[data] = main_data[data][corpus][0]
                            }
                        }
                    }
                }
                // console.log(new_Added)
            }


            var ls = questions;


            if(Object.keys(new_Added).length > 0){
                readOutLoud_copm('we have gathered your information...  ,  you said')
            }else{
                 readOutLoud_copm('we did not got any answer, please try again.')
                 var tm = 0.2


                 setTimeout(function(){
                 recognition1.start()
                  document.getElementById("btn").style.display = "none";
                document.getElementById("stop").style.display = "block";

                 },3000)
            }

            setTimeout(function(){
                for(const prop in new_Added){
                    if(prop in out_nodes){
                     document.getElementById(prop + "_node").style.display = 'block'
                    }else{
                        take_input(prop)

                        setTimeout(function(){
                                document.getElementById(prop + "_node").style.display = 'block'

                                // questions[prop] = new_Added[prop]
                                ls[prop] = new_Added[prop]

                        },100)
                    }
                     readOutLoud_copm( new_Added[prop] + ' for '  + prop )
                }
            },2000)

            var search_conditions = []
            user_data = Object.assign(user_data, new_Added)

            for(x in user_data){
                search_conditions.push(user_data[x]);
                manual_data(search_conditions)
            }

            console.log(user_data)
            ls = user_data;
            for(const prop in user_data){
                setCookie(prop,user_data[prop])
                var temp = document.getElementById(`${prop}_result`).value.toLowerCase()
                if(user_data[prop] != null && user_data[prop] != '' && user_data[prop] != undefined || temp != ''){
                    document.getElementById(`${prop}_result`).value = user_data[prop]
                    document.getElementById(`${prop}_result`).style.borderColor = '#4984e4'
                    document.getElementById(`${prop}_result`).style.boxShadow = "0 0 5px rgba(81, 203, 238, 1)";
                    document.getElementById(`${prop}_result`).style.border = "1px solid rgba(81, 203, 238, 1)";
                }else{
                    document.getElementById(`${prop}_result`).style.borderColor = '#ff4242'
                    document.getElementById(`${prop}_result`).style.boxShadow = "0 0 5px #ff4242";
                    document.getElementById(`${prop}_result`).style.border = "1px solid #ff4242";
                }
            }
            setTimeout(()=>{
                if(Object.keys(user_data).length > 0){
                    if(Object.keys(new_Added).length > 0){
                        next(user_data,true)
                    }else{
                        next(user_data,false)
                    }


                }
            },4500)
        if(search_keywords.length > 0){
                    flag_manual = true
                }
          }
        function manual_data(search_conditions){
            if(search_conditions.includes('male')){
                search_conditions = search_conditions.map(item => item === 'male' ? 'female' : item);
            }
            else{
                search_conditions = search_conditions.map(item => item === 'female' ? 'male' : item);
            }
            var flag = false
            console.log(search_conditions)
            sorted_data = []
            wedlock_data.forEach(function(item,index){
                flag = true
                for(let x in search_conditions){
                    if(!item.includes(search_conditions[x])){
                        flag = false
                    }
                }
                if(flag == true){
                    sorted_data.push(item)
                }
            })
            console.log(sorted_data)
        }